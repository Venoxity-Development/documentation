
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import { fileGenerator, remarkDocGen, remarkInstall } from 'fumadocs-docgen';
import remarkStringify from 'remark-stringify';
import remarkMdx from 'remark-mdx';
import { remarkAutoTypeTable } from 'fumadocs-typescript';
import { remarkInclude } from 'fumadocs-mdx/config';
import { type Page } from '@/lib/source';


const categoryMap: Record<string, string> = {
  ui: 'UI Framework',
  'api-reference': 'API Reference',
  'changelog': 'Changelog',
};

const processor = remark()
  .use(remarkMdx)
  .use(remarkInclude)
  .use(remarkGfm)
  .use(remarkAutoTypeTable)
  .use(remarkDocGen, { generators: [fileGenerator()] })
  .use(remarkInstall)
  .use(remarkStringify);

export async function getLLMText(page: Page) {
  const category =
  categoryMap[page.slugs[0]] ?? page.slugs[0];

  const processed = await processor.process({
    path: page.data._file.absolutePath,
    value: page.data.content,
  });

  return `# ${category}: ${page.data.title}
URL: ${page.url}
Source: https://raw.githubusercontent.com/fuma-nama/fumadocs/refs/heads/main/apps/docs/content/docs/${page.file.path}

${page.data.description}
        
${processed}`;
}

export async function getLLMSummary(page: Page) {
  const category =
    categoryMap[page.slugs[0]] ?? page.slugs[0];

  return {
    category,
    title: page.data.title,
    description: page.data.description,
    slugs: page.slugs,
    url: page.url,
  };
}
