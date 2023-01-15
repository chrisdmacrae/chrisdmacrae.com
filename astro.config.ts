import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
import image from "@astrojs/image";

// https://astro.build/config
import mdx from "@astrojs/mdx";
import readingTime from "remark-reading-time";
import readingMdxTime from "remark-reading-time/mdx";

// https://astro.build/config
export default defineConfig({
  site: 'https://chrisdmacrae.com',
  integrations: [
    react(), 
    image({
      serviceEntryPoint: '@astrojs/image/sharp'
    }), 
    mdx({
      remarkPlugins: [readingTime, readingMdxTime]
    })
  ]
});