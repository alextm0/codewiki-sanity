import React from "react";
import { Components } from "react-markdown";
import { CodeBlock, Heading, Paragraph, BlockQuote, List, ListItem, Strong, Emphasis, Link, ImageComponent } from "./MarkdownElements";

export const CustomComponents: Components = {
  code: CodeBlock,
  h1: (props) => <Heading level={1} {...props} />,
  h2: (props) => <Heading level={2} {...props} />,
  h3: (props) => <Heading level={3} {...props} />,
  h4: (props) => <Heading level={4} {...props} />,
  p: Paragraph,
  blockquote: BlockQuote,
  ol: (props) => <List ordered {...props} />,
  ul: (props) => <List ordered={false} {...props} />,
  li: ListItem,
  strong: Strong,
  em: Emphasis,
  a: Link,
  image: ImageComponent,
};