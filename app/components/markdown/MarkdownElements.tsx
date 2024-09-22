import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";
import Image from "next/image";
import classNames from "classnames";
import styles from "@/app/(client)/markdown-styles.module.css";
import { slugify, extractTextFromNode, cleanHeading } from "./markdownUtils";
import { urlForImage } from "@/sanity/lib/image";

export const CodeBlock = ({ node, inline, className, children, ...props }: any) => {
  const match = /language-(\w+)/.exec(className || "");
  return !inline && match ? (
    <SyntaxHighlighter
      style={darcula}
      className={classNames(styles["code-block"], "rounded-md my-4 p-4 overflow-x-auto max-w-xs md:max-w-full")}
      language={match[1]}
      PreTag="div"
      showInlineLineNumbers={true}
      wrapLines={true}
      {...props}
    >
      {String(children).replace(/\n$/, "")}
    </SyntaxHighlighter>
  ) : (
    <code className={classNames(styles["inline-code"], "text-sm rounded-md px-1")} {...props}>
      {children}
    </code>
  );
};

export const Heading = ({ level, node, ...props }: any) => {
  let text = extractTextFromNode(props.children);
  let cleanText = cleanHeading(text);
  let htmlContent = Array.isArray(props.children)
    ? props.children.filter((child: any) => !/\{#.*?\}/.test(extractTextFromNode(child)))
    : props.children;

  if (!Array.isArray(htmlContent)) {
    htmlContent = cleanHeading(extractTextFromNode(htmlContent));
  }

  const slug = text.match(/\{#(.*?)\}/)?.[1] || slugify(cleanText);

  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <HeadingTag
      id={slug}
      className={classNames(styles[`h${level}`], `text-${5-level}xl font-bold my-4`)}
      {...props}
    >
      {htmlContent}
    </HeadingTag>
  );
};

export const Paragraph = ({ node, children }: any) => {
  const childrenArray = React.Children.toArray(children);
  const childrenText = childrenArray
    .map((child) => (typeof child === "string" ? child : ""))
    .join("");

  if (childrenText.startsWith("!!! note")) {
    const title = childrenText.match(/!!! note "(.*?)"/)?.[1] || "Note";
    const content = childrenText.replace(/!!! note "(.*?)"/, "").trim();
    return (
      <div className="p-4 my-10 border-l-4 border-blue-400 bg-blue-50 text-blue-800 rounded-md shadow-sm not-prose">
        <strong className="block text-blue-600 mb-1 text-base">{title}</strong>
        <p className="text-sm leading-relaxed">{content}</p>
      </div>
    );
  }

  if (childrenText.startsWith("!!! info")) {
    const title = childrenText.match(/!!! info "(.*?)"/)?.[1] || "Info";
    const content = childrenText.replace(/!!! info "(.*?)"/, "").trim();
    return (
      <div className="p-4 my-10 border-l-4 border-green-400 bg-green-50 text-green-800 rounded-md shadow-sm not-prose">
        <strong className="block text-green-600 mb-1 text-base">{title}</strong>
        <p className="text-sm leading-relaxed">{content}</p>
      </div>
    );
  }

  if (childrenText.startsWith("!!! warning")) {
    const title = childrenText.match(/!!! warning "(.*?)"/)?.[1] || "Warning";
    const content = childrenText.replace(/!!! warning "(.*?)"/, "").trim();
    return (
      <div className="p-4 my-10 border-l-4 border-yellow-400 bg-yellow-50 text-yellow-800 rounded-md shadow-sm not-prose">
        <strong className="block text-yellow-600 mb-1 text-base">{title}</strong>
        <p className="text-sm leading-relaxed">{content}</p>
      </div>
    );
  }

  return <p className={classNames(styles.p, "my-2 leading-7")}>{childrenArray}</p>;
};

export const BlockQuote = ({ node, ...props }: any) => (
  <blockquote
    className={classNames(styles.blockquote, "border-l-4 border-gray-400 pl-4 italic my-4")}
    {...props}
  />
);

export const List = ({ ordered, node, ...props }: any) => (
  <ul className={classNames(styles.ul, "list-disc my-1 md:ml-4")} {...props} />
);

export const ListItem = ({ node, ...props }: any) => (
  <li className={classNames(styles.li, "my-1 list-disc")} {...props} />
);

export const Strong = ({ node, ...props }: any) => (
  <strong className={classNames(styles.strong, "font-semibold")} {...props} />
);

export const Emphasis = ({ node, ...props }: any) => (
  <em className={classNames(styles.em, "italic")} {...props} />
);

export const Link = ({ node, ...props }: any) => (
  <a
    target="_blank"
    className={classNames(
      "text-primary-400 border-b-2 border-transparent pb-0.5 transition-all duration-300 hover:text-primary-500 hover:border-primary-300"
    )}
    {...props}
  />
);

export const ImageComponent = ({ node, ...props }: any) => (
  <Image
    src={urlForImage(props.src).url()}
    alt={props.alt}
    width={700}
    height={700}
    className={styles.image}
    loading="lazy" // Lazy load images
  />
);