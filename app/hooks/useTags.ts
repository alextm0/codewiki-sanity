import { Tag } from "@/app/utils/interface";
import { client } from "@/sanity/lib/client";

export async function useTags() {
  const query = `
    *[_type == "tag"] {
      name,
      slug,
      published, 
      _id,
      "postCount": count(*[_type == "post" && published == true && references("tags", ^._id)])
    }
  `;
  const tags: Tag[] = await client.fetch(query);
  return tags.filter((tag) => tag.postCount && tag.postCount > 0);
}
