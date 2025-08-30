'use client'

import type { PageTree } from 'fumadocs-core/server'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { findPage } from '@/lib/page-tree'

export function Body({
  children,
  tree,
}: {
  children: ReactNode
  tree: PageTree.Root
}) {
  const mode = useMode(tree)

  return (
    <body className={cn(mode, 'relative flex min-h-screen flex-col')}>
      {children}
    </body>
  )
}

export function useMode(tree: PageTree.Root): string {
  const pathname = usePathname()
  const page = findPage(tree, pathname)

  const id = page?.$id ?? '(index)'
  return id.split('/')[0] ?? '(index)'
}
