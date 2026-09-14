# Measuring the Impact

Every UX recommendation comes with a measurement plan, or it doesn't ship. The roadmap puts testing at the *end* of the funnel for a reason: without measurement, you cannot tell if a pattern worked, broke, or was offset by something else.

> ← Back to [SKILL.md](../SKILL.md) · Related: [01-decision-frameworks.md](01-decision-frameworks.md), [06-ux-patterns.md](06-ux-patterns.md)

## The loop: Test → Gather Lessons → Prioritize → Integrate

A continuous loop, not a one-shot test:

1. **Test** — run a controlled experiment (A/B or multivariate)
2. **Gather Lessons** — extract qualitative + quantitative findings, including null results
3. **Prioritize** — rank what to do next based on impact × effort × confidence
4. **Integrate** — ship the winner; codify the learning into a pattern, doc, or design-system rule

The integrate step is where most teams fail — they ship the winner and lose the learning. Capture it as a one-paragraph "what we now believe" entry in your design system or research repo.

## Pick the right test type

### Incremental A/B Testing

Two variants, one change at a time. The default. Use when:

- You're testing a single hypothesis (one pattern, one copy change, one layout)
- You have enough traffic to reach significance in a reasonable window
- You can hold *all other variables* constant

**Pre-flight checklist:**

- [ ] Hypothesis is falsifiable: "Variant B will lift X by ≥ Y%"
- [ ] Primary metric chosen *before* launch
- [ ] Guardrail metrics chosen *before* launch (revenue, latency, churn, support tickets)
- [ ] Sample size + duration calculated for the expected effect (avoid peeking)
- [ ] Segmentation plan: which user cohorts will you slice?
- [ ] Decision rule: ship / kill / iterate at fixed end date — don't extend to find significance

**Common failure modes:**

- Peeking and stopping early when "it looks good"
- Running until significance regardless of duration (multiple-comparison problems)
- Ignoring guardrail regressions because the primary moved
- Testing across a holiday or seasonal anomaly
- "Inconclusive" treated as "no signal" instead of "needs bigger sample / better hypothesis"

### Multivariate Testing

Multiple variables tested simultaneously across cells (e.g., headline × CTA × image = 8 cells). Use when:

- You have lots of traffic — *and* you can afford to split it
- You're optimizing within a known design (not testing a new pattern)
- You want interaction effects, not just main effects ("does the bold headline lift conversion *more* with image B?")

**Avoid multivariate when:**

- Traffic is below ~5–10× what an A/B would need (cells too small)
- The variables interact unpredictably (results become noisy)
- You actually have one big hypothesis — just A/B it

### When to use neither

- The change is too small or universal to test (typo fix, accessibility fix that meets a standard)
- You don't yet have a hypothesis — go qualitative first (5 user interviews beat a poorly-set-up A/B)
- The metric won't move detectably — find a better metric or run a longer test

## Choosing the metric

For each tested change, pick:

- **One primary metric** — the thing you expect to move; aligned with the Target Outcome
- **2–3 guardrail metrics** — things that *must not* regress (revenue, error rate, NPS proxy, downstream conversion)
- **Optional secondary metrics** — nice-to-knows; not decision-bearing

### Common metric pitfalls

- Optimizing CTR when you wanted purchases — always pick the metric closest to the Target Outcome
- Using session-level metrics when the behavior is multi-session
- Conflating exposure with adoption (showed != used)
- Measuring engagement on a feature whose goal is *to be used less* (e.g., support deflection)

## Qualitative pairing

Quant tells you *that* something moved. Qual tells you *why*. For every quant test, schedule 3–5 short interviews or replay sessions, especially for:

- Null results (helps you find the next hypothesis)
- Counter-intuitive wins (could be regression-disguised-as-improvement)
- Big losses (find what broke before you ship the next variant)

## Gather Lessons — what to actually capture

Per test, write a one-page summary:

- The hypothesis, in original form
- Primary metric result (with confidence interval, not just p-value)
- Guardrail metrics
- Segments where the effect was strongest / weakest
- Any qualitative signal that explains the result
- **What we now believe** (the durable learning)
- Next test on the stack

Treat null results as data. Most teams' biggest learnings come from things that *didn't* work as expected.

## Prioritize — frameworks

Pick one and stick to it across the team. The roadmap stays neutral; common ones:

- **ICE** — Impact × Confidence × Ease (1–10 each, multiply)
- **RICE** — Reach × Impact × Confidence × Effort (Effort denominator)
- **PIE** — Potential × Importance × Ease

What matters more than the formula: *consistent application*, *re-scoring after each test*, *visible rationale*.

## Integrate — codify the learning

After a clear winner:

- Update the relevant pattern note (which CREATE gate did it move? add evidence)
- Update microcopy / component defaults in the design system if applicable
- Tell the team what was learned (not just what shipped)
- Add the next hypothesis to the test backlog

## Common mistakes

- Shipping without instrumentation — "we'll add it later" almost never happens
- Treating significance as truth — small effects hit significance with enough sample but may not matter operationally
- Using the same metric for activation, engagement, and retention work
- Killing tests early when they look bad — that's also peeking
- Running a multivariate when you needed a sequence of A/Bs
- Failing to integrate — winners ship but learnings vanish
