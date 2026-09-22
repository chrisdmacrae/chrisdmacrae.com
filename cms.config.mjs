// Go·Git CMS editor configuration, written by `gitcms-ide init`.
export default {
  API_URL: "https://app.gogitcms.com",
  // Path this editor is served from. Use a subpath (e.g. "/cms/") when it
  // is mounted under one — assets and in-app URLs are both built from it.
  BASE_PATH: "/",
  plugins: [
    [
      "@gogitcms/plugin-mdx",
      {
        // Global CSS/JS the rendered components need. An absolute URL is
        // injected as a tag; anything else is imported from cms-components/.
        //
        // site.css is Tailwind's utilities + components, generated from this
        // project's own config by `npm run cms:styles`. Re-run it after using
        // a class the editor has not seen before.
        styles: ["site.css"],

        // JSX tag name -> a module in cms-components/, which re-exports the
        // real component. Anything listed here renders live in the editor;
        // anything else falls back to a card. See cms-components/README.md for
        // why the indirection exists.
        components: {
          Canvas: "Canvas",

          // ToggleFAB is deliberately absent: it reaches Search -> Dialog ->
          // DialogProvider, which imports "@react-aria/overlays" — a package
          // react-aria 3.50 no longer exposes and nothing installs. It renders
          // as a card until that import is fixed.

          // `props` is optional — it gives the edit form typed inputs and
          // one-click chips for props the component actually takes.
          Disclaimer: {
            path: "Disclaimer",
            props: [{ name: "type", type: "string", options: ["primary", "success", "warning", "info"] }],
          },
          Code: {
            path: "Code",
            props: [
              { name: "id", type: "string", required: true },
              { name: "tabs", type: "expression" },
              { name: "panels", type: "expression" },
              { name: "client:idle", type: "boolean" },
            ],
          },
        },
      },
    ],
    [
      "@gogitcms/preview-sidecar",
      {
        // The hosted preview service. Pressing Preview has it clone the branch
        // being edited, install from the lockfile and run this site's own
        // `astro dev`, writing unsaved edits into that checkout as you type —
        // the site itself carries no preview code. It needs a paid workspace,
        // and an editor served from anywhere but localhost has to be
        // registered under Settings → Editors in the dashboard.
        server: "https://previews.gogitcms.com",

        // Each collection's path on that dev server, repeating the site's own
        // routing:
        //
        // - articles: src/content/articles.ts builds their URLs as
        //   /articles/<category>/<filename>, which [category]/[id].astro
        //   serves — drafts included, since that is what it does under
        //   `astro dev`. An article without a category has no page, so it
        //   gets no Preview button either.
        // - pages: only about.mdx has a route (src/pages/about.astro). A new
        //   page previews as a 404 until it gets an .astro file of its own.
        collections: {
          articles: "/articles/{{fields.category}}/{{basename path}}",
          pages: "/{{basename path}}",
        },

        label: "Preview",
      },
    ],
  ],
};
