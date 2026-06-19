# Realizations: From Advisory Skills to an Enforced Engineering Pipeline

Captured before scaffolding the plugin. The core thesis: the most *moving*
workshop story isn't spec→code — it's turning a disciplined methodology from
something the agent *chooses* to follow into a formal workflow the engine
*enforces*.

---

## The three tiers

Naming these precisely is the whole insight.

1. **Spec mode** — IDE-only, single-agent, produces *documents* (requirements /
   design / tasks). No enforcement, no loop, no verification. It **describes**.
   This is what almost every existing Kiro workshop leans on as "the" feature.

2. **The gilfoyle skills** — excellent *epistemics* (interrogated-spec,
   prove-it-prototype, falsifiable-design, budgeted-plan, checkpointed-build,
   review). But **advisory**. The discipline lives in prose the model *chooses*
   to honor. Nothing structurally prevents the agent from skipping a gate. Great
   thinking; no teeth.

3. **The `dotnet-test-creator` plugin** — a **formal, executable workflow**:
   - a declarative `crew-dag.json` the engine runs,
   - specialized **leaf** agents (only the orchestrator runs the crew; no recursion),
   - file-based handoff (`.testagent/*.md`) that doubles as an audit trail,
   - **scoped per-stage permissions**,
   - and in `crew-dag-loop.json`, a **native, engine-bounded loop** where the
     `validate` stage fires `loop_to → implement` on a `NEEDS_WORK` token with
     categorized feedback (`max_iterations` enforced by the engine).

**The realization:** encoding the gilfoyle gates as a crew DAG converts
*discipline-you-hope-for* into a *workflow-that-enforces-itself*. That is
categorically more compelling than spec→code, and it's **CLI-native** (not
IDE-locked) — exactly the gap the other workshops cannot fill.

---

## The leap that matters: advisory → structurally enforced

The decisive enforcement mechanism is already sitting in the plugin:

- In the gilfoyle prose, the planner *"shouldn't"* write code.
- In the crew-DAG plugin, the planner agent **literally cannot** — its
  `toolsSettings` only permit writes to `.testagent/**`. The researcher and
  validator are the same: no code-write permission at all.

The gate isn't a promise; it's a **permission boundary the engine enforces.**

**Demo line:** *"This planning agent could not write a line of production code
even if it tried — I removed the capability. The methodology isn't a suggestion
in a prompt; it's the shape of the pipeline."*

### Primitives the plugin already demonstrates

- **Specialized leaf agents** with narrow tools.
- **File handoff as audit trail** (`research.md → plan.md → status.md`), left on
  disk on purpose.
- **Native validate→implement loop**, engine-bounded — which is *exactly*
  `checkpointed-build`'s "STOP on drift → fix → re-run," enforced by the engine
  rather than the model's goodwill.

---

## Mapping the gilfoyle spine onto the crew-DAG skeleton

`dotnet-test-creator` is Research → Plan → Implement → Validate(loop). The
gilfoyle feature spine maps almost 1:1.

