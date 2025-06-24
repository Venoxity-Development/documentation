import { getPageTreePeers } from 'fumadocs-core/server'
import { APIPage } from 'fumadocs-openapi/ui'
import { createGenerator } from 'fumadocs-typescript'
import { AutoTypeTable } from 'fumadocs-typescript/ui'
import { Callout } from 'fumadocs-ui/components/callout'
import { Card, Cards } from 'fumadocs-ui/components/card'
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle
} from 'fumadocs-ui/page'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { ComponentProps, FC } from 'react'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from '@/components/ui/hover-card'
import { owner, repo } from '@/lib/github'
import { createMetadata } from '@/lib/metadata'
import { openapi, source } from '@/lib/source'
import { getMDXComponents } from '@/mdx-components'
import { LLMCopyButton, ViewOptions } from './page.client'

const generator = createGenerator()
export const revalidate = false

export default async function Page(props: {
  params: Promise<{ slug: string[] }>
}) {
  const params = await props.params
  const page = source.getPage(params.slug)
  if (!page) notFound()

  const path = `content/docs/${page.file.path}`

  const { body: Mdx, toc } = await page.data.load()

  return (
    <DocsPage
      toc={toc}
      full={page.data.full}
      tableOfContent={{
        style: 'clerk',
        single: false
      }}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription className='mb-2'>
        {page.data.description}
      </DocsDescription>
      <div className='flex flex-row items-center gap-2 border-b pb-6'>
        <LLMCopyButton slug={params.slug} />
        <ViewOptions
          markdownUrl={`${page.url}.mdx`}
          githubUrl={`https://github.com/${owner}/${repo}/blob/main/${path}`}
        />
      </div>
      <DocsBody>
        <Mdx
          components={getMDXComponents({
            a: ({ href, ...props }) => {
              const found = source.getPageByHref(href ?? '', {
                dir: page.file.dirname
              })

              if (!found) return <Link href={href} {...props} />

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
                  <HoverCardContent className='text-sm'>
                    <p className='font-medium'>{found.page.data.title}</p>
                    <p className='text-fd-muted-foreground'>
                      {found.page.data.description}
                    </p>
                  </HoverCardContent>
                </HoverCard>
              )
            },
            DocsCategory: ({ url }) => {
              return <DocsCategory url={url ?? page.url} />
            },
            AutoTypeTable: (props) => (
              <AutoTypeTable generator={generator} {...props} />
            ),
            blockquote: Callout as unknown as FC<ComponentProps<'blockquote'>>,
            APIPage: (props) => <APIPage {...openapi.getAPIPageProps(props)} />
          })}
        />
      </DocsBody>
    </DocsPage>
  )
}

function DocsCategory({ url }: { url: string }) {
  return (
    <Cards>
      {getPageTreePeers(source.pageTree, url).map((peer) => (
        <Card key={peer.url} title={peer.name} href={peer.url}>
          {peer.description}
        </Card>
      ))}
    </Cards>
  )
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata> {
  const { slug = [] } = await props.params
  const page = source.getPage(slug)
  if (!page) notFound()

  const description =
    page.data.description ?? 'The library for building documentation sites'

  const image = {
    url: ['/og', ...slug, 'image.png'].join('/'),
    width: 1200,
    height: 630
  }

  return createMetadata({
    title: page.data.title,
    description,
    openGraph: {
      url: `/docs/${page.slugs.join('/')}`,
      images: [image]
    },
    twitter: {
      images: [image]
    }
  })
}

export function generateStaticParams() {
  return source.generateParams()
}
