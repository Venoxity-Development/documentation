import { baseUrl, createMetadata } from '@/lib/metadata'
import '@/styles/globals.css'
import type { Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Body } from './layout.client'
import { Providers } from './providers'
import 'katex/dist/katex.css'
import { source } from '@/lib/source'

const inter = Inter({
  subsets: ['latin'],
})

export const metadata = createMetadata({
  title: {
    template: '%s | Venoxity Development',
    default: 'Venoxity Development',
  },
  description: 'The Next.js framework for building documentation sites',
  metadataBase: baseUrl,
})

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0A0A0A' },
    { media: '(prefers-color-scheme: light)', color: '#fff' },
  ],
}

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang='en'
      className={`${inter.className} dark`}
      suppressHydrationWarning
    >
      <Body tree={source.pageTree}>
        <Providers>{children}</Providers>
      </Body>
    </html>
  )
}
