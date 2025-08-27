import type { LucideIcon } from 'lucide-react'
import type { LinkProps } from 'next/link'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import type { ReactElement, ReactNode } from 'react'
import { cn } from '@/lib/cn'

export default function DocsPage() {
  redirect('/app')
  return 'Loading...'
}

function _DocumentationItem({
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
