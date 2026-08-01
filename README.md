# fintech.contact

Static Astro site for **fintech.contact** — the definitive domain name for Financial Technologies. Deployed as a Cloudflare Workers Static Assets project (assets-only, no Worker script, no Astro adapter).

## Stack

- Astro (static output)
- TypeScript
- Tailwind CSS v4 (`@tailwindcss/vite`)
- Content Collections
- `@astrojs/sitemap`
- Cloudflare Workers Static Assets + Images CDN

## Commands

```bash
npm install
npm run dev
npm run build
npm run deploy
```

## Deploy

Assets-only Wrangler config in `wrangler.jsonc` points at `./dist`. Custom domains: `fintech.contact` and `www.fintech.contact`.

Acquisition inquiries route to `sales@desertrich.com`.
