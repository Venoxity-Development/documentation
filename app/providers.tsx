"use client";
import { RootProvider } from "fumadocs-ui/provider";
import type { ReactNode } from "react";
import { unstable_ViewTransition as ViewTransition } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ViewTransition>
      <RootProvider
        search={{
          options: {
            // footer: (
            //   <div className="flex gap-4 justify-between">
            //     <p className="text-xs">Didn't get the result you wanted?</p>
            //     <AISearchTrigger className="!px-0 !py-0 relative !right-0 !bottom-0 z-auto w-fit h-fit text-xs bg-transparent hover:text-fd-accent-foreground hover:bg-transparent text-primary">
            //       <MessageCircle className="size-4" />
            //       Ask AI
            //     </AISearchTrigger>
            //   </div>
            // ),
          },
        }}
      >
        {children}
      </RootProvider>
    </ViewTransition>
  );
}
