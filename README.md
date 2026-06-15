# Zero to Kiro Hero

A hands-on workshop site built with [Astro](https://astro.build) + [Starlight](https://starlight.astro.build).

## Quick start

```bash
npm install
npm run dev
```

Open the URL printed in the terminal (default: http://localhost:4321).

## Build & preview

```bash
npm run build      # static site -> ./dist
npm run preview    # serve the built site locally
```

## Project layout

| Path | What it is |
| --- | --- |
| `src/content/docs/` | All lesson content (Markdown/MDX). Folders map to URL segments. |
| `astro.config.mjs` | Site config, sidebar/section ordering, component overrides. |
| `src/components/ProgressBar.astro` | "You are here" progress: global count, section count, next link. |
| `src/components/PageTitle.astro` | Override that renders the progress bar under each page title. |
| `src/styles/custom.css` | Optional theme tweaks layered over Starlight. |
| `src/content.config.ts` | Starlight content collection (rarely needs editing). |

## Adding a lesson

1. Drop a `.md` or `.mdx` file into the relevant `src/content/docs/<section>/` folder.
2. Add frontmatter:

   ```yaml
   ---
   title: My Lesson
   description: One-line summary.
   sidebar:
     order: 2
   ---
   ```

3. Sections defined with `autogenerate` pick it up automatically, ordered by `sidebar.order`.
   The `Setup` group lists its pages explicitly in `astro.config.mjs` instead.

## Progress bar

`src/components/ProgressBar.astro` flattens the sidebar into the linear lesson sequence
and shows where you are. Two things worth knowing:

- `EXCLUDE_GROUPS` — top-level sidebar group labels left out of the count (default: `Reference`).
- It self-hides on the homepage and on excluded pages, so no per-page opt-out is needed.

## Deploying to Forgejo / GitHub Pages

The build is fully static. For a project site served from a subpath (rather than a root
domain), set `site` and `base` in `astro.config.mjs`:

```js
export default defineConfig({
  site: 'https://your-forge.example.com',
  base: '/zero-to-kiro',
  integrations: [ /* ... */ ],
});
```

Then publish the contents of `dist/` with your Pages mechanism.

## Note on placeholder content

Install commands and Kiro-specific steps in the lessons are **placeholders** — replace
them with the current official Kiro instructions.
