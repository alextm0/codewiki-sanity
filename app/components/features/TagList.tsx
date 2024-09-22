import React from 'react';
import Link from 'next/link';
import { Tag } from '@/app/utils/interface';

interface TagListProps {
  tags: Tag[];
}

const TagList: React.FC<TagListProps> = ({ tags }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {tags.map((tag) => (
        <Link key={tag._id} href={`/tag/${tag.slug.current}`}>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold hover:bg-blue-200 transition-colors">
            {tag.name} ({tag.postCount})
          </span>
        </Link>
      ))}
    </div>
  );
};

export default TagList;