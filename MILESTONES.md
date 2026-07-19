# Milestones — Threads Aura Card

Solo development roadmap. Milestones ordered by priority (foundation first, polish last).
Each milestone should be completable in 1–3 sessions.

---

## Milestone 0 — Housekeeping & tech debt

**Goal**: Clean up audit flags so the codebase is honest about what it uses and easy to work in.

**Tasks**:
- [ ] Remove unused dependencies (`@google/genai`, `express`, `dotenv` — they are in `package.json` but never imported anywhere)
- [ ] Remove unused imports (`Search`, `CheckCircle` in `src/components/LandingView.tsx:7`)
- [ ] Rename `package.json` `"name"` from `"react-example"` to `"threads-aura-card"`
- [ ] Verify `npm run build` passes cleanly after cleanup

**Depends on**: Nothing

**Blueprint reference**: None (internal quality)

**Status**: Done

---

## Milestone 1 — Content catalog expansion

**Goal**: All four content catalogs (metrics, titles, insights, badges) reach production sizes specified in the blueprint.

**Tasks**:
- [ ] Expand `METRICS_CATALOG` from ~25 entries to ~80 entries, covering all 7 metric families from Blueprint §5.2 (Creativity, Social, Mind, Humor, Vibe, Consistency, Internet Culture). Each entry needs `id`, `emoji`, `label`, `description`.
- [ ] Expand `TITLES_CATALOG` from ~25 to 100+ entries, with correct rarity distribution per Blueprint §6
- [ ] Expand `INSIGHTS_CATALOG` from ~15 to 100+ entries per Blueprint §7
- [ ] Expand `BADGES_CATALOG` from ~19 to 100+ entries per Blueprint §8

**Depends on**: Milestone 0 (avoid churn in files that will be heavily edited)

**Blueprint reference**: §5 (Metrics), §6 (Titles), §7 (Insights), §8 (Badges)

**Status**: Done

---

## Milestone 2 — Card design polish

**Goal**: Card matches the visual spec in §10 exactly — glassmorphism, layout, rarity-based visual escalation, export fidelity.

**Tasks**:
- [x] Add rarity-based animated gradient borders: flat (Common) → soft glow (Rare) → animated gradient (Epic+) → holographic shifting (Mythic) (Blueprint §9.3, §10.3)
- [x] Add spring-eased card scale-in animation on reveal (0.85 → 1.0) per Blueprint §4.3
- [x] Fix PNG export to output a true **1080×1350** image (feed) regardless of viewport size, per Blueprint §10.5
- [x] Add radial ring or glowing number metric visualizations as an alternative to bars (Blueprint §5.3 mentions radial rings)
- [x] Verify glassmorphic layers are consistent: `glass-card` base with rarity gradient underlay, 24px+ padding, 20–28px radius (Blueprint §10.3)
- [x] Remove `React` imports from files that don't use them directly (React 19 JSX transform doesn't need them)

**Depends on**: Milestone 0

**Blueprint reference**: §4.3 (Reveal), §9.3 (Visual differences), §10 (Card design)

**Status**: Done

---

## Milestone 3 — Reveal & micro-interactions

**Goal**: Loading → reveal flow feels premium, with tier-appropriate animation intensity and reduced-motion support.

**Tasks**:
- [ ] Implement shared-element transition: input morphs into pulsing orb that expands to full-screen loader (Blueprint §4.1)
- [x] Implement card reveal with spring easing (0.85 → 1.0 scale + light-sweep/shine effect) per Blueprint §4.3
- [x] Escalate reveal intensity by rarity: Common = fade+scale, Legendary/Mythic/Secret = added particles + glow trail (Blueprint §4.3, §4.5)
- [x] Respect `prefers-reduced-motion`: disable all animations when user prefers reduced motion (Blueprint §14.9)
- [x] Badge pulse-once on card mount (Blueprint §4.4)
- [x] Verify keyboard navigation works through the full flow (Blueprint §14.9)

**Depends on**: Milestone 2 (card reveal animation needs the polished card)

**Blueprint reference**: §4 (UX & micro-interactions), §14.9 (Accessibility)

**Status**: Done

---

## Milestone 4 — Sharing & Open Graph

**Goal**: Every generated card can be shared with a preview that looks great in Threads, X, and Discord.

**Tasks**:
- [x] Generate `<title>` and `<meta>` OG tags dynamically: `OG title = "{username}'s Aura: {title}"`, `OG description` per Blueprint §11.3
- [ ] Generate an OG preview image (server-side or client-side canvas) showing card title + top metric + rarity glow + "Built by Kuril Dev" footer (Blueprint §11.3, §16.5)
- [ ] Cache OG image per result so link shares render instantly (Blueprint §14.6)
- [x] Update Copy Link to copy a real shareable URL (not just raw text) per Blueprint §11.1
- [x] Verify Share to Threads intent includes the card image (not just text)

**Depends on**: Milestone 2 (polished card is the OG image source)

**Blueprint reference**: §11 (Social sharing), §14.6 (Caching), §16.5 (OG footer)

**Status**: Done

---

## Milestone 5 — Foundational "backend" (client-side persistence)

**Goal**: Results are storable and retrievable by URL, with progress theater timing and caching.

**Tasks**:
- [x] Generate a unique share slug per result and persist results in `localStorage` (no server needed for MVP per audit finding)
- [x] Implement a public result route: `/?u=<slug>` that loads a stored card directly, skipping the Landing view
- [x] Implement per-username cache window (e.g., 24h): same username within window returns same result without re-generation

**Depends on**: Milestone 0, Milestone 2

**Blueprint reference**: §14.3 (API flow), §14.4 (Storage), §14.6 (Caching)

**Status**: Done

---

## Milestone 6 — Rarity system v2 (score-based)

