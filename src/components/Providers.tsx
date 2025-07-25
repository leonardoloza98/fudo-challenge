'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StoreProvider } from '@/lib/store';
import { ReactNode } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: 1,
    },
  },
});

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>{children}</StoreProvider>
    </QueryClientProvider>
  );
}
