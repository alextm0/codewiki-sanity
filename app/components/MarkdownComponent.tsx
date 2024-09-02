import React from "react";
import ReactMarkdown, { Components } from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import "katex/dist/katex.min.css";
import { slugify } from "../utils/helpers";
import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image";
import classNames from "classnames";
import styles from "@/app/(client)/markdown-styles.module.css";
import ResourcesTable from "./ResourcesTable";
import ProblemSetTable from "./ProblemSetTable";

interface MarkdownRenderProps {
  mdString: string;
}

// Extend Components type to include custom components
interface CustomComponents extends Components {}

// Function to extract text from node to correctly handle nested nodes
const extractTextFromNode = (node: any): string => {
  if (typeof node === "string") {
    return node;
  }
  if (node?.props && node?.props?.children) {
    return extractTextFromNode(node.props.children);
  }
  if (Array?.isArray(node)) {
    return node.map(extractTextFromNode).join("");
  }
  return "";
};

// Function to clean heading
const cleanHeading = (text: string) => {
  return text.replace(/\{#.*?\}/g, "").trim();
};

// Function to extract ResourcesTable data
const extractResourcesTableData = (mdString: string) => {
  const resourcesTableRegex =
    /<ResourcesTable\s+header="([^"]+)"\s+resource='([^']+)'/;
  const match = mdString.match(resourcesTableRegex);

  if (match) {
    const header = match[1];
    const resource = JSON.parse(match[2]);
    return { header, resource };
  }

  return null;
};

// Function to extract ProblemSetTable data
const extractProblemSetTableData = (mdString: string) => {
  const problemSetTableRegex =
    /<ProblemSetTable\s+problemSetName="([^"]+)"\s+problemSet='([^']+)'/;
  const match = mdString.match(problemSetTableRegex);

  if (match) {
    const problemSetName = match[1];
    const problemSet = JSON.parse(match[2]);
    return { problemSetName, problemSet };
  }

  return null;
};

