# UX Agent — One-Page Cheatsheet

Paste-able review checklist for any feature, screen, or flow.

> ← Back to [SKILL.md](../SKILL.md)

## Step 1 — Pre-flight (5 questions)

```
1. Target outcome:  __________ (a measurable change in the world)
2. Target actor:    __________ (specific role + context)
3. Target action:   __________ (one verb + one object)
4. CREATE gate broken today: [ Cue / Reaction / Evaluate / Ability / Timing / Experience ]
5. Primary metric + decision rule: __________
```

If any blank, **stop** — resolve before designing.

## Step 2 — Diagnose (CREATE Funnel)

| Gate | "Users…" symptom | Try patterns from |
|---|---|---|
| **Cue** | …don't notice / ignore | §1 *Getting Attention* |
| **Reaction** | …notice but don't engage | §2 *Positive Intuitive Reaction* |
| **Evaluate** | …consider but don't commit | §3 *Favorable Conscious Evaluation* |
| **Ability** | …commit but bail mid-flow | §4 *Easy Action* |
| **Timing** | …intend, then forget / defer | §5 *Urgency* |
| **Experience** | …did it once, didn't return | [02-behavior-change-strategies.md](02-behavior-change-strategies.md) habit loop |

(`§N` refers to clusters in [06-ux-patterns.md](06-ux-patterns.md).)

## Step 3 — Pick the lowest-friction lever first

Order of preference (cheapest to most expensive):

1. **Cheat** — defaulting, automate repetition, make it incidental ([02](02-behavior-change-strategies.md))
2. **Reduce friction** — *Lessen the Burden of Action / Info*, *Avoid Choice Overload*, *Avoid Cognitive Overhead* ([06](06-ux-patterns.md) §4)
3. **Clarify** — *Tell User what the Action is*, *Make it Clear Where to Act*, *Clear the Page of Distractions* ([06](06-ux-patterns.md) §1, §2)
4. **Persuade** — authority, social proof, peer comparisons ([06](06-ux-patterns.md) §3)
5. **Add motivation** — gamification, scarcity, urgency framing ([06](06-ux-patterns.md) §1, §5)

Skip levels only with reason. If you reach for #5 first, you're probably solving the wrong problem.

## Step 4 — Layout sanity check

For every screen, confirm:

- [ ] One primary action, visually dominant
- [ ] Reading order = importance order
- [ ] Empty / loading / error / success states designed (not implicit)
- [ ] Hierarchy ≤ 3 levels
- [ ] Touch targets ≥ 44 px on mobile
- [ ] Errors next to their cause
- [ ] Above-the-fold = the first decision the user makes

## Step 5 — Behavioral pre-mortem

Before shipping, answer:

- [ ] Where will the user pause / hesitate / get stuck?
- [ ] What's the failure mode if motivation is low?
- [ ] What's the dark-pattern risk? (Would I be embarrassed for the user to see how this works?)
- [ ] Does any pattern conflict with another on the same screen?

## Step 6 — Measurement plan

- [ ] Primary metric instrumented and named *before* launch
- [ ] 2–3 guardrail metrics (revenue, latency, churn, support volume)
- [ ] Sample-size + duration calculated; decision rule fixed
- [ ] Qual pairing scheduled (3–5 interviews/replays) — especially for nulls
- [ ] Capture-the-learning slot booked: where does the result get codified?

## Step 7 — Phrase the recommendation

When reporting back, name patterns explicitly:

> **Symptom:** [drop-off at X]
> **Funnel gate:** [Reaction / Ability / etc.]
> **Pattern applied:** *[Pattern name]*
> **Concrete change:** [the one-sentence diff]
> **Metric to watch:** [primary] (with guardrail [secondary])
> **Test:** [A/B with sample N over D days; decision rule]

Vague: "Make the CTA stronger." Concrete: "Apply *Tell User what the Action is and ask for it* + *Clear the Page of Distractions*: replace 'Get started' → 'Connect inbox', remove sidebar promos. Primary metric: connect-rate among new tenants. Test: A/B 7 days, ship at +2pp lift."

## Anti-patterns to flag in review

- "Make users do X" without naming the friction or motivation gap
- Multiple primary CTAs on one screen
- Loss-aversion / scarcity framed against losses or scarcity that don't exist
- Conscious-action UX for trivial reversible decisions
- Cheat (default) for high-stakes irreversible decisions
- Gamification of intrinsically rewarding behavior
- Variable rewards on harmful behaviors (engagement up, well-being down)
- Shipping without instrumentation
- Treating "looks good in staging" as evidence of impact
