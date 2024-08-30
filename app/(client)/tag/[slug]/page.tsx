import Header from "@/app/components/Header";
import PostComponent from "@/app/components/PostComponent";
import { Post } from "@/app/utils/interface";
import { client } from "@/sanity/lib/client";
import React from "react";
import ArticlesSection from "@/app/components/ArticlesGrid";
import { FaRegSadTear } from "react-icons/fa"; // Import an icon for visual effect
import Link from "next/link"; // Import Link for navigation

async function getPostsByTag(tag: string) {
  const query = `
  *[_type == "post" && references(*[_type == "tag" && slug.current == "${tag}"]._id)]{
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

const Page = async ({ params }: Params) => {
  const posts: Array<Post> = await getPostsByTag(params.slug);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-background-50 dark:bg-gray-900 px-4 py-16">
      {posts && posts.length > 0 ? (
        <div className="mx-auto max-w-5xl px-6">
          <ArticlesSection
            headerTitle={`#${params.slug}`}
            blogs={{ data: posts }}
          />
        </div>
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
          <Link href="/tags">
            <div className="mt-4 text-blue-600 hover:text-blue-700 hover:underline transition-all duration-300">
              Explorează alte taguri
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Page;
