import { render, screen, act } from "@testing-library/react";
// must use bun test
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { test, expect } from "bun:test";
import { minify } from "html-minifier";
import { OrgFileViewer } from "../OrgFileViewer";

test("renders headlines correctly", async () => {
  const content = `* abcd
* Main Header
abc
** Sub Header

`;
  await act(async () => {
    await render(<OrgFileViewer content={content} />);
  });

  expect(document.body.outerHTML).toMatchInlineSnapshot(
    formatHTML(`
    <body>
      <div>
        <div class="section">
          <h1>abcd</h1>
        </div>
        <div class="section">
          <h1>Main Header</h1>
          <p>abc</p>
          <div class="section">
            <h2>Sub Header</h2>
          </div>
        </div>
      </div>
    </body>
  `)
  );
});

test("renders diffrent item types", async () => {
  const content = `
* Main Header
abc
** Sub Header

- First item
- Second item
- Third item

This is a paragraph.
      `;

  await act(async () => {
    await render(<OrgFileViewer content={content} />);
  });

  expect(screen.getByText("Main Header")).toBeInTheDocument();
  expect(screen.getByText("Sub Header")).toBeInTheDocument();
  expect(screen.getByText("First item")).toBeInTheDocument();
  expect(screen.getByText("Second item")).toBeInTheDocument();
  expect(screen.getByText("Third item")).toBeInTheDocument();
  expect(screen.getByText(/This is a paragraph/)).toBeInTheDocument();
});

test("renders begin_src blocks with jsx content", async () => {
  const content = `
* Code Example
#+begin_src fakeLanguage
function Welcome()...
#+end_src
`;

  await act(async () => {
    await render(<OrgFileViewer content={content} />);
  });
  expect(document.body.outerHTML).toMatchInlineSnapshot(
      formatHTML(
  `
    <body><div>
<div class="section"><h1>Code Example</h1>
<pre><code class="language-fakeLanguage">function Welcome()...</code></pre>
</div>
</div>
</body>
  `)); 
});

function formatHTML(html: string): string {
  return (
    `"` +
    minify(html, {
      collapseWhitespace: true,
      removeComments: true,
      removeEmptyAttributes: true,
      removeRedundantAttributes: true,
    }) +
    `"`
  );
}
