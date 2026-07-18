/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AuraTier, AuraMetric, AuraTitle, AuraBadge, AuraCardData, RarityConfig } from '../types';

// 1. RARITY CONFIGURATIONS
export const RARITY_REGISTRY: Record<AuraTier, RarityConfig> = {
  [AuraTier.COMMON]: {
    tier: AuraTier.COMMON,
    label: 'Common',
    odds: '45%',
    gradient: 'from-slate-800 via-slate-900 to-zinc-900',
    borderColor: 'border-slate-700/60',
    glowColor: 'rgba(148, 163, 184, 0.15)',
    textColor: 'text-slate-300',
    textGlow: 'shadow-slate-500/10',
    confetti: false,
    intensity: 'low',
  },
  [AuraTier.UNCOMMON]: {
    tier: AuraTier.UNCOMMON,
    label: 'Uncommon',
    odds: '25%',
    gradient: 'from-emerald-950 via-zinc-900 to-stone-900',
    borderColor: 'border-emerald-500/30',
    glowColor: 'rgba(16, 185, 129, 0.18)',
    textColor: 'text-emerald-400',
    textGlow: 'shadow-emerald-500/20',
    confetti: false,
    intensity: 'medium',
  },
  [AuraTier.RARE]: {
    tier: AuraTier.RARE,
    label: 'Rare',
    odds: '15%',
    gradient: 'from-blue-950 via-slate-900 to-indigo-950',
    borderColor: 'border-blue-500/45',
    glowColor: 'rgba(59, 130, 246, 0.3)',
    textColor: 'text-blue-400',
    textGlow: 'shadow-blue-500/30',
    confetti: true,
    intensity: 'high',
  },
  [AuraTier.EPIC]: {
    tier: AuraTier.EPIC,
    label: 'Epic',
    odds: '9%',
    gradient: 'from-fuchsia-950 via-neutral-900 to-purple-950',
    borderColor: 'border-fuchsia-500/50',
    glowColor: 'rgba(217, 70, 239, 0.4)',
    textColor: 'text-fuchsia-400',
    textGlow: 'shadow-fuchsia-500/40',
    confetti: true,
    intensity: 'high',
  },
  [AuraTier.LEGENDARY]: {
    tier: AuraTier.LEGENDARY,
    label: 'Legendary',
    odds: '4.5%',
    gradient: 'from-amber-950 via-stone-900 to-orange-950',
    borderColor: 'border-amber-500/60',
    glowColor: 'rgba(245, 158, 11, 0.45)',
    textColor: 'text-amber-400',
    textGlow: 'shadow-amber-500/50',
    confetti: true,
    intensity: 'ultra',
  },
  [AuraTier.MYTHIC]: {
    tier: AuraTier.MYTHIC,
    label: 'Mythic',
    odds: '0.4%',
    gradient: 'from-indigo-900 via-purple-900 to-pink-900',
    borderColor: 'border-pink-400/75',
    glowColor: 'rgba(236, 72, 153, 0.6)',
    textColor: 'text-pink-300 animate-pulse',
    textGlow: 'shadow-pink-500/60',
    confetti: true,
    intensity: 'ultra',
  },
  [AuraTier.SECRET]: {
    tier: AuraTier.SECRET,
    label: 'Secret',
    odds: '0.1%',
    gradient: 'from-black via-zinc-950 to-neutral-950',
    borderColor: 'border-white/10',
    glowColor: 'rgba(255, 255, 255, 0.1)',
    textColor: 'text-white font-mono tracking-widest',
    textGlow: 'shadow-white/10',
    confetti: false,
    intensity: 'minimal',
  },
};