const MarkdownRender: React.FC<MarkdownRenderProps> = ({ mdString }) => {
  let processedMdString = mdString?.replace(/⁡/g, "");

  const resourcesTableData = extractResourcesTableData(processedMdString);
  const problemSetTableData = extractProblemSetTableData(processedMdString);

  // Remove custom table tags from the processed markdown string
  const cleanedMdString = processedMdString
    .replace(/<ResourcesTable\s+header="[^"]+"\s+resource='[^']+'\/>/, "")
    .replace(
      /<ProblemSetTable\s+problemSetName="[^"]+"\s+problemSet='[^']+'\/>/,
      ""
    );

  const customComponents: CustomComponents = {
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          style={darcula}
          className={classNames(
            styles["code-block"],
            "rounded-md my-4 p-4 overflow-x-auto max-w-xs md:max-w-full"
          )}
          language={match[1]}
          PreTag="div"
          showInlineLineNumbers={true}
          wrapLines={true}
          {...props}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code
          className={classNames(
            styles["inline-code"],
            "text-sm rounded-md px-1"
          )}
          {...props}
        >
          {children}
        </code>
      );
    },
    h1: ({ node, ...props }) => {
      let text = extractTextFromNode(props.children);
      let cleanText = cleanHeading(text);
      let htmlContent = Array.isArray(props.children)
        ? props.children.filter(
            (child: any) => !/\{#.*?\}/.test(extractTextFromNode(child))
          )
        : props.children;

      if (!Array.isArray(htmlContent)) {
        htmlContent = cleanHeading(extractTextFromNode(htmlContent));
      }

      const slug = text.match(/\{#(.*?)\}/)?.[1] || slugify(cleanText);

      return (
        <h1
          id={slug}
          className={classNames(styles.h1, "text-4xl font-bold my-4")}
          {...props}
        >
          {htmlContent}
        </h1>
      );
    },
    h2: ({ node, ...props }) => {
      let text = extractTextFromNode(props.children);
      let cleanText = cleanHeading(text);
      let htmlContent = Array.isArray(props.children)
        ? props.children.filter(
            (child: any) => !/\{#.*?\}/.test(extractTextFromNode(child))
          )
        : props.children;

      if (!Array.isArray(htmlContent)) {
        htmlContent = cleanHeading(extractTextFromNode(htmlContent));
      }

      const slug = text.match(/\{#(.*?)\}/)?.[1] || slugify(cleanText);

      return (
        <h2
          id={slug}
          className={classNames(styles.h2, "text-3xl font-bold my-4")}
          {...props}
        >
          {htmlContent}
        </h2>
      );
    },
    h3: ({ node, ...props }) => {
      let text = extractTextFromNode(props.children);
      let cleanText = cleanHeading(text);
      let htmlContent = Array.isArray(props.children)
        ? props.children.filter(
            (child: any) => !/\{#.*?\}/.test(extractTextFromNode(child))
          )
        : props.children;

      if (!Array.isArray(htmlContent)) {
        htmlContent = cleanHeading(extractTextFromNode(htmlContent));
      }

      const slug = text.match(/\{#(.*?)\}/)?.[1] || slugify(cleanText);

      return (
        <h3
          id={slug}
          className={classNames(styles.h3, "text-2xl font-bold my-4")}
          {...props}
        >
          {htmlContent}
        </h3>
      );
    },
    h4: ({ node, ...props }) => {
      let text = extractTextFromNode(props.children);
      let cleanText = cleanHeading(text);
      let htmlContent = Array.isArray(props.children)
        ? props.children.filter(
            (child: any) => !/\{#.*?\}/.test(extractTextFromNode(child))
          )
        : props.children;

      if (!Array.isArray(htmlContent)) {
        htmlContent = cleanHeading(extractTextFromNode(htmlContent));
      }

      const slug = text.match(/\{#(.*?)\}/)?.[1] || slugify(cleanText);

      return (
        <h4
          id={slug}
          className={classNames(styles.h4, "text-xl font-bold my-4")}
          {...props}
        >
          {htmlContent}
        </h4>
      );
    },
    p({ node, children }) {
      const childrenArray = React.Children.toArray(children);

      // Convert children to string to check for special formatting
      const childrenText = childrenArray
        .map((child) => (typeof child === "string" ? child : ""))
        .join("");

      if (childrenText.startsWith("!!! note")) {
        const title = childrenText.match(/!!! note "(.*?)"/)?.[1] || "Note";
        const content = childrenText.replace(/!!! note "(.*?)"/, "").trim();
        return (
          <div className="p-4 my-10 border-l-4 border-blue-400 bg-blue-50 text-blue-800 rounded-md shadow-sm not-prose">
            <strong className="block text-blue-600 mb-1 text-base">
              {title}
            </strong>
            <p className="text-sm leading-relaxed">{content}</p>
          </div>
        );
      }

      if (childrenText.startsWith("!!! info")) {
        const title = childrenText.match(/!!! info "(.*?)"/)?.[1] || "Info";
        const content = childrenText.replace(/!!! info "(.*?)"/, "").trim();
        return (
          <div className="p-4 my-10 border-l-4 border-green-400 bg-green-50 text-green-800 rounded-md shadow-sm not-prose">
            <strong className="block text-green-600 mb-1 text-base">
              {title}
            </strong>
            <p className="text-sm leading-relaxed">{content}</p>
          </div>
        );
      }

      if (childrenText.startsWith("!!! warning")) {
        const title =
          childrenText.match(/!!! warning "(.*?)"/)?.[1] || "Warning";
        const content = childrenText.replace(/!!! warning "(.*?)"/, "").trim();
        return (
          <div className="p-4 my-10 border-l-4 border-yellow-400 bg-yellow-50 text-yellow-800 rounded-md shadow-sm not-prose">
            <strong className="block text-yellow-600 mb-1 text-base">
              {title}
            </strong>
            <p className="text-sm leading-relaxed">{content}</p>
          </div>
        );
      }

      // Render the paragraph while preserving the children structure
      return (
        <p className={classNames(styles.p, "my-2 leading-7")}>
          {childrenArray}
        </p>
      );
    },

    blockquote: ({ node, ...props }) => (
      <blockquote
        className={classNames(
          styles.blockquote,
          "border-l-4 border-gray-400 pl-4 italic my-4"
        )}
        {...props}
      />
    ),
    ol: ({ node, ...props }) => (
      <ol
        className={classNames(styles.ol, "list-decimal my-1 ml-4")}
        {...props}
      />
    ),
    ul: ({ node, ...props }) => (
      <ul
        className={classNames(styles.ul, "list-disc my-1 md:ml-4")}
        {...props}
      />
    ),
    li: ({ node, ...props }) => (
      <li className={classNames(styles.li, "my-1 list-disc")} {...props} />
    ),
    strong: ({ node, ...props }) => (
      <strong
        className={classNames(styles.strong, "font-semibold")}
        {...props}
      />
    ),
    em: ({ node, ...props }) => (
      <em className={classNames(styles.em, "italic")} {...props} />
    ),
    a: ({ node, ...props }) => (
      <a
        target="_blank"
        className={classNames(
          "text-primary-400 border-b-2 border-transparent pb-0.5 transition-all duration-300 hover:text-primary-500 hover:border-primary-300"
        )}
        {...props}
      />
    ),
    image: ({ node, ...props }: any) => (
      <Image
        src={urlForImage(props.src).url()}
        alt={props.alt}
        width={700}
        height={700}
        className={styles.image}
        loading="lazy" // Lazy load images
      />
    ),
    
  };

  return (
    <div>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex, rehypeRaw]}
        className={styles.markdown}
        components={customComponents}
      >
        {cleanedMdString}
      </ReactMarkdown>

      {resourcesTableData && (
        <ResourcesTable
          header={resourcesTableData.header}
          resource={resourcesTableData.resource}
        />
      )}

      {problemSetTableData && (
        <ProblemSetTable
          problemSetName={problemSetTableData.problemSetName}
          problemSet={problemSetTableData.problemSet}
        />
      )}
    </div>
  );
};

export default MarkdownRender;
