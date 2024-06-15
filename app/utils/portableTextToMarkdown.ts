interface PortableTextChild {
  _type: string;
  text: string;
}

interface PortableTextBlock {
  _type: string;
  style: string;
  children: PortableTextChild[];
}

export function portableTextToMarkdown(blocks: PortableTextBlock[]): string {
  return blocks
    .map((block) => {
      if (block._type !== "block" || !block.children) {
        return "";
      }

      const children = block.children.map((child) => child.text).join("");

      switch (block.style) {
        case "h1":
          return `# ${children}`;
        case "h2":
          return `## ${children}`;
        case "h3":
          return `### ${children}`;
        case "h4":
          return `#### ${children}`;
        case "h5":
          return `##### ${children}`;
        case "h6":
          return `###### ${children}`;
        default:
          return children;
      }
    })
    .join("\n\n");
}
