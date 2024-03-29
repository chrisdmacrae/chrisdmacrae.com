declare module 'astro:content' {
	export { z } from 'astro/zod';
	export type CollectionEntry<C extends keyof typeof entryMap> =
		(typeof entryMap)[C][keyof (typeof entryMap)[C]] & Render;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<
				import('astro/zod').AnyZodObject,
				import('astro/zod').AnyZodObject
		  >;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	type BaseCollectionConfig<S extends BaseSchema> = {
		schema?: S;
		slug?: (entry: {
			id: CollectionEntry<keyof typeof entryMap>['id'];
			defaultSlug: string;
			collection: string;
			body: string;
			data: import('astro/zod').infer<S>;
		}) => string | Promise<string>;
	};
	export function defineCollection<S extends BaseSchema>(
		input: BaseCollectionConfig<S>
	): BaseCollectionConfig<S>;

	type EntryMapKeys = keyof typeof entryMap;
	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidEntrySlug<C extends EntryMapKeys> = AllValuesOf<(typeof entryMap)[C]>['slug'];

	export function getEntryBySlug<
		C extends keyof typeof entryMap,
		E extends ValidEntrySlug<C> | (string & {})
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getCollection<C extends keyof typeof entryMap>(
		collection: C,
		filter?: (data: CollectionEntry<C>) => boolean
	): Promise<CollectionEntry<C>[]>;

	type InferEntrySchema<C extends keyof typeof entryMap> = import('astro/zod').infer<
		Required<ContentConfig['collections'][C]>['schema']
	>;

	type Render = {
		render(): Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	};

	const entryMap: {
		"articles": {
"choosing-the-right-amount-of-design-scope.mdx": {
  id: "choosing-the-right-amount-of-design-scope.mdx",
  slug: string,
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
},
"generating-social-images-with-astro.mdx": {
  id: "generating-social-images-with-astro.mdx",
  slug: string,
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
},
"how-to-do-dark-mode-with-ssg.mdx": {
  id: "how-to-do-dark-mode-with-ssg.mdx",
  slug: string,
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
},
"reading-is-neccessary-but-not-sufficient.mdx": {
  id: "reading-is-neccessary-but-not-sufficient.mdx",
  slug: string,
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
},
"the-myth-of-the-story-point.mdx": {
  id: "the-myth-of-the-story-point.mdx",
  slug: string,
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
},
"why-interface-designers-should-pair-by-default.mdx": {
  id: "why-interface-designers-should-pair-by-default.mdx",
  slug: string,
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
},
"write-a-winning-article-in-less-than-10-steps.mdx": {
  id: "write-a-winning-article-in-less-than-10-steps.mdx",
  slug: string,
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
},
},
"pages": {
"about.mdx": {
  id: "about.mdx",
  slug: "about",
  body: string,
  collection: "pages",
  data: any
},
},

	};

	type ContentConfig = typeof import("../src/content/config");
}