// 2. METRICS CATALOG
export const METRICS_CATALOG: Omit<AuraMetric, 'score'>[] = [
  // Creativity & Expression
  { id: 'creative_energy', emoji: '🎨', label: 'Creative Energy', description: 'Your imagination runs unchecked, painting threads with brilliant colors.' },
  { id: 'idea_generator', emoji: '💡', label: 'Idea Generator', description: 'A relentless generator of fresh angles and captivating concepts.' },
  { id: 'storytelling', emoji: '📖', label: 'Storytelling', description: 'You weave ordinary personal anecdotes into mini epic sagas.' },
  { id: 'originality', emoji: '🦄', label: 'Originality', description: 'No regurgitated thoughts here. You write from an authentic, unique core.' },

  // Social & Community
  { id: 'conversation_starter', emoji: '💬', label: 'Conversation Starter', description: 'Your threads possess a gravity that pulls people into replies.' },
  { id: 'community_builder', emoji: '🤝', label: 'Community Builder', description: 'You knit people together, fostering active micro-neighborhoods.' },
  { id: 'reply_speed', emoji: '⚡', label: 'Reply Speed', description: 'Like lightning. You respond with engaging banter before others can blink.' },
  { id: 'hype_energy', emoji: '🔥', label: 'Hype Energy', description: 'You uplift others, spreading encouragement and celebrating victories.' },

  // Mind & Thought
  { id: 'curiosity', emoji: '🔍', label: 'Curiosity', description: 'Always asking the interesting questions, peering beneath the surface.' },
  { id: 'deep_thinking', emoji: '🧠', label: 'Deep Thinking', description: 'Your reflections have weight. They invite pausing and scrolling slowly.' },
  { id: 'focus_level', emoji: '🎯', label: 'Focus Level', description: 'Your feed is beautifully cohesive, dedicated to your unique passions.' },
  { id: 'wisdom', emoji: '🦉', label: 'Wisdom', description: 'Quietly observant, dispensing timeless kernels of practical life insights.' },

  // Humor & Chaos
  { id: 'humor', emoji: '🎭', label: 'Humor Index', description: 'Slick comedy, perfect timing, or witty dry-humor comments.' },
  { id: 'chaos_energy', emoji: '🌪️', label: 'Chaos Energy', description: 'Wonderfully unpredictable. Nobody ever knows what your next post will be.' },
  { id: 'meme_knowledge', emoji: '🖼️', label: 'Meme IQ', description: 'A master of visual culture, matching any state with the perfect meme.' },
  { id: 'sarcasm_level', emoji: '😏', label: 'Sarcasm Level', description: 'Razor-sharp irony, kept lighthearted and brilliantly executed.' },

  // Vibe & Energy
  { id: 'positivity', emoji: '✨', label: 'Positivity', description: 'A source of bright light, warming up even the dark corners of the web.' },
  { id: 'calm_energy', emoji: '🍃', label: 'Calm Vibe', description: 'A serene sanctuary. Your posts bring a breath of calm air to the feed.' },
  { id: 'main_character', emoji: '🎬', label: 'Main Character Energy', description: 'You carry yourself with the effortless assurance of the center star.' },
  { id: 'early_bird', emoji: '☀️', label: 'Early Bird', description: 'Greeting the internet before the rooster even wakes up.' },
  { id: 'night_owl', emoji: '🌙', label: 'Night Owl Vibe', description: 'A guardian of the midnight hours, typing under starlight.' },

  // Consistency & Drive
  { id: 'consistency', emoji: '📅', label: 'Consistency', description: 'Unwavering regularity. A steady heartbeat on the timeline.' },
  { id: 'builder_mindset', emoji: '🛠️', label: 'Builder Mindset', description: 'Documenting real-world creation, progress, and coding loops.' },

  // Internet Culture
  { id: 'trend_hunter', emoji: '📈', label: 'Trend Spotter', description: 'Riding the wave of early culture moments before they go mainstream.' },
  { id: 'digital_presence', emoji: '🌐', label: 'Digital Aura', description: 'A comfortable, natural online weight that commands attention.' },
];

