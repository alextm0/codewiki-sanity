import { defineType } from "sanity";

export const topic = defineType({
  name: "topic",
  title: "Topic",
  type: "object",
  fields: [
    {
      name: "topicName",
      title: "Topic Name",
      type: "string",
    },
    {
      name: "details",
      title: "Details",
      type: "text",
    },
    {
      name: "stars",
      title: "Stars",
      type: "number",
      validation: (Rule) => Rule.min(0).max(4), // Ensures the number of stars is between 1 and 5
    },
  ],
});
