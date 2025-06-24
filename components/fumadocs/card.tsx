import Link from 'fumadocs-core/link';
import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/cn';

export function Cards(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn('@container grid grid-cols-2 gap-4', props.className)}
    >
      {props.children}
    </div>
  );
}

export type CardProps = Omit<HTMLAttributes<HTMLElement>, 'title'> & {
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;

  href?: string;
  external?: boolean;
};

export function Card({ icon, title, description, ...props }: CardProps) {
  const E = props.href ? Link : 'div';

  return (
    <E
      {...props}
      data-card
      className={cn(
        '@max-lg:col-span-full block rounded-lg border bg-fd-card p-4 text-fd-card-foreground shadow-md transition-colors',
        props.href && 'hover:bg-fd-accent/80',
        props.className,
      )}
    >
      {icon ? (
        <div className='not-prose mb-2 w-fit rounded-md border bg-fd-muted p-1.5 text-fd-muted-foreground [&_svg]:size-4'>
          {icon}
        </div>
      ) : null}
      <h3 className='not-prose mb-1 font-medium text-sm'>{title}</h3>
      {description ? (
        <p className='my-0 text-fd-muted-foreground text-sm'>{description}</p>
      ) : null}
      {props.children ? (
        <div className='prose-no-margin text-fd-muted-foreground text-sm'>
          {props.children}
        </div>
      ) : null}
    </E>
  );
}
