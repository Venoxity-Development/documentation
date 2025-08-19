import * as Twoslash from 'fumadocs-twoslash/ui'
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion'
import { Callout } from 'fumadocs-ui/components/callout'
import { File, Files, Folder } from 'fumadocs-ui/components/files'
import {
  Tab,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from 'fumadocs-ui/components/tabs'
import { TypeTable } from 'fumadocs-ui/components/type-table'
import defaultMdxComponents from 'fumadocs-ui/mdx'
import * as icons from 'lucide-react'
import type { MDXComponents } from 'mdx/types'
import { Update, Updates } from '@/components/fumadocs/updates'
import { Mermaid } from '@/components/mdx/mermaid'

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...(icons as unknown as MDXComponents),
    ...defaultMdxComponents,
    ...Twoslash,
    File,
    Files,
    Folder,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
    Tab,
    Accordion,
    Accordions,
    Updates,
    Update,
    Mermaid,
    TypeTable,
    Callout,
    ...components,
  }
}
