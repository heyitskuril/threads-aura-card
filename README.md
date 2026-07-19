# Threads Aura Card

Discover your Threads presence distilled into a beautiful, shareable Aura Card — with custom titles, metrics, badges, and rarity tiers.

Built with React 19 + Vite 6 + TypeScript + Tailwind CSS v4.

## Quick start

```bash
npm install
npm run dev     # localhost:3000
npm run build   # production build
npm run lint    # tsc --noEmit
```

## How it works

Enter a Threads username → Loading animation → Reveal card with title, 8 metrics, badges, insight, and rarity tier.

Card generation uses deterministic seeded RNG (`username + seed`). No backend needed.

## Project structure

```
src/
├── main.tsx              # Entrypoint
├── App.tsx               # View controller (landing → loading → card)
├── index.css             # Tailwind + Google Fonts
├── types.ts              # TypeScript types
├── data/
│   ├── catalog.ts        # Seeded RNG + content catalogs
│   └── storage.ts        # localStorage cache
├── hooks/
│   └── use-reduced-motion.ts
└── components/
    ├── LandingView.tsx    # Username input + FAQ
    ├── LoaderView.tsx     # Animated loading screen
    └── AuraCardView.tsx   # Card display + download/share
```

Built by [Kuril Dev](https://kuril.dev) · Follow [@heyitskuril](https://threads.net/@heyitskuril)
