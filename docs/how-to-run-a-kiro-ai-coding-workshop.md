# How to Run a Kiro AI Coding Workshop That Actually Works

> A field guide from someone who just did it — twice, for two very different audiences.

**Author:** Christian Bonzelet (AWS Hero) — AWS DevTools Hero working as a Solutions Architect for Bundesliga. Founder of promptz.dev
**Published:** Feb 27, 2026 · **Last modified:** Feb 27, 2026
**Source:** <https://builder.aws.com/content/3AFEHrVf0iugHBclfZGPGDGAfm0/how-to-run-a-kiro-ai-coding-workshop-that-actually-works>

---

A few days ago, a fellow AWS Community Builder posted a question in our community Slack that I've been sitting with ever since:

> "I'm planning to conduct a Kiro workshop for a group of developers in my organization and would love to get some inputs. What should I consider? What resources exist? What are the prerequisites? What pitfalls should I avoid?"

It landed at exactly the right moment.

On February 19th 2026, I ran a full-day Kiro AI coding workshop with 18 software engineers at my company DFL Digital Sports joined by our account solution architect Oliver Möller from AWS. We walked out with a room full of inspired people who said they will now start using Kiro on their real projects.

A few days later, Developer Advocate Salih Güler from AWS and I ran a second, distinct session — this time in front of IT managers and non-engineers who wanted to understand the strategic impact of AI-assisted software development on their teams. That session taught us something just as valuable, and I'll get to it.

Together, these two experiences gave me a more complete picture of what works, what doesn't, and where the real ceiling of Kiro-as-a-tool actually sits.

Let me walk you through what we learned.

## The Setup: Tic-Tac-Toe as a Teaching Vehicle

We built a Tic-Tac-Toe game. From a whiteboard sketch to a working product — using Kiro's vibe coding mode, steering files, MCP servers, and Agent Hooks.

The choice was intentional. Small enough to build in a whole day. Simple enough that no prior domain knowledge was needed. But rich enough to layer in every major Kiro capability in a natural, progression-based way. The focus was on learning AI-assisted software engineering, not diving deep into individual business domains.

The whiteboard became the first Kiro prompt. That was the magic trick where the audience could not believe their eyes.

## The Playbook: How to Design and Run It

### Guided over free-form. Always.

The single most important decision you'll make is this one: do not run a free-form vibe coding session as your opening. A "just start building something" can create a frustrating first impression for Kiro beginners — random outputs, unclear context, no understanding of why the AI did what it did.

Instead, use a guided whiteboarding session to define scope together before anyone opens the IDE. Take your audience on a journey to embrace a product mindset and design a product. Then take a photo of the whiteboard. Use it as Kiro's first input. You've now created a shared mental model, a concrete artifact, and a meaningful first prompt — all at once.

Participants who understand *what* they're building before they start *how* they're building it show dramatically better results. The whiteboard is not optional — it's the foundation.

### Design for a value progression, not just feature coverage

Structure your workshop so that each module exposes a natural limitation of the previous approach — and then solves it. This was the core principle behind our five-module structure:

1. **Vibe Coding** — Fast, exciting, gets something on screen quickly. But the outputs are inconsistent. Why?
2. **Steering Files** — Because the AI had no context about your project, your standards, your constraints. Now it does.
3. **Spec-Mode with Steering Files** — See the difference? That's not magic. That's context management paired with a structured workflow of modern software engineering.
4. **MCP Servers** — How do you give the AI access to the right knowledge at the right time?
5. **Agent Hooks & Kiro Powers & Agent Skills** — Advanced concepts that go beyond the agentic chat. Highlighting deterministic guardrails on top of probabilistic generation.

Each module creates curiosity. Each module delivers a payoff. Participants don't just learn features — they understand *why* each layer exists.

### Know your audience — and design for the gap

I've held a thesis for a while now: AI in software engineering is not just a tool for developers. It changes how Product Owners collaborate. It changes how QA works. It shapes how UX/UI designers think. It changes how we structure and share information — because in an agentic world, context is currency.

That's exactly why we deliberately ran our second session in front of IT managers and non-engineers. Not as a curiosity, but as a test of this thesis.

The early modules worked brilliantly for both audiences. IT managers had their "this is incredible" moment just as fast as the engineers did. Vibe coding is genuinely accessible. The excitement was real and immediate.

But as we moved into things like spec-driven development, Agent Hooks, and model context protocols, the IT managers got lost.

Not because the concepts are impossible to grasp — but because the mental models required to reason about them are built from hands-on engineering experience. And that experience doesn't transfer through a one-day workshop.

Software engineering is still an expert discipline. A professional IDE is still an expert tool. Kiro lowers the barrier to building significantly. It doesn't eliminate it.

> "What for me became most clear is the mindset shift that agentic AI requires in software engineering — I never understood this before." — Workshop participant

If your audience is mixed, consider running two separate tracks for the advanced modules — or frame the IT manager experience explicitly as a strategic and decision-maker lens, not a practitioner one.

## Resources and References

Here's what we used and what I'd point you to:

- **promptz.dev** — The community library for Kiro prompts, steering documents, agent hooks, and powers. This is where we're publishing the full step-by-step workshop guide so any community member or user group leader can run the same format.
- **The whiteboard-to-Kiro workflow** — Design your MVP features on a physical whiteboard, photograph it, and use the image as your first Kiro context input.
- **Kiro MCP Server Directory** — We used this for the MCP module. A great starting point for demonstrating how external knowledge sources can be wired into Kiro's reasoning.

## The Full Workshop Agenda

Here's the exact structure we used. Total duration: **3–3.5 hours**. Designed for **6–18 attendees**. Adjust pacing based on group size and experience level.

### Starting Phase (35–50 minutes)

