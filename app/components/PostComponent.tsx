import { Link } from "next-view-transitions";
import React from "react";
import { Post } from "../utils/interface";
import Image from "next/image";
import { AiOutlineArrowRight } from "react-icons/ai";

// Import ArticleImage
import ArticleImage from "../../public/assets/ArticleImage.png";

interface Props {
  post: Post;
}

const BlogPostCard = ({ post }: Props) => {
  return (
    <div className="group bg-gradient-to-r from-background-50 to-background-100 dark:from-background-800 dark:to-background-700 overflow-hidden shadow-lg transition duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl rounded-xl md:w-80">
      <div className="relative h-48 w-full">
        {post?.coverImage ? (
          <Image
            src={post?.coverImage.asset.url}
            alt={post?.coverImage.alt || "Cover Image"}
            layout="fill"
            objectFit="cover"
            className="rounded-t-xl"
          />
        ) : (
          <Image
            src={ArticleImage}
            alt="Cover Image"
            layout="fill"
            objectFit="cover"
            className="rounded-t-xl"
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
        <div className="text-text-900 dark:text-text-50 text-xl font-bold font-poppins">
          {post?.title}
        </div>

        <p className="text-text-500 font-poppins dark:text-text-400 font-light text-sm mt-2 mb-6">
          {post?.excerpt}
        </p>

        <div className="flex items-center">
          <p className="text-primary-800 font-inter dark:text-secondary-500 mt-2 ml-auto flex items-center gap-1 font-medium">
            Citeste acum
            {/* Simple Arrow Icon */}
            <AiOutlineArrowRight className="mt-[2px] transition-transform duration-300 ease-in-out transform group-hover:translate-x-2" />
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogPostCard;
