import React from "react";
import AddComment from "@/app/components/AddComment";
import AllComments from "@/app/components/AllComments";
import MarkdownRender from "@/app/components/MarkdownComponent";
import Toc from "@/app/components/Toc";
import { Post } from "@/app/utils/interface";
import { client } from "@/sanity/lib/client";
import { portableTextToMarkdown } from "@/app/utils/portableTextToMarkdown";
import { Metadata } from "next";
import { VT323 } from "next/font/google";
import { Link } from "next-view-transitions";
import { notFound } from "next/navigation";
import Image from "next/image";
import "@/app/(client)/markdown-styles.module.css";

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
    author-> {
      name,
      image {
        asset-> {
          url
        }
      }
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

export async function generateMetadata({ params }: Params): Promise<Metadata | undefined> {
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
  const post = await getPost(params?.slug, commentsOrder);

  if (!post) {
    notFound();
    return null;
  }

  const markdownContent = portableTextToMarkdown(post.body || "");

  return (
    <div className="font-inter w-full max-w-full">
      <div className="max-w-7xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 px-4 sm:px-6">
          <h1 className="text-3xl lg:text-5xl font-bold mb-2 pt-10">{post.title}</h1>
          <div className="flex justify-center items-center space-x-4 text-sm lg:text-base text-gray-600">
            <span>{new Date(post.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
            <span>•</span>
            <span>Author: Alexandru Toma</span>
          </div>
          <div className="mt-4 space-x-2 flex justify-center flex-wrap">
            {post.tags?.map((tag: any) => (
              <Link key={tag._id} href={`/tag/${tag.slug.current}`}>
                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs lg:text-sm">{tag.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {post.coverImage?.asset?.url && (
          <div className="relative overflow-hidden mb-4 ">
            <div className="max-w-7xl mx-auto">
              <Image
                src={post.coverImage.asset.url}
                alt={post.coverImage.alt || "Cover Image"}
                width={1920}
                height={1080}
                layout="responsive"
                objectFit="cover"
                className="rounded-md"
              />
            </div>
          </div>
        )}

        <div className="absolute max-w-7xl mx-auto pl-2 pr-6 xl:px-0 sm:mt-8 flex flex-col lg:flex-row">
          <div className="lg:w-1/4 lg:mr-8">
            <div className="lg:sticky lg:top-8">
              <Toc headings={post.headings} />
            </div>
          </div>
          <main className="lg:w-3/4 mx-auto">
            <div className={`max-w-4xl mx-auto ${richTextStyles}`}>
              <MarkdownRender mdString={markdownContent} />
              <AddComment postId={post._id} />
              <AllComments comments={post.comments || []} slug={post.slug?.current} commentsOrder={commentsOrder} />
            </div>
          </main>
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
