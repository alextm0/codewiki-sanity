import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import CategorySection from "@/app/components/features/CategorySection";
import { useCategories } from "@/app/hooks/useCategories";
import config from "@/app/config";
import { capitalizeFirstLetter } from "@/app/utils/string-utils";

export const revalidate = config.revalidate.default;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const validSlugs = ["incepator", "intermediar", "avansat"];
  if (!validSlugs.includes(params.slug)) {
    notFound();
  }

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
  };
}

export default async function Page({ params }: Params) {
  const validSlugs = ["incepator", "intermediar", "avansat"];
  if (!validSlugs.includes(params.slug)) {
    notFound();
  }

  const categories = await useCategories(params.slug);

  return (
    <div>
      {categories.map((category) => (
        <CategorySection
          key={category.name}
          name={category.name}
          category={category.category}
          topics={category.topics}
          description={category.description}
        />
      ))}
    </div>
  );
}

interface Params {
  params: {
    slug: string;
  };
}