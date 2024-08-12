import { defineType } from "sanity";

export const noteBlock = defineType({
  name: "note",
  title: "Note",
  type: "object",
  fields: [
    {
      name: "style",
      title: "Style",
      type: "string",
      options: {
        list: [
          { title: "Note", value: "note" },
          { title: "Info", value: "info" },
          { title: "Warning", value: "warning" },
        ],
      },
    },
    {
      name: "content",
      title: "Content",
      type: "text",
    },
  ],
});
