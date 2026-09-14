---
name: ux-behavior-design
description: Use when designing or reviewing a user-facing feature, screen, flow, onboarding, CTA, empty state, form, or behavior-change mechanic. Covers decision-making frameworks (BJ Fogg's Behavior Model, CREATE Action Funnel, Dual Process Theory), persuasion and nudge patterns, wireframing, conceptual design, and A/B measurement. Triggers on words like "UX", "user flow", "onboarding", "CTA", "conversion", "engagement", "habit", "retention", "drop-off", "wireframe", "prototype", "persona", "user story", "user journey", "A/B test".
---

# UX Behavior Design

Behavior-change-oriented UX reference distilled from roadmap.sh/ux-design plus its canon (BJ Fogg, Stephen Wendel, Nir Eyal, Kahneman). Use when **designing, reviewing, or critiquing** any user-facing surface — not as career-path material.

## When to use

- Designing a new feature, screen, flow, onboarding, or modal
- Reviewing an existing UI for friction, drop-off, or low engagement
- Choosing between design alternatives ("button A vs button B", "1-step vs 3-step form")
- Picking a measurement strategy for a UX change (A/B, multivariate, qualitative)
- Naming the *real* problem behind a vague user complaint ("it's confusing", "no one clicks this")

## When NOT to use

- Pure visual styling questions with no behavioral component → use a design-system or Tailwind reference instead
- Pixel-level CSS implementation → out of scope
- Accessibility audits (WCAG conformance specifically) → cross-reference, but use a dedicated a11y resource
- "How do I become a UX designer?" career questions → wrong skill

## Pre-flight checklist (answer before proposing any UX)

Before you suggest a layout, copy change, or pattern, answer these five — out loud in your response:

1. **Target outcome** — what business or user outcome are we moving? (revenue, retention, task completion rate, etc.)
2. **Target actor** — *which* user, in *which* context? (new vs returning; mobile vs desktop; novice vs power user)
3. **Target action** — what specific behavior do they need to perform? (one verb + one object)
4. **Where in the CREATE funnel does the user fall off?** — Cue → React → Evaluate → Ability → Timing → Experience. The fix depends on the stage.
5. **How will we know it worked?** — primary metric, guardrail metric, sample size / decision rule

If you can't answer all five, ask the user before proposing anything.

## Quick reference: problem → cluster → file

| Symptom | Likely cluster | Load this reference |
|---|---|---|
| "Users don't notice / ignore the feature" | Getting Attention | `references/06-ux-patterns.md` |
| "Users see it but don't click" | Positive Intuitive Reaction | `references/06-ux-patterns.md` |
| "Users click but bail before finishing" | Easy Action / reduce friction | `references/06-ux-patterns.md` |
| "Users don't trust it / hesitate" | Favorable Conscious Evaluation | `references/06-ux-patterns.md` |
| "Users plan to but never come back" | Urgency / commitment | `references/06-ux-patterns.md` |
| "We need users to form a daily habit" | Habit-formation strategies | `references/02-behavior-change-strategies.md` |
| "We don't know what to build for whom" | Product/audience definition | `references/03-understanding-the-product.md` |
| "We need to map an end-to-end flow" | Journeys, flowcharts, BPMN | `references/04-conceptual-design.md` |
| "We need a low-fi prototype" | Wireframing + tools | `references/05-prototyping.md` |
| "We need to validate the change" | A/B + multivariate testing | `references/07-measuring-impact.md` |
| "Why do humans pick this over that?" | Decision-making theory | `references/01-decision-frameworks.md` |

## Reference index

- `references/01-decision-frameworks.md` — Fogg's Behavior Model, CREATE Action Funnel, Dual Process Theory, Nudge Theory, Persuasive Technology, Behavioral Science / Economics, Behavior Design, Spectrum of Thinking Interventions
- `references/02-behavior-change-strategies.md` — Fogg's Behavior Grid; "Cheating" (Defaulting, Making it Incidental, Automating Repetition); Habit change (Avoid the Cue, Replace the Routine, Mindfulness, Crowd-Out, Hook Model, Cue-Routine-Reward); Conscious Action (Educate, Help User Think)
- `references/03-understanding-the-product.md` — Target Outcome / Actor / Action; Personas; Business Model Canvas, Lean Canvas, Business Model Inspirator; Competitor Analysis, Five Forces, SWOT
- `references/04-conceptual-design.md` — User Stories, Product Backlog, Customer Experience Map (Mel Edwards), Simple Flowchart, EPC, BPMN, deliverable principles
- `references/05-prototyping.md` — Wireframing, Good Layout Rules; Figma vs Adobe XD vs Sketch vs Balsamiq
- `references/06-ux-patterns.md` — The five UX best-practice clusters (~50 named patterns)
- `references/07-measuring-impact.md` — A/B testing, multivariate testing, Gather-Prioritize-Integrate loop
- `references/cheatsheet.md` — One-page checklist for any feature review

## Operating principles

- **Name the pattern.** "Apply *Default Everything* to the notification opt-in" beats "make it easier."
- **Cite the funnel stage.** "This breaks at *Evaluate* because the user can't tell if it's safe" beats "this is bad."
- **Refuse to skip measurement.** Every recommendation must come with a metric.
- **Prefer subtraction.** *Lessen the Burden of Action / Info*, *Avoid Choice Overload*, and *Avoid Cognitive Overhead* are usually higher-leverage than adding features.
