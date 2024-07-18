export const resourcesTable = {
  name: "resourcesTable",
  title: "Resources Table",
  type: "object",
  fields: [
    {
      name: "header",
      title: "Header",
      type: "string",
    },
    {
      name: "resource",
      title: "Resource",
      type: "array",
      of: [{ type: "resource" }],
    },
  ],
};
