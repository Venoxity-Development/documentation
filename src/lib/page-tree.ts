// this code is adapted from: https://github.com/fuma-nama/fumadocs/blob/dev/packages/core/src/utils/page-tree.tsx

import type { PageTree } from 'fumadocs-core/server'

/**
 * Flatten tree to an array of page nodes
 */
export function flattenTree(nodes: PageTree.Node[]): PageTree.Item[] {
  const out: PageTree.Item[] = []

  for (const node of nodes) {
    if (node.type === 'folder') {
      if (node.index) out.push(node.index)
      out.push(...flattenTree(node.children))
    } else if (node.type === 'page') {
      out.push(node)
    }
  }

  return out
}

/**
 * Find a page by its URL
 */
export function findPage(
  tree: PageTree.Root,
  url: string,
  options?: {
    separateRoot?: boolean
  }
): PageTree.Item | undefined {
  const { separateRoot = true } = options ?? {}
  const roots = separateRoot ? getPageTreeRoots(tree) : [tree]
  if (tree.fallback) roots.push(tree.fallback)

  for (const root of roots) {
    const list = flattenTree(root.children)
    const page = list.find((item) => item.url === url)

    if (page) return page
  }

  return undefined
}

export function getPageTreeRoots(
  pageTree: PageTree.Root | PageTree.Folder
): (PageTree.Root | PageTree.Folder)[] {
  const result = pageTree.children.flatMap((child) => {
    if (child.type !== 'folder') return []
    const roots = getPageTreeRoots(child)

    if (child.root) roots.push(child)
    return roots
  })

  if (!('type' in pageTree)) result.push(pageTree)
  return result
}
