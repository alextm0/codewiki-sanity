import React, { Suspense } from 'react';
import dynamic from "next/dynamic";
import MarkdownRender from "@/app/components/markdown/MarkdownComponent";
import Toc from '@/app/components/toc/Toc'

const AddComment = dynamic(() => import("@/app/components/form/AddComment"));
const AllComments = dynamic(() => import("@/app/components/form/AllComments"));

interface BlogContentProps {
  post: any;
  commentsOrder: string;
}

const BlogContent: React.FC<BlogContentProps> = ({ post, commentsOrder }) => (
  <div className="max-w-7xl mx-auto px-4 sm:pl-2 sm:pr-6 xl:px-0 sm:mt-8 flex flex-col lg:flex-row">
    <div className="lg:w-1/4 lg:mr-8">
      <div className="lg:sticky lg:top-8">
        {post.allHeadings.length > 0 && <Toc headings={post.allHeadings} />}
      </div>
    </div>
    <main className="lg:w-3/4 mx-auto">
      <div className={`max-w-4xl mx-auto ${richTextStyles}`}>
        <MarkdownRender mdString={post.markdownContent} />
        <Suspense fallback={<div>Loading comments...</div>}>
          <AddComment postId={post._id} />
          <AllComments comments={post.comments || []} slug={post.slug?.current} commentsOrder={commentsOrder} />
        </Suspense>
      </div>
    </main>
  </div>
);

const richTextStyles = `
  mt-14
  text-justify
  max-w-4xl
  m-auto
  prose-headings:my-5
  prose-heading:text-2xl
  prose-p:mb-5
  prose-p:leading-7
  prose-li:list-disc
  prose-li:leading-7
`;

export default BlogContent;