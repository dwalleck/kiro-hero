# Workshop Run-of-Show: Engineering vs. Vibes

A live demo that answers the objection *"any agent can build an app"* by showing
what a generic agent **can't** do: refuse to build the wrong thing, prove its
mental model before designing, and stop itself the instant execution drifts from
the plan.

**Core narrative:** the cold-open agent ships a count that is wrong by ~60%, and
the *same bug* is caught three separate times by three different gates. The
number **20** is the through-line — introduced as a hero in Beat 1, exposed as a
villain in Beat 3, executed in Beat 7.

---

## The Feature

`GET /inbox/unread-count?user=<id>` → returns the number of unread messages for a
user, backed by a pre-seeded SQLite database.

- **Stack:** Python + FastAPI + SQLite (concise, readable on a projector, trivial
  independent oracle via the `sqlite3` CLI).
- **"From scratch" framing holds:** you build the endpoint live; the pre-seeded
  database is the realistic substrate you're building *on top of* — which is
  exactly the premise `prove-it-prototype` is designed for.

### The buried decisions (this is the gold)

- Does "unread" include **archived** messages?
- Does it include **soft-deleted** messages (`deleted_at IS NOT NULL`)?
- Is it **per-conversation** or **per-user total**?
- What about a user with **zero** messages?

---

## Pre-flight (seed this before anyone is watching)

1. **A SQLite DB with a rigged distribution.** For one demo user: 20 messages with
   `read_at IS NULL`, but of those, 5 are archived and 7 are soft-deleted.
   - Naive count (`read_at IS NULL`) = **20**
   - Spec-correct count (`read_at IS NULL AND archived=0 AND deleted_at IS NULL`) = **8**
   - That 20-vs-8 gap is your aha number. Pick numbers that are obviously,
     embarrassingly far apart.
2. **A "vibes" agent config** — a minimal agent with no skills in its `resources`,
   so it just builds the obvious thing. This is your cold-open foil.
3. **The skilled agent** — your normal agent with the gated-workflow skills
   available.