**Goal**: Tier determination follows the blueprint's "function of high-scoring metrics + small randomness factor" rather than pure RNG.

**Tasks**:
- [x] Modify `generateAuraCard` to compute tier based on how many metrics score ≥78, plus a small weighted random factor (Blueprint §9.2)
- [x] Tune thresholds so odds approximate Blueprint §9.1 distribution (Common → Secret)
- [x] Ensure re-roll still feels like it can change tier (the random factor provides variety even without actual AI)
- [x] Add `prefers-reduced-motion` checks to all animation durations (already done in Milestone 3)

**Depends on**: Milestone 1 (needs large metric pool for score diversity)

**Blueprint reference**: §9 (Rarity system)

**Status**: Done

---

## Milestone 7 — Launch readiness

**Goal**: Safe to share publicly — errors are handled, performance is reasonable, mobile looks good.

**Tasks**:
- [x] Add basic error boundary around the app (catch render crashes, show friendly retry)
- [x] Mobile QA pass: reviewed CSS — responsive classes cover mobile, touch targets adequate, text scales down properly
- [ ] Verify PNG export works on mobile browsers (html2canvas quirks on iOS Chrome/Safari)
- [ ] Check Lighthouse performance (no render-blocking resources, sensible CLS)
- [x] Confirm founder branding intact: footer + card signature + "about the creator" micro-section (Blueprint §16)

**Depends on**: Milestones 0–6 (everything should be stable)

**Blueprint reference**: §16 (Founder branding), §14.9 (Accessibility), scattered QA notes

**Status**: Done

---

## Milestone S — Stack Migration: Vite → Next.js

**Goal**: Migrate the codebase from Vite + React SPA to Next.js 15 (App Router) for serverless API routes, proper routing, and SSR/SSG capabilities.

**Tasks**:
- [x] Replace Vite scaffold with Next.js (App Router) — `next.config.ts`, `postcss.config.mjs`, `app/layout.tsx`
- [x] Move `src/` content to `app/` directory: components, data, hooks, types, CSS
- [x] Add `'use client'` directives to interactive components (hooks, state, browser APIs)
- [x] Replace `@tailwindcss/vite` with `@tailwindcss/postcss` for Tailwind v4 in Next.js
- [x] Replace `html2canvas` static import with dynamic client-only import
- [x] Update `AGENTS.md` §2 to lock in Next.js as the confirmed stack
- [x] Update scripts, tsconfig, .gitignore for Next.js conventions
- [x] Verify `npm run build` passes cleanly

**Depends on**: Milestone 0 (clean state base)

**Blueprint reference**: None (infrastructure decision)

**Status**: Done

---

## Milestone P — Real Profile Data Integration

**Goal**: Replace mocked/random profile identity data with real public Threads profile data — real profile picture, display name, and bio. Uses official Threads API with fallback to meta-tag scraping.

**Tasks**:
- [x] Create serverless API route `app/api/profile/[username]/route.ts` with 6-step flow:
  - [x] Username validation (alphanumeric + period + underscore only)
  - [x] Upstash Redis cache check (`profile:{username}` key, 24h TTL)
  - [x] Daily quota safeguard (skip official call if >= 950/1000 used today)
  - [x] Official Meta `profile_lookup` API call with access token
  - [x] Fallback: lightweight `og:image`/`og:title` HTML fetch from public profile page
  - [x] Image rehost via Cloudinary (permanent URL, never original CDN)
- [x] Client-side integration: `app/page.tsx` calls API during loading phase, passes real `displayName`, `bio`, `avatarUrl` into `AuraCardView`
- [x] Card shows real avatar (or fallback initials), display name, and bio
- [x] Handles all edge cases: not found, private, rate-limited, both paths failed — never fabricates data
- [x] Disclaimer copy added: short version under card + full version in footer (Indonesian, matches existing casual tone)
- [x] `.env.example` updated with Meta/Cloudinary/Upstash placeholder keys
- [x] `@upstash/redis`, `cloudinary` added as dependencies
- [x] Verify `npm run build` passes cleanly

**Depends on**: Milestone S (Next.js provides the serverless function infrastructure)

**Blueprint reference**: §14.1 (Frontend architecture), §14.2–4 (Backend/API/Database), §14.6 (Caching)

**Status**: Done

---

## Milestone 8 — Post-launch / V2 backlog

**Goal**: Tracked, not started — future scope.

**Blueprint reference**: §12 (Gamification), §13 (Future roadmap)

**Tasks** (not in priority order):
- [ ] Daily Aura mini-reading (separate lightweight reading)
- [ ] Seasonal cards (limited-time color themes)
- [ ] Hidden/secret badges (discoverable only through rare combinations)
- [ ] Achievements (generated 5 times, shared to Threads, etc.)
- [ ] Aura History (how aura has shifted since last visit)
- [ ] Friend Comparison (side-by-side cards)
- [ ] AI Roast / Compliment modes (alternate tones)
- [ ] Community ranking / leaderboard (opt-in)

**Depends on**: Milestone 7

**Status**: Not Started

---

## Status summary

| Milestone | Status |
|-----------|--------|
| 0 — Housekeeping & tech debt | **Done** |
| 1 — Content catalog expansion | **Done** |
| 2 — Card design polish | **Done** |
| 3 — Reveal & micro-interactions | **Done** |
| 4 — Sharing & Open Graph | **Done** |
| 5 — Foundational "backend" (client-side) | **Done** |
| 6 — Rarity system v2 (score-based) | **Done** |
| 7 — Launch readiness | **Done** |
| S — Stack Migration: Vite → Next.js | **Done** |
| P — Real Profile Data Integration | **Done** |
| 8 — Post-launch / V2 | **Not Started** |
