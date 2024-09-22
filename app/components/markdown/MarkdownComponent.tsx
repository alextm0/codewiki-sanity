"use client";

import React, { useMemo } from "react";
import dynamic from 'next/dynamic';
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import "katex/dist/katex.min.css";
import styles from "@/app/(client)/markdown-styles.module.css";
import { processMarkdown, ResourcesTableData, ProblemSetTableData } from "./useMarkdownProcessing";
import { CustomComponents } from "./CustomComponents";

const ReactMarkdown = dynamic(() => import("react-markdown"), { ssr: false });
const ResourcesTable = dynamic(() => import("./ResourcesTable"), { ssr: false });
const ProblemSetTable = dynamic(() => import("./ProblemSetTable"), { ssr: false });

interface MarkdownRenderProps {
  mdString: string;
}

const MarkdownRender: React.FC<MarkdownRenderProps> = ({ mdString }) => {
  const { cleanedMdString, resourcesTableData, problemSetTableData } = useMemo(() => processMarkdown(mdString), [mdString]);

  return (
    <div>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex, rehypeRaw]}
        className={styles.markdown}
        components={CustomComponents}
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
