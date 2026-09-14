# Understanding the Product

Before any UI work, lock down *what* you're building, *for whom*, and *why it makes business sense*. The roadmap calls this "Understanding the Product" — it sits between strategy and design.

> ← Back to [SKILL.md](../SKILL.md) · Related: [04-conceptual-design.md](04-conceptual-design.md)

## Three locks: Outcome → Actor → Action

Every product question must be answerable in this order:

1. **Target Outcome** — the end-state that defines success. Phrased as a *change in the world*, not a feature.
   - ✅ "Reduce time-to-first-message for new tenants from 3 days to under 1 hour."
   - ❌ "Build an onboarding wizard."
2. **Target Actor** — *which* user, in *which* role, in *which* context. One sentence.
   - ✅ "Hotel ops managers in their first week, on desktop, no prior CRM experience."
   - ❌ "Users."
3. **Target Action** — the *single observable behavior* that produces the outcome. One verb + one object.
   - ✅ "Send the first inbound-reply auto-response."
   - ❌ "Engage with the platform."

If any lock is missing, you cannot evaluate a design alternative — every option will look defensible because there's no criterion to choose against.

## Define Target Users

Beyond the actor sentence, write a **one-page user definition**:

- Demographics that actually matter (role, seniority, tools they already use)
- Trigger context — what's happening *just before* they touch your product
- Job-to-be-done — what they hire your product to do
- Anti-persona — explicit "this is not for X"
- Existing alternatives, including doing nothing

Skip generic demographics that don't change design choices.

## Create User Personas

Personas = *named*, *photographed*, *one-page* archetypes you can defend design decisions to. Useful when the team keeps drifting away from the target actor; harmful when they become fan-fiction.

Each persona answers, at minimum:

- Goals (in your product's domain)
- Frustrations with current solutions
- Skill ceiling (novice / regular / power)
- A representative quote
- One sentence on what would make them quit

Build 1–3 max. More than 3 = you're optimizing for "everyone."

## Clarify Product

Pin down product boundaries before UI:

- What is in scope vs explicitly out
- What sits adjacent (does another team own it?)
- What's the smallest end-to-end version that delivers the outcome?
- What's the version that fails (anti-MVP)?

## Business Model

Two roadmap branches: **existing business model** vs **new business model**. Pick which lane you're in — the design constraints differ.

### Existing Business Model

If you're improving a feature inside a known model, the model is a *constraint*, not a question. UX decisions must respect:

- Where the revenue comes from (free tier, seat pricing, usage, ad-driven)
- Conversion points the business depends on
- Things you must not sacrifice (retention metrics, regulated steps)

### New Business Model — tools to map it

- **Business Model Canvas** (Osterwalder) — 9 blocks: Customer Segments, Value Propositions, Channels, Customer Relationships, Revenue Streams, Key Resources, Key Activities, Key Partners, Cost Structure. Use for full-product framing.
- **Lean Canvas** (Maurya) — adapted from BMC for early-stage; replaces 4 blocks with Problem, Solution, Key Metrics, Unfair Advantage. Use when you're still proving the problem exists.
- **Business Model Inspirator** — a prompt deck (cards or worksheet) that forces you to consider unfamiliar revenue / channel patterns. Use when stuck in one frame.

| If you have… | Use… |
|---|---|
| A real customer, unclear monetization | Lean Canvas |
| A real revenue stream, refining it | Business Model Canvas |
| Stuck — every option looks the same | Business Model Inspirator |

## Competitive context

- **Competitor Analysis** — who solves a similar problem? Map: features, price, positioning, on-boarding flow, retention mechanics. Steal *patterns* (legal & wise), not assets.
- **Five Forces (Porter)** — supplier power, buyer power, competitive rivalry, threat of substitutes, threat of new entrants. Used at the *strategy* level to predict whether a UX advantage will survive.
- **SWOT** — Strengths, Weaknesses, Opportunities, Threats. Lightweight scan; pair with one of the above for rigor.

**For UX decisions specifically**, competitor analysis matters most. Five Forces and SWOT inform the *frame*, not the screen.

## Pre-flight: are we ready to design?

Block design work until you can answer YES to all of:

- [ ] Target Outcome is a measurable change in the world
- [ ] Target Actor is a *named* role with a clear context
- [ ] Target Action is a single verb + object the user must perform
- [ ] We've named at least one existing alternative the user could use instead
- [ ] We know the business-model lane (existing vs new) and its constraints
- [ ] We can name how the action shows up in analytics

If anything is `[ ]`, push back and resolve before producing screens.

## Common mistakes

- Skipping the Outcome lock and inheriting a feature spec as if it were a goal
- Over-personifying personas until they detach from real users
- Treating the Business Model Canvas as a deliverable instead of a tool
- Doing competitor analysis on visual design instead of behavior flows
- Defining "users" as everyone — guarantees a mediocre UI for all of them