// 3. TITLES CATALOG
export const TITLES_CATALOG: AuraTitle[] = [
  // COMMON
  { name: 'The Quiet Creator', description: 'Crafting thoughtful pieces in silence, letting the work speak.', tier: AuraTier.COMMON },
  { name: 'The Everyday Optimist', description: 'Spreading warm, gentle light across the daily timeline.', tier: AuraTier.COMMON },
  { name: 'The Steady Observer', description: 'Sifting through the digital stream, absorbing wisdom daily.', tier: AuraTier.COMMON },
  { name: 'The Familiar Neighbor', description: 'A warm, dependable face everyone loves seeing in the replies.', tier: AuraTier.COMMON },
  { name: 'The Gentle Voice', description: 'Softly spoken, adding quiet comfort to a noisy world.', tier: AuraTier.COMMON },
  { name: 'The Weekend Thinker', description: 'Deliberate and reflective, showing up when the noise settles.', tier: AuraTier.COMMON },

  // UNCOMMON
  { name: 'The Idea Sprinter', description: 'Constantly launching fresh mental concepts onto the timeline.', tier: AuraTier.UNCOMMON },
  { name: 'The Friendly Ghost', description: 'Popping in with delightful insights, then vanishing gracefully.', tier: AuraTier.UNCOMMON },
  { name: 'The Late Night Philosopher', description: 'Drafting deep existential concepts while the world sleeps.', tier: AuraTier.UNCOMMON },
  { name: 'The Curious Mind', description: 'Inquisitive and engaging, asking the questions others overlook.', tier: AuraTier.UNCOMMON },
  { name: 'The Low-Key Legend', description: 'Quietly holding some of the best replies on the internet.', tier: AuraTier.UNCOMMON },
  { name: 'The Story Weaver', description: 'Turning everyday interactions into absolute page-turners.', tier: AuraTier.UNCOMMON },

  // RARE
  { name: 'The Cultural Curator', description: 'Stylishly filtering the internet, showcasing absolute gems.', tier: AuraTier.RARE },
  { name: 'The Spark Generator', description: 'Igniting active, inspiring debates with a single sentence.', tier: AuraTier.RARE },
  { name: 'The Digital Explorer', description: 'Mapping new subcultures and sharing uncharted perspectives.', tier: AuraTier.RARE },
  { name: 'The Momentum Maker', description: 'Moving with focus, driving projects and writing along the way.', tier: AuraTier.RARE },
  { name: 'The Timeline Lighthouse', description: 'Guiding drifting scrolls back to safe, wholesome shores.', tier: AuraTier.RARE },

  // EPIC
  { name: 'The Architect of Vibes', description: 'Masterfully designing aesthetic trends and atmospheric posts.', tier: AuraTier.EPIC },
  { name: 'The Signal in the Noise', description: 'A crystal clear, highly valued anchor of truth and insight.', tier: AuraTier.EPIC },
  { name: 'The Chaos Conductor', description: 'Orchestrating brilliant, hilarious internet moments.', tier: AuraTier.EPIC },
  { name: 'The Unbothered Genius', description: 'A highly polished mind, entirely free from feed distraction.', tier: AuraTier.EPIC },

  // LEGENDARY
  { name: 'The Digital Alchemist', description: 'Turning simple text posts into gold-standard conversations.', tier: AuraTier.LEGENDARY },
  { name: 'The Aura Whisperer', description: 'Possessing a rare, deeply magnetic presence felt by all.', tier: AuraTier.LEGENDARY },
  { name: 'The Gravity Well', description: 'An account around which the entire community naturally orbits.', tier: AuraTier.LEGENDARY },

  // MYTHIC
  { name: 'The First Light', description: 'A rare, pure source of creative genesis on the platform.', tier: AuraTier.MYTHIC },
  { name: 'The Unfiltered Original', description: 'Undiluted authenticity, standing completely in their own lane.', tier: AuraTier.MYTHIC },

  // SECRET
  { name: 'The Ghost in the Feed', description: 'An elusive enigma, felt everywhere but captured by none.', tier: AuraTier.SECRET },
];

