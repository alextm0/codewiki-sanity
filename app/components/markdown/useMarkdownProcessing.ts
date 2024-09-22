import { extractResourcesTableData, extractProblemSetTableData } from './markdownUtils';

export const processMarkdown = (mdString: string) => {
  let processedMdString = mdString?.replace(/⁡/g, "");

  const resourcesTableData = extractResourcesTableData(processedMdString);
  const problemSetTableData = extractProblemSetTableData(processedMdString);

  const cleanedMdString = processedMdString
    .replace(/<ResourcesTable\s+header="[^"]+"\s+resource='[^']+'\/>/, "")
    .replace(/<ProblemSetTable\s+problemSetName="[^"]+"\s+problemSet='[^']+'\/>/,"");

  return {
    cleanedMdString,
    resourcesTableData: resourcesTableData || null,
    problemSetTableData: problemSetTableData || null,
  };
};

export type ResourcesTableData = {
  header: string;
  resource: Array<{
    source: string;
    title: string;
    link: string;
    description: string;
    sourceLink: string;
  }>;
};

export type ProblemSetTableData = {
  problemSetName: string;
  problemSet: Array<{
    solutionSlug: string;
    source: string;
    name: string;
    link: string;
    sourceLink: string;
    badge: "easy" | "normal" | "hard" | string;
    tags: string;
  }>;
};