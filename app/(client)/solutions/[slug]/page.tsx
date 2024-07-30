import React from "react";
import { client } from "@/sanity/lib/client";
import MarkdownRender from "@/app/components/MarkdownComponent";
import { notFound } from "next/navigation";
import { VT323 } from "next/font/google";
import "@/app/(client)/markdown-styles.module.css";
import { portableTextToMarkdown } from "@/app/utils/portableTextToMarkdown";

const dateFont = VT323({ weight: "400", subsets: ["latin"] });

interface Params {
  params: {
    slug: string;
  };
}

async function getSolution(slug: string) {
  const query = `
    *[_type == "solution" && slug.current == "${slug}"][0] {
      title,
      slug,
      publishedAt,
      problemLink,
      body,
      tags[]-> {
        _id,
        slug,
        name
      },
      author,
      difficultyLevel,
      relatedSolutions[]-> {
        _id,
        slug,
        title
      }
    }
  `;
  const solution = await client.fetch(query);
  return solution;
}

export const revalidate = 60;

const SolutionPage = async ({ params }: Params) => {
  const solution = await getSolution(params.slug);

  if (!solution) {
    notFound();
    return null;
  }

  const markdownContent = portableTextToMarkdown(solution.body || "");

  return (
    <div className="font-inter w-full max-w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 px-4 sm:px-6">
          <a
            href={solution.problemLink}
            target="_blank"
            rel="noopener noreferrer"
            className=""
          >
            <h1 className="text-3xl lg:text-5xl font-bold mb-2 pt-10">
              {solution.title}
            </h1>
          </a>
          <div className="flex justify-center items-center space-x-4 text-sm lg:text-base text-gray-600">
            <span className={dateFont.className}>
              {new Date(solution.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span>•</span>
            <span>Author: {solution.author}</span>
            <span>•</span>
            <span>Difficulty: {solution.difficultyLevel}</span>
          </div>
          <div className="mt-4 space-x-2 flex justify-center flex-wrap">
            {solution.tags?.map((tag: any) => (
              <a
                key={tag._id}
                href={`/tag/${tag.slug}`}
                className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs lg:text-sm"
              >
                {tag.name}
              </a>
            ))}
          </div>
          {solution.problemLink && (
            <div className="mt-4">
              <a
                href={solution.problemLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 "
              >
                View Problem Statement
              </a>
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row">
          <main className="lg:w-3/4 mx-auto">
            <div className={richTextStyles}>
              <MarkdownRender mdString={markdownContent} />
              {/* Here you can add a comment component if needed */}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default SolutionPage;

const richTextStyles = `
  mt-14
  text-justify
  max-w-4xl
  m-auto
  prose-headings:my-5
  prose-heading:text-2xl
  prose-p:mb-5
  prose-p:leading-7
  prose-li:list-disc
  prose-li:leading-7
  prose-li:ml-4
`;
