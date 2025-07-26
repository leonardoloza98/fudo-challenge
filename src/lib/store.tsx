'use client';

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import Cookies from 'js-cookie';
import { type AvatarId } from './avatars';

export type User = {
  id: string;
  name: string;
  avatar: AvatarId;
};

type Store = {
  currentUser: User | null;
  isLoading: boolean;
  setCurrentUser: (user: User) => void;
  clearCurrentUser: () => void;
};

const StoreContext = createContext<Store | undefined>(undefined);

interface StoreProviderProps {
  children: ReactNode;
  initialUser?: User;
}

export function StoreProvider({ children, initialUser }: StoreProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(initialUser || null);
  const [isLoading, setIsLoading] = useState(!initialUser);

  useEffect(() => {
    if (!initialUser) {
      const cookieUser = Cookies.get('user');
      if (cookieUser) {
        try {
          const user = JSON.parse(cookieUser);
          setCurrentUser(user);
        } catch (error) {
          console.error('Error parsing user cookie:', error);
          Cookies.remove('user');
        }
      }
      setIsLoading(false);
    }
  }, [initialUser]);

  const setCurrentUserWithCookie = (user: User) => {
    Cookies.set('user', JSON.stringify(user), { expires: 7 });
    setCurrentUser(user);
  };

  const clearCurrentUser = () => {
    Cookies.remove('user');
    setCurrentUser(null);
  };

  return (
    <StoreContext.Provider
      value={{
        currentUser,
        isLoading,
        setCurrentUser: setCurrentUserWithCookie,
        clearCurrentUser,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useAppStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useAppStore must be used within StoreProvider');
  return ctx;
}
