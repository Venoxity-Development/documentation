import defaultMdxComponents from "fumadocs-ui/mdx";
import { File, Files, Folder } from "fumadocs-ui/components/files";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import type { MDXComponents } from "mdx/types";
import { Accordion, Accordions } from "fumadocs-ui/components/accordion";
import * as icons from "lucide-react";
import { Updates, Update } from "@/components/fumadocs/updates";

import { TypeTable } from "fumadocs-ui/components/type-table";
import * as Twoslash from "fumadocs-twoslash/ui";
import { Mermaid } from "@/components/mdx/mermaid";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...(icons as unknown as MDXComponents),
    ...defaultMdxComponents,
    ...Twoslash,
    File,
    Files,
    Folder,
    Tabs,
    Tab,
    Accordion,
    Accordions,
    Updates,
    Update,

    Mermaid,
    TypeTable,
    ...components,
  };
}
