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

	export function getEntry<C extends keyof typeof entryMap, E extends keyof (typeof entryMap)[C]>(
		collection: C,
		entryKey: E
	): Promise<(typeof entryMap)[C][E] & Render>;
	export function getCollection<
		C extends keyof typeof entryMap,
		E extends keyof (typeof entryMap)[C]
	>(
		collection: C,
		filter?: (data: (typeof entryMap)[C][E]) => boolean
	): Promise<((typeof entryMap)[C][E] & Render)[]>;

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
  slug: "choosing-the-right-amount-of-design-scope",
  body: string,
  collection: "articles",
  data: any
},
"reading-is-neccessary-but-not-sufficient copy.mdx": {
  id: "reading-is-neccessary-but-not-sufficient copy.mdx",
  slug: "reading-is-neccessary-but-not-sufficient-copy",
  body: string,
  collection: "articles",
  data: any
},
"test.mdx": {
  id: "test.mdx",
  slug: "test",
  body: string,
  collection: "articles",
  data: any
},
"the-myth-of-the-story-point.mdx": {
  id: "the-myth-of-the-story-point.mdx",
  slug: "the-myth-of-the-story-point",
  body: string,
  collection: "articles",
  data: any
},
"why-interface-designers-should-pair-by-default.mdx": {
  id: "why-interface-designers-should-pair-by-default.mdx",
  slug: "why-interface-designers-should-pair-by-default",
  body: string,
  collection: "articles",
  data: any
},
},

	};

	type ContentConfig = never;
}