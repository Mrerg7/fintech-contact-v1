# fintech.contact

Static Astro site for **fintech.contact** — the definitive domain name for Financial Technologies. Deployed as Cloudflare Workers Static Assets plus a small Worker that 301-redirects every non-canonical URL (`www`, HTTP, `/index.html`) to `https://fintech.contact/` in a single hop.

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

Wrangler config in `wrangler.jsonc` serves `./dist` and runs `src/worker.ts` first to enforce `https://fintech.contact/` as the only indexable host. Custom domains: `fintech.contact` and `www.fintech.contact` (www redirects).

Acquisition inquiries route to `sales@desertrich.com`.
