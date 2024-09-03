import React from "react";
import { Link } from "next-view-transitions";
import BlogPostCard from "./PostComponent";
import { Post } from "../utils/interface";
import { AiOutlineTags } from "react-icons/ai"; // Importing a reload icon

interface ArticlesProps {
  headerTitle: string;
  blogs: {
    data: Post[];
  };
}

const Articles: React.FC<ArticlesProps> = ({ headerTitle, blogs }) => {
  return (
    <div className="mx-auto pt-10 pb-20 flex flex-col items-center">
      {" "}
      {/* Centering the content */}
      <div className="text-center mb-8">
        <h1 className="font-poppins text-text-900 dark:text-text-50 font-bold text-4xl mb-2">
          {headerTitle}
        </h1>
        <div className="border-t border-gray-200 dark:border-gray-700 w-24 mx-auto mt-4 mb-6"></div>
        <Link
          href="/tag"
          className="font-poppins font-medium inline-flex gap-2 items-center bg-gradient-to-r from-secondary-500 to-secondary-700 dark:from-secondary-500 text-white py-2 px-4 rounded-full hover:bg-primary-400 dark:hover:bg-secondary-600 transition ease-in-out duration-300 text-sm transform hover:scale-105 hover:shadow-lg hover:-translate-y-1" // Added hover animations
        >
          <AiOutlineTags className="h-4 w-4 transition-transform duration-300 ease-in-out transform group-hover:rotate-90" />{" "}
          {/* Added icon rotation */}
          Vezi toate etichetele
        </Link>
      </div>
      <div className="max-w-[1024px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center justify-items-center px-10 md:px-0 gap-10 md:gap-8 pt-10">
          {blogs.data &&
            blogs.data.map((blog, index) => (
              <Link
                key={index}
                href={`/articol/${blog.slug.current}`}
                className="cursor-pointer"
              >
                <BlogPostCard post={blog} />
              </Link>
            ))}
        </div>
      </div>
      <div className="text-center mt-10 flex justify-center w-full">
        {/* <button className="font-poppins px-8 py-3 bg-gradient-to-r from-primary-500 to-primary-700 dark:from-secondary-400 dark:to-secondary-600 text-white rounded-full hover:shadow-xl hover:scale-105 transition transform ease-in-out duration-300 text-sm font-medium flex items-center gap-2 active:bg-primary-800 dark:active:bg-secondary-700 active:scale-95">
          <AiOutlineReload className="animate-spin-slow" />
          Incarca mai multe
        </button> */}
      </div>
    </div>
  );
};

export default Articles;