**Welcome & Setup (15–30 min)**

- Set expectations: guided, but with space to explore
- Quick baseline check: who has used Kiro before? Who knows MCP servers?
- Confirm accounts and access with a quick smoke test

**Whiteboarding the MVP (15–20 min)**

- Collaborative session to design the product scope together
- Photograph the whiteboard
- Use the photo as Kiro's first context input

This is where the magic happens. The room shifts from "watching a demo" to "building something together."

### Main Part: From Whiteboard to MVP (2–2.5 hours)

The rhythm for each module: brief concept → group framing → individual build → regroup and compare outcomes.

**Module 1 — Vibe Coding (Prompting)**
Take the whiteboard image and create the project structure in vibe coding mode. Fast, exciting, gets something on screen quickly. But the outputs are inconsistent — and that's the point. It sets up the need for everything that follows.

**Module 2 — Steering Files**
Introduce steering files for context management. Attendees create their own. Show how product context, project structure, and technical constraints change the AI's output dramatically.

**Module 3 — Build Feature with Steering Files (Spec-Mode)**
Hands-on implementation showing the before/after difference. This is where participants have their "aha" moment — same tool, radically better results.

**Module 4 — MCP Servers**
Introduce MCP servers (e.g., Context7 for SDK interaction). Explain how to give the AI access to external knowledge at the right time.

**Module 5 — Build Feature with MCP Servers (Spec-Mode)**
Practical implementation using MCP servers. Real-world integration that shows the power of wiring external knowledge into Kiro's reasoning.

**Module 6 — Kiro Powers & Agent Hooks**
Advanced concepts: framework-specific capabilities (e.g., React Powers) and deterministic guardrails on top of probabilistic generation. This is where engineering expertise matters most.

**Module 7 — Build Feature with Kiro Powers (Spec-Mode)**
Final hands-on exercise. By now, participants have experienced the full progression and understand why each layer exists.

**Backup Content (if time permits)**

- AI opponent design
- CI/CD pipeline setup
- AWS deployment options

### Closing (30–45 minutes)

**Q&A and Feedback**

- Open questions and shared experiences
- Gather feedback for workshop improvements

**Workflow Integration Planning (20–30 min)**

- Dedicated time for participants to think through how Kiro fits into their specific team and project workflows
- This was the #1 request from our first session — don't skip it

**Community Resources**

- Introduce promptz.dev as the community library for prompts, steering documents, agent hooks, and powers
- Encourage contributions from participants

## Prerequisites for Participants

Don't skip this. A bad setup at the start of a hands-on session kills momentum fast.

Before the workshop, participants should:

- [ ] Have the Kiro IDE installed
- [ ] Have a Kiro account created and verified (new accounts receive 500 free credits — more than enough)
- [ ] Get a brief intro from you on what Kiro is and how to navigate the UI — but keep it short, as you want to get your hands dirty as fast as possible
- [ ] Accept that everything fails all the time. Manage expectations, especially around the non-deterministic behaviour of AI agents

## Common Pitfalls to Avoid

These came directly from our experience and from participant feedback:

### ❌ Starting with complex, real-world codebases

Multiple participants asked: "This is great, but what about our actual monorepo with 200,000 lines of code?" It's a fair and important question — and the honest answer is that handling large, complex repos requires a separate deep-dive session. Don't try to cover it in your first workshop. It will open a rabbit hole that swallows the rest of your agenda.

### ❌ Skipping the "why" behind each feature

One of the highest-rated moments in our session was when we explained *why* things like steering files exist — not just *how* to use them. Participants said it made the features more tangible. Invest time in the conceptual framing. It pays dividends in adoption.

> "You really helped me understand how to do the steering. This makes AI's results a lot less random 👍" — Participant survey

### ❌ Pitching instead of enabling

This one showed up directly in the feedback:

> "They didn't try to sell the product, but rather tried to show how it can make my life easier." — Participant survey

This is the difference between a product demo and a genuine enablement session. Your job is not to convince people Kiro is good. Your job is to help them discover it for themselves.

### ❌ Not planning for the "what next" question

By the end of our session, the most common request was: "How do we actually integrate this into our specific project and team workflow?" Build a dedicated closing segment — even 20–30 minutes — where participants think through their own workflow integration plan. We're already designing a follow-up deep-dive session specifically for this.

## Results & Reflection

### What the Numbers Said

**4.7/5 CSAT** across 11 survey responses. A few more highlights from the qualitative feedback:

> "Learned a lot of great things. They took the time to onboard everyone to Agentic Basics — MCPs, Hooks, and so on."

> "Great that everybody was integrated no matter the depth level."

> "I am looking forward to using it."

The one consistent request for improvement: more time on real-world workflow integration and pitfall documentation for production use. That's the follow-up workshop. It's already in planning.

### My Personal Takeaway

Running this workshop for two very different audiences — engineers and IT managers — confirmed something I've believed for a long time, and that the feedback made even clearer:

**AI in software engineering transforms every discipline — not just development.**

It changes how Product Owners collaborate. It changes how QA works. It shapes how UX/UI designers think. It changes how we structure and share information — because context is now currency. Try to bring in all these facets of software engineering into this workshop.

This is a team sport. And the teams that will win are those who adopt a product mindset — who understand that software engineering was never about writing code. It is always about solving business problems. The code is just how we used to get there. For now!

Future winners will be those who consider software development with a product mindset, combined with understanding how tools like Kiro work for them.

With agentic AI, the distance between idea and working software is collapsing. But it's collapsing fastest for the people who understand how software works AND who know how your business works. The expert knowledge doesn't disappear — it gets amplified.

---

*Running a Kiro workshop at your company or user group? The full step-by-step facilitator guide will be published at promptz.dev.*
