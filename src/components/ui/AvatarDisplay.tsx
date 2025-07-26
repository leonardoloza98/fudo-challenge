'use client';

import { generateAvatarUrl, type AvatarConfig } from '@/lib/avatars';
import { useState } from 'react';

interface AvatarDisplayProps {
  avatar: AvatarConfig;
  size?: number;
  className?: string;
}
const DEFAULT_AVATAR = '/placeholder.svg';
export function AvatarDisplay({
  avatar,
  size = 40,
  className = '',
}: AvatarDisplayProps) {
  const [imageError, setImageError] = useState(false);
  const avatarUrl = generateAvatarUrl(avatar, size);

  if (imageError) {
    const fallbackUrl = generateAvatarUrl(
      { style: 'initials', seed: avatar.seed },
      size
    );
    return (
      <img
        src={fallbackUrl || DEFAULT_AVATAR}
        alt="Avatar"
        className={`rounded-full ${className}`}
        style={{ width: size, height: size }}
        onError={() => setImageError(false)}
      />
    );
  }

  return (
    <img
      src={avatarUrl || DEFAULT_AVATAR}
      alt="Avatar"
      className={`rounded-full ${className}`}
      style={{ width: size, height: size }}
      onError={() => setImageError(true)}
    />
  );
}
