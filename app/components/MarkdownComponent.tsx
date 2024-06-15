import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula, prism } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

interface MarkdownRenderProps {
  mdString: string;
}

const MarkdownRender: React.FC<MarkdownRenderProps> = ({ mdString }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex]}
      components={{
        code({ node, inline, className, children, ...props }: any) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              style={darcula} // You can change to prism for light theme
              className="code-block"
              language={match[1]}
              PreTag="div"
              showInlineLineNumbers={true}
              wrapLines={true}
              {...props}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code className="inline-code" {...props}>
              {children}
            </code>
          );
        },
        img({ src, alt }) {
          return <img src={src} alt={alt} className="my-4 rounded-md" />;
        },
        h1: ({ children }) => (
          <h1 className="text-4xl font-bold my-4">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-3xl font-bold my-4">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-2xl font-bold my-4">{children}</h3>
        ),
        h4: ({ children }) => (
          <h4 className="text-xl font-bold my-4">{children}</h4>
        ),
        p: ({ children }) => <p className="my-2 leading-7">{children}</p>,
        li: ({ children }) => <li className="ml-4 list-disc">{children}</li>,
      }}
    >
      {mdString}
    </ReactMarkdown>
  );
};

export default MarkdownRender;
