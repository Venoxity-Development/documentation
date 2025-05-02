import { source, openapi } from '@/lib/source';
import {
  DocsPage,
  DocsBody,
  DocsDescription,
  DocsTitle,
} from 'fumadocs-ui/page';
import { APIPage } from 'fumadocs-openapi/ui';
import { notFound } from 'next/navigation';
import { createMetadata } from '@/lib/metadata';
import { getMDXComponents } from "@/mdx-components";
import { Callout } from "fumadocs-ui/components/callout";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Link from 'next/link';
import { AutoTypeTable } from "fumadocs-typescript/ui";
import {
  type ComponentProps,
  type FC,
  type ReactElement,
  type ReactNode,
} from "react";
import { createGenerator } from 'fumadocs-typescript';
import type { Metadata } from 'next';
import { owner, repo } from '@/lib/github';
import { EditOnGitHub, LLMCopyButton } from '../[...slug]/page.client';

const generator = createGenerator();
export const revalidate = false;

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const path = `content/docs/${page.file.path}`;

  const { body: Mdx, toc } = await page.data.load();

  return (
    <DocsPage
      toc={toc}
      full={page.data.full}
      tableOfContent={{
        style: "clerk",
        single: false,
      }}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription className="mb-2">
        {page.data.description}
      </DocsDescription>
      <div className="flex flex-row gap-2 items-center">
        <LLMCopyButton />
        <EditOnGitHub
          url={`https://github.com/${owner}/${repo}/blob/dev/${path}`}
        />
      </div>
      <DocsBody>
        <Mdx
          components={getMDXComponents({
            a: ({ href, ...props }) => {
              const found = source.getPageByHref(href ?? "", {
                dir: page.file.dirname,
              });

              if (!found) return <Link href={href} {...props} />;

              return (
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Link
                      href={
                        found.hash
                          ? `${found.page.url}#${found.hash}`
                          : found.page.url
                      }
                      {...props}
                    />
                  </HoverCardTrigger>
                  <HoverCardContent className="text-sm">
                    <p className="font-medium">{found.page.data.title}</p>
                    <p className="text-fd-muted-foreground">
                      {found.page.data.description}
                    </p>
                  </HoverCardContent>
                </HoverCard>
              );
            },
            AutoTypeTable: (props) => (
              <AutoTypeTable generator={generator} {...props} />
            ),
            blockquote: Callout as unknown as FC<ComponentProps<"blockquote">>,
            APIPage: (props) => <APIPage {...openapi.getAPIPageProps(props)} />
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}


export async function generateMetadata(props: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug = [] } = await props.params;
  const page = source.getPage(slug);
  if (!page) notFound();

  const description =
    page.data.description ?? 'The library for building documentation sites';

  const image = {
    url: ['/og', ...slug, 'image.png'].join('/'),
    width: 1200,
    height: 630,
  };

  return createMetadata({
    title: page.data.title,
    description,
    openGraph: {
      url: `/docs/${page.slugs.join('/')}`,
      images: [image],
    },
    twitter: {
      images: [image],
    },
  });
}

export function generateStaticParams() {
  return source.generateParams();
}