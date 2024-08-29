import { client } from "@/sanity/lib/client";

import { Post } from "../utils/interface";
import HeroSection from "../components/HeroSection";
import Courses from "../components/CoursesSection";
import Features from "../components/Features";
import ArticlesSection from "../components/ArticlesGrid";
import PageDivider from "../components/PageDivider";

import "./globals.css";

async function getPosts() {
  const query = `
  *[_type == "post" && published == true]{
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
  const posts: Post[] = await getPosts();

  return (
    <div className="overflow-x-hidden bg-background-50">
      <div className="bg-pattern bg-cover">
        <HeroSection />
        <PageDivider />
      </div>
      <Courses />
      <Features />
      <div className="max-w-5xl mx-auto px-6">
        {posts && (
          <ArticlesSection headerTitle="Cele mai recente articole" blogs={{ data: posts }} />
        )}
      </div>
    </div>
  );
}
