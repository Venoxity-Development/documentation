import { LargeSearchToggle } from 'fumadocs-ui/components/layout/search-toggle'
import { DocsLayout } from 'fumadocs-ui/layouts/notebook'
import { Sparkles } from 'lucide-react'
import { AISearchTrigger } from '@/components/fumadocs/ai'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/cn'
import { baseOptions, linkItems } from '@/lib/layout.shared'
import { source } from '@/lib/source'
import 'katex/dist/katex.min.css'
import DocsBackground from '@/components/docs-background'

export default function Layout({ children }: LayoutProps<'/docs'>) {
  const base = baseOptions()

  return (
    <DocsLayout
      {...base}
      tree={source.pageTree}
      sidebar={{ collapsible: false }}
      // tabMode='navbar'
      // just icon items
      links={linkItems.filter((item) => item.type === 'icon')}
      searchToggle={{
        components: {
          lg: (
            <div className='flex gap-1.5 max-md:hidden'>
              <LargeSearchToggle className='flex-1' />
              <AISearchTrigger
                aria-label='Ask AI'
                className={cn(
                  buttonVariants({
                    variant: 'outline',
                    size: 'icon',
                    className:
                      'bg-fd-secondary/50 text-fd-muted-foreground shadow-none dark:bg-fd-secondary/50',
                  })
                )}
              >
                <Sparkles className='size-4' />
              </AISearchTrigger>
            </div>
          ),
        },
      }}
      nav={{
        ...base.nav,
        mode: 'top',
        children: (
          <AISearchTrigger
            className={cn(
              buttonVariants({
                variant: 'secondary',
                size: 'sm',
                className:
                  '-translate-1/2 absolute top-1/2 left-1/2 gap-2 rounded-full bg-fd-secondary/50 text-fd-muted-foreground md:hidden dark:bg-fd-secondary/50',
              })
            )}
          >
            <Sparkles className='size-4.5 fill-current' />
            Ask AI
          </AISearchTrigger>
        ),
      }}
    >
      {children}
      <DocsBackground />
    </DocsLayout>
  )
}
