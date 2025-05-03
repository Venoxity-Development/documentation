import { baseUrl } from '@/lib/metadata';
import { source } from '@/lib/source';
import { getLLMSummary } from '@/lib/get-llm-text';

export const revalidate = false;

export async function GET() {
  const url = (p: string): string => new URL(p, baseUrl).toString();

  const scan = source
    .getPages()
    .filter((file) => file.slugs[0] !== 'api-reference')
    .filter((file) => file.slugs[0] !== 'openapi')
    .map(getLLMSummary);
  const scanned = await Promise.all(scan);

  let markdownOutput = '# Docs\n\n';

  const groupedItems = scanned.reduce((acc, item) => {
    const category = item.category || 'Uncategorized';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, typeof scanned>);

  Object.entries(groupedItems).forEach(([category, items]) => {
    markdownOutput += `## ${category}\n\n`;
    items.forEach(({ title, description, url: docUrl }) => {
      markdownOutput += `- [${title}](${url(docUrl)}): ${description}\n`;
    });
    markdownOutput += '\n';
  });

  return new Response(markdownOutput, {
    headers: { 'Content-Type': 'text/markdown' },
  });
}