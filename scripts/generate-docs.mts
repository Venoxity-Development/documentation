import * as OpenAPI from 'fumadocs-openapi';
import { rimraf } from 'rimraf';

export async function generateDocs() {
  await rimraf('./content/docs/openapi', {
    filter(v) {
      return !v.endsWith('index.mdx') && !v.endsWith('meta.json');
    },
  });

  await Promise.all([
    OpenAPI.generateFiles({
      input: ['./openapi.yml'],
      output: './content/docs/openapi',
      per: 'operation',
      includeDescription: true,
      groupBy: 'tag',
    }),
  ]);
}
