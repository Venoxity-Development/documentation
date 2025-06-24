import * as OpenAPI from 'fumadocs-openapi';
import { rimraf } from 'rimraf';

export async function generateDocs() {
  await rimraf('./content/docs/api-reference/(generated)', {
    filter(v) {
      return !v.endsWith('meta.json');
    },
  });

  await Promise.all([
    OpenAPI.generateFiles({
      input: ['./content/docs/api-reference/openapi.yml'],
      output: './content/docs/api-reference/(generated)',
      per: 'operation',
      includeDescription: true,
      groupBy: 'tag',
    }),
  ]);
}
