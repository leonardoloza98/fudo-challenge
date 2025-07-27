'use client';

import { type AvatarId } from '@/lib/avatars';
import { AVATAR_COMPONENTS } from './AvatarComponents';

interface AvatarDisplayProps {
  avatarId: AvatarId;
  size?: number;
  className?: string;
}

export function AvatarDisplay({
  avatarId,
  size = 40,
  className = ''
}: AvatarDisplayProps) {
  const Component = AVATAR_COMPONENTS[avatarId];
  if (!Component) return null;

  return (
    <div 
      className={`flex items-center justify-center ${className}`}
      style={{ 
        width: size, 
        height: size,
        WebkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden',
        WebkitPerspective: 1000,
        perspective: 1000,
        WebkitTransform: 'translate3d(0,0,0)',
        transform: 'translate3d(0,0,0)'
      }}
    >
      <Component />
    </div>
  );
}
