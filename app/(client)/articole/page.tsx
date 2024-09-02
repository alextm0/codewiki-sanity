import React from 'react'

import { client } from "@/sanity/lib/client";
import Head from "next/head";

import { Post } from "@/app/utils/interface";
import ArticlesSection from "@/app/components/ArticlesGrid";

async function getPosts() {
  const query = `
  *[_type == "post" && published == true] {
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
    tags[]-> {
      _id,
      slug,
      name
    }
  }
  `;
  const data = await client.fetch(query);
  return data;
}

export const revalidate = 60;

export const metadata = {
  title: 'Articole - CodeWiki',
  description:
    'codewiki.tech - a competitive programming blog',
};

export default async function Page() {
  const posts: Post[] = await getPosts();

  return (
    <div>
      <Head>
        <title>Articole</title>
      </Head>

      <div className="mx-auto max-w-5xl px-6">
        {posts && <ArticlesSection headerTitle="Cele mai recente articole" blogs={{ data: posts }} />}
      </div>
    </div>
  )
}