"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { slugify } from "@/app/utils/helpers";
import { TocHeading, TocProps } from "./types";
import TocItem from "./TocItem";

const Toc: React.FC<TocProps> = ({ headings }) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (slug: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [slug]: !prev[slug],
    }));
  };

  const processedHeadings = useMemo(() => 
    headings.map((heading) => ({
      ...heading,
      displayText: heading.text, // Use the text property directly
      slug: slugify(heading.text),
    })),
    [headings]
  );

  return (
    <div className="relative max-w-2xl mx-auto mt-8 sm:pr-10">
      <div className="w-full rounded-lg border border-gray-200 bg-background-50 dark:bg-background-800 dark:border-background-600 px-6 py-6 lg:w-64 shadow-md">
        <h2 className="pb-2 text-base font-inter font-medium text-text-800 dark:text-text-200">Cuprins</h2>
        <hr className="h-0.5 w-16 bg-primary-500 dark:bg-primary-400 rounded" />
        <nav className="mt-4">
          <ul className="space-y-4">
            {processedHeadings.map((heading, index) => (
              heading.level === 2 && (
                <TocItem
                  key={heading.slug}
                  heading={heading}
                  isExpanded={expandedSections[heading.slug] || false}
                  toggleSection={toggleSection}
                  subHeadings={processedHeadings.slice(index + 1, processedHeadings.findIndex((h, i) => i > index && h.level === 2))}
                />
              )
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Toc;