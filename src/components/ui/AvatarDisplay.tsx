'use client';

import { type AvatarId } from '@/lib/avatars';
import CoolDevAvatar from './avatars/CoolDevAvatar';
import HappyDesignerAvatar from './avatars/HappyDesignerAvatar';
import CreativeArtistAvatar from './avatars/CreativeArtistAvatar';
import TechLeadAvatar from './avatars/TechLeadAvatar';
import ProductManagerAvatar from './avatars/ProductManagerAvatar';
import QaEngineerAvatar from './avatars/QaEngineerAvatar';
import DevopsNinjaAvatar from './avatars/DevopsNinjaAvatar';
import FrontendWizardAvatar from './avatars/FrontendWizardAvatar';
import BackendGuruAvatar from './avatars/BackendGuruAvatar';
import MobileNinjaAvatar from './avatars/MobileNinjaAvatar';

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
  const getAvatarComponent = () => {
    switch (avatarId) {
      case 'cool-dev':
        return <CoolDevAvatar width={size} height={size} />;
      case 'happy-designer':
        return <HappyDesignerAvatar width={size} height={size} />;
      case 'creative-artist':
        return <CreativeArtistAvatar width={size} height={size} />;
      case 'tech-lead':
        return <TechLeadAvatar width={size} height={size} />;
      case 'product-manager':
        return <ProductManagerAvatar width={size} height={size} />;
      case 'qa-engineer':
        return <QaEngineerAvatar width={size} height={size} />;
      case 'devops-ninja':
        return <DevopsNinjaAvatar width={size} height={size} />;
      case 'frontend-wizard':
        return <FrontendWizardAvatar width={size} height={size} />;
      case 'backend-guru':
        return <BackendGuruAvatar width={size} height={size} />;
      case 'mobile-ninja':
        return <MobileNinjaAvatar width={size} height={size} />;
      default:
        return null;
    }
  };

  const avatarComponent = getAvatarComponent();
  if (!avatarComponent) return null;

  return (
    <div 
      className={`flex items-center justify-center overflow-hidden ${className}`}
      style={{ 
        width: size, 
        height: size
      }}
    >
      {avatarComponent}
    </div>
  );
}
