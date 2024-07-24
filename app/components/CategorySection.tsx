import React from "react";
import { Link } from 'next-view-transitions'
import { v4 as uuidv4 } from "uuid";
import Rating from "./Rating";
import { slugify } from "../utils/helpers";
// import Rating from "./Rating";

interface Topic {
  _type: string;
  topicName: string;
  details: string;
}

interface CategoryPageProps {
  name: string;
  category: string;
  topics: Topic[];
}

const CategorySection: React.FC<CategoryPageProps> = ({
  name,
  category,
  topics,
}) => {
  if (!name || !category || !topics) {
    return null;
  }

  const topicArray = topics.map((topic) => (
    <div
      key={uuidv4()}
      className="font-poppins flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:bg-violet-400"
    >
      <Link key={`/${category}/${topic.topicName}`} href={slugify(`${category})/${slugify(topic.topicName)}`)}>
        <div>
          <div className="text-xl font-semibold tracking-wide text-gray-800 dark:text-gray-300">
            {topic.topicName}
          </div>
          <div className="mt-4">
            <Rating stars={4} onBlogPost={true} />
          </div>
        </div>
      </Link>

      <div className="mt-3 text-gray-500">{topic.details}</div>
    </div>
  ));

  return (
    <section className="text-gray-500">
      <div className="container max-w-5xl px-4 py-12 mx-auto font-poppins">
        <div className="grid gap-4 mx-4 sm:grid-cols-12">
          <div className="col-span-12 sm:col-span-3">
            <div className="text-center sm:text-left mb-14 before:block before:w-24 before:h-3 before:mb-5 before:rounded-md before:mx-auto sm:before:mx-0">
              <h3 className="text-gray-800 dark:text-gray-300 text-3xl font-semibold before:block before:w-24 before:h-3 before:mb-5 before:rounded-md before:mx-auto sm:before:mx-0 before:bg-violet-400">
                {name}
              </h3>
              <span className="text-sm font-bold tracking-wider uppercase">
                {category}
              </span>
            </div>
          </div>
          <div className="relative col-span-12 px-4 space-y-6 sm:col-span-9">
            <div className="ml-10 col-span-12 space-y-12 relative px-4 sm:col-span-8 sm:space-y-8 sm:before:absolute sm:before:top-2 sm:before:bottom-0 sm:before:w-0.5 sm:before:-left-3 before:bg-gray-400">
              {topicArray}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
