'use client';
import { RootProvider } from 'fumadocs-ui/provider';
import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';

// const SearchDialog = dynamic(() => import('@/components/search')); // lazy load

export function Providers({ children }: { children: ReactNode }) {
  return (
    <RootProvider
      // todo: uncomment for orama search
      // search={{
      //   SearchDialog,
      // }}
    >
      {children}
    </RootProvider>
  );
}
