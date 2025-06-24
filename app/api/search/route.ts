import { source } from '@/lib/source';
import { createSearchAPI } from 'fumadocs-core/search/server';

export const { GET } = createSearchAPI('advanced', {
  indexes: await Promise.all(
    source.getPages().map(async (page) => {
      const { structuredData } = await page.data.load();

      return {
        title: page.data.title,
        description: page.data.description,
        url: page.url,
        id: page.url,
        structuredData,
      };
    }),
  ),
});
