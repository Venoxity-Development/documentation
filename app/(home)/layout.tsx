import { HomeLayout } from 'fumadocs-ui/layouts/home'
import type { ReactNode } from 'react'
import { baseOptions } from '@/app/layout.config'

export default function Layout({
  children
}: {
  children: ReactNode
}): React.ReactElement {
  return (
    <HomeLayout
      {...baseOptions}
      style={
        {
          '--spacing-fd-container': '1120px'
        } as object
      }
      className='dark:bg-neutral-950 dark:[--color-fd-background:var(--color-neutral-950)]'
    >
      {children}
      <Footer />
    </HomeLayout>
  )
}

function Footer(): React.ReactElement {
  return (
    <footer className='mt-auto border-t bg-fd-card p-4 text-fd-secondary-foreground'>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between'>
        <div>
          <p className='mb-1 font-semibold text-sm'>Docs</p>
          <p className='text-xs'>A starter-template for Fumadocs.</p>
        </div>
      </div>
    </footer>
  )
}
