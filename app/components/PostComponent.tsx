import Link from "next/link";
import React from "react";
import { Lilita_One, VT323 } from "next/font/google";
import { Post } from "../utils/interface";
import { AiOutlineArrowRight } from "react-icons/ai";

import Image from "next/image";
import ArticleImage from "@/public/assets/ArticleImage.png";

interface Props {
  post: Post;
}

const font = Lilita_One({ weight: "400", subsets: ["latin"] });
const dateFont = VT323({ weight: "400", subsets: ["latin"] });

const BlogPostCard = ({ post }: Props) => {
  return (
    <div className="bg-amber-50 dark:bg-white overflow-hidden shadow-lg transition duration-500 ease-in-out transform hover:shadow-lg hover:shadow-slate-400 rounded-xl md:w-80">
      <div className="relative h-48 w-full">
        <Image
          src={ArticleImage}
          alt="Image description"
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* Tags */}
      <div className="pl-4 pt-4 text-sm font-medium">
        <div className="flex items-center ">
          <div className="text-sm text-gray-600 font-medium">
            <div className="m-1 rounded text-xs text-orange-500 ">
              {post?.tags?.map((tag) => (
                <span
                  key={tag._id}
                  className="mr-2 p-1 rounded-lg text-sm lowercase dark:bg-orange-100 border"
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
            <AiOutlineArrowRight className="mt-[2px]" />{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogPostCard;
