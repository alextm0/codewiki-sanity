import { type SchemaTypeDefinition } from 'sanity'
import { post } from './schemas/post'
import { tag } from './schemas/tag'
import { comment } from './schemas/comment'
import { category } from './schemas/category'
import { topic } from './schemas/topic'
import { resource } from './schemas/resource'
import { resourcesTable } from './schemas/resourcesTable'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, tag, comment, category, topic, resource, resourcesTable],
}
