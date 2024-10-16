import React from "react";
import { client } from "@/sanity/lib/client";
import MarkdownRender from "@/app/components/markdown/MarkdownComponent";
import { notFound } from "next/navigation";
import "@/app/(client)/markdown-styles.module.css";
import { portableTextToMarkdown } from "@/app/utils/portableTextToMarkdown";

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

export async function generateMetadata({ params }: Params) {
  const solution = await getSolution(params.slug);

  if (!solution) {
    notFound();
    return null;
  }

  const title = `${solution.title} | Soluție completă - CodeWiki`;
  const description = `Găsește soluția detaliată pentru problema "${solution.title}". Nivel de dificultate: ${solution.difficultyLevel === "easy" ? "ușor" : solution.difficultyLevel === "normal" ? "mediu" : "avansat"}. Scrisă de ${solution.author}.`;
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      locale: "ro_RO",
      url: `https://www.codewiki.blog/solutie/${solution.slug.current}`,
      siteName: "CodeWiki",
    },
    keywords: `soluție problemă ${solution.title}, programare, algoritmi, informatică, CodeWiki, informatica, olimpiada de informatica, rezolvare problema olimpiada, rezolvare informatica, algoritmica`,
  };
}

export const revalidate = 1;

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
          >
            <h1 className="text-3xl lg:text-5xl font-bold mb-2 pt-10">
              {solution.title}
            </h1>
          </a>
          <div className="flex justify-center items-center space-x-4 text-sm lg:text-base text-gray-600">
            <span>Autor: {solution.author}</span>
            <span>•</span>
            <span>
              Dificultate:{" "}
              {solution.difficultyLevel === "easy"
                ? "usor"
                : solution.difficultyLevel === "normal"
                  ? "mediu"
                  : "avansat"}
            </span>
          </div>
          <div className="mt-4 flex justify-center flex-wrap space-x-2">
            {solution.tags?.map((tag: any) => (
              <a
                key={tag._id}
                href={`/tag/${tag.slug.current}`}
                className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs lg:text-sm font-semibold lowercase tracking-wide transition duration-300 ease-in-out hover:bg-blue-200 hover:text-blue-700"
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
                className="text-blue-600 transition duration-300 ease-in-out hover:text-blue-800"
              >
                Cerinta completa a problemei
              </a>
            </div>
          )}
        </div>

        <div className="max-w-7xl mx-auto pl-2 pr-6 xl:px-0 sm:mt-8 flex flex-col lg:flex-row">
          <main className="lg:w-3/4 mx-auto">
            <div className={`max-w-4xl mx-auto ${richTextStyles}`}>
              <MarkdownRender mdString={markdownContent} />
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
`;
