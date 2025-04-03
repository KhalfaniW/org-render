// must use bun test
// @ts-expect-error - Bun test types are not available in the TypeScript environment
import { test, expect } from "bun:test";
import { orgToHtml } from "../../utils/orgToReact";

test("renders headlines correctly", async () => {
  const content = `* Main Header
abc
** Sub Header`;

  const htmlText = await orgToHtml(content);

  expect(htmlText.toString()).toContain("<h1>Main Header</h1>");
  expect(htmlText.toString()).toContain("<h2>Sub Header</h2>");
  expect(htmlText.toString()).toContain("<p>abc</p>");
});

test("handles bullet points correctly", async () => {
  const content = `* Main Header
- Item 1
- Item 2
    - Nested item`;

  const htmlText = await orgToHtml(content);

  expect(htmlText.toString()).toContain("<h1>Main Header</h1>");
  expect(htmlText.toString()).toContain("<ul>");
  expect(htmlText.toString()).toContain("<li>Item 1</li>");
  expect(htmlText.toString()).toContain("<li>Item 2</li>");
  expect(htmlText.toString()).toContain("<li>Nested item</li>");
});

test("handles empty content gracefully", async () => {
  const content = "";

  const htmlText = await orgToHtml(content);

  expect(htmlText.toString()).not.toBeNull();
});
