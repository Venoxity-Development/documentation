'use client'

import type { PageTree } from 'fumadocs-core/server'
import { useParams } from 'next/navigation'
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/**
 * Roots are the top-level directories that can be used to determine the mode
 */
export const ROOTS = ['changelog', 'api-reference']

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
  const { slug } = useParams()
  const root = Array.isArray(slug) && slug.length > 0 ? slug[0] : 'app'
  const page = tree.getPage(root)

  return page?.data._file.path.split('/').slice(0, -1).join('/') ?? 'app'
}
