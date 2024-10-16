import React from "react";
import { Link } from "next-view-transitions";
import BlogPostCard from "@/app/components/blog/BlogPostCard";
import { Post } from "@/app/utils/interface";
import { AiOutlineTags } from "react-icons/ai";

interface ArticlesGridProps {
  headerTitle: string;
  posts: Post[];
}

const ArticlesGrid: React.FC<ArticlesGridProps> = ({ headerTitle, posts }) => {
  return (
    <div className="mx-auto pt-10 pb-20 flex flex-col items-center">
      <div className="text-center mb-8">
        <h1 className="font-poppins text-text-900 dark:text-text-50 font-bold text-4xl mb-2">
          {headerTitle}
        </h1>
        <div className="border-t border-gray-200 dark:border-gray-700 w-24 mx-auto mt-4 mb-6"></div>
        <Link
          href="/tag"
          className="font-poppins font-medium inline-flex gap-2 items-center bg-gradient-to-r from-secondary-500 to-secondary-700 dark:from-secondary-500 text-white py-2 px-4 rounded-full hover:bg-primary-400 dark:hover:bg-secondary-600 transition ease-in-out duration-300 text-sm transform hover:scale-105 hover:shadow-lg hover:-translate-y-1"
        >
          <AiOutlineTags className="h-4 w-4 transition-transform duration-300 ease-in-out transform group-hover:rotate-90" />
          Vezi toate etichetele
        </Link>
      </div>
      <div className="max-w-[1024px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center justify-items-center px-4 md:px-0 gap-10 md:gap-8 pt-10">
          {posts.map((post, index) => (
            <Link
              key={index}
              href={`/articol/${post?.slug?.current}`}
              className="cursor-pointer w-full"
            >
              <BlogPostCard post={post} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticlesGrid;