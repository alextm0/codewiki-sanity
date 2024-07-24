import { Link } from 'next-view-transitions';
import React from "react";
import { Post } from "../utils/interface";
import { AiOutlineArrowRight } from "react-icons/ai";
import Image from "next/image";

// import ArticleImage
import ArticleImage from "../../public/assets/ArticleImage.png";

interface Props {
  post: Post;
}

const BlogPostCard = ({ post }: Props) => {
  return (
    <div className="bg-amber-50 dark:bg-white overflow-hidden shadow-lg transition duration-500 ease-in-out transform hover:shadow-lg hover:shadow-slate-400 rounded-xl md:w-80">
      <div className="relative h-48 w-full">
        {post?.coverImage ? (
          <Image
            src={post?.coverImage.asset.url}
            alt={post?.coverImage.alt || "Cover Image"}
            layout="fill"
            objectFit="cover"
          />
        ) : (
          <Image
            src={ArticleImage}
            alt="Cover Image"
            layout="fill"
            objectFit="cover"
          />
        )}
      </div>

      {/* Tags */}
      <div className="pl-4 pt-4 text-sm font-medium bg-white">
        <div className="flex items-center bg-white">
          <div className="text-sm text-gray-600">
            <div className="m-1 rounded text-xs">
              {post?.tags?.map((tag) => (
                <span
                  key={tag._id}
                  className="mr-2 p-1 rounded-lg text-xs lowercase text-[#EF4444] border"
                >
                  #{tag.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white w-full px-4 pb-4 pt-1">
        <div className="text-gray-900 text-xl font-bold font-quicksand">
          {post?.title}
        </div>

        <p className="text-gray-600 font-light text-sm mt-2 mb-2 font-montserrat">
          {post?.excerpt}
        </p>

        <div className="flex items-center">
          <p className="text-purple-200 dark:text-slate-700 mt-5 ml-auto flex items-center gap-1 mr-3 font-medium">
            Citeste acum
            <AiOutlineArrowRight className="mt-[2px]" />
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogPostCard;