// 4. BADGES CATALOG
export const BADGES_CATALOG: AuraBadge[] = [
  { name: 'Night Owl', emoji: '🌙', description: 'Active during the magical, silent midnight hours.' },
  { name: 'Early Riser', emoji: '☀️', description: 'Welcomes the digital world with first light.' },
  { name: 'Conversation Starter', emoji: '💬', description: 'Known for turning quiet posts into massive reply chains.' },
  { name: 'Idea Machine', emoji: '💡', description: 'Consistently overflowing with creative sparks.' },
  { name: 'Positive Vibes', emoji: '✨', description: 'Exudes bright, glowing, supportive energy.' },
  { name: 'Always Curious', emoji: '🔍', description: 'Loves asking the deep, unexplored questions.' },
  { name: 'Community Pillar', emoji: '🤝', description: 'Fosters real connection and supports peers.' },
  { name: 'Trend Spotter', emoji: '📈', description: 'Detects viral memes and topics before they peak.' },
  { name: 'Coffee Powered', emoji: '☕', description: 'Fueling witty remarks with high caffeine levels.' },
  { name: 'Digital Explorer', emoji: '🧭', description: 'Explores diverse niches and shares strange findings.' },
  { name: 'Creative Soul', emoji: '🎨', description: 'Brings aesthetic visual or literary care to the feed.' },
  { name: 'Chaos Agent', emoji: '🌪️', description: 'Unpredictable, playful, and beautifully wild.' },
  { name: 'Wholesome Poster', emoji: '🌱', description: 'Gentle, kindhearted, and universally loved.' },
  { name: 'Deep Thinker', emoji: '🧠', description: 'Contemplative posts that demand real thought.' },
  { name: 'Meme Historian', emoji: '🖼️', description: 'Understands internet lore on a historical level.' },
  { name: 'Quiet Storm', emoji: '⚡', description: 'Subtle presence, but immensely impactful posts.' },
  { name: 'Consistency Master', emoji: '📅', description: 'Unshakable, daily rhythm on the timeline.' },
  { name: 'Reply Champ', emoji: '💌', description: 'A master of the art of the perfect reaction.' },
  { name: 'Main Character', emoji: '🎬', description: 'Commanding attention with effortless charisma.' },
];

// 5. INSIGHTS CATALOG
export const INSIGHTS_CATALOG: string[] = [
  'People don\'t remember how often you post. They remember how your posts make them feel.',
  'The internet feels quieter and more thoughtful when you\'re inactive.',
  'You naturally attract brilliant, curious minds into your comment sections.',
  'Your best ideas show up at the worst hours, usually in draft form.',
  'You post like someone who has much more to say than they let on.',
  'You\'ve never needed a trend to be interesting; your perspective is the anchor.',
  'Somewhere on this app, someone has silently screenshotted your reply.',
  'You make ordinary Tuesdays sound like absolute plot points.',
  'You\'re the quiet reason a group chat has beautiful inside jokes.',
  'Your quiet weeks are still doing more cultural work than most people\'s loud ones.',
  'You don\'t compete for the spotlight; your natural gravity pulls people in anyway.',
  'Your timeline is a serene gallery of digital thoughts, carefully curated.',
  'Your feed is a masterclass in elegant, low-noise digital presence.',
  'A single sentence from you carries more weight than a ten-part thread.',
  'You hold a mirror to the internet, reflecting back its best and funniest traits.',
];

// Helper function to create a pseudo-random generator seeded by a string
function createSeededRandom(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0;
  }
  return function () {
    const x = Math.sin(h++) * 10000;
    return x - Math.floor(x);
  };
}

