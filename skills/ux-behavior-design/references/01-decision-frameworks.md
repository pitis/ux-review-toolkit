# Decision-Making Frameworks

How humans actually decide. These are the mental models you'll cite when explaining *why* a UX choice does or doesn't move behavior. Built from the "Human Decision Making" branch of roadmap.sh/ux-design.

> ← Back to [SKILL.md](../SKILL.md) · Related: [02-behavior-change-strategies.md](02-behavior-change-strategies.md), [06-ux-patterns.md](06-ux-patterns.md)

## Use this file when

- You need to explain *why* a flow loses users (not just *that* it loses them)
- You're choosing between a fast/automatic UX vs a deliberate one
- A stakeholder says "users are irrational" — you need to name what's actually happening
- You're deciding whether to **nudge** vs **inform** vs **gate** vs **default**

## BJ Fogg's Behavior Model (B = MAT)

> **Behavior happens when Motivation, Ability, and a Trigger converge at the same moment.**

- **Motivation** — does the user want this? (pleasure/pain, hope/fear, social acceptance/rejection)
- **Ability** — is it easy enough *right now*? (time, money, physical effort, brain cycles, social deviance, non-routine)
- **Trigger** — is there a prompt at the right moment? (spark = motivate; facilitator = make it easier; signal = remind)

**How to use:** When a behavior isn't happening, ask which of the three is missing. Most product UX problems are *Ability* problems disguised as motivation problems. Don't add motivation when you should remove friction.

## CREATE Action Funnel (Stephen Wendel)

The user must pass *all six* gates to act. Diagnose where they fall off.

1. **Cue** — did they notice the opportunity? (visibility, timing, channel)
2. **Reaction** — gut System-1 response: yes / no / meh? (aesthetic, trust, fit)
3. **Evaluation** — System-2 weighing of cost vs benefit (rational, comparative)
4. **Ability** — *can* they do it now? (skill, money, time, friction)
5. **Timing** — is *now* the right moment, or is "later" winning?
6. **Experience** — was the last attempt rewarding enough to make this attempt worth doing?

**How to use:** For any drop-off, identify *which* CREATE gate is breaking. The fix is gate-specific:
- Cue broken → see *Getting Attention* patterns
- Reaction broken → see *Positive Intuitive Reaction* patterns
- Evaluation broken → see *Favorable Conscious Evaluation* patterns
- Ability broken → see *Easy Action* patterns
- Timing broken → see *Urgency* patterns
- Experience broken → see [02-behavior-change-strategies.md](02-behavior-change-strategies.md) (habit/reward loop)

## Dual Process Theory (Kahneman: System 1 / System 2)

- **System 1** — fast, automatic, intuitive, effortless. Most decisions live here.
- **System 2** — slow, deliberate, effortful. Only engaged when System 1 hands off.

**Implications:**
- Aesthetics, defaults, framing, anchoring, social proof = System 1 levers
- Comparison tables, pros/cons, terms-of-service = System 2 levers
- A "rational" user is rare; design for System 1 first
- For high-stakes decisions (price, contracts, health), explicitly invoke System 2 — see *Help User Think About Their Action* in [02-behavior-change-strategies.md](02-behavior-change-strategies.md)

## Spectrum of Thinking Interventions

A continuum from "do it for them" to "make them think":

| End | Intervention | Use when |
|---|---|---|
| Automatic | Defaults, auto-actions, opt-out | Behavior is reversible & low-stakes |
| Nudge | Cues, framing, social proof | Want to bias choice without removing it |
| Persuade | Reasons, evidence, testimonials | User has time and stake to evaluate |
| Educate | Tutorials, explanations | Skill or knowledge gap blocks behavior |
| Gate | Confirmations, friction, locks | Wrong action causes irreversible harm |

**Rule of thumb:** start at the automatic end and add friction only when consequences increase.

## Nudge Theory (Thaler & Sunstein)

A **nudge** is any aspect of choice architecture that alters behavior **predictably without forbidding options or significantly changing economic incentives**. Defaults, framing, ordering, and salience are the four big levers.

**Tests for whether your "feature" is actually a nudge:**
- Does it leave all options available? (yes → nudge; no → gate or restriction)
- Is it cheap to ignore? (yes → nudge; no → coercion)
- Would you publicly defend it to the affected user? (yes → ethical nudge; no → dark pattern)

## Persuasive Technology (Fogg's earlier work)

Tech that changes attitudes or behavior through computer-as-tool, computer-as-medium, or computer-as-social-actor. The "social actor" lane is where chatbots, badges, streaks, and personality-driven UI live.

## Behavioral Science / Behavioral Economics

Umbrella terms for the empirical study of how humans *actually* decide vs how rational-actor models say they should. Source heuristics & biases relevant to UX:

- **Anchoring** — first number seen biases all subsequent judgments
- **Loss aversion** — losses feel ~2× as bad as equivalent gains feel good
- **Endowment effect** — once owned (or felt to be owned), value goes up
- **Status quo bias** — current option > new option, all else equal
- **Social proof** — others' behavior is signal when uncertain
- **Scarcity** — limited supply increases perceived value
- **Authority** — credentialed sources are weighted more
- **Reciprocity** — gifts (even small) generate obligation

## Behavior Design

Fogg's umbrella discipline that combines the Behavior Model + Behavior Grid + Tiny Habits methodology into a structured design practice. Practitioners typically:

1. Identify a target behavior
2. Find a trigger that already exists in the user's life
3. Make the behavior *tiny* enough to require almost no motivation
4. Celebrate immediately to wire in the habit

## Quick recall table

| Concept | One-line | Used for |
|---|---|---|
| Fogg B=MAT | Behavior needs Motivation + Ability + Trigger together | Diagnose missing ingredient |
| CREATE Funnel | 6 gates: Cue, React, Evaluate, Ability, Timing, Experience | Locate drop-off |
| Dual Process | System 1 (fast) vs System 2 (slow) | Pick lever class |
| Spectrum | Automatic → Nudge → Persuade → Educate → Gate | Match intervention to stakes |
| Nudge | Bias choice without removing it | Defaults, framing |
| Behavioral Econ | Inventory of biases | Look up specific lever |
| Behavior Design | Practitioner methodology | Day-to-day workflow |

## Common mistakes

- **Treating motivation as the bottleneck** when it's almost always ability
- **Inventing biases to fit** without checking — only invoke a bias if you can name it precisely
- **Skipping CREATE diagnosis** and jumping to a pattern fix
- **Engaging System 2** for cheap, reversible decisions (causes friction without value)
