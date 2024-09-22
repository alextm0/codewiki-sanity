import React from "react";
import { Link } from "next-view-transitions";
import { Post } from "../../utils/interface";
import Image from "next/image";
import ButtonArrow from "@/public/assets/animated-arrow.svg";

interface Props {
  post: Post;
}

const BlogPostCard = ({ post }: Props) => {
  const isNew = () => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return new Date(post.publishedAt) > oneWeekAgo;
  };

  return (
    <div className="group bg-gradient-to-r from-background-50 to-background-100 dark:from-background-800 dark:to-background-700 overflow-hidden shadow-lg transition duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl rounded-xl md:w-80 relative">
      {/* New Badge */}
      {isNew() && (
      <span className="absolute top-4 left-4 animate-pulse-slow bg-[#50C878] text-text-900 text-xs font-semibold px-2 py-1 rounded-full shadow-md flex items-center z-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-3 h-3 mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.188 3.674a1 1 0 00.95.69h3.862c.969 0 1.371 1.24.588 1.81l-3.127 2.27a1 1 0 00-.364 1.118l1.188 3.674c.3.921-.755 1.688-1.54 1.118l-3.127-2.27a1 1 0 00-1.175 0l-3.127 2.27c-.784.57-1.84-.197-1.54-1.118l1.188-3.674a1 1 0 00-.364-1.118l-3.127-2.27c-.784-.57-.38-1.81.588-1.81h3.862a1 1 0 00.95-.69l1.188-3.674z" />
        </svg>
        Nou
      </span>
      )}

      {/* Cover Image */}
      <div className="relative h-48 w-full">
        {post?.coverImage && (
          <Image
            src={post?.coverImage.asset.url}
            alt={post?.coverImage.alt || "Cover Image"}
            layout="fill"
            objectFit="cover"
            className="rounded-t-xl"
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (min-width: 768px) 50vw"
          />
        )}
      </div>

      {/* Tags */}
      <div className="bg-white dark:bg-background-800 w-full px-4 pt-4">
        <div className="flex flex-wrap gap-2">
          {post?.tags?.map((tag) => (
            <span
              key={tag._id}
              className="font-inter bg-secondary-100 dark:bg-secondary-800 text-secondary-500 dark:text-secondary-400 font-semibold px-3 py-1 rounded-full text-xs lowercase tracking-wide"
            >
              #{tag.name}
            </span>
          ))}
        </div>
      </div>
      
      <div className="bg-white dark:bg-background-800 w-full px-4 pb-6 pt-3 rounded-b-xl">
        {/* Fixed height for title */}
        <div className="text-text-900 dark:text-text-50 text-xl font-bold font-poppins  flex items-center">
          {post?.title}
        </div>

        {/* Limit excerpt to a fixed number of lines */}
        <p className="text-text-500 font-poppins dark:text-text-400 font-light text-sm mt-2 mb-6 line-clamp-5">
          {post?.excerpt}
        </p>

        <div className="flex items-center">
          <p className="text-text-700 font-inter dark:text-secondary-500 mt-2 ml-auto flex items-center font-medium">
            Citeste acum
            <Image
              src={ButtonArrow}
              width={16}
              height={16}
              alt="Button Arrow"
              className="mr-2 ml-1 transform transition-transform duration-300 ease-in-out group-hover:translate-x-1"
            />
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogPostCard;
