# AURA CARD — Complete Product Blueprint
### A Viral Threads Aura Generator by Kuril Dev

---

## 0. HOW TO USE THIS DOCUMENT

This is a build-ready product specification for **Threads Aura Card**, a fun, AI-powered web experience that turns a public Threads profile into a beautiful, shareable "Threads Aura Card." It is written so that another AI (or a human engineer) can implement the full product with minimal ambiguity. It does not contain code — it contains product thinking, UX, branding, content systems, and architecture decisions.

---

## 1. PRODUCT VISION

### 1.1 Purpose
Threads Aura Card answers one question in the most delightful way possible: *"What does my presence on Threads feel like?"* It takes a public username, runs a lightweight AI "vibe analysis," and outputs a single, gorgeous, portrait-oriented card — a title, a set of aura stats, badges, and a rarity tier — designed to be downloaded and posted back to Threads.

It is entertainment, not psychology. The value isn't accuracy — it's **recognition** ("this is so me") and **identity performance** ("this is how I want to be seen").

### 1.2 Target Audience
- Primary: Threads users aged 18–34, terminally online, active posters, meme-literate, into personality content (MBTI, Enneagram, "types" content, Wrapped-style recaps).
- Secondary: Indonesian and global Twitter/X refugees who moved to Threads and enjoy identity/community content.
- Tertiary: Recruiters/marketers/creators curious about "brand vibe" tools, and other indie devs studying the product as a portfolio reference.

### 1.3 Why Users Will Share
- **Ego resonance**: the card flatters and reflects them ("The Quiet Creator" feels true).
- **Identity signaling**: posting it says something about who they are without them having to say it directly.
- **Low effort, high payoff**: one tap, zero typing, instant premium visual.
- **Comparison bait**: friends want to generate their own to compare titles/rarity.
- **Collectibility**: rare titles/badges create "I got a rare one!" bragging rights.

### 1.4 Emotional Triggers
- Curiosity ("what will mine say?")
- Validation ("that's so accurate")
- Pride/status (rare tier, high scores)
- Nostalgia/belonging (Wrapped-style yearly recap energy)
- FOMO (seeing others post theirs and wanting one)

### 1.5 Psychological Mechanics Behind Virality
1. **Barnum effect** — statements are specific-sounding but broadly flattering, so almost anyone feels "seen."
2. **Social proof loop** — every share is an ad; every ad triggers curiosity; every curiosity click is a new user.
3. **Variable reward** — rarity system means outcomes aren't guaranteed, which increases motivation to re-generate and share (like a loot mechanic, but wholesome).
4. **Identity artifact** — unlike a text post, a *card* feels like an object worth keeping, screenshotting, and using as a profile highlight.

---

## 2. BRANDING

### 2.1 Name Direction
Primary recommendation: **Threads Aura Card**. Clean, generic enough to expand beyond Threads later, specific enough to explain itself instantly.

Alternative names considered:
- **Auralytics** — more technical/analytics feel, less playful.
- **Vibe Check** — very Gen-Z, but genericized/overused across the internet.
- **Threadsaura** — good for SEO but limits future platform expansion.
- **MyAura** — short, ownable, but harder to trademark/differentiate.

Recommendation: keep **Threads Aura Card** as the product name, with the URL/brand line: *"Threads Aura Card — What's your internet aura?"*

### 2.2 Taglines
- "What's your internet aura?"
- "Your Threads presence, distilled into one card."
- "Not a personality test. A vibe check."
- "Everyone has an aura. Yours just got a card."

### 2.3 Logo Direction
A soft, glowing orb/blob mark (representing "aura") that can shift gradient per rarity tier. Should work as a small favicon and as a large hero mark. Avoid literal "aura reading" mysticism (no crystal balls, no zodiac clichés) — keep it modern/tech, closer to a soft gradient blob (like a Dribbble-style "aura gradient") than new-age iconography.

### 2.4 Typography
- **Display/Headline**: a rounded-but-confident geometric sans (e.g., feel of Cabinet Grotesk, General Sans, or Clash Display) for large hero text and card titles — gives premium-startup energy.
- **Body/UI**: a clean neutral sans (Inter, Geist, or Satoshi) for readability in forms, FAQ, and metrics.
- **Numerals on the card** (scores) can use a slightly condensed/mono-ish font for a "data" feel that contrasts with the soft title typography.

