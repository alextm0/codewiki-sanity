import React from 'react';
import { Link } from "next-view-transitions";

interface TagListProps {
  tags: any[];
}

const TagList: React.FC<TagListProps> = ({ tags }) => (
  <div className="mt-4 space-x-2 flex justify-center flex-wrap">
    {tags?.map((tag: any) => (
      <Link key={tag._id} href={`/tag/${tag.slug.current}`}>
        <span className="font-inter bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs lg:text-sm font-semibold lowercase tracking-wide transition duration-300 ease-in-out hover:bg-blue-200 hover:text-blue-700">
          {tag.name}
        </span>
      </Link>
    ))}
  </div>
);

export default TagList;