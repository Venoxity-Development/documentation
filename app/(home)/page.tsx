import { cn } from '@/lib/cn';
import { BookIcon, RocketIcon } from "lucide-react";
import type { LinkProps } from 'next/link';
import Link from 'next/link';

export default function DocsPage(): React.ReactElement {
  return (
    <main className="container flex flex-col py-16">
      <h1 className="text-2xl font-semibold md:text-3xl">
        Welcome to the Starter Kit
      </h1>
      <p className="text-fd-muted-foreground text-lg mt-1">
        Get started with Fumadocs.
      </p>
      <div className="mt-8 grid grid-cols-1 gap-4 text-left md:grid-cols-2">
        <Item href="/docs/ui">
          <Icon className="ui">
            <BookIcon className="size-full" />
          </Icon>
          <h2 className="mb-2 text-lg font-semibold">Documentation</h2>
          <p className="text-sm text-fd-muted-foreground">
            Get started with the Fumadocs framework.
          </p>
        </Item>

        <Item href="/docs/api-reference">
          <Icon className="api-reference">
            <RocketIcon className="size-full" />
          </Icon>
          <h2 className="mb-2 text-lg font-semibold">API Reference</h2>
          <p className="text-sm text-fd-muted-foreground">
            Learn how to use the OpenAPI. Get started with the API reference and
            the SDKs.
          </p>
        </Item>
      </div>
    </main>
  );
}

function Icon({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <div
      className={cn(
        'mb-2 size-9 rounded-lg border p-1.5 shadow-fd-primary/30',
        className,
      )}
      style={{
        boxShadow: 'inset 0px 8px 8px 0px var(--tw-shadow-color)',
      }}
    >
      {children}
    </div>
  );
}

function Item(
  props: LinkProps & { className?: string; children: React.ReactNode },
): React.ReactElement {
  return (
    <Link
      {...props}
      className={cn(
        'rounded-lg border border-border p-6 shadow-xs transition-all hover:bg-fd-accent  bg-fd-accent/30',
        props.className,
      )}
    >
      {props.children}
    </Link>
  );
}