### 2.5 Color Palette
- Base UI: near-black background (#0B0B0F) with soft off-white text (#F5F5F7) — dark mode by default, since aura/glow effects read best on dark.
- Aura gradient system (used across card, buttons, glows) — each rarity tier gets its own gradient family:
  - Common: soft gray-blue gradient
  - Uncommon: green-teal gradient
  - Rare: blue-violet gradient
  - Epic: magenta-purple gradient
  - Legendary: gold-orange gradient
  - Mythic: iridescent multi-hue (shifting gradient/holographic effect)
  - Secret: near-black with a single thin glowing line (intentionally understated, "so rare it barely announces itself")

### 2.6 Design Language
Premium, soft-glow, glassmorphic, dark-mode-first, generously spaced, restrained motion. Nothing childish, nothing corporate. Reference feeling: "Spotify Wrapped meets Linear meets Arc Browser."

---

## 3. LANDING PAGE

### 3.1 Hero
- Full-viewport dark hero with a slow-moving ambient gradient blob in the background (canvas/CSS animation, very subtle, never distracting).
- Headline: **"What's your internet aura?"**
- Subheadline: "Enter your Threads username. Get a beautiful, shareable aura card in seconds."
- Single input field styled like a search bar: `@username` placeholder, with the Threads glyph as a prefix icon.
- Primary CTA button: **"Reveal My Aura"** — glowing gradient button, scales slightly on hover.
- Below the fold-fade: a preview of 3 sample cards, gently rotated/staggered, as social proof of output quality (this is the single most important above-the-fold trust signal — people need to see the *result* before they trust the *input*).

### 3.2 Feature Section
Three or four short blocks, icon + 1-liner each:
- "AI-Powered" — a lightweight model reads your public vibe.
- "Instant" — no sign-up, no waiting, results in ~5 seconds.
- "Collectible" — rare titles, badges, and tiers.
- "Shareable" — one-tap download, perfect for Threads/IG/X.

### 3.3 "How It Works" Strip
3-step visual: Enter username → AI analyzes → Get your card. Simple icons, no jargon.

### 3.4 FAQ
- "Is this a real personality test?" → No — it's an entertainment experience powered by AI pattern-reading, not a validated psychological instrument.
- "Do you store my data?" → Only what's needed to generate and cache your card; no private data is accessed, only public profile signals.
- "Can I regenerate my card?" → Yes, anytime, but tier/title may shift.
- "Is my Threads account safe?" → Yes — no login required, we only read public info.

### 3.5 Footer (see Section 17 for full founder integration)

### 3.6 Microcopy Examples
- Input placeholder: "@yourusername"
- Button loading state: "Reading your aura…"
- Error state: "Hmm, we couldn't find that profile. Double check the username?"
- Empty/first-time state: "No aura yet. Let's fix that."

### 3.7 States
- **Loading**: full-screen takeover, not an inline spinner (see Section 4).
- **Error**: friendly, non-technical language, retry CTA, never a raw error code.
- **Empty**: encouraging, not blank — always show sample cards nearby so the page never feels dead.

---

## 4. USER EXPERIENCE & MICRO-INTERACTIONS

### 4.1 Input → Loading Transition
On submit, the input field morphs (shared-element transition) into a small pulsing orb that expands into a full-screen loading takeover. This avoids a jarring page-swap feeling.

### 4.2 Loading Animation ("Reading the Aura")
- Full-screen dark canvas with a slowly rotating gradient orb.
- Rotating status lines beneath it (each shown ~1.2s): "Reading recent posts…", "Measuring creative energy…", "Calculating chaos levels…", "Detecting main character energy…"
- Duration: 4–6 seconds even if the backend responds faster — perceived effort increases perceived value (classic "progress theater," used by TurboTax, Duolingo, etc.). Never longer than ~7s or users disengage.

### 4.3 Reveal Animation
- Screen dims, a burst of soft particle/glow animation plays behind the card.
- Card scales in from 0.85 → 1.0 with a soft spring easing, plus a brief light-sweep/shine effect across the card surface (like a foil card reveal).
- Rarity determines reveal intensity: Common = simple fade+scale; Legendary/Mythic/Secret = added particle bursts, subtle screen shake, or a "holographic" sheen sweep.
- Optional (if sound is enabled by the user): a soft chime scaling in pitch with rarity — must be opt-in/muted by default, with an explicit mute/unmute toggle, never autoplaying loud sound.

### 4.4 Hover / Interaction Details
- Card tilts subtly on mouse-move (parallax tilt, capped rotation ~6°) on desktop only.
- Buttons have a soft glow-grow on hover, not a hard color swap.
- Badges on the card gently pulse once when the card first loads, to draw the eye without being distracting afterward.

### 4.5 Confetti / Glow Rules
- Confetti only for Rare tier and above (using it for every result cheapens it).
- Legendary/Mythic get a longer glow trail and slower particle fall.
- Secret tier deliberately gets *no* confetti — its "reward" is minimalism and exclusivity, reinforcing scarcity through restraint rather than spectacle.

---

## 5. AI ANALYSIS SYSTEM

### 5.1 How It Should Work (Conceptually)
The system ingests public signals from a Threads profile (post cadence, tone, topics, posting time patterns, engagement style) and feeds a summarized version into an LLM prompt that scores a curated set of "aura metrics" on a 0–100 scale, then maps the top-scoring combination to a Title, a set of Badges, and a Rarity Tier. Because output must be consistent and fast, the LLM should be prompted with a **fixed JSON schema** (all metric names, badge pool, and title pool listed explicitly) so it selects/scores from a closed set rather than free-generating — this keeps results structured, cacheable, and safe from bizarre/off-brand outputs.

### 5.2 Metric Categories
Group the ~80 metrics below into families for internal organization and visual variety on the card ("show top 5 metrics per card, rotate which family is chosen for flavor"):

**Creativity & Expression**: Creative Energy, Idea Generator, Originality, Storytelling, Creative Confidence, Creative Flow, Innovation, Brainstorm Level, Dreamer Energy, Artistic Instinct

**Social & Community**: Conversation Starter, Community Builder, Friendly Energy, Supportive Energy, Reply Speed, Social Battery, Connector Energy, Kindness, Inclusive Energy, Hype Energy

**Mind & Thought**: Curiosity, Deep Thinking, Wisdom, Focus Level, Emotional Intelligence, Growth Mindset, Curious Mind, Analytical Mind, Pattern Spotter, Big Picture Thinking

**Humor & Chaos**: Humor, Chaos Energy, Randomness, Meme Knowledge, Wildcard Energy, Sarcasm Level, Unhinged-but-Wholesome, Plot Twist Energy

**Vibe & Energy**: Positivity, Optimism, Calm Energy, Wholesome Energy, Main Character Energy, Night Owl, Early Bird, Coffee Energy, Touch Grass Score, Digital Presence

**Consistency & Drive**: Consistency, Productivity, Builder Mindset, Discipline, Momentum, Follow-Through, Ambition Level

**Internet Culture**: Trend Hunter, Trend Resistance, Internet IQ, Scroll Resistance, Digital Aura, Internet Luck, Authenticity, Explorer Mindset, Culture Radar

*(Full list intentionally exceeds 70 named metrics across these seven families — new metrics can be added to any family without breaking the system, since the schema treats metrics as a data-driven list, not hardcoded fields.)*

### 5.3 Metric Data Structure
Each metric includes:
- `id`: unique key (e.g., `creative_energy`)
- `emoji`: single representative emoji
- `label`: display name
- `description`: one-line flavor text shown on tap/hover ("You turn scattered thoughts into things people want to read.")
- `scoring_logic`: what public signal it loosely maps to (e.g., posting frequency variance → Chaos Energy; reply-to-post ratio → Conversation Starter)
- `visualization`: bar, radial ring, or single glowing number — cards show a **max of 5 metrics** to avoid clutter, chosen based on the profile's top-scoring family.

### 5.4 Design Principle
Never show a "bad" score. All metrics should be framed positively (even "Chaos Energy" reads as fun, not negative) — this is critical to shareability. Nobody shares a card that makes them look bad.

---

## 6. AURA TITLES (Sample Set — Full Pool ≥100)

Each title has: name, one-line description, rarity, and "suited energy." Below is a representative sample across rarity tiers; the full production pool should extend this pattern to 100+ entries.

**Common** — The Quiet Creator, The Observer, The Everyday Optimist, The Steady Hand, The Familiar Face, The Reliable One, The Gentle Voice, The Casual Explorer, The Weekend Thinker, The Comfort Poster

**Uncommon** — The Connector, The Curious Mind, The Story Weaver, The Idea Sprinter, The Friendly Ghost, The Late Night Philosopher, The Trend Watcher, The Kind Rebel, The Soft Optimist, The Low-Key Legend

**Rare** — The Visionary, The Explorer, The Builder, The Spark, The Lighthouse, The Strategist, The Wildcard, The Momentum Maker, The Culture Curator, The Deep Diver

**Epic** — The Architect of Vibes, The Signal in the Noise, The Unbothered Genius, The Chaos Conductor, The Quiet Storm, The Trendsetter, The Main Character, The Night Owl Oracle

**Legendary** — The Digital Alchemist, The Aura Whisperer, The Internet's Favorite, The Timeless Original, The Gravity Well (people orbit their posts)

**Mythic** — The First Light, The Unfiltered One, The Origin Point

**Secret** — The Ghost in the Feed *(extremely rare, unlockable only through a specific rare combination of signals — see Section 9)*

---

## 7. AI INSIGHTS (Sample Set — Full Pool ≥100)

Short, emotional, screenshot-quality one-liners shown beneath the title or on the card back:

- "People don't remember how often you post. They remember how your posts make them feel."
- "The internet feels quieter when you're inactive."
- "You naturally attract thoughtful conversations."
- "Your best ideas show up at the worst hours."
- "You post like someone who has more to say than they let on."
- "You've never needed a trend to be interesting."
- "Somewhere, someone screenshotted your reply."
- "You make ordinary Tuesdays sound like plot points."
- "You're the reason a group chat has inside jokes."
- "Your quiet weeks are still doing more than most people's loud ones."

*(Production pool should include 100+ of these, tagged loosely to metric families so the system can select ones relevant to the user's top scores.)*

---

## 8. BADGES (Sample Set — Full Pool ≥100)

Each badge: name, emoji, unlock condition (flavor-level, not literal), rarity.

Night Owl 🌙 · Early Riser ☀️ · Conversation Starter 💬 · Idea Machine 💡 · Positive Vibes ✨ · Always Curious 🔍 · Community Builder 🤝 · Trend Spotter 📈 · Coffee Powered ☕ · Digital Explorer 🧭 · Creative Soul 🎨 · Chaos Agent 🌪️ · Wholesome Poster 🌱 · Deep Thinker 🧠 · Meme Historian 🖼️ · Quiet Storm ⚡ · Consistency King/Queen 📅 · Reply Guy(Gal) Supreme 💌 · Big Brain Energy 🧩 · Main Character 🎬

*(Full pool should extend to 100+, organized by the same families as metrics for consistency, so badge unlocks feel connected to the visible scores rather than random.)*

---

## 9. RARITY SYSTEM

### 9.1 Tiers (Common → Secret)
1. **Common** (~45% of results) — soft gray-blue, simple fade-in
2. **Uncommon** (~25%) — green-teal, gentle glow
3. **Rare** (~15%) — blue-violet, glow + confetti burst
4. **Epic** (~9%) — magenta-purple, glow + particle trail
5. **Legendary** (~4.5%) — gold-orange, full shine sweep + longer confetti
6. **Mythic** (~0.4%) — iridescent/shifting hue, holographic card texture
7. **Secret** (~0.1%) — minimal, no confetti, single glowing line — the "so rare it's quiet" tier

### 9.2 How Tiers Are Determined
Tier is a function of (a) how many high-scoring metrics (85+) a profile produces and (b) a small weighted randomness factor, so results feel earned but not 100% deterministic (encouraging regeneration). This should be tuned so tier feels *aspirational but attainable* — if Legendary is too easy, it loses meaning; too hard, and users disengage.

### 9.3 Visual & Animation Differences
- Border treatment escalates: flat border (Common) → soft glow border (Rare) → animated gradient border (Epic+) → holographic shifting border (Mythic).
- Reveal animation length and particle density scale with tier (see Section 4.5).
- Typography weight on the title increases slightly with tier for more "presence" at higher rarities.

---

## 10. CARD DESIGN

### 10.1 Layout (Front)
- Portrait orientation, optimized for **1080×1350** (Instagram/Threads-friendly) with a **1080×1920** story-safe variant.
- Top: small Threads Aura Card wordmark/logo (tiny, top-left or top-center) — establishes brand without competing with content.
- Center-upper: username + avatar (if available) in a soft glowing frame.
- Center: **Aura Title** in large display type, with rarity-colored glow behind it.
- Middle: top 5 metrics as radial rings or glowing bars, each with emoji + label + score.
- Lower-middle: 2–3 unlocked badges as small pill/chip elements.
- Bottom: one AI insight line (italic, smaller type) as an emotional closer.
- Very bottom: rarity tier label + subtle **"Created with Threads Aura Card"** signature (see Section 17.4).

### 10.2 Back of Card (Optional Second Image / Swipe)
- Full metric breakdown (all scored metrics, not just top 5).
- Full badge list.
- QR code or short link to generate your own.

### 10.3 Visual Treatment
- Glassmorphic card surface (subtle blur + translucency) sitting on the rarity gradient background.
- Consistent 24px+ internal padding rhythm, generous line-height, no cramped elements — this is the single biggest lever for "premium" feel.
- Card corner radius: soft (20–28px) to feel modern rather than sharp/corporate.

### 10.4 Responsive Behavior
- Desktop: card shown centered with soft ambient background, comfortably large.
- Mobile: card fills most of viewport width with safe margins; all text remains legible at native mobile screenshot resolution (this matters — most shares will be screenshots, not just the "Download" button).

### 10.5 Export Spec
- PNG export at true 1080×1350 (feed) and 1080×1920 (story), rendered server-side or via canvas so exported quality matches on-screen quality exactly (no visible re-compression or font-fallback mismatches).

---

## 11. SOCIAL SHARING

### 11.1 Actions Available
- **Download PNG** (primary action, big obvious button)
- **Copy Link** (to a public, permanent result page for that generation)
- **Share to Threads** (pre-filled intent with card image + short caption)
- Secondary share targets: X, Instagram (via download-then-post, since IG has no direct web intent), TikTok (download-then-post), Facebook, LinkedIn (link-only, more muted styling since LinkedIn audience differs)

### 11.2 Share Copy (Pre-filled, Editable)
Example auto-filled caption: "My internet aura: The Quiet Creator ✨ what's yours?" — short, casual, includes a soft CTA without sounding like an ad.

### 11.3 Open Graph Preview
When a result link is shared, the OG image should show:
- The full Threads Aura Card visual (title + top metric + rarity glow)
- Username
- Small footer line: "Built by Kuril Dev"
- OG title: "{username}'s Aura: {Title}"
- OG description: "Discover your internet aura at Threads Aura Card."

---

## 12. GAMIFICATION

- **Daily Aura**: an optional lightweight "today's energy" mini-reading, separate from the main card, to encourage repeat daily visits.
- **Seasonal Cards**: limited-time alternate color themes (e.g., a "2027 Wrapped" edition) tied to calendar moments.
- **Hidden/Secret Badges**: a small number of badges with no visible unlock hint, discovered organically and discussed in comments — this drives community theorizing, which is free marketing.
- **Achievements**: "Generated your aura 5 times," "Shared to Threads," etc. — lightweight, no account required initially, tracked via local storage or an optional saved-profile link.
- **Aura History**: if a user returns, show how their aura has shifted since last time ("Your Chaos Energy went up 12%") — this alone is a strong return-visit hook.
- **Friend Comparison**: compare two usernames' cards side-by-side — highly shareable as a "vs" format.
- **Streaks/Leaderboard**: optional V2 feature — most-generated titles this week, trending badges, etc.

---

## 13. FUTURE ROADMAP (V2+)

- **Aura Timeline** — a scrollable history of a user's aura over months.
- **Monthly Aura** — Wrapped-style recurring recap.
- **AI Roast Mode** — a cheekier, funnier alternate tone for users who opt in.
- **AI Compliment Mode** — an extra-wholesome alternate tone.
- **Profile Comparison / Friend Battle** — head-to-head aura comparison with a fun "winner" framing (kept lighthearted, never mean-spirited).
- **Relationship Aura** — combined aura for two linked accounts (e.g., "mutuals aura").
- **Community Ranking** — opt-in public leaderboard of top auras this week/month.
- **Creator Leaderboard** — spotlight for top creators by aura activity, doubling as discovery for the platform.
- **Aura Evolution** — visual "evolution path" showing how a title/tier can change with more activity, adding a light progression-game feel.

---

## 14. TECHNICAL ARCHITECTURE (Conceptual, No Code)

### 14.1 Frontend Architecture
- Single-page app, component-driven (React), with clear separation between: Landing/Input, Loading/Reveal experience, Card Display/Export, and Result sharing page (public, link-based, cacheable).
- Animation layer separated from data layer, so visual polish can be iterated without touching business logic.
- State management kept minimal (local component state + a lightweight global store for the "current result" object) — no need for heavy global state given the linear flow.

### 14.2 Backend Architecture
- A single API service exposing: (1) a "generate aura" endpoint that accepts a username, (2) a "get result" endpoint for shareable result pages, (3) an image-export endpoint that renders the final PNG server-side for consistent quality.
- Backend responsibilities: fetch public profile signals, summarize them into a compact prompt payload, call the AI model with the fixed schema described in Section 5.1, validate/sanitize the structured response, persist the result, return it to the client.

### 14.3 API Flow
1. Client submits username →
2. Backend checks cache (has this username been analyzed recently?) →
3. If cached and fresh, return instantly (feels "magical," also reduces cost) →
4. If not cached, fetch public signals → build AI prompt → call model → validate JSON response against schema → compute rarity → persist → return.

### 14.4 Database Design (Conceptual)
- `users_analyzed`: username, last_analyzed_at, cached_result_id
- `results`: id, username, title_id, rarity, metrics (JSON), badges (JSON), insight_id, created_at, share_slug (for public link)
- `metrics_catalog`, `titles_catalog`, `badges_catalog`, `insights_catalog`: static reference tables so content (titles/badges/insights/metrics) can be updated without redeploying logic.

### 14.5 Image Generation Flow
- Server-side rendering of the card (headless browser render or a canvas/SVG-to-PNG pipeline) ensures the downloaded PNG is pixel-identical to the on-screen card, including custom fonts and gradients — this avoids the common "exported image looks worse than the preview" failure mode.

### 14.6 Caching & Performance
- Cache generated results per username for a reasonable window (e.g., a day) to reduce AI cost and make repeat views instant.
- Pre-warm/cache the OG image per result so link shares render instantly in Threads/X/Discord previews.

### 14.7 Security & Privacy
- Only public profile data is read; no login/auth/password handling needed for the core flow, which removes an entire category of security risk.
- Rate-limit generation per IP to prevent abuse/scraping cost spikes.
- Clearly state in FAQ/footer that no private data is accessed and results are based on public signals only.

### 14.8 SEO
- Each shareable result page should be indexable (or at least OG-optimized) so shared links compound into discovery over time — every share is a mini-landing-page.
- Landing page should target searches like "threads aura," "threads personality card," "what's my threads vibe."

### 14.9 Accessibility
- Sufficient contrast between text and gradient backgrounds even at lower rarity tiers.
- All interactive elements keyboard-navigable; loading/reveal animations respect `prefers-reduced-motion`.

### 14.10 Scalability & Deployment
- Stateless API design so it can scale horizontally behind a queue if generation volume spikes (viral moments are the whole point of this product, so a traffic spike is success, not failure — architecture should assume it).
- Static assets/CDN for card templates and fonts to keep render times fast globally, including Indonesia-based traffic given the founder's home market.

---

## 15. VISUAL REFERENCES (Feeling, Not Copying)

- **Spotify Wrapped**: the feeling of "this was made just for me," bold typography-led reveals, confident use of color-per-mood.
- **Apple**: restraint, generous whitespace, typography doing most of the emotional work.
- **Notion**: soft, friendly, approachable minimalism — nothing feels intimidating.
- **Linear**: sharp attention to micro-interaction polish, dark-mode-first confidence.
- **Arc Browser**: playful gradients paired with genuinely premium execution — proof that "fun" and "premium" aren't opposites.
- **Stripe**: trust through craftsmanship — even a playful product should never feel flimsy or low-effort.
- **Raycast / Vercel**: dark, technical-feeling UI chrome that makes users feel like they're using something built by people who care about detail.

The unifying feeling across all of these: *quiet confidence*. Nothing shouts. Everything is considered.

---

## 16. FOUNDER & BRAND IDENTITY INTEGRATION

### 16.1 Principle
The product is the hero. Kuril Dev is present but never intrusive — visibility through craftsmanship, not through logos shouting for attention.

### 16.2 Footer (Site-wide)
Minimal, indie-feeling, not corporate:

> Built with ❤️ by **Kuril Dev**
> [kuril.dev](https://kuril.dev) · Follow [@heyitskuril](https://threads.com/@heyitskuril)

Styled small, muted color, centered or left-aligned depending on layout — never boxed in a heavy "footer bar" that feels like a template.

### 16.3 "About the Creator" Micro-Section
Placed just above the footer, a short, humble block:

> **Created by Kuril Dev**
> A solo developer building fun, useful, and shareable internet experiences.
> Portfolio → [kuril.dev](https://kuril.dev) · Social → [@heyitskuril](https://threads.com/@heyitskuril)

This should use the same restrained typography as the rest of the site — it should read like a signature, not a bio page.

### 16.4 Card Signature (Growth Loop)
On the card itself, bottom corner, small and elegant (not a watermark box, just quiet type):

> Created with **Threads Aura Card** · by Kuril Dev

This single line is the product's primary organic growth loop: every download and share re-exposes the creator's brand to a new audience, without ever looking like an ad.

### 16.5 Open Graph Footer
Every OG preview image includes a small "Built by Kuril Dev" line in the corner, consistent with the card signature, so link shares and direct downloads carry the same subtle branding.

### 16.6 Tone Guidance
Never use marketing language ("Kuril Dev — Full Stack Developer Available for Hire!"). Keep it personal and understated: "a solo developer building fun internet experiences" reads as authentic indie-hacker energy, which builds *more* long-term trust and portfolio credibility than an explicit pitch would.

---

## 17. FINAL PRODUCT SPECIFICATION SUMMARY

**Product**: Threads Aura Card — an AI-powered, no-login web app that converts a public Threads username into a downloadable, shareable "aura card" featuring a title, top metrics, badges, an AI-generated insight line, and a rarity tier.

**Core Flow**: Landing → Enter Username → Loading/Analysis Animation → Reveal Animation → Card Display → Download/Share → Optional Regenerate.

**Content Systems Required Before Build**: 
- Metrics catalog (~80 entries, structured per Section 5.3)
- Titles catalog (100+ entries, structured per Section 6)
- Insights catalog (100+ entries, per Section 7)
- Badges catalog (100+ entries, per Section 8)
- Rarity weighting logic (Section 9)

**Core Screens**: Landing Page, Loading/Reveal Experience, Card Result Page (shareable, public, OG-optimized), FAQ (can live on landing page).

**Non-Negotiable Design Principles**:
1. Every result must feel flattering — no negative-sounding scores.
2. The card must look identical on-screen and in exported PNG.
3. Rarity must feel earned, not random-only, and never gated behind payment (keep it free and viral-first).
4. Founder branding stays subtle everywhere it appears — the product, not the creator, is the star.
5. No login required for the core loop — friction is the enemy of virality.

This specification, combined with the catalogs in Sections 5–8 (extended to full production size) and the architecture in Section 14, is sufficient for an engineering team or AI build agent to implement Threads Aura Card end-to-end.
