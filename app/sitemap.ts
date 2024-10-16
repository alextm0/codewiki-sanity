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
    url: `https://www.codewiki.blog/articol/${post?.slug?.current}`,
    lastModified: new Date(post.publishedAt),
    priority: 0.64,
  }))

  return [
    {
      url: `https://www.codewiki.blog/`,
      lastModified: new Date(),
      priority: 1.0,
      changeFrequency: "weekly",
    },
    {
      url: "https://www.codewiki.blog/tag",
      lastModified: new Date(),
      priority: 0.7,
      changeFrequency: "weekly",
    },
    {
      url: "https://www.codewiki.blog/articole",
      lastModified: new Date(),
    },
    {
      url: "https://www.codewiki.blog/olimpiada/incepator",
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: "daily",
    },
    {
      url: "https://www.codewiki.blog/olimpiada/intermediar",
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: "daily",
    },
    {
      url: "https://www.codewiki.blog/olimpiada/avansat",
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: "daily",
    },
    {
      url: "https://www.codewiki.blog/contact",
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: "daily",
    },
    {
      url: "https://www.codewiki.blog/invata",
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: "daily",
    },
    ...postUrls
  ]
}