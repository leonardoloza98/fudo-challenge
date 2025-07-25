'use client';

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import Cookies from 'js-cookie';

export type User = {
  id: string;
  name: string;
  avatar: { style: string; seed: string };
};

type Store = {
  currentUser: User | null;
  isLoading: boolean;
  setCurrentUser: (user: User) => void;
  clearCurrentUser: () => void;
};

const StoreContext = createContext<Store | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
  }, []);

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
