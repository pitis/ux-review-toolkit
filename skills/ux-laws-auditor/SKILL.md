---
name: ux-laws-auditor
description: Use when asked to audit, review, or critique an existing screen, screenshot, wireframe, component, form, table, settings page, onboarding, or checkout for usability friction and cognitive load, and the reviewer needs each finding tied to a named UX law (Hick's, Fitts's, Jakob's, Miller's, Gestalt, Peak-End, Tesler's, Von Restorff, Doherty, Choice Overload, Cognitive Load, Mental Model). Triggers on "UX audit", "usability review", "why does this feel clunky", "too many options", "hard to find", "confusing layout", "cognitive load". Not for designing behavior-change flows or persuasion mechanics (use ux-agent) or for implementing visual fixes (use impeccable).
---

# UX Laws Auditor & Behavioral Design Skill

## Core Purpose
Analyze user interfaces, interaction patterns, product specs, and visual layouts against established cognitive psychology and UX design principles. Identify design friction, explain the psychological impact on users, and recommend actionable design improvements.

## When to use / when not to
- **Use:** a concrete artifact exists (screenshot, running page, wireframe, component code, written flow) and the question is "what is wrong with it and why".
- **Not this skill:** designing a new flow, habit loop, nudge, CTA strategy, personas, A/B plan → `ux-agent`. Implementing the fixes in CSS/Vue → `impeccable`. WCAG conformance audit → a dedicated a11y pass; note contrast/focus issues here only under *Other observations*.

## Getting the input in front of you
1. **Screenshot / image path** → Read the image. Inventory every visible element (nav, header, controls, table/form, states) before judging anything.
2. **URL or a page on the local stack** → drive it with Playwright: capture the *settled* state, then the empty state and the error state if reachable. Audit the settled state; audit the others under their own heading.
3. **Component or page source (Vue/React/HTML)** → read it and reason about the rendered result; say the audit is from code, not a render, and render it with Playwright when a stack is available.
4. **Prose description** → audit as given; list the assumptions you made.
5. **Mid-load capture** (skeletons, placeholders, disabled primaries) → audit what is visible, flag state contradictions as findings, and ask for a settled capture.

Anything a static input cannot prove (hover tooltips, click targets, response time, keyboard focus) is written as **"not verifiable from input"** — never asserted either way.

## Internal Reference: UX Principles Knowledge Base

### 1. Decision-Making & Cognitive Load
- **Hick's Law:** Decision time increases logarithmically with choice count and complexity. Choice overload is the symptom: a menu, filter set, or plan list the user scans twice. *(Fix: Categorize, limit choices, multi-step wizards, a recommended default).*
- **Miller's Law:** Working memory holds 7 ± 2 items. *(Fix: Chunk information into digestible groups like phone formatting or 3-step onboarding).*
- **Occam's Razor:** The simplest solution requiring the fewest assumptions is best. *(Fix: Remove redundant visual clutter, extra form fields, and superfluous steps).*
- **Recognition over Recall:** Users identify options far more easily than they retrieve them from memory. Icon-only controls, unlabeled glyphs, and hidden menus force recall. *(Fix: Labels or persistent tooltips, visible options, recently-used items).*
- **Choice Overload:** Too many comparable options make users defer, pick at random, or leave — the cost is abandonment, not only slower decisions (Hick's). *(Fix: Curate to a short list, recommend one, let users compare side by side instead of across screens).*
- **Cognitive Load:** Mental effort is intrinsic (the task itself) or extraneous (what the interface adds). Only extraneous load is the design's fault. *(Fix: Remove decoration, jargon, and needless decisions; never cut information the task actually needs).*
- **Chunking:** Grouping related items into meaningful units lets users scan and remember them. *(Fix: Section long forms and settings, group table columns, format long numbers and codes).*
- **Working Memory:** Users hold only a few items briefly while they act. A value seen on one screen and needed on the next is a memory task. *(Fix: Keep the needed data visible at the point of use; carry selections across steps; never make users copy between screens).*

### 2. Movement & Target Acquisition
- **Fitts's Law:** Time to acquire a target depends on target distance and size. *(Fix: touch targets at least 44×44px; on desktop pointer, at least 24px hit area and whole-row/whole-cell click targets; screen edges and corners are effectively infinite targets — do not inset primary rails/controls away from them).*
- **Minimize Target Distance:** Direct extension of Fitts's Law focusing on proximity. *(Fix: Contextual right-click menus, bottom mobile nav, submit buttons adjacent to inputs).*
- **Doherty Threshold:** System response under 400ms keeps user focus and productivity peaked. *(Fix: Optimistic UI updates, skeleton screens, visual feedback).*

### 3. Visual Perception (Gestalt Principles)
- **Law of Proximity:** Elements near each other are perceived as a unified group. *(Fix: Position form labels adjacent to inputs; separate content blocks with clear white space).*
- **Law of Similarity:** Visually similar elements are perceived to share a common function. *(Fix: Standardize button hierarchies and clickable link styles across screens; a disabled control must not look like an enabled secondary one).*
- **Law of Common Region:** Elements sharing a clearly bounded area are perceived as a group. *(Fix: A border or background behind related controls; a toolbar's actions must sit inside the region they act on, not beside it).*
- **Uniform Connectedness:** Visually connected elements are perceived as more related than non-connected ones. *(Fix: Enclose related settings in cards/containers or use step connectors).*
- **Law of Prägnanz:** The brain interprets complex visual shapes in their simplest possible form. *(Fix: Avoid visual noise; rely on clean geometric layouts).*
- **Aesthetic-Usability Effect:** Users perceive attractive interfaces as easier to use and forgive minor issues in them. *(Fix: Consistent spacing, alignment, and type scale; unfinished-looking placeholders and misaligned headers erode trust before a single click).*
- **Selective Attention:** Users focus on what serves their current goal and filter out the rest, including anything that looks like an ad (banner blindness). *(Fix: Put critical notices inline where the task happens, not in banner-shaped boxes; never style a required step like promotion).*

### 4. Memory & User Behavior
- **Jakob's Law:** Users spend most time on other sites, expecting your product to work like standard conventions. *(Fix: Stick to standard mental models like top-right cart, top-center search; a funnel icon means filter, a magnifier means search).*
- **Mental Model:** Users predict behavior from their own model of the system, built from the domain and past use. When the interface's structure differs (a "save" that also publishes, a delete that only hides), they err confidently. *(Fix: Name and group things the way the audience does; make surprising consequences visible before the action).*
- **Paradox of the Active User:** Users never read manuals; they start using the product right away and learn only what the task in front of them forces. *(Fix: Teach in context at the moment of need; no feature should depend on a tour or docs being read first).*
- **Cognitive Bias:** Systematic shortcuts in judgment — anchoring, default bias, framing — shape choices whether the design intends it or not. Cite the specific bias, never "cognitive bias" alone. *(Fix: Make defaults the option most users should pick; show the reference point a price or number is judged against; flag defaults that quietly work against the user).*
- **Von Restorff Effect:** Distinct items in a set are most memorable. *(Fix: Apply high-contrast accent colors to primary actions over secondary controls; the single accented element must be the action the user can take now).*
- **Serial Position Effect:** Users best recall the first (Primacy) and last (Recency) items in a sequence. *(Fix: Place primary navigation items at far ends of nav bars).*
- **Peak-End Rule:** Experiences are judged by their peak intensity moment and final state. *(Fix: Deliver delightful completion micro-interactions; handle errors gracefully; an empty state with a next step, never a blank table).*
- **Zeigarnik Effect:** Incomplete tasks stay top-of-mind and motivate completion. *(Fix: Display profile completion percentages or step progress indicators).*
- **Goal-Gradient Effect:** Motivation rises as users get closer to a goal. *(Fix: Show progress that is already partly filled, make each step's completion visible, make the last step the lightest).*
- **Flow:** Deep focus happens when challenge matches skill and feedback is immediate; interruptions break it and cost minutes to recover. *(Fix: No modals or toasts mid-task that demand action; keep feedback inline; let experts skip what novices need).*

### 5. Systems & Process Engineering
- **Tesler's Law (Conservation of Complexity):** Inherent complexity cannot be eliminated, only shifted between user and system. *(Fix: Have system absorb complexity via auto-complete or ZIP lookup; a single-record create path must not be routed through bulk import).*
- **Postel's Law (Robustness Principle):** Accept liberal user inputs while outputting conservative, standardized formats. *(Fix: Allow flexible phone/credit card entry formats).*
- **Parkinson's Law:** Work expands to fill available time. *(Fix: Pre-fill known user data, set sensible defaults, and keep forms short).*
- **Pareto Principle (80/20 Rule):** 80% of activity relies on 20% of features. *(Fix: Prioritize core features in primary navigation real estate).*
- **Visibility of System Status:** The interface must always say what state it is in. Two elements reporting different states (a count of 0 next to loading rows; an enabled-looking button that does nothing) is the classic violation. *(Fix: derive every status indicator from the same source; loading, empty, error and success each get an explicit, distinct rendering).*

### 6. Motivation & Persuasion (audit only where a decision or commitment is asked of the user)
- **Social Proof:** People follow what similar people did. *(Fix: usage counts, testimonials, "most hotels choose" markers at the decision point).*
- **Authority:** Credible sources and expert framing raise trust. *(Fix: certifications, expert-authored help, official integration badges next to the risky action).*
- **Loss Aversion:** Losses weigh roughly twice as much as equivalent gains. *(Fix: frame what is lost by not acting; show what an incomplete setup is costing).*
- **Scarcity & Urgency:** Limited or time-boxed rewards prompt action now; abusive use destroys trust. *(Fix: honest deadlines and remaining counts; never fake ones).*
- **Commitment & Consistency:** People act in line with prior commitments, especially public ones. *(Fix: remind of the user's own earlier choice; let them set an implementation intention — when/where they will do it).*
- **Peer Comparison:** Seeing one's standing relative to peers motivates. *(Fix: benchmarks, leaderboards, "teams like yours" comparisons).*
- **Temporal Framing:** Distant benefits are discounted; present ones are not. *(Fix: express benefits in near-term, concrete units).*

---

## Execution Audit Protocol

When a user provides a UI description, screenshot, wireframe, code, or interaction flow:

1. **Inventory:** State what was audited — the input type, which state it shows, and the element inventory.
2. **Friction Analysis:** Walk the principles above against the inventory. A law is cited only when it explains the finding; a finding with no law that fits goes under *Other observations* — it is never dropped and never forced into the nearest law. Flow-based laws (Peak-End, Zeigarnik, Goal-Gradient, Flow, Working Memory across steps, Doherty, Postel's) are marked "not assessable from a single screen" when the input is one static screen.
3. **Impact Diagnosis:** Clearly explain *why* the design flaw increases cognitive load, physical effort, or drop-off rates, for the audience the caller named.
4. **Prioritized Recommendations:** Concrete, step-by-step UI/UX design fixes, ranked by the severity rubric.
5. **Strengths:** What already works, with the law it satisfies.

### Severity rubric
- **High:** misleads the user about system state, or blocks or hides the screen's primary task.
- **Medium:** friction on a frequent path that has a workaround.
- **Low:** polish, consistency, or something only some users hit.
- Tie-break within a level by how many visits hit it. Frequency alone never raises a level.

One finding per element. When several laws apply to one element, cite them on the same line.

---

## Output Template Format

### 📋 Observed State
[Input type · state captured (settled / loading / empty / error) · one-paragraph element inventory · what is not verifiable from this input · which additional captures are requested, if any.]

### 🔍 Executive Summary
[2-3 sentence overview of the design's overall usability and primary bottleneck.]

### ⚠️ Violations & Cognitive Bottlenecks
- **[UX Law Name]:** [Specific UI element or flow step] -> [Psychological impact & user risk].

### 📎 Other Observations
[Findings with no law: functional bugs, product logic (a missing action, a hidden export), accessibility, copy. Same element -> impact form. REQUIRED section; write "None" if empty.]

### 💡 Concrete Design Recommendations
1. **[High]:** [Actionable fix with specific UI/layout changes]
2. **[Medium]:** [Actionable fix with specific UI/layout changes]
3. **[Low]:** [Actionable fix with specific UI/layout changes]

### 🏆 Existing Design Strengths
- **[UX Law Name]:** [Highlight element already implementing sound behavioral UX].

---

## Common Mistakes
- Citing a law because the template has a slot for it, not because the element violates it.
- Dropping a real problem because no law names it — that is what *Other observations* is for.
- Asserting hover, click, or timing behavior from a static screenshot.
- Recommending a redesign when the finding needs one element moved, relabeled, or resized.
- Applying touch-target sizes to a desktop pointer UI, or ignoring the audience the caller named.
