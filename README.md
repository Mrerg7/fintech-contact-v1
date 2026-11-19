# fintech.contact

Static Astro site for **fintech.contact** — the definitive domain name for Financial Technologies. Deployed as Cloudflare Workers Static Assets plus a small Worker that 301-redirects every non-canonical URL (`www`, HTTP, `/index.html`, `/404`, other `.html` aliases) to `https://fintech.contact/` in a single hop — no Cloudflare 307 HTML redirects for crawlers.

## Stack

- Astro (static output)
- TypeScript
- Tailwind CSS v4 (`@tailwindcss/vite`)
- Content Collections
- `@astrojs/sitemap`
- Cloudflare Workers Static Assets

## Commands

```bash
npm install
npm run dev
npm run build
npm run deploy
```

## Deploy

Wrangler config in `wrangler.jsonc` serves `./dist` with `html_handling: "none"` and runs `src/worker.ts` first so the Worker owns all permanent redirects. Custom domains: `fintech.contact` and `www.fintech.contact` (www → apex 301). Sitemap lists only `https://fintech.contact/`.

Acquisition inquiries route to `sales@desertrich.com`.
