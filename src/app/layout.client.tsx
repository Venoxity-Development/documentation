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

export function flattenPages(root: PageTree.Root): PageTree.Item[] {
  const out: PageTree.Item[] = []

  function walk(node: PageTree.Node) {
    if ((node as PageTree.Item).type === 'page') {
      out.push(node as PageTree.Item)
      return
    }
    if ((node as PageTree.Folder).type === 'folder') {
      const folder = node as PageTree.Folder
      if (folder.index) out.push(folder.index)
      for (const child of folder.children) walk(child)
    }
  }

  for (const c of root.children) walk(c)
  return out
}

export function findPageBySlugs(
  root: PageTree.Root,
  slugs: string[]
): PageTree.Item | undefined {
  const pages = flattenPages(root)
  if (slugs.length === 0) {
    // prefer root index (commonly the site index page)
    return (
      pages.find(
        (p) => p.url === '/' || p.url.split('/').filter(Boolean).length === 0
      ) ?? pages[0]
    )
  }

  const target = slugs.join('/')
  return pages.find((p) => {
    const segs = p.url.split('/').filter(Boolean)
    return segs.slice(-slugs.length).join('/') === target
  })
}

export function useMode(tree: PageTree.Root): string {
  const { slug } = useParams()
  const root = Array.isArray(slug) && slug.length > 0 ? slug : []
  const page = findPageBySlugs(tree, root)

  const id = page?.$id ?? '(index)'
  return id.split('/')[0] ?? '(index)'
}
