import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// The publishing workflow uses plain Markdown for stable, portable articles.
	loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
	schema: ({ image }) =>
		z.object({
			title: z.string().min(1),
			description: z.string().min(1),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			category: z.string().min(1),
			tags: z.array(z.string().min(1)).min(1),
			draft: z.boolean().default(false),
			heroImage: z.optional(image()),
		}),
});

export const collections = { blog };
