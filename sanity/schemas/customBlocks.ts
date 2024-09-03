import { defineType } from "sanity";

export const noteBlock = defineType({
  name: "noteBlock",  // Renamed to 'noteBlock' to avoid conflict
  title: "Note Block",
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