4. **A coding-standard file** for the review crew to check against
   (`CONTRIBUTING.md` or `AGENTS.md` with one or two concrete rules, e.g., "all DB
   access goes through `db/queries.py`, no inline SQL in route handlers"). Seed one
   violation so the Standards reviewer has something to find.
5. **Review skill setup:** the `review` skill expects an issue-tracker doc
   (`docs/agents/issue-tracker.md`) and will suggest `/setup-matt-pocock-skills` if
   missing. Either run that setup beforehand or point the Spec sub-agent at the
   pinned `spec.md`. Rehearse this once so it doesn't stall live.
6. **Save a session of the full successful run** so you can fall back to replay if
   the live build gets slow (shell output is buffered, not streamed — don't gamble
   on a long build streaming nicely).

---

## Beat 1 — Cold open: the anti-demo (2 min)

**On screen:** the "vibes" agent.

**You type:** *"Build me an endpoint that returns the unread message count for a
user."*

It confidently produces clean, well-formatted code:
`SELECT COUNT(*) FROM messages WHERE recipient_id = ? AND read_at IS NULL`. It
looks *great* — syntax-highlighted, docstring, returns JSON. Run it against your
seeded user → returns **20**.

**The line:** *"Beautiful. Ships today. Quick question though — is 20 the right
answer? Nobody in this room knows. Neither did the agent. Hold that number:
twenty. Watch what happens when we don't just build it, we engineer it."*

Set it aside, visibly. Twenty is now the villain of the story.

---

## Beat 2 — The spec gate refuses to be rushed (4 min)

**On screen:** the skilled agent. **You type the *same vague request*.**

Instead of coding, it invokes `interrogated-spec` and starts interrogating — one
question at a time:

- "Which role is this for — the inbox owner, an admin, a support agent?"
- "Does 'unread' include archived messages? Yes or no."
- "Does it include soft-deleted messages?"
- "Per-conversation, or one total per user?"

**The refusal beat (the star of this segment):** after you answer, play the
impatient stakeholder — type *"yeah that all sounds good, let's go."* The agent
**refuses**: it won't accept "sounds good" as sign-off. Per the skill, it makes you
restate the feature in your own words. You comply: *"Total count per user of
messages they've received that have no read timestamp, excluding archived and
soft-deleted."* Now it writes `spec.md` and signs off.

**On-screen artifact:** the pinned `spec.md` — given/when/then behaviors, the
decisions table (archived → excluded; deleted → excluded), the out-of-scope list.

**The line:** *"It just refused to let me approve my own vague request. Every bug
in this feature was going to be born from the word 'unread.' We just killed it
before writing a line of code."*

---

## Beat 3 — The probe and oracle: your mental model is wrong (5 min)

**On screen:** `prove-it-prototype` builds a 30-line probe — and the probe
deliberately embodies the *naive* mental model: `COUNT(*) WHERE read_at IS NULL`.
Run it → **20**.

Then it defines an **independent oracle** — raw SQL run a different way via the
`sqlite3` CLI, computing the spec-correct set:
`... AND archived=0 AND deleted_at IS NULL` → **8**.

**Compare. They disagree: 20 vs 8.** This is the aha moment. Per the skill,
disagreement = stop and investigate. The agent diagnoses: "My model assumed unread
= no read timestamp. The system has archiving and soft-deletes I didn't account
for." It corrects the probe to match the pinned spec → now probe and oracle both
say **8** → agreement → proceed.

**The line:** *"There it is. The vibes version's answer — twenty — just got caught
by an independent check, before we committed to a design. The 'obvious' query was
wrong by a factor of two and a half."*

This is also where you point out: the cold-open code is *already disproven*, and
we haven't written the real feature yet.

---

## Beat 4 — Falsifiable design: prove it can't confirm itself (3 min)

**On screen:** `falsifiable-design` produces the design as numbered claims, each
paired with a falsifier and an *independent* oracle, in the Falsification table:

| # | Claim | Falsifier | Oracle | Cost | Status |
|---|-------|-----------|--------|------|--------|
| 1 | count = unread ∧ not archived ∧ not deleted | seed 20 unread / 5 archived / 7 deleted, expect 8 | raw SQL | 5m | **passed** |
| 2 | user with 0 messages returns 0, not error | empty user fixture | direct call | 5m | pending |
| 3 | per-user total, summed across conversations | 2-conversation fixture | SQL group-by | 10m | pending |

**Run the cheapest falsifier live** (claim 2 or 1) — it passes. **Negative space**
section on screen: "does NOT mark messages read; does NOT include other users'
messages; does NOT paginate."

**The line:** *"This design is built so it could be proven wrong — and we ran the
cheapest experiment that would embarrass us, and it survived. That's the
difference between a design and a horoscope."*

---

## Beat 5 — The build that stops itself (6 min — the showstopper)

**On screen:** `budgeted-plan` decomposes into tiny slices, each with a complexity
budget and stress fixture. Then `checkpointed-build` executes them one at a time.

- **Slice 1** — the `unread_count(user_id)` query function. Gates run: unit test ✓,
  stress fixture ✓, oracle agrees (8 = 8) ✓, budget ✓. Commit.
- **Slice 2 — the trap.** Wiring the count into the endpoint, the implementation
  introduces a **JOIN to the conversations table** that fan-out **double-counts**
  messages for users in multiple conversations. Endpoint now returns **15** for
  your demo user.

  After the slice, `checkpointed-build` runs the oracle against the binary —
  **8 vs 15, drift** — and **HALTS**:

  ```
  Slice 2 halted.
  - Unit tests:     pass
  - Oracle drift:   user 7 -> endpoint=15, oracle=8
  - Budget:         within budget
  The implementation, the oracle, or the design is wrong. Which is it?
  ```

**This is the moment.** The agent stopped *itself*, mid-build, and is asking you to
adjudicate — it won't push through. You diagnose live: "the JOIN fans out; the
implementation is wrong." Fix it, re-run gates, green, commit.

**The line:** *"Notice what it did NOT do. It did not keep going and leave a
double-counting bug for production to find. It stopped, told me exactly where
reality diverged from the plan, and refused to advance. When was the last time an
agent told you 'no, something's wrong, you decide'?"*

> Alternative flavor: instead of the JOIN double-count, seed an
> `O(messages × conversations)` loop and let the **budget gate** trip. Pick one —
> oracle drift ties back to Beat 3 better.

---

## Beat 6 — The parallel review crew (3 min)

**On screen:** invoke `review`. It spawns **two sub-agents in parallel**. Hit
**Ctrl+G** — the Crew Monitor shows both working at once:

- **Standards agent** reads `CONTRIBUTING.md`, finds your seeded violation (inline
  SQL in the route handler instead of `db/queries.py`).
- **Spec agent** reads the pinned `spec.md`, confirms archived/deleted are
  excluded, and verifies the zero-message case is handled.

Side-by-side report. Two axes, never merged.

**The line:** *"Two reviewers, real-time, one checking 'is it built right,' one
checking 'is it the right thing' — and they can't mask each other. That's a code
review team, running while I watch."*

---

## Beat 7 — The callback (1 min)

Bring back the cold-open code. Its query: `WHERE read_at IS NULL`. Run it against
the seeded user → **20**. Run the engineered endpoint → **8**.

**The closing line:** *"Same feature. Same prompt. The vibes version returns
twenty — and it's wrong the moment anyone archives or deletes a message, which is
to say immediately. The engineered version returns eight, and we can prove it.
Both looked equally polished sixty minutes ago. That's the whole point: any agent
can produce code that looks right. The story today was a process that refuses to
ship code that only looks right."*

---

## Timing & Arc

~24 minutes of demo. Emotional shape:

**confidence** (cold open) → **discomfort** (the refusal, the disagreement) →
**tension** (the halt) → **resolution** (review + callback).

The number **20** is your through-line: hero in Beat 1, villain in Beat 3,
executed in Beat 7.

| Beat | Segment | Time |
|------|---------|------|
| 1 | Cold open / anti-demo | 2 min |
| 2 | Spec gate (`interrogated-spec`) | 4 min |
| 3 | Probe + oracle (`prove-it-prototype`) | 5 min |
| 4 | Falsifiable design (`falsifiable-design`) | 3 min |
| 5 | Plan + build with live STOP (`budgeted-plan` + `checkpointed-build`) | 6 min |
| 6 | Parallel review crew (`review`) | 3 min |
| 7 | Callback | 1 min |

---

## Risk Notes (specific to this build)

- **Seed the failures deterministically.** The 20-vs-8 gap and the JOIN
  double-count must be reproducible exactly. Rehearse until the numbers are
  identical every run.
- **Pre-bake and be honest about it.** If the live build risks dragging, replay a
  saved session for the slow middle and run *live* only the high-drama beats (the
  spec refusal, the oracle disagreement, the slice halt). Telling the audience
  "this is a rehearsed run" costs you nothing and protects the punchlines.
- **Lean on artifacts, not streams.** `spec.md`, the probe-vs-oracle output, the
  falsification table, and the HALT message are your visuals — they appear as
  discrete results, which renders well even though shell output is buffered.

---

## Asset Kit (to build next)

A complete, failure-seeded kit you can rehearse end to end:

- [ ] Seed SQL (rigged 20/8 distribution)
- [ ] "Vibes" agent config + skilled agent config
- [ ] Naive probe + independent oracle one-liner
- [ ] Deliberately double-counting Slice 2 code
- [ ] Pinned `spec.md`
- [ ] Seeded `CONTRIBUTING.md` violation
- [ ] Crew spec for the review
