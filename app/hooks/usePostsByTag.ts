import { Post } from "@/app/utils/interface";
import { client } from "@/sanity/lib/client";

export async function usePostsByTag(tag: string) {
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

  const posts: Post[] = await client.fetch(query);
  return posts;
}