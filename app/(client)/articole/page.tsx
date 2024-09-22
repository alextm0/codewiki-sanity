import React from 'react';
import { Metadata } from "next";
import { getPosts } from "@/app/utils/postUtils";
import ArticlesGrid from "@/app/components/blog/ArticlesGrid";
import config from "@/app/config";

export const metadata: Metadata = {
  title: 'Articole de Programare Competitivă - CodeWiki',
  description: 'Descoperă articole detaliate despre programare competitivă pe CodeWiki. Învață algoritmi, structuri de date și pregătește-te pentru concursuri de programare cu ghidurile și tutorialele noastre experte.',
  keywords: 'blog informatica, blog olimpiada informatica, articole olimpiada informatica, tutoriale algoritmi, olimpiada de informatica, structuri de date, pregătire olimpiada de informatica, informatică, olimpiada, CodeWiki, codewiki',
};

export const revalidate = config.revalidate.articleList;

export default async function ArticlesPage() {
  const posts = await getPosts();

  return (
    <div className="max-w-5xl mx-auto px-6">
      <ArticlesGrid posts={posts} headerTitle="Cele mai recente articole" />
    </div>
  );
}