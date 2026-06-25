# Zero to Kiro Hero — Workshop Outline (agreed shape)

The whiteboard for the live workshop. Acts, purpose, timing, and the decisions
behind them. Lesson *bodies* are detailed separately — this is the structure they
hang on.

## Frame

- **Duration:** ~2 hours — **90 min content + 30 min Q&A/closing**.
- **Audience:** hands-on engineers (confirmed). Full depth; no strategic-track split.
- **Target ratio:** ~⅔ doing. Four hands-on exercises (~58 min) vs ~20 min watching.

## The keystone decision: one *given* app, carried throughout

A single small app, **provided in the starter repo — not vibe-built by attendees.**
"Given, not built" is load-bearing: it delivers an **equal starting point** (nobody
wrote it, nobody's ahead), satisfies **carry one artifact** (the field guide's most
-emphasized structural principle), keeps **"unfamiliar code"** true for the brownfield
act (they didn't write it), and removes the **vibe-coding-a-full-app time cost** (the
opening only vibe-codes a *small* addition to it).

> ⛳ **Open item — the only thing still unsettled:** *what the given app is.* It must be
> small, domain-free, and rich enough to layer every primitive onto, then take a
> realistic multi-touchpoint change in Act 3. Choosing it unblocks Act 0's hook and
> Act 3's body.

## Design principles honored

From Christian Bonzelet's field guide (`docs/how-to-run-a-kiro-ai-coding-workshop.md`,
4.7/5 over two runs) and our own exercise discipline:

- **Value progression, not feature coverage** — each act exposes a limitation the next resolves.
- **Why before how** — state the pain a primitive removes before the mechanics.
- **One clean mechanic per exercise** + **decide / predict / fix** beats (no paste-and-watch).
- **Predict-then-run** + **room-sync checkpoints** ("raise your hand when…").
- **Recovery snapshots** (`git checkout`) and **set expectations about non-determinism**.
- **Close on "your repo"** — the #1 post-workshop request.

## The arc

| Act | Purpose (the limitation it resolves) | ~Time | Mode | Theme |
|---|---|---|---|---|
| **0 — Vibes cold open** | Vibe-code a small addition to the given app → looks polished → *but is it right?* It guessed. "That gap is what the next 90 minutes closes." Meet the carried app. | 10 | hook/demo | AI is your partner |
| **1 — Context** *(what the agent **knows**)* | The agent has no memory of your project. Give it the right knowledge at the right time: **steering** (write-your-own-rule), **skills** (progressive disclosure). | 23 | **hands-on** | Understand your tools |
| **2 — Control** *(what the agent is **allowed to do**)* | Probabilistic generation needs deterministic guardrails: **hooks** (enforce/protect — hands-on), **scoped agent + MCP** (least privilege + current docs, via the "adding CDK the right way" vignette — demo). | 22 | hands-on + demo | AI is your partner (control = trust) |
| **3 — Brownfield** *(the centerpiece)* | Real work isn't greenfield. **Orient** (Kiro maps the app) → **plan two ways** (Spec mode vs `grill-me-with-docs`) → **make** a change that *holds* (vibing misses a touch point; planning enumerates them). | 23 | **hands-on** | Find your fit + Understand your tools |
| *buffer* | transitions, predict-then-run, checkpoints, overrun | 12 | — | — |
| **Close — Your repo** | Q&A + "how does Kiro fit *your* real project/team workflow." | 30 | open | all three |

## Per-act notes

**Act 0 — Vibes cold open.** Lightweight "engineering vs vibes" frame (seed the doubt;
pay it off in Act 3's plan step). Keep brief — engineers want to touch something fast.

**Act 1 — Context.** Hands-on. Steering uses the write-your-own-rule comment exercise;
skills uses progressive disclosure (and tees up `grill-me-with-docs` for Act 3). The
fileMatch/triggered-steering idea rides along inside the steering lesson.

**Act 2 — Control.** Hooks is **hands-on** (pick one shape to run live — protect-a-file
or test-on-save). Custom agents is **demo**, folded into the **MCP/CDK vignette**: on the
default agent everything already works, so agents is the "lock it down when you scale"
glimpse — and MCP is configured *on* an agent, so they pair into one "tooling up for
risky work" beat. *Demo, network-aware; first thing on the cut list.*

**Act 3 — Brownfield.** The payoff. The Spec-mode-vs-`grill-me-with-docs` comparison
lands here, on a realistic change, where the contradiction-catch actually bites.

**Close.** Point them at their own repos — not more time in the workshop app.

## Talk/do ratio & cut list

Hands-on (~58 min): steering, skills, hooks, brownfield. Watching (~20 min): cold open,
agent/MCP demo. Cut in this order if behind, never into the closing:
1. **Agent + MCP/CDK demo** → one line + a screenshot.
2. **Skills** → demote to a quick demo, point to a `solutions/` skill.
3. Trim **brownfield** to orient→make (drop the two-paths plan comparison).

## Mapping to current site sections

| Outline act | Current site section | Action |
|---|---|---|
| 0 — Vibes cold open | *(none)* | **new section** |
| 1 — Context | `01-primitives/` (steering-files, skills) | regroup into "Context" |
| 2 — Control | `01-primitives/` (hooks, custom-agents) + `04-going-further/mcp-servers` | regroup into "Control"; **pull MCP in** |
| 3 — Brownfield | `02-unfamiliar-code/` | keep; body gated on app |
| Close | closing/Q&A | keep |
| — | `03-deploy-troubleshoot/` | **out of scope this run** — keep in repo, drop from active nav |
| — | `00-setup/`, `reference/` | keep as-is |
