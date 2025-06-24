"use client";
import { RootProvider } from "fumadocs-ui/provider";
import type { ReactNode } from "react";
import { unstable_ViewTransition as ViewTransition } from 'react';
import SearchDialog from '@/components/search';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ViewTransition>
      <RootProvider
        search={{
          SearchDialog
        }}
      >
        {children}
      </RootProvider>
    </ViewTransition>
  );
}
