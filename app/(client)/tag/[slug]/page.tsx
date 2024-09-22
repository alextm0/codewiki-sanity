import React from "react";
import { Metadata } from "next";
import { FaRegSadTear } from "react-icons/fa";
import Link from "next/link";
import config from "@/app/config";
import ArticlesGrid from "@/app/components/blog/ArticlesGrid";
import { usePostsByTag } from "@/app/hooks/usePostsByTag";

export const revalidate = config.revalidate.articleList;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  return {
    title: `#${params.slug} - CodeWiki`,
    description: `Articole cu tag-ul ${params.slug} pe CodeWiki`,
    openGraph: {
      title: `#${params.slug} - CodeWiki`,
      description: `Articole cu tag-ul ${params.slug} pe CodeWiki`,
      type: "website",
      locale: "ro_RO",
      url: `https://www.codewiki.blog/tag/${params.slug}`,
      siteName: "CodeWiki",
    },
  };
}

interface Params {
  params: {
    slug: string;
  };
}

export default async function TagPage({ params }: Params) {
  const posts = await usePostsByTag(params.slug);

  return (
    <div className="max-w-5xl mx-auto px-6 mt-10">
      {posts.length > 0 ? (
        <ArticlesGrid posts={posts} headerTitle={`Articole cu tag-ul #${params.slug}`} />
      ) : (
        <div className="flex flex-col items-center text-center">
          <FaRegSadTear className="text-7xl text-blue-600 mb-6" />
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-5">
            Niciun articol găsit pentru tagul:
            <span className="block mt-2 text-4xl text-primary-600 font-extrabold">
              #{params.slug}
            </span>
          </h2>

          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Nu am găsit articole cu acest tag. Vă rugăm să încercați alt tag sau
            să explorați alte secțiuni ale site-ului nostru.
          </p>
          <Link href="/">
            <div className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-all duration-300">
              Înapoi la Acasă
            </div>
          </Link>
          <Link href="/tag">
            <div className="mt-4 text-blue-600 hover:text-blue-700 hover:underline transition-all duration-300">
              Explorează alte taguri
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}
