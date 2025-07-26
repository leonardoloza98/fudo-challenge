export const AVATAR_IDS = [
  'cool-dev',
  'happy-designer',
  'creative-artist',
  'tech-lead',
  'product-manager',
  'qa-engineer',
  'devops-ninja',
  'frontend-wizard',
  'backend-guru',
  'mobile-ninja',
] as const;

export type AvatarId = typeof AVATAR_IDS[number];

export interface AvatarConfig {
  id: AvatarId;
}

export function getPresetAvatars(): AvatarConfig[] {
  return AVATAR_IDS.map(id => ({ id }));
}
