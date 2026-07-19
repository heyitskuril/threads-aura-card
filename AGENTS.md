# AGENTS.md — Threads Aura Card

This file is the source of truth for any AI coding agent (opencode + DeepSeek, Claude Code, etc.) working in this repository. Read this in full before making changes. Follow it even if the user's prompt doesn't repeat these rules.

---

## 1. Project Context

**Threads Aura Card** is a viral, AI-powered web app that turns a public Threads username into a downloadable "aura card" (title + metrics + badges + rarity tier). MVP is already built and pushed. We are now in active feature-development mode, iterating solo.

Full product spec lives at: `/docs/threads-aura-card-product-blueprint.md` (read it before implementing anything content/UX-related — titles, badges, metrics, rarity logic, card design all come from there, not from your own assumptions).

---

## 2. Tech Stack (confirmed)

- **Framework**: Next.js 15 (App Router) + TypeScript
- **Styling**: Tailwind CSS v4 (via `@tailwindcss/postcss`)
- **Image export**: client-side `html2canvas` for PNG download at 1080×1350
- **Card generation**: deterministic seeded RNG in `app/data/catalog.ts`
- **API routes**: Next.js serverless functions in `app/api/`
- **Profile caching**: Upstash Redis (24h TTL, `profile:{username}` key)
- **Image rehosting**: Cloudinary (profiles stored under `threads-aura-card/profiles/`)
- **Commands**: `npm run dev -p 3000`, `npm run build`, `npm run start`, `npm run lint`

---

## 3. Non-Negotiable Rules

1. **Never commit or hardcode API keys/secrets.** All AI provider keys, tokens, and credentials must live in `.env` (gitignored) and be read via `process.env` on the server side only.
2. **Never call the AI provider from client-side code.** All AI requests go through a server/serverless endpoint that proxies the request. The browser should only ever talk to our own API.
3. **Do not restructure the folder layout, rename core routes, or change the tech stack** (e.g., swapping Vite→Next, Tailwind→CSS Modules) without asking first and explaining the tradeoff.
4. **Do not delete or overwrite content catalogs** (metrics/titles/badges/insights data files) unless explicitly asked — these are hand-curated product content, not boilerplate.
5. **Keep the founder branding intact**: footer credit, "Created with Threads Aura Card · by Kuril Dev" card signature, and Open Graph footer line must not be removed or altered unless explicitly requested.
6. Prefer small, reviewable diffs over large rewrites. If a task seems to require touching more than ~5 files, pause and outline the plan first.

---

## 4. Coding Standards

- **Language**: TypeScript preferred for all new files. If the repo is currently plain JS, ask before introducing TS, don't silently mix conventions.
- **Components**: functional components + hooks only. One component per file. Co-locate a component's styles/types/tests next to it (`Card/Card.tsx`, `Card/Card.types.ts`, `Card/Card.test.tsx`).
- **Naming**: `PascalCase` for components, `camelCase` for functions/variables, `SCREAMING_SNAKE_CASE` for constants/env keys, kebab-case for file names that aren't components (`use-aura-generator.ts`).
- **State**: keep state local/component-level unless genuinely shared across the app. Don't introduce Redux/Zustand/etc. unless the task explicitly calls for global state.
- **Styling**: Tailwind utility classes as default; extract to a component class only when a utility string exceeds ~8–10 classes or repeats 3+ times.
- **Comments**: explain *why*, not *what*. Don't narrate obvious code.
- **No dead code**: remove console.logs, commented-out blocks, and unused imports before considering a task done.
- **Accessibility**: interactive elements must be keyboard-navigable; respect `prefers-reduced-motion` for all reveal/loading animations.

---

## 5. Git & Commit Conventions

- Conventional Commits format: `feat:`, `fix:`, `refactor:`, `chore:`, `docs:`, `style:`, `perf:`, `test:`
  - Example: `feat: add rarity-based confetti intensity to reveal animation`
- One logical change per commit. Don't bundle unrelated fixes into a feature commit.
- Branch naming: `feature/<short-name>`, `fix/<short-name>`, `chore/<short-name>`.
- Never commit directly generated `.env`, `node_modules`, or build output folders — confirm `.gitignore` covers them before your first commit in a session.

---

## 6. Before You Start Any Task

1. Read the relevant part of `/docs/threads-aura-card-product-blueprint.md` if the task touches product logic, content, or design decisions.
2. Check existing patterns in the codebase for similar features before introducing a new pattern.
3. State your plan in 2–4 bullet points before writing code, if the task is non-trivial (more than a single small fix).
4. If a request conflicts with Section 3's non-negotiables, flag the conflict instead of proceeding.

---

## 7. Definition of Done (checklist before marking a task complete)

- [ ] Code builds/runs locally without errors
- [ ] No secrets or API keys introduced into committed files
- [ ] No console errors/warnings in the browser for the touched flow
- [ ] Responsive check: works on mobile viewport, not just desktop
- [ ] Matches existing visual language (dark mode, glass/glow aesthetic per blueprint Section 10)
- [ ] Founder branding (footer + card signature) still present and unaltered
- [ ] Commit message follows convention in Section 5
- [ ] Brief summary of what changed and why, written in plain language

---

## 8. Things to Explicitly Avoid

- Don't add authentication/login unless asked — the core loop is intentionally login-free.
- Don't add a heavy backend/database unless the task requires persistence beyond simple result caching.
- Don't introduce new UI libraries (component kits, animation libraries) without checking what's already installed first — avoid dependency bloat.
- Don't change rarity odds, metric scoring logic, or content catalogs based on "improving" them unless explicitly asked — these are deliberate product decisions from the blueprint.

---

## 9. Communication Style for the Agent

- Be concise in explanations; show the plan, then the diff/code, then a short summary.
- If something in the blueprint or existing code is ambiguous, ask one clear question rather than guessing silently on something architecturally significant.
- If asked to "just make it work," prioritize a working, minimal implementation first, then mention (not necessarily implement) any corners cut.
