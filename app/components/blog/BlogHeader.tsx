import React from 'react';
import { formatDate } from "@/app/utils/dateUtils";
import TagList from './TagList';

interface BlogHeaderProps {
  post: any;
}

const BlogHeader: React.FC<BlogHeaderProps> = ({ post }) => (
  <div className="max-w-3xl mx-auto text-center mb-6 px-4 sm:px-6">
    <h1 className="text-3xl lg:text-5xl font-bold mb-2 pt-10">{post.title}</h1>
    <div className="flex justify-center items-center space-x-4 text-sm lg:text-base text-text-500">
      <span>{formatDate(post.publishedAt)}</span>
      <span>•</span>
      <span>Autor: {post.author}</span>
    </div>
    <TagList tags={post.tags} />
  </div>
);

export default BlogHeader;