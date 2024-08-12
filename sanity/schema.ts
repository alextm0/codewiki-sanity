import { type SchemaTypeDefinition } from 'sanity';
import { post } from './schemas/post';
import { tag } from './schemas/tag';
import { comment } from './schemas/comment';
import { category } from './schemas/category';
import { topic } from './schemas/topic';
import { solution } from './schemas/solution';
import { noteBlock } from './schemas/customBlocks'; // Import the custom block

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, tag, comment, category, topic, solution, noteBlock], // Add the custom block here
};
