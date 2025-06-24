'use client';
import { RootProvider } from 'fumadocs-ui/provider';
import type { ReactNode } from 'react';
import SearchDialog from '@/components/search';
import { TooltipProvider } from '@/components/ui/tooltip';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <RootProvider
      search={{
        SearchDialog,
      }}
    >
      <TooltipProvider>{children}</TooltipProvider>
    </RootProvider>
  );
}
