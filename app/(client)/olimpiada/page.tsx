import React from "react";
import { client } from "@/sanity/lib/client";
import { Category } from "@/app/utils/interface";
import CategorySection from "@/app/components/CategorySection";
import OlimpiadaCards from "@/app/components/OlimpiadaCards";
import { v4 as uuidv4 } from 'uuid';

async function getAllCategories(): Promise<Category[]> {
  const query = `
    *[_type == "category" && category == "olimpiada"] | order(order asc) {
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
  return client.fetch(query);
}

export const revalidate = 1;

export default async function Page() {
  const categories = await getAllCategories();

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">


        {/* Olimpiada Cards Section */}
        <OlimpiadaCards />

      </div>
    </div>
  );
}
