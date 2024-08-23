import React from "react";
import AddComment from "@/app/components/AddComment";
import AllComments from "@/app/components/AllComments";
import MarkdownRender from "@/app/components/MarkdownComponent";
import Toc from "@/app/components/Toc";
import { client } from "@/sanity/lib/client";
import { portableTextToMarkdown } from "@/app/utils/portableTextToMarkdown";
import { Metadata } from "next";
import { Link } from "next-view-transitions";
import { notFound } from "next/navigation";
import Image from "next/image";
import "@/app/(client)/markdown-styles.module.css";
import { slugify } from "@/app/utils/helpers";

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
  *[_type == "post" && slug.current == "${slug}" && published == true][0] {
    title,
    slug,
    published,
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

  if (!post) {
    return null;
  }

  const markdownContent = portableTextToMarkdown(post?.body || "");
  const markdownHeadings = extractMarkdownHeadings(markdownContent);
  const allHeadings = [...(post.headings || []), ...markdownHeadings];

  return { ...post, markdownContent, allHeadings };
}

function extractMarkdownHeadings(markdownContent: string) {
  const headingRegex = /^(#{1,6})\s+(.*)$/gm;
  const headings = [];
  let match;

  while ((match = headingRegex.exec(markdownContent)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const slug = slugify(text);
    headings.push({ level, text, slug });
  }

  return headings;
}

export const revalidate = 1;

export async function generateMetadata({ params }: Params): Promise<Metadata | undefined> {
  const post = await getPost(params?.slug);

  if (!post || !post.title || !post.markdownContent) {
    notFound();
    return;
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      locale: "ro_RO",
      url: `https://codewiki-sanity.vercel.app/${params.slug}`,
      siteName: "CodeWiki",
    },
  };
}

const Page = async ({ params, searchParams }: Params) => {
  const commentsOrder = searchParams?.comments?.toString() || "desc";
  const post = await getPost(params?.slug, commentsOrder);

  // Console log the comments
  console.log("Post", post.comments);

  if (!post) {
    notFound();
    return null;
  }

  const { markdownContent, allHeadings } = post;

  return (
    <div className="font-inter w-full max-w-full">
      <div className="max-w-7xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 px-4 sm:px-6">
          <h1 className="text-3xl lg:text-5xl font-bold mb-2 pt-10">{post.title}</h1>
          <div className="flex justify-center items-center space-x-4 text-sm lg:text-base text-text-500">
            <span>{new Date(post.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
            <span>•</span>
            <span>Autor: Alexandru Toma</span>
          </div>
          <div className="mt-4 space-x-2 flex justify-center flex-wrap">
            {post.tags?.map((tag: any) => (
              <Link key={tag._id} href={`/tag/${tag.slug.current}`}>
                <span className="font-inter bg-secondary-100 text-secondary-500 font-semibold px-3 py-1 rounded-full text-xs lowercase tracking-wide">{tag.name}</span>
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

        <div className="max-w-7xl mx-auto pl-2 pr-6 xl:px-0 sm:mt-8 flex flex-col lg:flex-row">
          <div className="lg:w-1/4 lg:mr-8">
            <div className="lg:sticky lg:top-8">
              {allHeadings.length > 0 && <Toc headings={allHeadings} />}
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
`;
