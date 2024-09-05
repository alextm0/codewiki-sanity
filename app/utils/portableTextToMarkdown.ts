import { slugify } from "./helpers";
import { urlForImage } from "@/sanity/lib/image";

interface PortableTextChild {
  _type: string;
  text: string;
  marks?: string[];
}

interface PortableTextBlock {
  _key?: string;
  _type: string;
  style?: string;
  children?: PortableTextChild[];
  markDefs?: { _key: string; _type: string; href: string }[];
  level?: number;
  listItem?: string;
  content?: string;
  // Add fields for image block
  asset?: { _ref: string };
  alt?: string;
  items?: PortableTextBlock[]; // For nested unordered lists
  subItems?: PortableTextBlock[]; // Recursive sub-items
}

function processListItems(blocks: PortableTextBlock[]): string {
  let result = "";
  let currentLevel = 0;

  blocks.forEach((block) => {
    if (block.listItem) {
      const level = block.level || 1;
      const prefix = "  ".repeat(level - 1) + "- ";

      if (level > currentLevel) {
        result += "\n" + "  ".repeat(currentLevel) + "\n";
      } else if (level < currentLevel) {
        result += "\n";
      }

      currentLevel = level;

      const childrenText = block.children
        ? block.children.map((child) => child.text).join("")
        : "";
      result += `${prefix}${childrenText}\n`;
    }
  });

  return result;
}

export function portableTextToMarkdown(blocks: PortableTextBlock[]): string {
  let listBlocks: PortableTextBlock[] = [];
  let markdown = blocks
    .map((block) => {
      if (block.listItem) {
        // Collect list items in a separate array
        listBlocks.push(block);
        return "";
      }

      // Process collected list items and reset the array
      if (listBlocks.length > 0) {
        const listMarkdown = processListItems(listBlocks);
        listBlocks = [];
        return listMarkdown;
      }

      if (block._type === "note" || block._type === "info" || block._type === "warning") {
        const style = block.style;
        const content = block.content || "";
        return `!!! ${style ?? ""} "${(style?.charAt(0) ?? "").toUpperCase() + (style?.slice(1) ?? "")}"\n    ${content}`;
      }

      if (block._type === "image") {
        const imageUrl = block.asset?._ref ? urlForImage({ _ref: block.asset._ref }).url() : "";
        const altText = block.alt || "";
        return `![${altText}](${imageUrl})`;
      }

      if (block._type !== "block" || !block.children) {
        return "";
      }

      const children = block.children
        .map((child) => {
          const marks = child.marks ?? [];
          if (marks.length > 0) {
            const mark = block.markDefs?.find((def) => def._key === marks[0]);
            if (mark && mark._type === "link") {
              return `[${child.text}](${mark.href})`;
            }
            if (marks.includes("code")) {
              return `\`${child.text}\``;
            }
          }
          return child.text;
        })
        .join("");

      switch (block.style) {
        case "h1":
          return `# ${children}`;
        case "h2":
          const slug2 = slugify(children);
          return `## ${children} {#${slug2}}`;
        case "h3":
          const slug3 = slugify(children);
          return `### ${children} {#${slug3}}`;
        case "h4":
          const slug4 = slugify(children);
          return `#### ${children} {#${slug4}}`;
        case "h5":
          const slug5 = slugify(children);
          return `##### ${children} {#${slug5}}`;
        case "h6":
          const slug6 = slugify(children);
          return `###### ${children} {#${slug6}}`;
        case "blockquote":
          return `> ${children}`;
        case "normal":
        default:
          return children;
      }
    })
    .join("\n\n");

  // Process any remaining list items
  if (listBlocks.length > 0) {
    markdown += processListItems(listBlocks);
  }

  return markdown;
}
