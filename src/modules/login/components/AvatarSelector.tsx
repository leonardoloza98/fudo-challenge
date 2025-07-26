import { getPresetAvatars, type AvatarId } from '@/lib/avatars';
import { AvatarDisplay } from '@/components/ui/AvatarDisplay';

interface AvatarSelectorProps {
  selectedAvatar: AvatarId;
  onSelect: (avatar: AvatarId) => void;
}

export function AvatarSelector({
  selectedAvatar,
  onSelect,
}: AvatarSelectorProps) {
  const avatars = getPresetAvatars();

  return (
    <div className="grid grid-cols-5 gap-4 w-full">
      {avatars.map(avatar => (
        <button
          key={avatar.id}
          type="button"
          onClick={() => onSelect(avatar.id)}
          className={`rounded-lg p-2 transition-all flex items-center justify-center ${
            selectedAvatar === avatar.id
              ? 'bg-gray-700 ring-2 ring-blue-500'
              : 'hover:bg-gray-700/50'
          }`}
        >
          <AvatarDisplay
            avatarId={avatar.id}
            size={48}
          />
        </button>
      ))}
    </div>
  );
}
