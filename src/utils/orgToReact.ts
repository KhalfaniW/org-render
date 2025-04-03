import { createElement, Fragment } from "react";
import * as jsxRuntime from "react/jsx-runtime";
import { unified } from "unified";
import reorgParse from "@orgajs/reorg-parse";
import reorgRehype from "@orgajs/reorg-rehype";
import rehypeReact from "rehype-react";
import { renderToString } from "react-dom/server";
import type { VFile } from "vfile";

type ProcessResult = VFile & { result: React.ReactElement };

export async function processOrgContent(
  content: string
): Promise<ProcessResult> {
  const processor = unified()
    .use(reorgParse)
    .use(reorgRehype)
    .use(rehypeReact, {
      Fragment,
      jsx: jsxRuntime.jsx,
      jsxs: jsxRuntime.jsxs,
      createElement,
      components: {
        // Custom component mappings can be added here
      },
    });

  return (await processor.process(content)) as ProcessResult;
}

export async function orgToHtml(content: string): Promise<string> {
  const result = await processOrgContent(content);
  return renderToString(result.result);
}
