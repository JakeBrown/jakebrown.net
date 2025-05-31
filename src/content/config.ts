import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    tags: z.array(z.string()).optional(),
    status: z.enum(['draft', 'unlisted', 'published']).default('published'),
  }),
});

export const collections = { blog };