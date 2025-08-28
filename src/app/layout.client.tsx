'use client'

import { useParams } from 'next/navigation'
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export function Body({ children }: { children: ReactNode }) {
  const mode = useMode()

  return (
    <body className={cn(mode, 'relative flex min-h-screen flex-col')}>
      {children}
    </body>
  )
}

export function useMode(): 'app' | 'changelog' | undefined {
  const { slug } = useParams()

  if (Array.isArray(slug) && slug.length > 0) {
    return slug[0] === 'changelog' ? 'changelog' : 'app'
  }

  return undefined
}
