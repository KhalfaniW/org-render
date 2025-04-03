import { render, screen, act } from "@testing-library/react";
// must use bun test
// @ts-ignore
import { test, expect } from "bun:test";
import { OrgFileViewer } from "../OrgFileViewer";

test("renders headlines correctly", async () => {
  const content = `* abcd
* Main Header
abc
** Sub Header`;
  await act(async () => {
    await render(<OrgFileViewer content={content} />);
  });

  expect(screen.getByText("Main Header")).toBeInTheDocument();
  expect(screen.getByText("Sub Header")).toBeInTheDocument();
});

test("renders paragraphs correctly", async () => {
  const content = `This is a paragraph.
Another paragraph here.`;
  await act(async () => {
    await render(<OrgFileViewer content={content} />);
  });

  expect(screen.getByText(/This is a paragraph/)).toBeInTheDocument();
  expect(screen.getByText(/Another paragraph here./)).toBeInTheDocument();
});

test("renders lists correctly", async () => {
  const content = `- First item
- Second item
- Third item`;
  await act(async () => {
    await render(<OrgFileViewer content={content} />);
  });

  expect(screen.getByText("First item")).toBeInTheDocument();
  expect(screen.getByText("Second item")).toBeInTheDocument();
  expect(screen.getByText("Third item")).toBeInTheDocument();
});

test("handles mixed content types", async () => {
  const content = `* Header
Some paragraph text.
- List item 1
- List item 2`;
  await act(async () => {
    await render(<OrgFileViewer content={content} />);
  });

  expect(screen.getByText("Header")).toBeInTheDocument();
  expect(screen.getByText("Some paragraph text.")).toBeInTheDocument();
  expect(screen.getByText("List item 1")).toBeInTheDocument();
  expect(screen.getByText("List item 2")).toBeInTheDocument();
});
