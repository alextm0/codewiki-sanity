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

export const revalidate = 60;

function capitalizeFirstLetter(str : string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export async function generateMetadata({ params }: Params) {
  const categories = await getAllCategories(params.slug);
  const title = `${capitalizeFirstLetter(params.slug)} | Pregătire pentru Olimpiada de Informatică | CodeWiki`;
  const description = `Descoperă tehnici de programare pentru pregătire pentru olimpiada de informatică la nivel ${params.slug}. Învață și îmbunătățește-ți abilitățile de programare cu resursele noastre.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      locale: "ro_RO",
      url: `https://www.codewiki.blog/olimpiada/${params.slug}`,
      siteName: "CodeWiki",
    },
    keywords: categories.map(category => category.name).join(', '),
  };
}

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
