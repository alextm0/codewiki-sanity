"use client";

import React, { useState } from "react";
import { Link } from "next-view-transitions";
import { slugify } from "../utils/helpers";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";

const Toc = ({ headings }: { headings: any[] }) => {
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});

  const toggleSection = (slug: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [slug]: !prev[slug],
    }));
  };

  const getTextFromMarkdown = (text: string) => {
    const extractedText = text.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1');
    return extractedText.trim();
  };

  const getSlugFromMarkdown = (text: string) => {
    return slugify(text);
  };

  return (
    <div className="relative max-w-2xl mx-auto mt-8 pr-10">
      <div className="w-full rounded-lg border border-gray-200 bg-background-50 dark:bg-background-800 dark:border-background-600 px-6 py-6 lg:w-64 shadow-md">
        <div className="pb-2 text-base font-inter font-medium text-text-800 dark:text-text-200">Cuprins</div>
        <hr className="h-0.5 w-16 bg-primary-500 dark:bg-primary-400 rounded" />
        <nav className="mt-4">
          <ul className="space-y-4">
            {headings?.map((heading, index) => {
              const displayText = getTextFromMarkdown(heading.text);
              const slug = getSlugFromMarkdown(heading.text);
              const level = heading.level || 2;

              if (level === 2) {
                const isExpanded = expandedSections[slug] || false;

                const nextH2Index = headings.slice(index + 1).findIndex((h) => h.level === 2);
                const endIndex = nextH2Index === -1 ? headings.length : index + 1 + nextH2Index;

                return (
                  <li key={slug} className="mb-3">
                    <div className="flex justify-between items-center">
                      <Link 
                        href={`#${slug}`} 
                        className="text-sm font-medium text-text-700 dark:text-text-300 hover:text-primary-500 dark:hover:text-primary-400 flex-1"
                      >
                        {displayText}
                      </Link>
                      {headings.slice(index + 1, endIndex).some(h => h.level === 3) && (
                        <span 
                          className="text-gray-400 cursor-pointer"
                          onClick={() => toggleSection(slug)}
                        >
                          {isExpanded ? <FiChevronDown /> : <FiChevronRight />}
                        </span>
                      )}
                    </div>
                    {isExpanded && (
                      <ul className="mt-2 ml-4 border-l border-gray-200 dark:border-background-600 pl-2 space-y-2">
                        {headings.slice(index + 1, endIndex).map((subHeading, subIndex) => {
                          if (subHeading.level !== 3) return null;
                          const subDisplayText = getTextFromMarkdown(subHeading.text);
                          const subSlug = getSlugFromMarkdown(subHeading.text);
                          return (
                            <li key={subSlug} className="mb-2">
                              <Link 
                                className="text-sm font-normal text-text-600 dark:text-text-400 hover:text-primary-500 dark:hover:text-primary-400"
                                href={`#${subSlug}`}
                              >
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
