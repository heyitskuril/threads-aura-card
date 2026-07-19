# Changelog

## [Unreleased]

### Added
- `AGENTS.md` — source-of-truth instruction file for AI coding agents
- `docs/threads-aura-card-product-blueprint.md` — full product specification
- `eslint.config.js` — basic React + TypeScript lint config
- `.prettierrc` — consistent formatting defaults
- `CHANGELOG.md` — this file
- `MILESTONES.md` — shared development roadmap
- `src/hooks/use-reduced-motion.ts` — hook for `prefers-reduced-motion` detection
- Content catalogs expanded: metrics 25→84, titles 27→102, badges 19→105, insights 15→105
- Rarity-based animated gradient borders (Epic=conic spin, Mythic=holographic hue-shift)
- Spring-eased card scale-in reveal animation (0.85→1.0)
- Radial ring SVG visualization for top metric score
- Light-sweep/shine effect on card reveal
- Badge pop-in pulse animation on card mount
- Smooth fade transitions between landing→loading→card views
- `prefers-reduced-motion` CSS kill-switch (disables all animations/transitions)
- Dynamic `<title>` and OG meta tags (`og:title`, `og:description`, `og:url`, `twitter:*`) set on card view
- Open Graph / Twitter Card meta tags in `index.html`

### Changed
- Switched from Bun to npm (removed `bun.lock`, added `package-lock.json`)
- Copy Link now copies a real shareable URL (`?u=@username`) instead of raw text
- localStorage result caching (24h TTL) — same username returns cached card instantly
- `?u=@username` URL parameter support — loads cached card directly on page load
- `src/data/storage.ts` — persistence utility (save/get/clear/getAll)
- Score-based rarity tier logic: tier determined by how many metrics score ≥78 + small random offset (Blueprint §9.2), plus per-tier score minimum boost
- `@types/react` + `@types/react-dom` installed
- `useDefineForClassFields` set to `true` in tsconfig
- `ErrorBoundary` component wrapping the app (catch render crashes, friendly retry UI)
- `server.js` — Express server with `/api/profile/:username` endpoint (scrapes real Threads profile data)
- Vite proxy config forwarding `/api` to the Express server
- Real Threads profile data: avatar, full name, bio, follower/post counts on the aura card
- Profile-based metric boosting: followers → social scores, post count → consistency, verified → creator scores
- Metrics displayed increased from 5 to 8 (2 radial rings + 6 compact bars)
- Badges per card increased from 2-3 to 3-4
- `express`, `cors`, `concurrently` added as dependencies
- Refactored into monorepo: `client/` (React + Vite) and `server/` (Express) with npm workspaces
- Updated all documentation commands to use `npm` instead of `bun`
- PNG export now captures at true 1080×1350 (432px × 2.5x scale)
- Package name renamed from `react-example` to `threads-aura-card`
- Removed unused `React` imports from 3 component files

### Removed
- Dead dependencies: `@google/genai`, `express`, `dotenv`, `@types/express` (121 packages)
- Unused imports: `Search`, `CheckCircle` from `LandingView.tsx`

## 2026-07-18

### Added
- Full MVP implementation: Landing → Loading → Card reveal flow
- Deterministic seeded RNG card generation with 7 rarity tiers (Common → Secret)
- Rarity odds distribution: Common 45%, Uncommon 25%, Rare 15%, Epic 9%, Legendary 4.5%, Mythic 0.4%, Secret 0.1%
- Content catalogs: 25 metrics, 25 titles, 19 badges, 15 insights
- Confetti animation for Rare+ tiers (canvas-confetti)
- Parallax tilt on desktop card hover
- PNG export via html2canvas at 2.5x scale
- Share to Threads intent, copy link, re-roll functionality
- Glassmorphic dark UI with Tailwind CSS v4
- Founder branding: footer + card signature ("Created with Threads Aura Card · by Kuril Dev")
- Project scaffold: React 19 + Vite 6 + TypeScript + Tailwind v4
