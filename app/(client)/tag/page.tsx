import Header from "@/app/components/layout/Header";
import config from "@/app/config";
import { Metadata } from "next";
import { Link } from "next-view-transitions";
import React from "react";
import { useTags } from "@/app/hooks/useTags";

export const revalidate = config.revalidate.default;

export const metadata: Metadata = {
  title: "Toate Tag-urile - CodeWiki",
  description: "Explorează toate tag-urile disponibile pe blogul CodeWiki și găsește articole și soluții relevante pentru programarea competitivă.",
  openGraph: {
    title: "Toate Tag-urile - CodeWiki",
    description: "Caută și explorează toate tag-urile disponibile pe CodeWiki pentru a găsi articole și soluții despre programarea competitivă și algoritmi.",
    type: "website",
    locale: "ro_RO",
    url: "https://www.codewiki.blog/tags",
    siteName: "CodeWiki",
  },
  keywords: "tag-uri programare, tag-uri blog, olimpiada de informatica, probleme olimpiada de informatica, ghid pregatire olimpiada informatica, articole programare, CodeWiki, programare competitivă, algoritmi",
};

const TagsPage = async () => {
  const tags = await useTags();

  return (
    <div className="max-w-[1024px] mx-auto py-12">
      <Header title="Toate etichetele" />
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 p-4 mb-20">
        {tags.map((tag) => (
          <Link key={tag._id} href={`/tag/${tag.slug.current}`}>
            <div className="flex flex-col items-center p-4 border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 ease-in-out cursor-pointer hover:bg-purple-100 dark:hover:bg-purple-800">
              <div className="text-purple-600 dark:text-purple-400 font-semibold text-lg">
                #{tag.name}
              </div>
              <div className="mt-2 text-gray-700 dark:text-gray-300 text-sm">
                {tag.postCount} {tag.postCount === 1 ? 'post' : 'posts'}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TagsPage;
