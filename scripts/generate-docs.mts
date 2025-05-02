import * as OpenAPI from 'fumadocs-openapi';
import { rimraf } from 'rimraf';

export async function generateDocs() {
  await rimraf('./content/docs/api-reference', {
    filter(v) {
      return (
        !v.endsWith("index.mdx") &&
        !v.endsWith("openapi.json") &&
        !v.endsWith("openapi.yml") &&
        !v.endsWith("meta.json")
      );
    },
  });

  await Promise.all([
    OpenAPI.generateFiles({
      input: ["./content/docs/api-reference/openapi.yml"],
      output: "./content/docs/api-reference",
      per: "operation",
      includeDescription: true,
      groupBy: "tag",
    }),
  ]);
}
