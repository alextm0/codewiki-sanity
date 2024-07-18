import { slugify } from "./helpers";
import { urlForImage } from "@/sanity/lib/image";

interface PortableTextChild {
  _type: string;
  text: string;
  marks?: string[];
}

interface PortableTextBlock {
  _type: string;
  style?: string; // Make style optional since custom blocks like resourcesTable won't have it
  children?: PortableTextChild[]; // Make children optional for custom blocks
  markDefs?: { _key: string; _type: string; href: string }[];
  header?: string; // Add header field for resourcesTable
  resource?: {
    source: string;
    title: string;
    link: string;
    description: string;
  }[]; // Add resource field for resourcesTable

  // Add fields for image block
  asset?: { _ref: string };
  alt?: string;
}

export function portableTextToMarkdown(blocks: PortableTextBlock[]): string {
  return blocks && blocks.map((block) => {
      if (block._type === "resourcesTable") {
        const header = block.header;
        const resources = JSON.stringify(block.resource);
        return `<resourcesTable header="${header}" resources={${resources}} />`;
      }

      if (block._type === "image") {
        const imageUrl = block.asset?._ref ? urlForImage({ _ref: block.asset._ref }).url() : '';
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
}
