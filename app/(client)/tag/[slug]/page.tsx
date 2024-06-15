import Header from "@/app/components/Header";
import PostComponent from "@/app/components/PostComponent";
import { Post } from "@/app/utils/interface";
import { client } from "@/sanity/lib/client";
import React from "react";

import ArticlesSection from "@/app/components/ArticlesGrid";

async function getPostsByTag(tag: string) {
  const query = `
  *[_type == "post" && references(*[_type == "tag" && slug.current == "${tag}"]._id)]{
    title,
    slug,
    publishedAt,
    excerpt,
    tags[]-> {
      _id,
      slug,
      name
    }
  }
  `;

  const posts = await client.fetch(query);
  return posts;
}

export const revalidate = 60;

export async function generateMetadata({ params }: Params) {
  return {
    title: `#${params.slug}`,
    description: `Posts with the tag ${params.slug}`,
    openGraph: {
      title: `#${params.slug}`,
      description: `Posts with the tag ${params.slug}`,
      type: "website",
      locale: "en_US",
      url: `https://codewiki-sanity.vercel.app/${params.slug}`,
      siteName: "CodeWiki",
    },
  };
}

interface Params {
  params: {
    slug: string;
  };
}




const page = async ({ params }: Params) => {  
  const posts: Array<Post> = await getPostsByTag(params.slug);
  console.log(posts, "posts by tag");

  return (
    <div>
      <div className="mx-auto max-w-5xl px-6">
        {posts && <ArticlesSection headerTitle="Articles by tag" blogs={{ data: posts }} />}
      </div>
    </div>
  );
};

export default page;