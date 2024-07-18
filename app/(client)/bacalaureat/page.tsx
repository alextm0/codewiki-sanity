import React, { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { Category } from "@/app/utils/interface";
import CategorySection from "@/app/components/CategorySection";

import { v4 as uuidv4 } from 'uuid';

async function getAllCategories(): Promise<Category[]> {
  const query = `
  *[_type == "category" && category == "bacalaureat"] | order(order asc) {
    name,
    category,
    topics[] {
      _type,
      topicName,
      details
    },
    order
  }
  `;
  const categories = await client.fetch(query);
  return categories;
}

export const revalidate = 1;

export default async function Page() {
  const categories = await getAllCategories();
  const bacalaureatCategory = categories[0];

  return (
    <div>
      {categories.map((category) => (
        <CategorySection
          key={uuidv4()}
          name={category.name}
          category={category.category}
          topics={category.topics}
        />
      ))}
    </div>
  );
}
