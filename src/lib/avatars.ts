export interface AvatarConfig {
    style: string
    seed: string
}

export function generateAvatarUrl(config: AvatarConfig, size = 100): string {
    const baseUrl = "https://api.dicebear.com/7.x"
    return `${baseUrl}/${config.style}/svg?seed=${encodeURIComponent(config.seed)}&size=${size}&backgroundColor=transparent`
}

export function getPresetAvatars(): AvatarConfig[] {
    return [
      { style: "avataaars", seed: "alex-smith" },
      { style: "avataaars", seed: "maria-garcia" },
      { style: "avataaars", seed: "john-doe" },
      { style: "avataaars", seed: "sarah-wilson" },
      { style: "avataaars", seed: "mike-johnson" },
      { style: "avataaars", seed: "emma-brown" },
      { style: "avataaars", seed: "david-lee" },
      { style: "avataaars", seed: "lisa-taylor" },
      { style: "avataaars", seed: "chris-martin" },
      { style: "avataaars", seed: "anna-davis" },
      { style: "avataaars", seed: "ryan-white" },
      { style: "avataaars", seed: "sofia-lopez" },
      { style: "avataaars", seed: "kevin-clark" },
      { style: "avataaars", seed: "maya-patel" },
      { style: "avataaars", seed: "lucas-kim" },
    ]
}