| gilfoyle skill | Crew stage (agent) | Writes | Gate type |
|---|---|---|---|
| interrogated-spec | `spec` (orchestrator pre-step) | `.feature/spec.md` | **human-adjudicated** |
| prove-it-prototype | `probe` | `.feature/probe.md` (AGREE/DISAGREE) | **human-adjudicated** |
| falsifiable-design | `design` | `.feature/design.md` (falsification table) | mostly auto; cheapest-falsifier gate |
| budgeted-plan | `plan` | `.feature/plan.md` (slices + budgets) | structural (planner can't code) |
| checkpointed-build | `build` | code + `.feature/status.md` | — |
| review | `validate` | drives `loop_to → build` on `NEEDS_WORK` | **engine-looped** |

---

## The two kinds of gate (the most sophisticated idea here)

Do not paper over this — it's the richest teaching point, and no spec-mode demo
comes near it.

- **Engine-looped gates** (build/validate drift, budget violation, weak
  assertions) auto-iterate via `loop_to` — exactly `crew-dag-loop.json`.
  Bounded, deterministic, hands-off.

- **Human-adjudicated gates** (spec sign-off in your own words; probe/oracle
  disagreement; a failed cheapest-falsifier) **must stop and surface to a
  person**, because a blocking crew runs autonomously and can't do interactive,
  one-question-at-a-time interrogation.

The `dotnet-test-creator` already solves the human-gate case correctly: the
**orchestrator** does scope clarification in its *own* turns *before* submitting
the crew. So in the merged design, spec interrogation and probe sign-off live in
the orchestrator's pre-crew steps; `design → plan → build → validate` run as the
enforced DAG.

The distinction — *which gates the engine can close on its own vs. which require
a human verdict* — is the centerpiece idea.

---

## Why this beats spec→code as a workshop spine

Spec mode hands you three markdown files and hope. This hands you a **named,
distributable, CLI-native pipeline** run with one command
(`kiro-cli chat --agent feature-engineer` → "build feature X"), where:

- specialized agents appear live in the **Crew Monitor (Ctrl+G)**,
- the `.feature/*.md` audit trail accumulates on disk as proof of what happened,
- the **validate→build loop fires live** on a seeded drift and resolves itself,
  engine-bounded,
- and a teammate can re-run the identical pipeline tomorrow and get the same
  gates.

**The line:** *"Spec-driven development produces documents. This produces a
self-enforcing engineering pipeline."*

---

## On "merged with gilfoyle" — two readings, both worth doing

1. **Encode gilfoyle as its own crew-DAG plugin** (primary move). Clone the
   `dotnet-test-creator` skeleton into a `feature-engineering` plugin.

2. **Compose the two pipelines.** Stage agents can't spawn crews, so they can't
   nest in one DAG. But:
   - the orchestrator can run them in sequence (feature pipeline writes the code
     → `dotnet-test-creator` pipeline produces *verified* tests for it), or
   - the feature pipeline's `validate` stage can apply the same test-quality
     skills the dotnet validator uses (`test-gap-analysis`, `assertion-quality`,
     `test-anti-patterns`).

   That's the realistic composition given the **no-nested-crew** rule.

---

## Hard constraints to respect when building

- **No nested crews.** Only the orchestrator holds the `subagent` (crew) tool;
  stage agents are leaves and cannot spawn anything.
- **Handoff is file-based.** The crew tool substitutes only `{task}` into each
  stage's `prompt_template`; it never pipes one stage's output into the next.
  Ordering comes from `depends_on`; data comes from `.feature/*.md` on the shared
  cwd. The **one exception** is the `loop_to` edge, which injects the validator's
  feedback into the target stage as context.
- **Loop rules:** trigger token >= 4 chars; `max_iterations` 1..=10; no
  self-loops; no mutual loops; planned upfront. The looping stage signals via the
  built-in `summary` tool (`resultType` + trigger token).
- **Scoped permissions per stage** are the enforcement mechanism — e.g., planner/
  researcher/validator write only to `.feature/**`; builder gets the build/test
  command allowlist and workspace writes.

---

## Next action (not yet started)

Scaffold a `feature-engineering` plugin by cloning the `dotnet-test-creator`
structure:

- [ ] `crew-dag.json` (manual variant)
- [ ] `crew-dag-loop.json` (native validate→build loop)
- [ ] stage agent JSONs with scoped permissions (planner structurally cannot write code)
- [ ] stage prompts wired to the existing gilfoyle skills
- [ ] `.feature/*.md` handoff contracts (spec / probe / design / plan / status)
- [ ] point it at the seeded unread-count repo so the workshop centerpiece is a
      real, runnable, distributable artifact

Before scaffolding: read a couple of the `dotnet-test-creator` agent JSONs and
stage prompts so the new plugin matches established conventions exactly.


---

## Key Phrases & Powerful Statements

Quotable lines developed across the planning. Grouped by where they land.

### Thesis / framing (use early, set the frame)

- **"Any agent can build an app. The question is whether it can refuse to build the *wrong* one."**
- **"The app is the MacGuffin. The methodology is the show."**
- **"Spec-driven development produces documents. This produces a self-enforcing engineering pipeline."**
- **"You've seen spec-driven development. Today you'll see spec-driven development *with teeth*."**
- "Same genre as every other Kiro workshop. A completely different standard."

### Advisory → enforced (the central leap)

- **"The methodology isn't a suggestion in a prompt; it's the shape of the pipeline."**
- **"This planning agent could not write a line of production code even if it tried — I removed the capability."**
- **"The gate isn't a promise. It's a permission boundary the engine enforces."**
- "Discipline you *hope for* versus a workflow that *enforces itself*."
- "Which gates the engine can close on its own, and which demand a human verdict — that's the whole design."

### The refusal / the STOP (the showstopper moments)

- **"When was the last time an agent told you: 'No. Something's wrong. You decide.'?"**
- **"Notice what it did NOT do. It did not push through and leave a bug for production to find."**
- "Every bug in this feature was going to be born from the word 'unread.' We killed it before writing a line of code."
- "It just refused to let me approve my own vague request."

### Verification / probe + oracle (the aha)

- **"The 'obvious' query was wrong by a factor of two and a half — and we caught it before committing to a single line of design."**
- "A design that cannot be proven wrong is not a design. It is a wish list." *(from falsifiable-design)*
- "Sensible-looking output is how bugs survive eleven review rounds." *(from prove-it-prototype)*
- "Probes produce evidence. Vibes produce vibes. Vibes don't get to gate the next step."
- "Reality is the authority. When the plan and reality disagree, reality wins." *(from checkpointed-build)*

### Cost / why the discipline pays (for the skeptic in the room)

- **"The interrogation takes twenty minutes. The bug takes two weeks. The math is not interesting."** *(from interrogated-spec)*
- "The word 'user' with no qualifier has caused more bugs than every off-by-one error in the history of computing." *(from interrogated-spec)*
- "Every vague noun is three decisions in a trench coat." *(from interrogated-spec)*
- "Drift caught at slice 3 is cheap. Drift caught at slice 11 is the entire feature." *(from checkpointed-build)*

### Closing / the callback (land the plane)

- **"Same prompt. One was vibes, one was engineering. Both looked equally polished an hour ago."**
- **"Any agent can produce code that *looks* right. What you watched today was a process that refuses to ship code that only looks right."**
- "Twenty was the hero in the cold open, the villain by the probe, and we executed it at the end." *(the running-number device)*

### The running device

- The number **20** (the naive count) is the through-line: introduced as a hero
  in the cold open, exposed as a villain at the probe/oracle gate, executed in the
  closing callback. Keep referencing it by name.
