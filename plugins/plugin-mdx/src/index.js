// Example plugin entrypoint (docs/plugin-system.md). Default-exports the setup
// function; each contribution's component is a loader so it becomes its own
// lazy chunk under the SPA build and its own import in the desktop runtime.
// Plain createElement-based ESM — no JSX, no build step.

export default function setup(cms, options) {
  cms.registerFieldComponent({
    name: "mdx",
    types: ["string"],
    component: () => import("./mdx.jsx"),
  });
}