// 6. MAIN CARD GENERATION FUNCTION
export function generateAuraCard(rawUsername: string, forceReRollSeed?: string): AuraCardData {
  const username = rawUsername.trim().replace(/^@/, '');
  
  // Use a combination of the username and an optional re-roll seed to generate a deterministic random
  const seedString = `${username.toLowerCase()}_${forceReRollSeed || 'primary_v1'}`;
  const rand = createSeededRandom(seedString);

  // 1. Determine Rarity Tier first
  // Common (45%), Uncommon (25%), Rare (15%), Epic (9%), Legendary (4.5%), Mythic (0.4%), Secret (0.1%)
  const roll = rand() * 100;
  let tier: AuraTier = AuraTier.COMMON;
  
  if (roll < 0.1) {
    tier = AuraTier.SECRET;
  } else if (roll < 0.5) {
    tier = AuraTier.MYTHIC;
  } else if (roll < 5.0) {
    tier = AuraTier.LEGENDARY;
  } else if (roll < 14.0) {
    tier = AuraTier.EPIC;
  } else if (roll < 29.0) {
    tier = AuraTier.RARE;
  } else if (roll < 54.0) {
    tier = AuraTier.UNCOMMON;
  } else {
    tier = AuraTier.COMMON;
  }

  // 2. Select Title matching the rarity tier
  const matchingTitles = TITLES_CATALOG.filter((t) => t.tier === tier);
  // Fallback in case no titles found
  const titleList = matchingTitles.length > 0 ? matchingTitles : TITLES_CATALOG.filter((t) => t.tier === AuraTier.COMMON);
  const titleIdx = Math.floor(rand() * titleList.length);
  const title = titleList[titleIdx];

  // 3. Select 5 metrics randomly, and assign randomized but weighted scores
  // Base scores are higher for rare/epic/legendary tiers to match the "identity performance" feel
  let baseMin = 50;
  let baseMax = 88;
  if (tier === AuraTier.RARE) { baseMin = 75; baseMax = 94; }
  else if (tier === AuraTier.EPIC) { baseMin = 82; baseMax = 97; }
  else if (tier === AuraTier.LEGENDARY) { baseMin = 88; baseMax = 99; }
  else if (tier === AuraTier.MYTHIC) { baseMin = 94; baseMax = 100; }
  else if (tier === AuraTier.SECRET) { baseMin = 98; baseMax = 100; }

  // Shuffle metrics catalog
  const metricsPool = [...METRICS_CATALOG];
  const selectedMetrics: AuraMetric[] = [];
  
  for (let i = 0; i < 5; i++) {
    const idx = Math.floor(rand() * metricsPool.length);
    const item = metricsPool.splice(idx, 1)[0];
    
    // Calculate score
    const scoreRange = baseMax - baseMin;
    const score = Math.floor(baseMin + rand() * scoreRange);
    
    selectedMetrics.push({
      id: item.id,
      emoji: item.emoji,
      label: item.label,
      description: item.description,
      score: score,
    });
  }

  // Sort selected metrics descending by score
  selectedMetrics.sort((a, b) => b.score - a.score);

  // 4. Select 2-3 Badges
  const badgesPool = [...BADGES_CATALOG];
  const selectedBadges: AuraBadge[] = [];
  const badgeCount = Math.floor(rand() * 2) + 2; // 2 or 3 badges

  for (let i = 0; i < badgeCount; i++) {
    const idx = Math.floor(rand() * badgesPool.length);
    const badge = badgesPool.splice(idx, 1)[0];
    selectedBadges.push(badge);
  }

  // 5. Select 1 Insight
  const insightIdx = Math.floor(rand() * INSIGHTS_CATALOG.length);
  const insight = INSIGHTS_CATALOG[insightIdx];

  return {
    username: `@${username}`,
    title: title,
    tier: tier,
    metrics: selectedMetrics,
    badges: selectedBadges,
    insight: insight,
    generatedAt: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
  };
}
