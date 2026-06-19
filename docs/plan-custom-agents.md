# Plan: "Creating a Custom Agent" lesson cluster

## Core idea

Restructure the **First Steps** section around a single mental model: an agent is defined
by four facets. This turns the large agent JSON schema into four questions a learner can
reason about.

| Facet | The question it answers | Schema fields |
| --- | --- | --- |
| **Identity / behavior** | *Who is the agent and how does it work?* | `prompt` |
| **Knowledge** | *What does it know?* | `resources` (steering files, skills, knowledge bases) |
| **Capabilities** | *What can it do?* | `tools`, `mcpServers`, `hooks` |
| **Permissions** | *What may it do without asking?* | `allowedTools`, `toolsSettings` |

Quality-of-life fields (`model`, `keyboardShortcut`, `welcomeMessage`, `description`)
sit outside the four facets and get a brief mention in the gateway lesson.

The "Creating a Custom Agent" lesson is the **gateway**: it teaches the four-facet model
and then sends learners into the lessons that go deep on each facet. Existing lessons
(Steering Files, Agent Hooks) are not removed — they get reframed as a facet.

## Scope discipline (keep it workshop-sized)

Each facet covers the everyday 80% in First Steps; advanced material is deferred.

- **Knowledge**: First Steps covers steering files only. Skills and knowledge bases →
  Going Further.
- **Capabilities**: First Steps covers a tools intro + hooks. Full MCP setup (transports,
  OAuth, registry) → the existing Going Further → MCP Servers lesson.
- **Permissions**: cover auto-approval and path/command scoping. `denyByDefault` and
  `web_fetch` trust lists → a "going deeper" aside or Reference.

## First Steps lesson map

1. **Creating a Custom Agent** *(gateway)*
   - What an agent is; why custom (built-ins can't be edited).
   - Where configs live: workspace `.kiro/agents/` vs. global `~/.kiro/agents/`;
     filename = name; workspace wins on conflict.
   - Create a minimal agent and switch with `/agent`; mention `/agent create` and
     `kiro-cli agent validate`.
   - Teach the four-facet model.
   - Anatomy table: every schema field tagged to a facet, deep ones linking out.

2. **Identity & Behavior** *(the `prompt`)*
   - Core teaching point: **describe behavior you can observe, not credentials you can't
     verify.**
   - Persona/credential prompting vs. dispositional/behavioral prompting:
     - ❌ "You're a 10x FAANG 20-year veteran" — asserts status, mostly affects tone, can
       backfire (overconfidence, fabricated authority). "Senior" is not an action.
     - ✅ "You have a curious nature and like to explore and try things before committing"
       — translates into observable behavior (weigh options, prototype, check in before
       locking in), is steerable, and composes with the other facets.
   - Examples of good behavioral instructions: "writes a failing test first," "states
     assumptions before coding," "proposes two approaches and recommends one."
   - **Exercise** (mirrors the steering-files exercise): define two agents that differ
     *only* in `prompt` (credential vs. disposition), give them the identical task, and
     observe the behavior diverge.

3. **Tools & Permissions**
   - Tools: native tools, and MCP references (`@server`, `@server/tool`).
   - `tools` (what the agent can see) vs. `allowedTools` (what runs without approval).
   - `toolsSettings`: `allowedPaths`/`deniedPaths` for write; `allowedCommands`/
     `deniedCommands`/`autoAllowReadonly` for shell.
   - Framed as the **permissions** facet plus the tools half of **capabilities**.

4. **Steering Files** *(knowledge — existing lesson)*
   - Add one sentence framing it as the knowledge facet.

5. **Agent Hooks** *(capability — existing lesson)*
   - Add one sentence framing it as a capability.

*(The Interface lesson remains; slot its order around the above.)*

## Open question / tension

Tools is technically a *capability*, but it's so coupled to *permissions* that they're
taught in one lesson (#3). This blurs the clean four-way split at the lesson level even
though the concept stays clean. Acceptable trade-off; alternative is Tools joining
Hooks/MCP under capabilities with Permissions standing alone.

## Schema vs. docs discrepancies to verify before publishing

The attached agent JSON schema disagrees with Kiro's published docs in two places. Treat
the schema as authoritative for field *names/shapes*, but verify these specifics against
current docs before writing exact values:

- **Hook timeout default**: schema says `timeout_ms` defaults to **30000**; feature docs
  say **10000**.
- **Legacy MCP field name**: schema calls it `includeMcpJson`; docs call it
  `useLegacyMcpJson`.

## Build order

1. Rework the gateway lesson (`custom-agents.mdx`) to teach the four-facet model.
2. Write **Identity & Behavior** lesson.
3. Write **Tools & Permissions** lesson.
4. Add framing sentences to Steering Files and Agent Hooks.
5. `npm run build` after each to confirm pages render.
