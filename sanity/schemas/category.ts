import { defineType } from "sanity";
import { topic } from "./topic";

export const category = defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    {
      name: "category",
      title: "Category",
      type: "string",
    },
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "topics",
      title: "Topics",
      type: "array",
      of: [{ type: "topic" }],
    },
    {
      name: "order",
      title: "Order",
      type: "number",
    },
  ],
});
