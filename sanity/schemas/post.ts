import { Rule } from "sanity";

export const post = {
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },
    {
      name: "author",
      title: "Author",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },
    {
      name: "published",
      title: "Published",
      type: "boolean",
      initialValue: true,
    },
    {
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      validation: (Rule: Rule) => Rule.max(250).error("Max 250 characters"),
    },
    {
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      fields: [
        {
          name: "alt",
          title: "Alternative Text",
          type: "text",
          validation: (Rule: Rule) =>
            Rule.required().error("Alternative text is required"),
        },
        {
          name: "caption",
          title: "Caption",
          type: "text",
        },
      ],
      options: {
        hotspot: true,
      },
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "reference", to: [{ type: "tag" }] }],
    },

    {
      name: "markdownFile",
      title: "Markdown File",
      type: "file",
      options: {
        accept: ".md",
      },
    },    
  ],
};
