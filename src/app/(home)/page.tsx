import { BookIcon, type LucideIcon, RocketIcon } from 'lucide-react'
import type { LinkProps } from 'next/link'
import Link from 'next/link'
import type { ReactElement, ReactNode } from 'react'
import { cn } from '@/lib/cn'

export default function DocsPage(): ReactElement {
  return (
    <main className='container flex flex-col py-16'>
      <h1 className='font-semibold text-2xl md:text-3xl'>
        Welcome to the Starter Kit
      </h1>
      <p className='mt-1 text-fd-muted-foreground text-lg'>
        Get started with Fumadocs.
      </p>

      <div className='mt-8 grid grid-cols-1 gap-4 text-left md:grid-cols-2'>
        <DocumentationItem
          title='Documentation'
          description='Get started with the Fumadocs framework.'
          icon={{ icon: BookIcon, id: 'app' }}
          href='/docs/app'
        />

        <DocumentationItem
          title='API Reference'
          description="Get started with Fumadocs's API reference feature."
          icon={{ icon: RocketIcon, id: 'api-reference' }}
          href='/docs/api-reference'
        />
      </div>
    </main>
  )
}

function DocumentationItem({
  title,
  description,
  icon: { icon: ItemIcon, id },
  href,
}: {
  title: string
  description: string
  icon: {
    icon: LucideIcon
    id: string
  }
  href: string
}): ReactElement {
  return (
    <Item href={href}>
      <Icon className={id}>
        <ItemIcon className='size-full' />
      </Icon>
      <h2 className='mb-2 font-semibold text-lg'>{title}</h2>
      <p className='text-fd-muted-foreground text-sm'>{description}</p>
    </Item>
  )
}

function Icon({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}): ReactElement {
  return (
    <div
      className={cn(
        'mb-2 size-9 rounded-lg border p-1.5 shadow-fd-primary/30',
        className
      )}
      style={{
        boxShadow: 'inset 0px 8px 8px 0px var(--tw-shadow-color)',
      }}
    >
      {children}
    </div>
  )
}

function Item(
  props: LinkProps & { className?: string; children: ReactNode }
): ReactElement {
  const { className, children, ...rest } = props
  return (
    <Link
      {...rest}
      className={cn(
        'rounded-lg border border-border bg-fd-accent/30 p-6 shadow-xs transition-all hover:bg-fd-accent',
        className
      )}
    >
      {children}
    </Link>
  )
}
