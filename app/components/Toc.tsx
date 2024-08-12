"use client";

import React, { useState } from "react";
import { Link } from "next-view-transitions";
import { slugify } from "../utils/helpers";

const Toc = ({ headings }: { headings: any[] }) => {
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});

  const toggleSection = (slug: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [slug]: !prev[slug],
    }));
  };

  const getTextFromMarkdown = (text: string) => {
    // Extract only the text portion from markdown links
    const extractedText = text.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1');
    return extractedText.trim();
  };

  const getSlugFromMarkdown = (text: string) => {
    return slugify(text);
  };

  return (
    <div className="relative max-w-2xl mx-auto mt-8 pr-10">
      <div className="w-full rounded-md border bg-white px-6 py-6 lg:w-56">
        <div className="pb-2 text-lg font-semibold text-gray-700">Table of Contents</div>
        <hr className="h-1 w-10 bg-gray-500" />
        <nav className="mt-4">
          <ul>
            {headings?.map((heading, index) => {
              const displayText = getTextFromMarkdown(heading.text);
              const slug = getSlugFromMarkdown(heading.text);
              const level = heading.level || 2;

              if (level === 2) {
                const isExpanded = expandedSections[slug] || false;

                // Find the next h2 index
                const nextH2Index = headings.slice(index + 1).findIndex((h) => h.level === 2);
                const endIndex = nextH2Index === -1 ? headings.length : index + 1 + nextH2Index;

                return (
                  <li key={slug} className="mb-3">
                    <div className="flex justify-between items-center">
                      <Link 
                        href={`#${slug}`} 
                        className="text-sm font-normal text-gray-600 hover:text-gray-800 flex-1"
                        style={{ marginRight: '8px' }}
                      >
                        {displayText}
                      </Link>
                      {headings.slice(index + 1, endIndex).some(h => h.level === 3) && (
                        <span 
                          className="text-gray-400 cursor-pointer"
                          onClick={() => toggleSection(slug)}
                        >
                          {isExpanded ? "−" : "+"}
                        </span>
                      )}
                    </div>
                    {isExpanded && (
                      <ul className="mt-2 ml-4 border-l border-gray-200 pl-2">
                        {headings.slice(index + 1, endIndex).map((subHeading, subIndex) => {
                          if (subHeading.level !== 3) return null;
                          const subDisplayText = getTextFromMarkdown(subHeading.text);
                          const subSlug = getSlugFromMarkdown(subHeading.text);
                          return (
                            <li key={subSlug} className="mb-2">
                              <Link className="text-sm font-normal text-gray-500 hover:text-gray-700" href={`#${subSlug}`}>
                                {subDisplayText}
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
