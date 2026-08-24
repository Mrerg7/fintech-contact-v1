/**
 * Canonical host + path enforcement for Search Console.
 *
 * www/http previously returned 200 (duplicate canonicals). After 301s, GSC
 * reports those URLs as "Page with redirect" — expected — but chains and
 * Cloudflare's 307 for /index.html delay indexing of the apex homepage.
 * Collapse every alias into one 301 to https://fintech.contact/….
 */
const CANONICAL_HOST = 'fintech.contact';

interface Env {
  ASSETS: Fetcher;
}

function canonicalUrl(requestUrl: URL): URL {
  const url = new URL(requestUrl.href);
  url.protocol = 'https:';
  url.hostname = CANONICAL_HOST;
  url.port = '';

  const path = url.pathname;
  if (path === '/index.html' || path === '/index') {
    url.pathname = '/';
  } else if (path.endsWith('/index.html')) {
    url.pathname = `${path.slice(0, -'index.html'.length)}`;
  }

  return url;
}

function mustRedirect(from: URL, to: URL): boolean {
  return (
    from.protocol !== to.protocol ||
    from.hostname.toLowerCase() !== to.hostname ||
    from.pathname !== to.pathname
  );
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const dest = canonicalUrl(url);

    if (mustRedirect(url, dest)) {
      return Response.redirect(dest.toString(), 301);
    }

    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
