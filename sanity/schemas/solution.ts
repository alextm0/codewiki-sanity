import { Rule } from "sanity";

export const solution = {
  name: "solution",
  title: "Solution",
  type: "document",
  fields: [
    // Basic problem details first
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Title is required"),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule: Rule) => Rule.required().error("Slug is required"),
    },
    {
      name: "problemLink",
      title: "Problem Link",
      type: "url",
      validation: (Rule: Rule) => Rule.required().uri({ scheme: ["http", "https"] }).error("Valid URL is required"),
    },
    {
      name: "problemSource",
      title: "Problem Source",
      type: "string",
    },

    // Main content of the solution
    {
      name: "body",
      title: "Body",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          fields: [
            {
              type: "text",
              name: "alt",
              title: "Alt",
              validation: (Rule: Rule) => Rule.required().error("Alt text is required"),
            },
          ],
        },
      ],
      validation: (Rule: Rule) => Rule.required().min(1).error("Body content is required"),
    },

    // Metadata and additional information
    {
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (Rule: Rule) => Rule.required().error("Publication date is required"),
    },
    {
      name: "author",
      title: "Author",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Author is required"),
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "reference", to: [{ type: "tag" }] }],
      validation: (Rule: Rule) => Rule.optional(),
    },
    {
      name: "difficultyLevel",
      title: "Difficulty Level",
      type: "string",
      options: {
        list: [
          { title: "Easy", value: "easy" },
          { title: "Medium", value: "medium" },
          { title: "Hard", value: "hard" },
        ],
      },
      validation: (Rule: Rule) => Rule.optional(),
    },
    {
      name: "relatedSolutions",
      title: "Related Solutions",
      type: "array",
      of: [{ type: "reference", to: [{ type: "solution" }] }],
      validation: (Rule: Rule) => Rule.optional(),
    },
  ],
};
