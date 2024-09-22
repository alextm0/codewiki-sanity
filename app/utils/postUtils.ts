import { client } from "@/sanity/lib/client";
import { extractMarkdownHeadings } from "./extractMarkdownHeadings";
import fs from 'fs';
import path from 'path';
import { Post } from './interface';

export async function getPost(slug: string, commentsOrder: string = "desc") {
  const query = `
    *[_type == "post" && slug.current == "${slug}" && published == true][0] {
      title,
      slug,
      author,
      published,
      publishedAt,
      excerpt,
      markdownFile {
        asset -> {
          url
        }
      },
      coverImage {
        asset-> {
          url
        },
        alt
      },
      _id,
      tags[]-> {
        _id,
        slug,
        name
      },
      "comments": *[_type == "comment" && post._ref == ^._id && published == true] | order(_createdAt ${commentsOrder}) {
        name,
        comment,
        published,
        _createdAt,
      },
    }
  `;

  const post = await client.fetch(query);

  if (!post) return null;

  let markdownContent = "";

  if (process.env.NODE_ENV === 'development') {
    const localMarkdownPath = path.join(process.cwd(), 'content', `${slug}.md`);
    if (fs.existsSync(localMarkdownPath)) {
      markdownContent = fs.readFileSync(localMarkdownPath, 'utf-8');
    }
  }

  if (!markdownContent && post.markdownFile?.asset?.url) {
    const res = await fetch(post.markdownFile.asset.url);
    markdownContent = await res.text();
  }

  const allHeadings = extractMarkdownHeadings(markdownContent);

  return { ...post, markdownContent, allHeadings };
}

export async function getPosts(): Promise<Post[]> {
  const query = `
    *[_type == "post" && published == true] | order(publishedAt desc) {
      title,
      slug,
      author,
      published,
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