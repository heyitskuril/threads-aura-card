export enum AuraTier {
  COMMON = 'Common',
  UNCOMMON = 'Uncommon',
  RARE = 'Rare',
  EPIC = 'Epic',
  LEGENDARY = 'Legendary',
  MYTHIC = 'Mythic',
  SECRET = 'Secret',
}

export interface AuraMetric {
  id: string;
  emoji: string;
  label: string;
  score: number;
  description: string;
}

export interface AuraTitle {
  name: string;
  description: string;
  tier: AuraTier;
}

export interface AuraBadge {
  name: string;
  emoji: string;
  description: string;
}

export interface ProfileData {
  displayName: string | null;
  bio: string | null;
  avatarUrl: string | null;
  source: 'cache' | 'api' | 'fallback' | 'unavailable';
}

export interface AuraCardData {
  username: string;
  title: AuraTitle;
  tier: AuraTier;
  metrics: AuraMetric[];
  badges: AuraBadge[];
  insight: string;
  generatedAt: string;
  profile?: ProfileData;
}

export interface RarityConfig {
  tier: AuraTier;
  label: string;
  odds: string;
  gradient: string;
  borderColor: string;
  glowColor: string;
  textColor: string;
  textGlow: string;
  confetti: boolean;
  intensity: 'low' | 'medium' | 'high' | 'ultra' | 'minimal';
}
