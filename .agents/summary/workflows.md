# Workflows

> Key processes and workflows in **kiro-hero**.

## 1. Add a Lesson

```mermaid
flowchart TD
    A["Create .md/.mdx in src/content/docs/<section>/"] --> B["Add frontmatter<br/>(title, description, sidebar.order)"]
    B --> C{Section type?}
    C -->|autogenerate<br/>Acts 1-4, Reference| D["Picked up automatically,<br/>ordered by sidebar.order"]
    C -->|explicit<br/>Setup group| E["Add entry in astro.config.mjs<br/>sidebar items"]
    D --> F["npm run dev / build"]
    E --> F
    F --> G["Progress bar recounts automatically<br/>(derives from sidebar)"]
```

- Folder path = URL path.
- For `autogenerate` sections, no config edit is needed — only `sidebar.order` matters for position.
- The `Setup` group is the exception: its pages are listed explicitly in `astro.config.mjs`.

## 2. Add a Diagram to a Lesson

```mermaid
flowchart LR
    A["import Mermaid from '.../components/Mermaid.astro'"] --> B["<Mermaid code={`...`} />"]
    B --> C["Build emits <pre class='mermaid'>"]
    C --> D["Browser: mermaid.run() renders SVG"]
    D --> E["Re-renders on nav + theme toggle"]
```

Use a template-literal `code` prop so MDX does not parse diagram syntax as JSX.

## 3. Add Another Workshop (topic)

Documented in `astro.config.mjs` comments:
1. Create `src/content/docs/workshops/<name>/`.
2. Add a sibling topic object inside `starlightSidebarTopics([...])` — `label` = workshop name, `link` = first lesson.
3. Define its sections as top-level groups (these become the progress bar's sections).
4. The progress bar scopes itself to whichever topic is active — no extra wiring.

## 4. Local Development

```mermaid
sequenceDiagram
    participant Dev
    participant Astro as "Astro dev server"
    Dev->>Astro: npm run dev
    Astro-->>Dev: serves http://localhost:4321 (HMR)
    Dev->>Astro: npm run check
    Astro-->>Dev: type/content validation
    Dev->>Astro: npm run build
    Astro-->>Dev: static site in dist/
    Dev->>Astro: npm run preview
    Astro-->>Dev: serves built site locally
```

## 5. Progress Bar Render Cycle

```mermaid
flowchart TD
    A["Page renders"] --> B["Read Astro.locals.starlightRoute.sidebar"]
    B --> C["collectLessons() flattens groups/links<br/>(skip EXCLUDE_GROUPS: Reference)"]
    C --> D["Find current index, total, percent"]
    D --> E{"show = current != -1<br/>&& total > 1?"}
    E -->|no| F["Render nothing<br/>(homepage / single-page topics)"]
    E -->|yes| G["Render section position + count + next link + bar"]
```

## 6. Deploy to AWS (SST)

```mermaid
sequenceDiagram
    participant Dev
    participant SST as "sst (sst.config.ts)"
    participant AWS
    participant CF as Cloudflare
    Dev->>SST: sst deploy --stage <stage>
    SST->>SST: app() resolves removal/protect by stage
    SST->>AWS: run() → new sst.aws.Astro("MyWeb", { domain })
    AWS-->>SST: site provisioned
    SST->>CF: sst.cloudflare.dns() configures DNS for kiro-hero.dev
    CF-->>Dev: site live at https://kiro-hero.dev
```

- **Production stage:** `removal: "retain"`, `protect: true` (guards against accidental teardown).
- **Other stages:** `removal: "remove"`.

## 7. Alternative Deploy: Static Pages (Forgejo / GitHub Pages)

Per `README.md`, the build is fully static and can be published without SST:
1. For a subpath project site, set `site` and `base` in `astro.config.mjs`.
2. `npm run build`.
3. Publish the contents of `dist/` via the Pages mechanism.

> Note: the committed `astro.config.mjs` targets a root domain (`site: "https://kiro-hero.dev"`, no `base`) and uses the SST/AWS adapter. The Pages path is an alternative documented in the README.
