"use client";

import React, { useState } from "react";
import { Link } from 'next-view-transitions';
import { v4 as uuidv4 } from "uuid";
import Rating from "../ui/Rating";
import { slugify } from "../../utils/helpers";

interface Topic {
  _type: string;
  topicName: string;
  details: string;
  stars: number;
}

interface CategoryPageProps {
  name: string;
  category: string;
  description: string;
  topics: Topic[];
}

const CategorySection: React.FC<CategoryPageProps> = ({
  name,
  category,
  topics,
  description,
}) => {
  // Hooks should be declared at the top level of the component
  const [hoverIndex, setHoverIndex] = useState<number | null>(null); 

  if (!name || !category || !topics) {
    return null;
  }

  return (
    <section className="text-gray-500">
      <div className="container max-w-5xl px-4 py-12 mx-auto font-poppins">
        <div className="grid gap-4 mx-4 sm:grid-cols-12">
          <div className="col-span-12 sm:col-span-3">
            <div className="text-center sm:text-left mb-14 before:block before:w-24 before:h-3 before:mb-5 before:rounded-md before:mx-auto sm:before:mx-0">
              <h3 className="text-gray-800 dark:text-gray-300 text-3xl font-semibold before:block before:w-24 before:h-3 before:mb-5 before:rounded-md before:mx-auto sm:before:mx-0 before:bg-primary-200">
                {name}
              </h3>
              <span className="text-sm font-bold tracking-wider uppercase">
                {description}
              </span>
            </div>
          </div>
          <div className="relative col-span-12 pl-2 sm:px-4 space-y-6 sm:col-span-9">
            <div className="sm:ml-10 col-span-12 space-y-12 relative sm:px-4 sm:col-span-8 sm:space-y-8">
              {/* Improved line design */}
              <div className="sm:before:absolute sm:before:top-0 sm:before:bottom-0 sm:before:w-1 sm:before:-left-3 before:bg-gradient-to-b before:from-primary-200 before:to-primary-200 before:rounded-full  sm:before:border-violet-400 sm:before:shadow-lg sm:before:opacity-75">
                {topics.map((topic, index) => (
                  <Link
                    key={uuidv4()}
                    href={`/articol/${slugify(topic.topicName)}`}
                    className="block"
                    onMouseEnter={() => setHoverIndex(index)}
                    onMouseLeave={() => setHoverIndex(null)}
                  >
                    <div className="font-poppins flex flex-col p-6 mb-6 rounded-lg shadow-sm hover:shadow-lg hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 transition-transform duration-500 ease-in-out transform hover:-translate-y-1 hover:border-l-4 hover:border-primary-00">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-4 h-4 mr-4 rounded-full bg-primary-200"></div>
                        <div className="text-xl font-semibold tracking-wide text-gray-800 dark:text-gray-300">
                          {topic.topicName}
                        </div>
                      </div>
                      <div className="mt-2">
                        <Rating stars={topic.stars} onHover={hoverIndex === index} onBlogPost={true} />
                      </div>
                      <div className="mt-3 text-gray-500 font-inter">
                        {topic.details}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
