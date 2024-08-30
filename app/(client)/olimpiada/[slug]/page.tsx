import React from "react";
import { client } from "@/sanity/lib/client";
import { Category } from "@/app/utils/interface";
import CategorySection from "@/app/components/CategorySection";

import { v4 as uuidv4 } from 'uuid';

async function getAllCategories(slug : any): Promise<Category[]> {
  const query = `
  *[_type == "category" && category == "${slug}"] | order(order asc) {
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
  const categories = await client.fetch(query);
  return categories;
}

export const revalidate = 1;

interface Params {
  params: {
    slug: string;
  };
}

export default async function Page({params} : Params) {

  const categories = await getAllCategories(params.slug);

  return (
    <div>
      {categories.map((category) => (
        <CategorySection
          key={uuidv4()}
          name={category.name}
          category={category.category}
          topics={category.topics}
          description={category.description}
        />
      ))}
    </div>
  );
}
