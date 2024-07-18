"use client";

import React from "react";
import { Link } from 'next-view-transitions'
import BlogPostCard from "./PostComponent";
import { Post } from "../utils/interface";
import Header from "./Header";

interface ArticlesProps {
  headerTitle: string;
  blogs: {
    data: Post[];
  };
}

const Articles: React.FC<ArticlesProps> = ({ headerTitle, blogs }) => {
  return (
    <div className="mx-auto pt-10 pb-10">
      <div className="text-center mb-5">
        <h1 className="text-gray-900 dark:text-white font-quicksand font-bold text-4xl">
          <Header title={headerTitle} tags />
        </h1>
      </div>

      <div className="max-w-[1024px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 justify-center justify-items-center px-10 md:px-0 gap-10 md:gap-5 pt-10">
          {blogs.data &&
            blogs.data.map((blog, index) => (
              <Link
                key={index}
                href={`/posts/${blog.slug.current}`}
                className="cursor-pointer"
              >
                <BlogPostCard post={blog} />
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Articles;
