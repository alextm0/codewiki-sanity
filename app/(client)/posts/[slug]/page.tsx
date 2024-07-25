import AddComment from "@/app/components/AddComment";
import AllComments from "@/app/components/AllComments";
import Header from "@/app/components/Header";
import MarkdownRender from "@/app/components/MarkdownComponent";
import Toc from "@/app/components/Toc";
import { Post } from "@/app/utils/interface";
import { client } from "@/sanity/lib/client";
import { portableTextToMarkdown } from "@/app/utils/portableTextToMarkdown";
import { Metadata } from "next";
import { VT323 } from "next/font/google";
import { Link } from "next-view-transitions";
import { notFound } from "next/navigation";
import React from "react";
import Image from "next/image";
import "@/app/(client)/markdown-styles.module.css";

import ResourcesTable from "@/app/components/ResourcesTable";
import ProblemSetTable from "@/app/components/ProblemSetTable";
import PageDivider from "@/app/components/PageDivider";

const dateFont = VT323({ weight: "400", subsets: ["latin"] });

interface Params {
  params: {
    slug: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

async function getPost(slug: string, commentsOrder: string = "desc") {
  const query = `
  *[_type == "post" && slug.current == "${slug}"][0] {
    title,
    slug,
    publishedAt,
    excerpt,
    coverImage {
      asset-> {
        url
      },
      alt
    },
    _id,
    "headings": body[style in ["h2", "h3", "h4", "h5", "h6"]],
    body,
    tags[]-> {
      _id,
      slug,
      name
    },
    "comments": *[_type == "comment" && post._ref == ^._id ] | order(_createdAt ${commentsOrder}) {
      name,
      comment,
      _createdAt,
    }
  }
  `;

  const post = await client.fetch(query);
  return post;
}

export const revalidate = 60;

export async function generateMetadata({
  params,
}: Params): Promise<Metadata | undefined> {
  const post: Post = await getPost(params?.slug);
  if (!post) {
    return;
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      locale: "en_US",
      url: `https://next-cms-blog-ce.vercel.app/${params.slug}`,
      siteName: "DevBlook",
    },
  };
}

const Page = async ({ params, searchParams }: Params) => {
  const commentsOrder = searchParams?.comments?.toString() || "desc";
  const post: Post = await getPost(params?.slug, commentsOrder);

  if (!post) {
    notFound();
    return null;
  }

  const markdownContent = portableTextToMarkdown(post.body || "");

  return (
    <div className="font-inter">
      <Header title={post.title} />
      <div className="text-center">
        <span className={`${dateFont?.className} text-purple-500`}>
          {new Date(post.publishedAt).toDateString()}
        </span>
        <div className="mt-5">
          {post.tags?.map((tag) => (
            <Link key={tag?._id} href={`/tag/${tag.slug.current}`}>
              <span className="font-poppins mr-2 p-1 rounded-sm text-sm lowercase dark:bg-gray-950 border dark:border-gray-900">
                {tag.name}
              </span>
            </Link>
          ))}
        </div>
        <Toc headings={post.headings} />

        {post.coverImage?.asset?.url && (
          <div className="my-8 mx-auto max-w-4xl relative overflow-hidden">
            <div className="-mx-4 sm:-mx-8 md:-mx-12 lg:-mx-16">
              <Image
                src={post.coverImage.asset.url}
                alt={post.coverImage.alt || "Cover Image"}
                width={1300}
                height={500}
                layout="responsive"
                objectFit="cover"
                className="rounded-md"
              />
            </div>
          </div>
        )}

        <div className={richTextStyles}>
          <MarkdownRender mdString={markdownContent} />
          <AddComment postId={post._id} />
          <AllComments
            comments={post.comments || []}
            slug={post.slug?.current}
            commentsOrder={commentsOrder}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;

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
  prose-li:ml-4
`;
