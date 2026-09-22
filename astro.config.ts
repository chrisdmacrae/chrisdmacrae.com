import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
import vercel from "@astrojs/vercel";

// https://astro.build/config
import mdx from "@astrojs/mdx";
import { unified } from "@astrojs/markdown-remark";
import readingTime from "remark-reading-time";
import readingMdxTime from "remark-reading-time/mdx";
import headingSlugs from 'rehype-slug';
import autolinkHeadings from 'rehype-autolink-headings';

// https://astro.build/config
import sitemap from "@astrojs/sitemap";

const rehypePlugins = [headingSlugs, autolinkHeadings];

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel(),
  site: import.meta.env.DEV ? 'http://localhost:3000' : 'https://chrisdmacrae.com',
  // Keep the pre-v3 dev port, which `site` above and the README expect.
  server: {
    port: 3000
  },
  // Collapse whitespace the way HTML does (Astro 7's default of 'jsx' drops it
  // between inline elements written on separate lines).
  compressHTML: true,
  prefetch: true,
  integrations: [react(), mdx({
    processor: unified({
      remarkPlugins: [readingTime, readingMdxTime],
      rehypePlugins
    })
  }), sitemap({
    // /articles only redirects to /articles/all
    filter: (page) => new URL(page).pathname !== '/articles/'
  })],
  markdown: {
    syntaxHighlight: 'prism',
    // The remark/rehype plugins need the unified pipeline, not the default Sätteri one.
    processor: unified({
      rehypePlugins
    })
  }
});
