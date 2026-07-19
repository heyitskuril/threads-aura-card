# Threads Aura Card

Discover your Threads presence distilled into a beautiful, shareable Aura Card — with custom titles, metrics, badges, and rarity tiers.

Built with Next.js 15 + React 19 + TypeScript + Tailwind CSS v4.

## Quick start

```bash
npm install
npm run dev     # localhost:3000
npm run build   # production build
npm run lint    # tsc --noEmit
```

## How it works

Enter a Threads username → Loading animation → Reveal card with title, 8 metrics, badges, insight, and rarity tier.

Card generation uses deterministic seeded RNG (`username + seed`). Real profile data is fetched server-side via the Threads API with a Cloudinary-based fallback.

## Project structure

```
app/
├── layout.tsx             # Root layout + ErrorBoundary
├── page.tsx               # View controller (landing → loading → card)
├── globals.css            # Tailwind + Google Fonts
├── types.ts               # TypeScript types
├── data/
│   ├── catalog.ts         # Seeded RNG + content catalogs
│   └── storage.ts         # localStorage cache
├── hooks/
│   └── use-reduced-motion.ts
├── components/
│   ├── LandingView.tsx    # Username input + FAQ
│   ├── LoaderView.tsx     # Animated loading screen
│   └── AuraCardView.tsx   # Card display + download/share
└── api/profile/[username]/
    └── route.ts           # Serverless profile lookup
```

Built by [Kuril Dev](https://kuril.dev) · Follow [@heyitskuril](https://threads.com/@heyitskuril)
