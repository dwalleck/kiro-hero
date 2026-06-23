# Review Notes

> Consistency and completeness review of the generated documentation for **kiro-hero**.

## Consistency Check ✅

Cross-document facts were verified for agreement:

| Fact | Sources | Status |
| --- | --- | --- |
| Production domain `kiro-hero.dev` | `architecture.md`, `interfaces.md`, `workflows.md`, `dependencies.md` | Consistent (matches `astro.config.mjs` `site` + `sst.config.ts` domain) |
| Sidebar drives progress bar (no separate manifest) | `architecture.md`, `components.md`, `workflows.md` | Consistent |
| `Reference` section excluded from progress count | `codebase_info.md`, `components.md`, `data_models.md`, `workflows.md` | Consistent (`EXCLUDE_GROUPS`) |
| `PageTitle` is the only component override | `architecture.md`, `components.md`, `interfaces.md` | Consistent (matches `astro.config.mjs`) |
| Deployment via SST/AWS + Cloudflare DNS | `architecture.md`, `interfaces.md`, `dependencies.md`, `workflows.md` | Consistent |
| Mermaid renders client-side, theme-aware | `architecture.md`, `components.md`, `interfaces.md` | Consistent |

No contradictions found across documents.

### Minor tension worth noting
- **Two deployment stories coexist.** The committed config targets a root domain via SST/AWS, while `README.md` documents a static Forgejo/GitHub Pages path using `site`+`base`. This is intentional (the README path is an alternative), but a reader skimming one doc could miss the other. Documented explicitly in `architecture.md` and `workflows.md`.
- **Package name vs. display title mismatch.** `package.json` name is `zero-to-kiro`; the site title is `Zero to Kiro Hero`; the repo directory is `kiro-hero`. Not an error, but worth knowing when searching.

## Completeness Check

### Well covered
- Site structure, content organization, and routing conventions.
- The three custom components and their contracts.
- Build/dev/deploy workflows.
- Dependency inventory and their usage sites.
- Content/frontmatter data model.

### Gaps & limited-detail areas

| Area | Why limited | Impact |
| --- | --- | --- |
| Traditional APIs / data persistence | None exist — static site | `interfaces.md` and `data_models.md` are intentionally framework/contract-focused rather than endpoint/table-focused. Not a defect. |
| `src/styles/custom.css` specifics | Not exhaustively documented field-by-field | Low — it is layered theme tweaks; read directly when changing visuals. |
| Test coverage | **No test framework, linter, or formatter** is configured (`package.json` has only Astro scripts). `astro check` is the sole validation gate. | Medium — there is no automated regression safety net for the `ProgressBar` flattening logic, the most logic-heavy unit in the repo. |
| `agent-spec.json` full field semantics | Only top-level/representative fields summarized; it is reference content, not site runtime | Low for site work; consult `docs/plan-custom-agents.md` and the schema directly for lesson authoring. |
| Project planning docs (`workshop-run-of-show.md`, `formal-workflow-synthesis.md`) | Not deeply summarized | Low — they are authoring/process notes, not code. |

### Language-support-related gaps
- The codebase is TypeScript/Astro/MDX. There were **no unsupported-language gaps** that blocked analysis — all source files are analyzable. Astro `.astro` files are part-TypeScript/part-template; their frontmatter logic was read directly rather than via symbol indexing.

## Recommendations

1. **Add a lightweight test for `ProgressBar` flattening.** `collectLessons()` is the only non-trivial algorithm; a unit test (e.g., Vitest) over a sample sidebar tree would protect the "you are here" feature across Starlight upgrades.
2. **Pin or document the Starlight-internals dependency.** `ProgressBar.astro` relies on the shape of `Astro.locals.starlightRoute.sidebar`. Note this implicit contract near the component so a Starlight major bump triggers a re-check.
3. **Resolve the agent-spec discrepancies before publishing related lessons** (hook `timeout_ms` default; `includeMcpJson` vs `useLegacyMcpJson`) per `docs/plan-custom-agents.md`.
4. **Consider a formatter/linter** (Prettier + an Astro/ESLint setup) if more contributors join, to keep MDX and component style consistent.
5. **Keep the two deploy paths clearly separated** in docs so contributors don't accidentally mix SST root-domain config with Pages `base` config.
