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
    }
  ]
});
