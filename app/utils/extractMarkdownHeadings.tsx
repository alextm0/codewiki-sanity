// Create a boiler template that exports that function

import { slugify } from './helpers';

export function extractMarkdownHeadings(markdownContent: string) {
  const headingRegex = /^(#{1,6})\s+(.*)$/gm;
  const headings = [];
  let match;

  while ((match = headingRegex.exec(markdownContent)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const slug = slugify(text);
    headings.push({ level, text, slug });
  }

  return headings;
}