import { client } from "@/sanity/lib/client";

import Head from "next/head";

import { Post } from "../utils/interface";
import HeroSection from "../components/HeroSection";
import Courses from "../components/CoursesSection";
import Features from "../components/Features";
import ArticlesSection from "../components/ArticlesGrid";
import PageDivider from "../components/PageDivider";

import "./globals.css";

async function getPosts() {
  const query = `
  *[_type == "post"] {
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


export const revalidate = 60; // 1 minute

export const metadata = {
  title: "CodeWiki",
  description: "codewiki.tech - a competitive programming blog",
};

export default async function Home() {
  // TODO: Adjust the color of the page divider
  // TODO: Add metadata to the pages

  

  const posts: Post[] = await getPosts();

  return (
    <div>
      <Head>
        <title>My Blog - Home</title>
      </Head>
      <div className="flex-grow bg-pattern bg-cover">
        <HeroSection />
        <PageDivider />
      </div>
      <Courses />
      <Features />
      <div className="mx-auto max-w-5xl px-6">
        {posts && (
          <ArticlesSection headerTitle="Articole recente" blogs={{ data: posts }} />
        )}
      </div>
    </div>
  );
}
