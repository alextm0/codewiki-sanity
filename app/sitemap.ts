import { client } from "@/sanity/lib/client";
import { MetadataRoute } from "next";
import { Post } from "./utils/interface";

export default async function sitemap():Promise<MetadataRoute.Sitemap> {
  async function getPosts() {
    const query = `
    *[_type == "post"] {
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
    const data = await client.fetch(query);
    return data;
  }

  const posts: Post[] = await getPosts();

  const postUrls = posts.map((post) => ({
    url: `https://codewiki-sanity.vercel.app/posts/${post.slug.current}`,
    lastModified: new Date(post.publishedAt),
    priority: 0.64,
  }))

  return [
    {
      url: `https://codewiki-sanity.vercel.app/`,
      lastModified: new Date(),
      priority: 1.0,
      changeFrequency: "weekly",
    },
    {
      url: "https://codewiki-sanity.vercel.app/tag",
      lastModified: new Date(),
      priority: 0.7,
      changeFrequency: "weekly",
    },
    {
      url: "https://codewiki-sanity.vercel.app/articles",
      lastModified: new Date(),
    },
    {
      url: "https://codewiki-sanity.vercel.app/olimpiada/incepator",
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: "daily",
    },
    {
      url: "https://codewiki-sanity.vercel.app/olimpiada/intermediar",
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: "daily",
    },
    {
      url: "https://codewiki-sanity.vercel.app/olimpiada/avansat",
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: "daily",
    },
    ...postUrls
  ]
}