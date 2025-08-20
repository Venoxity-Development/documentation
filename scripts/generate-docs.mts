import * as OpenAPI from 'fumadocs-openapi'
import { rimraf } from 'rimraf'
import { openapi } from '@/lib/openapi'

export async function generateDocs() {
  await rimraf('./content/docs/api-reference/(generated)')

  await Promise.all([
    OpenAPI.generateFiles({
      input: openapi,
      output: './content/docs/api-reference/(generated)',
      per: 'operation',
      includeDescription: true,
      groupBy: 'tag',
    }),
  ])
}
