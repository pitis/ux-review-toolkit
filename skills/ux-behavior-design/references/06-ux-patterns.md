# UX Patterns — Five Best-Practice Clusters

This is the largest file. It's the **UX Best Practices** material from roadmap.sh, reorganized by **which CREATE Funnel gate each pattern serves**. Find the cluster that matches your symptom, then apply the named pattern.

> ← Back to [SKILL.md](../SKILL.md) · Related: [01-decision-frameworks.md](01-decision-frameworks.md), [02-behavior-change-strategies.md](02-behavior-change-strategies.md), [07-measuring-impact.md](07-measuring-impact.md)

## Map: symptom → cluster → CREATE gate

| Symptom | Cluster | CREATE Gate |
|---|---|---|
| Users don't notice / ignore the feature | [Getting Attention](#1-getting-users-attention) | Cue |
| User sees it but feels "meh / not for me" | [Positive Intuitive Reaction](#2-getting-positive-intuitive-reaction) | Reaction |
| User likes it but won't commit / hesitates | [Favorable Conscious Evaluation](#3-favorable-conscious-evaluation) | Evaluate |
| User wants to but it's too hard | [Easy Action](#4-make-sure-users-can-do-it-easily) | Ability |
| User wants to but "later" wins | [Urgency](#5-creating-urgency-to-act-now) | Timing |

---

## 1. Getting User's Attention

> *"When attention is fleeting and scarce — with many chances to influence user."*

The Cue gate. If the user never sees the opportunity, the rest of the funnel doesn't matter.

### Patterns

- **Tell User what the Action is and ask for it** — Make the ask explicit. Not "Get started" — "Connect your inbox in 30 seconds." Verbs > nouns; benefit > feature.
- **Call to Action (CTA)** — One primary CTA per screen. Action verb + outcome ("Send invoice", "Reserve seat"). Match button label to the user's mental verb, not your DB verb.
- **Status Reports** — Surface where the user *is* in their progress without being asked. Account-completeness bars, "3 of 5 steps left", filled-out vs missing fields. Latches motivation.
- **Reminders & Planning Prompts** — Bring the action back when context fades. Email/push for time-sensitive; in-app banners for in-session. Combine with *Elicit Implementation Intentions* for max effect.
- **Behavior Change Games** — Small bounded games (streaks, levels, quests) that make the desired behavior the goal. Use only when the behavior is intrinsically fine to repeat.
- **Decision-Making Support** — Tools that help the user *think* about choices: comparison tables, pros/cons, "what others chose", scenario simulators. Surface when the choice gates the outcome.
- **Gamification** — Points, badges, leaderboards. Engages extrinsic motivation. *Risk:* once badges become the goal, the underlying behavior decays. Use for short campaigns; retire before they backfire.
- **Goal Trackers** — User-set targets + visible progress. Combines well with *Status Reports* and *Make progress meaningful*. Most effective when the goal is concrete and time-boxed.
- **Social Sharing** — Let users broadcast progress / outcomes. Doubles as social proof for next users. Only ask once meaningful progress exists; never share *for* the user.
- **Reminders** — Specifically: time-based, event-based, location-based prompts to re-engage. Default off for non-critical; opt-in increases trust.
- **Tutorials** — Just-in-time *> upfront. Embed in the first real task, not in a pre-task carousel. Show, don't tell. *In general, keep it short and simple.*
- **Planners** — UI affordances for the user to lay out *when/how* they'll act ("set when you'll do it"). See *Elicit Implementation Intentions* below.
- **How-to-Tips** — Inline microcopy at the moment of confusion. Better than help-center links because they preserve flow.

### When to apply this cluster

- Funnel analytics show drop at *first impression / first session*
- Feature is enabled but DAU among enabled is flat
- Users describe a feature as "I didn't know that existed"

---

## 2. Getting Positive Intuitive Reaction

> *"System 1 fires before System 2 — make the gut response 'yes'."*

The Reaction gate. The user has noticed; now they react in <500ms.

### Patterns

- **Clear the Page of Distractions** — Strip secondary CTAs, sidebar promos, notification badges from any screen with a primary action. Conversion screens are *not* dashboards.
- **Make it Clear, Where to Act** — Visual weight = importance. Primary CTA must dominate (color contrast, size, isolation). User should never have to scan to find the next step.
- **Make UI Professional and Beautiful** — Aesthetic-usability effect: prettier UIs are *perceived* as easier to use, even when they aren't. Invest in typography, spacing, and consistent iconography.
- **(Re-iterate)** *Tell User what the Action is and ask for it* — applies here too: an unambiguous label removes any pause for interpretation.

### When to apply this cluster

- Bounce rate or first-screen exit is high
- Heatmaps show users *pausing* near the CTA without clicking
- Qualitative feedback says "it felt confusing / overwhelming"

---

## 3. Favorable Conscious Evaluation

> *"User has paused to think — give them reasons to commit."*

The Evaluate gate. Engage System 2 cleanly. Don't manipulate; *help them decide correctly*.

### Patterns

- **Deploy Strong Authority on Subject** — Surface credentials, certifications, named experts, regulators. "Reviewed by Dr X" beats "Reviewed by experts." Use when the user is uncertain about safety, accuracy, or legality.
- **Be Authentic and Personal** — Real names, real photos, founder messages, plain copy. Counters "this looks like a scam" reaction. Especially for B2C and trust-heavy flows.
- **Deploy Social Proof** — Counts, testimonials, named customers, recent activity. "Used by 12,431 teams this week" > "Trusted by industry leaders." Live activity ("3 people viewing") works for scarcity-eligible items only.
- **Prime User-Relevant Associations** — Surface context that says "this is for someone like me." Industry-specific copy, persona-tailored examples, segment-specific case studies.
- **Avoid Direct Payments** — Defer payment friction past the *aha moment*. Free trials, pay-after-value, post-task upsell. The roadmap's specific point: don't ask for money before the user has experienced the value.
- **Avoid Choice Overload** — More options reduce conversion (Hick's Law). Cap visible choices to 3–5. If you need more, group + filter + recommend a default.
- **Avoid Cognitive Overhead** — Strip comparison tables to the variables that actually matter. Pre-compute totals. Hide advanced settings behind progressive disclosure.
- **Leverage Loss-Aversion** — Frame in terms of what the user loses by *not* acting, not what they gain by acting (Kahneman: losses ~2× as motivating as gains). E.g., "Don't lose your unsaved progress" > "Save your progress." Use carefully — manipulative if applied to non-existent losses.
- **Use Peer Comparisons** — "You're using 30% less than similar teams." Activates social-proof + loss-aversion. Most effective when the comparison group is genuinely similar and labelled honestly.
- **Use Competition** — Leaderboards, rankings, head-to-head. Powerful for motivated users; alienates the bottom half. Use opt-in or restricted-cohort.

### When to apply this cluster

- Funnel analytics show drop at *consideration / pricing / signup*
- Cart-abandon, trial-but-no-conversion, "I'll think about it" patterns
- High info-seeking (long page time, scrolling) without action

---

## 4. Make Sure Users Can Do It Easily

> *"Make the action take less than the user's available motivation."*

The Ability gate. The single highest-leverage cluster — most "motivation" problems are actually friction problems.

### Patterns

- **Elicit Implementation Intentions** — Have the user explicitly state "I will do X at Y time/place." Form: pick a day + time slot, schedule the email, add to calendar. Behaviorally proven to ~2× completion vs unscheduled intent.
- **Default Everything** — Pre-fill, auto-detect, opt-out. Defaults are the highest-leverage UX lever. If you know what 80% of users will pick, *that's the default*. Reserve "no default" for irreversible or sensitive choices.
- **Lessen the Burden of Action / Info** — Concretely: fewer required fields, single-page forms, autofill, no re-typing, pre-import data, async file processing. Each removed field tends to lift completion noticeably.
- **Deploy Peer Comparisons** — *Social* friction reducer: "12 of your teammates have already done this" eases the cognitive cost of being first. (Different from §3's evaluative use — here the goal is reducing perceived effort/risk.)

### Adjacent levers (cross-referenced from other files)

- *Defaulting* and *Making it Incidental* — see [02-behavior-change-strategies.md](02-behavior-change-strategies.md)
- *Automate the Act of Repetition* — same file
- Layout rules that reduce burden — see [05-prototyping.md](05-prototyping.md)

### When to apply this cluster

- Form abandon rate, mid-flow drop, "started but didn't finish"
- Time-to-completion is the metric
- Users say "this took forever" / "I didn't have time"

---

## 5. Creating Urgency to Act Now

> *"Now beats later by default — design against 'I'll come back to it.'"*

The Timing gate. The user *would* do it — but not right now, and "right now" never arrives.

### Patterns

- **Frame Text to Avoid Temporal Myopia** — Make future consequences feel present. "By 2030 you'll have $X" > "Save $50/month." Concrete future > abstract future. Use surface-level emotion sparingly.
- **Remind of Prior Commitment to Act** — Reflect the user's earlier statement back at the moment of choice. "You said you wanted to learn Spanish. 5 minutes today?" Pairs with *Elicit Implementation Intentions*.
- **Make Commitment to Friends** — Public commitment increases follow-through. Share-progress, accountability buddies, opt-in to public goals. Use only with consent + reversibility.
- **Make Reward Scarce** — Genuine scarcity (limited slots, time-bound bonuses, early-bird pricing). *Only* use when the scarcity is real — fake scarcity is a dark pattern that destroys trust on detection.

### When to apply this cluster

- Users sign up but don't return; trial users defer activation
- "Saved for later" lists fill up but never get acted on
- Engagement is high day 1, near-zero day 7

---

## How to use this file in a review

1. Identify the symptom → pick the cluster.
2. Inside the cluster, name the *specific* pattern you're applying ("This needs *Elicit Implementation Intentions*", not "this needs more friction reduction").
3. State *which CREATE gate* breaks today and how the pattern unblocks it.
4. Pair with a measurement plan from [07-measuring-impact.md](07-measuring-impact.md).
5. If the pattern conflicts with another (e.g., *Use Competition* and *Be Authentic and Personal* — competition tends to feel less personal), pick *one* per screen.

## Common mistakes

- Applying multiple patterns from different clusters on the same screen — confuses the user, dilutes effect
- Using a Conscious-Evaluation pattern when the gate that's actually broken is Cue
- Gamifying habits that are intrinsically rewarding (kills intrinsic motivation)
- Loss-aversion / scarcity framing for losses or scarcities that don't exist (dark pattern)
- Reaching for new patterns instead of pulling friction out (Ability is almost always the cheapest lever)
