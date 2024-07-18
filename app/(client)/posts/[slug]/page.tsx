import AddComment from "@/app/components/AddComment";
import AllComments from "@/app/components/AllComments";
import Header from "@/app/components/Header";
import MarkdownRender from "@/app/components/MarkdownComponent";
import Toc from "@/app/components/Toc";
import { slugify } from "@/app/utils/helpers";
import { Post } from "@/app/utils/interface";
import { client } from "@/sanity/lib/client";
import { portableTextToMarkdown } from "@/app/utils/portableTextToMarkdown";
import { Metadata } from "next";
import { VT323 } from "next/font/google";
import { Link } from "next-view-transitions";
import { notFound } from "next/navigation";
import React from "react";

import "@/app/(client)/markdown-styles.module.css";

import ResourcesTable from "@/app/components/ResourcesTable";
import ProblemSetTable from "@/app/components/ProblemSetTable";

// Import globals.css

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
  const commentsOrder = searchParams?.comments || "desc";
  const post: Post = await getPost(params?.slug, commentsOrder.toString());

  if (!post) {
    notFound();
  }  

  const markdownContent = portableTextToMarkdown(post?.body);  

  const exampleResource = {
    source: "source",
    title: "title",
    link: "https://example.com",
    description: "description",
  };

  /* interface Problem {
  source: string;
  name: string;
  link: string;
  sourceLink: string;
  badge: 'easy' | 'normal' | 'hard' | string;
  tags: string;
}*/

  const exampleProblemSet = {
    problemSetName: "problemSetName",
    problemSet: [
      {
        source: "source",
        name: "name",
        link: "https://example.com",
        sourceLink: "https://example.com",
        badge: "easy",
        tags: "tags",
      },
    ],
  };

  return (
    <div>
      <Header title={post?.title} />
      <div className="text-center">
        <span className={`${dateFont?.className} text-purple-500`}>
          {new Date(post?.publishedAt).toDateString()}
        </span>
        <div className="mt-5">
          {post?.tags?.map((tag) => (
            <Link key={tag?._id} href={`/tag/${tag.slug.current}`}>
              <span className="mr-2 p-1 rounded-sm text-sm lowercase dark:bg-gray-950 border dark:border-gray-900">
                #{tag.name}
              </span>
            </Link>
          ))}
        </div>
        <Toc headings={post?.headings} />
        <div className={richTextStyles}>
          <MarkdownRender mdString={markdownContent} />
          <ResourcesTable header="Resources" resource={[exampleResource]} />
          <ProblemSetTable {...exampleProblemSet} />
          <AddComment postId={post?._id} />
          <AllComments
            comments={post?.comments || []}
            slug={post?.slug?.current}
            commentsOrder={commentsOrder.toString()}
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
  max-w-3xl
  m-auto
  prose-headings:my-5
  prose-heading:text-2xl
  prose-p:mb-5
  prose-p:leading-7
  prose-li:list-disc
  prose-li:leading-7
  prose-li:ml-4
`;
