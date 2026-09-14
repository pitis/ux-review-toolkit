# Conceptual Design

The bridge between "we know what we're building" (see [03-understanding-the-product.md](03-understanding-the-product.md)) and "here's a screen" (see [05-prototyping.md](05-prototyping.md)). You produce flows, journeys, stories, and a backlog — *not* pixels yet.

> ← Back to [SKILL.md](../SKILL.md) · Related: [03-understanding-the-product.md](03-understanding-the-product.md), [05-prototyping.md](05-prototyping.md)

## Deliverable principles (apply to every artifact below)

The roadmap names five universal principles for any conceptual deliverable. Use them as a checklist:

1. **In general, keep it short and simple** — no diagram needs more than one screen.
2. **Make it easy to understand and complete** — a stranger should grasp it in <60 seconds.
3. **Make progress visible to the user** — for any flow with >1 step, show where they are.
4. **Make progress meaningful to reward user** — completed sub-steps unlock something (preview, ability, info), not just a green check.
5. **Make successful completion clearly visible** — the user should never have to guess "did it work?"

These principles also dictate flow design (loading states, multi-step forms, wizards, onboarding).

## User Stories

The unit of work that turns the Target Action into something buildable.

**Format:**
> As a *[Target Actor]*, I want to *[Target Action]*, so that *[Target Outcome]*.

**Acceptance criteria** sit underneath each story as Given/When/Then triples.

**Anti-patterns:**
- "User" instead of a specific actor — too vague to design against
- "Be able to" — replace with the verb itself
- Implementation in the story ("As a user, I want a button...") — describe behavior, not the widget

## Create Product Backlog

A backlog is the *prioritized* list of stories (+ tasks, bugs, spikes). For UX work specifically:

- One story = one Target Action
- Group stories by *user journey stage*, not by component
- Tag with which CREATE Funnel gate the story addresses (Cue, Reaction, Evaluate, Ability, Timing, Experience)
- Keep "ready" stories at top: outcome-locked, designed, estimable

## Customer Experience Map (Mel Edwards' framing)

A horizontal timeline of the user's experience across all touchpoints — *before*, *during*, and *after* using your product. Edwards adds the rows below:

| Row | What it captures |
|---|---|
| **Stages** | The phases (Awareness → Consideration → Onboarding → Active Use → Renewal/Churn) |
| **Actions** | What the user *does* in each stage |
| **Touchpoints** | Where the interaction happens (channel, device, person) |
| **Thoughts** | What the user is thinking ("Will this work?", "Is it safe?") |
| **Emotions** | A line graph: high to low across stages |
| **Pain points** | Specific friction; tag with severity |
| **Opportunities** | Where you can intervene |

**Use it when:** the experience is multi-channel, multi-session, or includes humans (sales, support). For a single screen, skip this and go straight to a flowchart.

## Process flow notations — pick the right one

| Notation | Strength | Use when |
|---|---|---|
| **Simple Flowchart** | Universal, no learning curve | Internal alignment; small flows; non-technical stakeholders |
| **Event-driven Process Chain (EPC)** | Models triggers + functions + branching state explicitly | The user's path depends on prior events / state machines |
| **Business Process Model & Notation (BPMN)** | Industry standard for cross-actor processes (lanes per role) | Multi-actor processes (user, support, admin, system); compliance-relevant flows |

**Default:** simple flowchart. Escalate to EPC or BPMN only when the simple version starts collapsing under conditional branches or multiple actors.

### Notation tips that survive review

- One node = one verb + one object
- Decision diamonds = closed yes/no questions only ("Has user verified email?" — not "What does user want?")
- Number every step
- End-states ("success", "abandon", "error") are nodes too, not implicit
- If you cross a swim lane (BPMN), explicitly mark the handoff

## What the deliverable bundle looks like

For a typical feature, your conceptual design package is:

1. One-page **product brief** — outcome / actor / action (from [03](03-understanding-the-product.md))
2. **User stories** with acceptance criteria
3. One **flowchart or BPMN diagram** of the happy path + 1–2 critical alternates
4. A **customer experience map** — only if the feature spans channels or stages
5. A **prioritized backlog** mapped to CREATE Funnel gates
6. A **measurement plan** stub (primary metric + how it's instrumented) — see [07-measuring-impact.md](07-measuring-impact.md)

That's enough to start wireframing. Don't paint pixels until items 1–3 are stable.

## Common mistakes

- Skipping flowcharts and going straight to mocks — costs 5× to fix branching later
- BPMN with one swimlane — you wanted a flowchart; use a flowchart
- Customer Experience Maps that have no emotions or pain points (just process boxes) — that's a flowchart with extra rows
- User stories without acceptance criteria — invites scope creep
- Backlogs sorted by "what's easiest to build" instead of by impact on the Target Outcome
