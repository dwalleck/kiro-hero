---
inclusion: always
---

# Workshop design principles

Rules for authoring and editing lessons in this workshop. Apply them whenever you
write, restructure, or review content under `src/content/docs/workshops/`.

Source: distilled from "How to Run a Kiro AI Coding Workshop That Actually Works"
(Christian Bonzelet) — see `docs/how-to-run-a-kiro-ai-coding-workshop.md`.

## Design for a value progression, not feature coverage

Each lesson must expose a limitation of the previous approach, then resolve it. Order
content by the *problem* it solves, not by a feature checklist.

- Do: open a primitive's lesson by showing the agent failing without it, then add it
  and show the behaviour change.
- Don't: introduce a feature just because it exists ("Kiro also has X"). If a lesson
  doesn't remove a pain the learner has already felt, move it or cut it.
- Every module should create curiosity and then pay it off. The learner should be able
  to answer "why does this layer exist?" before the next layer is introduced.

## Explain the why, not just the how

State the reason a feature exists before the steps to use it. Concept first, then
mechanics.

- Do: "Steering files exist because the agent has no memory of your conventions between
  sessions. Here's how to add one…"
- Don't: jump straight into commands and config with no framing.
- When you give an instruction, anchor it to the limitation it addresses. A step the
  learner understands the purpose of sticks; a step they just copy does not.

## Guide; don't hand them a blank canvas

Never open with free-form "just build something." Give a concrete starting artifact and
a defined scope before the learner touches the agent.

- Do: provide the first prompt, a sketch, or a fixed exercise so everyone starts from a
  shared mental model.
- Don't: rely on the learner to invent scope — it produces random output and a bad
  first impression.

## Carry one artifact through the whole workshop

Build on a single example project across lessons and acts. Continuity is the point:
later lessons should reuse what earlier lessons produced, not start from zero.

- Keep the teaching vehicle small enough to finish, simple enough to need no domain
  knowledge, and rich enough to layer every capability onto.
- Don't introduce a complex, real-world codebase for a learner's first contact — defer
  large-repo concerns to a separate advanced lesson.

## Enable, don't pitch

Write to help the learner discover Kiro's value, not to sell it. Keep the tone neutral
and instructional.

- Don't: marketing language or unqualified superlatives.
- Do: let a working result make the case.

## Set expectations about non-determinism

Tell learners up front that agent runs vary and sometimes fail, and always give a way to
recover (e.g. a known-good `git checkout` snapshot, a checkpoint to rejoin at). Treat
failure as a normal, expected part of the exercise, not an error in the instructions.

## Close with "what next"

End a workshop track by helping the learner apply the material to their own project and
team workflow. Don't stop at the last feature — the most common unmet need is "how do I
bring this back to my real repo?"
