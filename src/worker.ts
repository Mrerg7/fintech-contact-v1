/**
 * Canonical URL enforcement for Search Console.
 *
 * Goals:
 * 1. One indexable document: https://fintech.contact/
 * 2. Every alias (www, http, /index.html, *.html, /404) is a single 301 hop
 * 3. Never leak Cloudflare Assets' default 307 HTML redirects to crawlers
 *
 * Pair with assets.html_handling = "none" so ASSETS serves files as-is while
 * this Worker owns permanent redirects and internal rewrites.
 */
const CANONICAL_HOST = 'fintech.contact';
const CANONICAL_ORIGIN = `https://${CANONICAL_HOST}`;

interface Env {
  ASSETS: Fetcher;
}

/** Map a request path to the public canonical pathname. */
function canonicalPath(pathname: string): string {
  let path = pathname;

  if (path === '/index.html' || path === '/index') {
    return '/';
  }

  if (path.endsWith('/index.html')) {
    path = path.slice(0, -'index.html'.length);
  } else if (path.endsWith('/index')) {
    path = path.slice(0, -'index'.length);
  } else if (path.endsWith('.html')) {
    path = `${path.slice(0, -'.html'.length)}/`;
  }

  // The 404 document must not be a crawlable 200 URL.
  if (path === '/404' || path === '/404/') {
    return '/';
  }

  return path;
}

function redirectTo(dest: URL): Response {
  return Response.redirect(dest.toString(), 301);
}

/** Fetch a static asset by absolute path, preserving method/headers/body. */
function assetRequest(request: Request, origin: string, assetPath: string): Request {
  const target = new URL(assetPath, origin);
  return new Request(target, request);
}

/**
 * True on Cloudflare's edge (production / remote preview).
 * Local `wrangler dev` simulates custom domains over plain HTTP without CF-Ray,
 * so we must not force an https upgrade there or every request 301-loops.
 */
function isCloudflareEdge(request: Request): boolean {
  return request.headers.has('CF-Ray');
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const hostname = url.hostname.toLowerCase();
    const path = canonicalPath(url.pathname);
    const onEdge = isCloudflareEdge(request);

    const hostOk = hostname === CANONICAL_HOST;
    const httpsOk = !onEdge || url.protocol === 'https:';
    const pathOk = url.pathname === path;

    if (!hostOk || !httpsOk || !pathOk) {
      const dest = new URL(url.href);
      dest.protocol = 'https:';
      dest.hostname = CANONICAL_HOST;
      dest.port = '';
      dest.pathname = path;
      return redirectTo(dest);
    }

    // Origin for internal asset fetches — keep the request origin locally so
    // ASSETS binding resolves; use the public origin on the edge.
    const assetOrigin = onEdge ? CANONICAL_ORIGIN : url.origin;

    // With html_handling "none", serve the homepage from index.html without a redirect.
    // Strip asset-path headers so /index.html rules cannot noindex the apex URL.
    if (path === '/') {
      const page = await env.ASSETS.fetch(assetRequest(request, assetOrigin, '/index.html'));
      const headers = new Headers(page.headers);
      headers.delete('X-Robots-Tag');
      headers.set('Link', `<${CANONICAL_ORIGIN}/>; rel="canonical"`);
      return new Response(page.body, { status: page.status, statusText: page.statusText, headers });
    }

    const response = await env.ASSETS.fetch(request);

    // Belt-and-suspenders: never pass Assets' temporary HTML redirects to clients.
    if (response.status === 301 || response.status === 302 || response.status === 307 || response.status === 308) {
      const location = response.headers.get('Location');
      if (location) {
        const dest = new URL(location, onEdge ? CANONICAL_ORIGIN : url.origin);
        if (onEdge) {
          dest.protocol = 'https:';
          dest.hostname = CANONICAL_HOST;
          dest.port = '';
        }
        dest.pathname = canonicalPath(dest.pathname);
        return redirectTo(dest);
      }
    }

    return response;
  },
} satisfies ExportedHandler<Env>;
