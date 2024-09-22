import { client } from "@/sanity/lib/client";
import { Tag } from './interface';

export async function getTags(): Promise<Tag[]> {
  const query = `
    *[_type == "tag"] {
      name,
      slug,
      _id,
      "postCount": count(*[_type == "post" && published == true && references("tags", ^._id)])
    }
  `;
  const tags = await client.fetch(query);
  return tags;
}