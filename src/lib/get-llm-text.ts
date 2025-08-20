import { remarkNpm } from 'fumadocs-core/mdx-plugins'
import { remarkInclude } from 'fumadocs-mdx/config'
import { remarkAutoTypeTable } from 'fumadocs-typescript'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkMdx from 'remark-mdx'
import { owner, repo } from '@/lib/github'
import type { Page } from '@/lib/source'

export const categoryMap: Record<string, string> = {
  ui: 'UI Framework',
  'api-reference': 'API Reference',
  changelog: 'Changelog',
}

const processor = remark()
  .use(remarkMdx)
  .use(remarkInclude)
  .use(remarkGfm)
  .use(remarkAutoTypeTable)
  .use(remarkNpm)

export async function getLLMText(page: Page) {
  const category = categoryMap[page.slugs[0]] ?? page.slugs[0]

  const processed = await processor.process({
    path: page.data._file.absolutePath,
    value: page.data.content,
  })
  const path = `content/docs/${page.path}`

  return `# ${category}: ${page.data.title}
URL: ${page.url}
Source: https://raw.githubusercontent.com/${owner}/${repo}/refs/heads/main/${path}

${page.data.description ?? ''}
        
${processed.value}`
}
