import { Category } from '@/app/utils/interface';
import { client } from "@/sanity/lib/client";

export async function useCategories(type: string): Promise<Category[]> {
  const query = `
    *[_type == "category" && category == $type] | order(order asc) {
      name,
      category,
      description,
      topics[] {
        _type,
        topicName,
        details,
        stars
      },
      order
    }
  `;
  return client.fetch(query, { type });
}