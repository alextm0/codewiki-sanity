import React, { Suspense } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostSkeleton from "@/app/components/ui/BlogPostSkeleton";
import { getPost } from "@/app/utils/postUtils"; // Import the server-side function
import "@/app/(client)/markdown-styles.module.css";
import BlogHeader from "@/app/components/blog/BlogHeader";
import CoverImage from "@/app/components/blog/CoverImage";
import BlogContent from "@/app/components/blog/BlogContent";
import config from "@/app/config";
export const revalidate = config.revalidate.article;

export async function generateMetadata({ params }: Params): Promise<Metadata | undefined> {
  const post = await getPost(params?.slug);
  if (!post || !post.title || !post.markdownContent) {
    notFound();
    return;
  }

  return {
    title: `${post.title} | CodeWiki - Articol de Programare Competitivă`,
    description: post.excerpt || "Descoperă un nou articol legat de programare competitivă pe CodeWiki.",
    openGraph: {
      title: post.title,
      description: post.excerpt || "Citește acest articol pe CodeWiki pentru a învăța mai multe despre programare competitivă și algoritmi.",
      type: "article",
      locale: "ro_RO",
      url: `https://www.codewiki.blog/articol/${params.slug}`,
      siteName: "CodeWiki",
      images: [post.coverImage],
    },
    keywords: post.tags?.join(", ") || "programare competitivă, algoritmi, olimpiada informatica, concursuri de programare, pregatire pentru olimpiada de informatica",
  };
}

const Page: React.FC<Params> = async ({ params, searchParams }) => {
  const commentsOrder = searchParams?.comments?.toString() || "desc";
  const post = await getPost(params?.slug);

  if (!post) {
    notFound();
    return null;
  }

  return (
    <Suspense fallback={<BlogPostSkeleton />}>
      <div className="font-inter w-full max-w-full">
        <div className="max-w-7xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
          <BlogHeader post={post} />
          <CoverImage coverImage={post.coverImage} title={post.title} />
          <BlogContent post={post} commentsOrder={commentsOrder} />
        </div>
      </div>
    </Suspense>
  );
};

export default Page;

type Params = {
  params: {
    slug: string;
  };
  searchParams: {
    comments: string;
  };
};

