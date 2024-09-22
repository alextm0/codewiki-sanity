import { client } from "@/sanity/lib/client";

import { Post } from "../utils/interface";
import HeroSection from "../components/features/HeroSection";
import Courses from "../components/features/CoursesSection";
import Features from "../components/features/Features";
import ArticlesGrid from "../components/blog/ArticlesGrid";
import PageDivider from "../components/ui/PageDivider";

import "./globals.css";
import config from "../config";

async function getPosts() {
  const query = `
  *[_type == "post" && published == true] | order(publishedAt desc) {
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

export const revalidate = config.revalidate.default;

export const metadata = {
  title: "CodeWiki - Blog despre programare competitivă",
  description: "CodeWiki este un blog de programare competitivă ce oferă articole detaliate, tutoriale de algoritmi, și resurse pentru pregătirea concursurilor de programare. Învățați cum să rezolvați probleme complexe și să vă pregătiți pentru olimpiadele de informatică.",
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
          <ArticlesGrid headerTitle="Cele mai recente articole" posts={posts} />
        )}
      </div>
    </div>
  );
}
