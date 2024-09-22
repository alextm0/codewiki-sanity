export const extractTextFromNode = (node: any): string => {
  if (typeof node === "string") {
    return node;
  }
  if (node?.props && node?.props?.children) {
    return extractTextFromNode(node.props.children);
  }
  if (Array?.isArray(node)) {
    return node.map(extractTextFromNode).join("");
  }
  return "";
};

export const cleanHeading = (text: string) => {
  return text.replace(/\{#.*?\}/g, "").trim();
};

export const slugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
};

export const extractResourcesTableData = (mdString: string) => {
  const resourcesTableRegex = /<ResourcesTable\s+header="([^"]+)"\s+resource='([^']+)'/;
  const match = mdString.match(resourcesTableRegex);

  if (match) {
    const header = match[1];
    const resource = JSON.parse(match[2]);
    return { header, resource };
  }

  return null;
};

export const extractProblemSetTableData = (mdString: string) => {
  const problemSetTableRegex = /<ProblemSetTable\s+problemSetName="([^"]+)"\s+problemSet='([^']+)'/;
  const match = mdString.match(problemSetTableRegex);

  if (match) {
    const problemSetName = match[1];
    const problemSet = JSON.parse(match[2]);
    return { problemSetName, problemSet };
  }

  return null;
};