/**
 * Canonical host enforcement for Search Console.
 * www (and http) previously returned 200 with only a soft rel=canonical,
 * which triggers "Duplicate without user-selected canonical".
 */
const CANONICAL_HOST = 'fintech.contact';

interface Env {
  ASSETS: Fetcher;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const host = url.hostname.toLowerCase();

    if (host === `www.${CANONICAL_HOST}` || url.protocol === 'http:') {
      url.protocol = 'https:';
      url.hostname = CANONICAL_HOST;
      return Response.redirect(url.toString(), 301);
    }

    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
