import { useAppStore } from '@/lib/store';
import { AvatarDisplay } from './AvatarDisplay';
import { useRouter } from 'next/navigation';
import { LogOutIcon } from 'lucide-react';

export const Header = () => {
  const { currentUser, clearCurrentUser } = useAppStore();
  const router = useRouter();

  const handleLogout = () => {
    clearCurrentUser();
    router.replace('/');
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div className="flex items-center justify-end gap-4 p-4">
      <AvatarDisplay avatar={currentUser.avatar} size={40} />
      <span className="text-white font-medium">{currentUser.name}</span>
      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2"
      >
        <LogOutIcon className="w-4 h-4" />
        Salir
      </button>
    </div>
  );
};
