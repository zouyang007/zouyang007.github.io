import { getCollection, type CollectionEntry } from 'astro:content';

export type BlogPost = CollectionEntry<'blog'>;

export async function getPublishedPosts(): Promise<BlogPost[]> {
	const posts = await getCollection('blog', ({ data }) => !data.draft);
	return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export function getCategories(posts: BlogPost[]) {
	return [...new Set(posts.map((post) => post.data.category))].sort((a, b) =>
		a.localeCompare(b, 'zh-CN'),
	);
}

export function getTags(posts: BlogPost[]) {
	return [...new Set(posts.flatMap((post) => post.data.tags))].sort((a, b) =>
		a.localeCompare(b, 'zh-CN'),
	);
}
