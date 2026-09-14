# Behavior Change Strategies

Once you've diagnosed *why* a behavior isn't happening (see [01-decision-frameworks.md](01-decision-frameworks.md)), pick a strategy. Roadmap.sh frames the choice as: **change behavior consciously**, **change a habit**, or **cheat** (avoid making the user change at all).

> ← Back to [SKILL.md](../SKILL.md) · Related: [01-decision-frameworks.md](01-decision-frameworks.md), [06-ux-patterns.md](06-ux-patterns.md)

## BJ Fogg's Behavior Grid — pick the right cell first

The Grid crosses **type of behavior** with **duration**:

| | One-time | A period | Permanent |
|---|---|---|---|
| **New behavior** | Green-Dot (e.g., sign up today) | Green-Span (e.g., onboard for a week) | Green-Path (e.g., daily exercise) |
| **Familiar behavior** | Blue-Dot (e.g., re-share a post) | Blue-Span | Blue-Path (e.g., keep brushing teeth) |
| **Increase** | Purple-Dot | Purple-Span | Purple-Path (e.g., more steps/day) |
| **Decrease** | Gray-Dot | Gray-Span | Gray-Path (e.g., less smoking) |
| **Stop** | Black-Dot | Black-Span | Black-Path |

**Why it matters:** the same UX won't work across cells. Driving a one-time signup (Green-Dot) is mostly an *Ability + Trigger* problem. Sustaining a Green-Path takes habit loops + reward design. Don't reuse onboarding patterns for retention work.

## Three meta-strategies

### Strategy 1: Cheat — don't ask the user to change

Cheaper than behavior change. Try this first.

- **Defaulting** — pre-select the desired option. Opt-out > opt-in for low-stakes, reversible choices.
- **Making it Incidental** — bundle the desired action into one the user already takes (e.g., 2FA prompt during a routine login they already do).
- **Automate the Act of Repetition** — replace ongoing user effort with a one-time setup (e.g., recurring transfers, auto-save, auto-renewal with reminder).

**Ethics check:** *cheating* should make the user better off whether or not they noticed. If you'd be embarrassed for them to discover the default, change it.

### Strategy 2: Make or Change Habits

Habits = automatic responses to a cue. To **build** one, install a Cue Routine Reward loop (Cue → Routine → Reward). To **change** one, intervene at one of those three points.

#### Habit-formation: Hook Model (Nir Eyal)

Four-phase loop, repeated:

1. **Trigger** (external, then internal)
2. **Action** (do the simplest version of the behavior)
3. **Variable Reward** (unpredictable payoff — content, social, mastery)
4. **Investment** (user puts something in: data, effort, social ties → loads the next trigger)

Each loop loads the next. The internal trigger eventually replaces the external one.

#### Habit-formation: Cue-Routine-Reward (Charles Duhigg)

Same loop, simpler frame. Design *all three* explicitly. Most products design Routine and forget Cue and Reward.

#### Habit-change: pick where to intervene

| Where | Tactic | When to use |
|---|---|---|
| **Cue** | *Help user avoid the cue* — block, hide, replace the trigger context | Cue is environmental (e.g., the app icon, notification, location) |
| **Routine** | *Replace the Routine* — substitute a different action with the same reward | User won't accept losing the reward |
| **Routine** | *Crowd Out Old Habit with New Behavior* (a.k.a. *Crowd-Out*) — fill the slot with something else | Removing leaves a vacuum |
| **Conscious layer** | *Use Consciousness to Interfere* — interrupt automaticity with reflection | Habit is harming the user |
| **Conscious layer** | *Mindfulness to Avoid Acting on the Cue* — train pause-before-act | Habit triggers fast & strongly |

### Strategy 3: Support Conscious Action

When the behavior should *stay* deliberate (high-stakes, infrequent, value-laden — donations, medical, financial commitments), use:

- **Educate & Encourage User** — give the knowledge + nudge that makes the right choice obvious
- **Help User think about their Action** — surface trade-offs, second-order consequences, future-self impact

Tactics include: explanatory tooltips, comparison views, "are you sure?" with *reason* (not just confirmation theater), pre-commitment prompts, summary screens before submit.

## Decision flow: which strategy?

```
Is the desired behavior reversible & low-stakes?
├─ YES → can a default or automation do it? → use CHEAT (Strategy 1)
└─ NO  → does the user need to repeat it indefinitely?
         ├─ YES → use HABIT (Strategy 2). New habit? → Hook Model. Replacing one? → habit-change tactic.
         └─ NO  → is the cost of a wrong choice high? → use CONSCIOUS ACTION (Strategy 3).
                                                       Else → CHEAT.
```

## Worked examples

| Goal | Cell on Grid | Strategy | Tactic |
|---|---|---|---|
| Get users to enable 2FA | Green-Dot (one-time) | Cheat | Default to enabled at signup; opt-out flow |
| Get users to log workouts daily | Green-Path | Habit | Hook Model: external trigger → tap → variable streak reward → invest by setting a goal |
| Stop users buying impulse items | Black-Path | Conscious Action | Cooling-off period; summary of cart + 24h email reminder |
| Move users from competitor's habit | Blue-Path → Blue-Path with us | Habit-change (Replace Routine) | Match the cue (same time/place); deliver a comparable reward |
| Get a one-time annual review submitted | Purple-Span | Conscious Action | Pre-commitment + scheduled reminders + visible progress |

## Common mistakes

- **Designing Routine without Cue or Reward** — the loop never closes
- **Variable rewards on harmful behaviors** — engagement up, well-being down (dark pattern)
- **Conscious-Action UX for trivial choices** — friction without payoff; user disengages
- **Cheat for high-stakes, irreversible actions** — defaulting people into things they wouldn't consent to is a dark pattern even if "they could opt out"
- **Treating habit-change like habit-formation** — forgetting to disrupt the existing cue
