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
        transform: 'translateZ(0)',
        WebkitTransform: 'translateZ(0)'
      }}
    >
      <Component />
    </div>
  );
}
