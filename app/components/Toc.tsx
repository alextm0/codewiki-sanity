"use client";

import React, { useState } from "react";
import { Link } from "next-view-transitions";
import { slugify } from "../utils/helpers";
import MarkdownRender from "./MarkdownComponent";

const Toc = ({ headings }: any) => {
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});

  const toggleSection = (slug: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [slug]: !prev[slug],
    }));
  };

  return (
    <div className="relative max-w-2xl mx-auto mt-8 px-10">
      <div className="mb-10 w-full rounded-md border bg-white px-6 py-6 shadow-sm lg:w-56">
        <div className="pb-2 text-xl font-medium text-gray-800">Table of Contents</div>
        <hr className="h-1 w-10 bg-gray-800" />
        <nav className="mt-4">
          <ul>
            {headings.map((heading: any, index: any) => {
              const text = heading.children[0].text;
              const slug = text.match(/\{#(.*?)\}/)?.[1] || slugify(text);
              const cleanText = text.replace(/\{#.*?\}/g, "").trim();
              const level = heading.style || "h2";

              if (level === "h2") {
                const isExpanded = expandedSections[slug] || false;

                // Find the next h2 index
                const nextH2Index = headings.slice(index + 1).findIndex((h: any) => h.style === "h2");
                const endIndex = nextH2Index === -1 ? headings.length : index + 1 + nextH2Index;

                return (
                  <li key={heading._key} className="mb-3">
                    <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection(slug)}>
                      <span className="text-sm font-medium text-gray-700 hover:text-gray-900">{cleanText}</span>
                      <span className="text-gray-500">{isExpanded ? "−" : "+"}</span>
                    </div>
                    {isExpanded && (
                      <ul className="mt-2 ml-4 border-l border-gray-200 pl-2">
                        {headings.slice(index + 1, endIndex).map((subHeading: any) => {
                          if (subHeading.style !== "h3") return null; // Only display h3 headers
                          const subText = subHeading.children[0].text;
                          const subSlug = subText.match(/\{#(.*?)\}/)?.[1] || slugify(subText);
                          const subCleanText = subText.replace(/\{#.*?\}/g, "").trim();
                          return (
                            <li key={subHeading._key} className="mb-2">
                              <Link className="text-sm font-medium text-gray-600 hover:text-gray-800" href={`#${subSlug}`}>
                                <MarkdownRender mdString={subCleanText} />
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              }

              return null;
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Toc;
