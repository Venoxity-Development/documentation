import {
  defineCollections,
  defineConfig,
  defineDocs,
  frontmatterSchema,
  metaSchema,
} from "fumadocs-mdx/config";
import { transformerTwoslash } from "fumadocs-twoslash";
import { createFileSystemTypesCache } from "fumadocs-twoslash/cache-fs";
import remarkMath from "remark-math";
import { fileGenerator, remarkDocGen, remarkInstall } from "fumadocs-docgen";
import { remarkTypeScriptToJavaScript } from "fumadocs-docgen/remark-ts2js";
import rehypeKatex from "rehype-katex";
import { z } from "zod";
import {
  rehypeCodeDefaultOptions,
  remarkSteps,
} from "fumadocs-core/mdx-plugins";
import { remarkAutoTypeTable } from "fumadocs-typescript";
import fs from "fs";

export const docs = defineDocs({
  docs: {
    schema: frontmatterSchema.extend({
      preview: z.string().optional(),
      index: z.boolean().default(false),
      /**
       * API routes only
       */
      method: z.string().optional(),
    }),
  },
  meta: {
    schema: metaSchema.extend({
      description: z.string().optional(),
    }),
  },
});

export default defineConfig({
  lastModifiedTime: "git",
  mdxOptions: {
    rehypeCodeOptions: {
      lazy: true,
      experimentalJSEngine: true,
      langs: ["ts", "js", "html", "tsx", "mdx"],
      inline: "tailing-curly-colon",
      themes: {
        light: "catppuccin-latte",
        dark: "catppuccin-mocha",
      },
      transformers: [
        ...(rehypeCodeDefaultOptions.transformers ?? []),
        transformerTwoslash({
          typesCache: createFileSystemTypesCache({
            dir: fs.existsSync("_next")
              ? "_next/static/twoslash"
              : ".next/static/twoslash",
          }),
        }),
        {
          name: "transformers:remove-notation-escape",
          code(hast) {
            for (const line of hast.children) {
              if (line.type !== "element") continue;

              const lastSpan = line.children.findLast(
                (v) => v.type === "element"
              );

              const head = lastSpan?.children[0];
              if (head?.type !== "text") return;

              head.value = head.value.replace(/\[\\!code/g, "[!code");
            }
          },
        },
      ],
    },
    remarkPlugins: [
      remarkSteps,
      remarkMath,
      remarkAutoTypeTable,
      [remarkInstall, { persist: { id: "package-manager" } }],
      [remarkDocGen, { generators: [fileGenerator()] }],
      remarkTypeScriptToJavaScript,
    ],
    rehypePlugins: (v) => [rehypeKatex, ...v],
  },
});
