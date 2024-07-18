import React from "react";
import { Link } from "next-view-transitions";
import MarkdownRender from "./MarkdownComponent";

import { slugify } from "../utils/helpers";

const Toc = ({ headings }: any) => {
  return (
    <div className="max-w-2xl mx-auto mt-8 text-center border rounded-sm dark:border-purple-950 ">
      <h2 className="text-xl font-bold p-2 mb-5 border-b dark:border-purple-950 bg:amber-50 dark:bg-slate-900/20">
        Table of Contents
      </h2>
      <nav>
        <ul>
          {headings?.map((heading: any) => {
            const text = heading.children[0].text;
            const slug = text.match(/\{#(.*?)\}/)?.[1] || slugify(text); // Extract slug from the text if present
            const cleanText = text.replace(/\{#.*?\}/g, "").trim();
                        
            return (
              <li key={heading?._key} className="my-0">
                <Link className="hover:underline" href={`#${slug}`}>
                  <MarkdownRender mdString={cleanText} />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Toc;
