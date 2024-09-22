import React from "react";
import Link from "next/link";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { TocItemProps } from "./types";

const TocItem: React.FC<TocItemProps> = ({ heading, isExpanded, toggleSection, subHeadings }) => {
  return (
    <li className="mb-3">
      <div className="flex justify-between items-center">
        <Link 
          href={`#${heading.slug}`} 
          className="text-sm font-medium text-text-700 dark:text-text-300 hover:text-primary-500 dark:hover:text-primary-400 flex-1"
        >
          {heading.displayText}
        </Link>
        {subHeadings.some(h => h.level === 3) && (
          <button 
            className="text-gray-400 cursor-pointer"
            onClick={() => toggleSection(heading.slug!)} // Add non-null assertion
            aria-expanded={isExpanded}
            aria-label={isExpanded ? "Collapse section" : "Expand section"}
          >
            {isExpanded ? <FiChevronDown /> : <FiChevronRight />}
          </button>
        )}
      </div>
      {isExpanded && (
        <ul className="mt-2 ml-4 border-l border-gray-200 dark:border-background-600 pl-2 space-y-2">
          {subHeadings.map((subHeading) => (
            subHeading.level === 3 && (
              <li key={subHeading.slug} className="mb-2">
                <Link 
                  className="text-sm font-normal text-text-600 dark:text-text-400 hover:text-primary-500 dark:hover:text-primary-400"
                  href={`#${subHeading.slug}`}
                >
                  {subHeading.displayText}
                </Link>
              </li>
            )
          ))}
        </ul>
      )}
    </li>
  );
};

export default TocItem;