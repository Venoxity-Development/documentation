'use client'

import { useParams } from 'next/navigation'
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { tabs } from '@/lib/layout.shared'

export function Body({
  children,
}: {
  children: ReactNode
}): React.ReactElement {
  const mode = useMode()

  return (
    <body className={cn(mode, 'relative flex min-h-screen flex-col')}>
      {children}
    </body>
  )
}

function normalizePath(path: string): string {
  return path.replace(/^\/+|\/+$/g, '') // strips leading & trailing slashes
}

export function useMode(): string | undefined {
  const { slug } = useParams()

  if (!Array.isArray(slug) || slug.length === 0) return undefined

  const first = normalizePath(slug[0])
  const match = tabs.find((t) => normalizePath(t.url) === first)

  return match ? first : undefined
}
