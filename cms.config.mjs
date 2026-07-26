// Go·Git CMS editor configuration, written by `gitcms-ide init`.
export default {
  // Path this editor is served from. Use a subpath (e.g. "/cms/") when it
  // is mounted under one — assets and in-app URLs are both built from it.
  BASE_PATH: "/",
  plugins: [
    [
      "./plugins/plugin-mdx",
      {
        // Global CSS/JS the rendered components need. An absolute URL is
        // injected as a tag; anything else is imported from
        // plugins/plugin-mdx/components/.
        //
        // site.css is Tailwind's utilities + components, generated from this
        // project's own config by `npm run cms:styles`. Re-run it after using
        // a class the editor has not seen before.
        styles: ["site.css"],

        // JSX tag name -> a module in plugins/plugin-mdx/components/, which
        // re-exports the real component. Anything listed here renders live in
        // the editor; anything else falls back to a card. See
        // plugins/plugin-mdx/README.md for why the indirection exists.
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
  ],
};
