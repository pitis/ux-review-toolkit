# Prototyping & Wireframing

Once the conceptual design is locked (see [04-conceptual-design.md](04-conceptual-design.md)), wireframe before you mock and mock before you build. The point of low-fi is to get *layout* and *flow* wrong cheaply.

> ← Back to [SKILL.md](../SKILL.md) · Related: [04-conceptual-design.md](04-conceptual-design.md), [06-ux-patterns.md](06-ux-patterns.md)

## Fidelity ladder — pick the lowest that answers your question

| Fidelity | What it tests | Time cost | When |
|---|---|---|---|
| Sketch on paper / whiteboard | "Is the flow shape right?" | minutes | Earliest divergent thinking |
| Low-fi wireframe (boxes + labels) | "Is the layout & hierarchy right?" | hours | Default for first internal review |
| High-fi wireframe (real components, gray) | "Does the page-level info architecture work?" | hours-day | Before involving devs |
| Click-through prototype (Figma frames + flows) | "Does the flow feel right end-to-end?" | day | Before usability testing |
| Coded prototype | "Does it perform / feel right on real data?" | days | When motion, perf, or real data matters |
| Production | — | weeks | Ship |

**Rule:** never jump fidelity until the current level has answered its question.

## Good Layout Rules (from the roadmap, expanded)

The roadmap groups wireframing under "Good Layout Rules." Concretely:

1. **One primary action per screen.** Multiple primary buttons = no primary button. Demote secondary actions visually.
2. **Hierarchy in three levels max.** Primary, secondary, tertiary — anything beyond becomes noise.
3. **Group by meaning, separate by space.** Whitespace is the cheapest grouping mechanism. Boxes/borders are the most expensive — only use when space alone fails.
4. **Reading order = importance order.** Z-pattern (latin scripts), F-pattern (text-heavy), or top-down funnel — pick one and follow it.
5. **Align everything.** Fewer alignment lines = less cognitive load. Use a grid; deviations should be intentional.
6. **Type size carries information.** Two sizes look careless, four sizes look chaotic. Use 3 sizes at most: heading / body / micro.
7. **Density should match context.** Dashboards earn density (power user, return visit). First-run flows must breathe.
8. **Touch targets ≥ 44 px.** Below that, error rate climbs sharply on mobile.
9. **Above-the-fold is for the first decision** the user must make. Don't waste it on chrome.
10. **Empty states do work.** Treat them as a screen, not a placeholder. Show the user what *will* be here and how to make it appear.
11. **Errors next to the cause.** Top-of-form summaries are last-resort fallbacks.
12. **Loading states are part of the layout.** Skeletons > spinners. Spinners > nothing. Reserve "spinner over the whole screen" for blocking ops only.

## When to wireframe vs go straight to a mock

**Wireframe** when:

- Layout / hierarchy is uncertain
- Flow has > 3 steps
- Multiple stakeholders need to align cheaply
- You expect 2–3 rounds of feedback

**Skip to a higher-fidelity mock** when:

- The pattern is well-established in your design system (form, list, detail page)
- The brand / visual feel *is* the unknown (marketing pages, hero sections)
- You're iterating on production — wireframes will look worse than what's live

## Tool comparison (matrix from the roadmap)

| Tool | Strengths | Weaknesses | Best for |
|---|---|---|---|
| **Figma** | Real-time multiplayer, components, dev-handoff, big plugin/AI ecosystem, browser-based, Code Connect for design-to-code | Heavy file size at scale; learning curve for prototyping | Default choice. Wireframes through high-fi through production handoff. |
| **Adobe XD** | Tight Adobe Creative Cloud integration, lightweight, good prototyping | Smaller community; Adobe deprioritized it after Figma acquisition fell through | Teams already deep in Adobe CC; legacy projects |
| **Sketch** | Mac-native, fast, mature plugins, lower price | Mac-only, no real-time collab without third-party tools | macOS-only design teams that prefer local files |
| **Balsamiq** | Hand-drawn aesthetic enforces low-fi mindset; non-designers can use it | Can't go to high-fi; no production handoff | Stakeholder workshops, intentionally fast & ugly wireframes |

**Default recommendation for new teams:** Figma. The collaboration story is dominant and the design-to-code path (Code Connect, Dev Mode) is the strongest.

**Use Balsamiq instead** when you need to *resist* polishing too early — the rough-edged style stops people from arguing about colors before the structure is right.

## What every wireframe screen should answer

Before declaring a wireframe done, confirm it answers all of:

- [ ] What is this screen for? (one sentence at the top of the file)
- [ ] What's the primary action?
- [ ] What's the next screen on success / on cancel / on error?
- [ ] What state is this — empty / loading / loaded / error?
- [ ] What's the smallest viewport this must work at?
- [ ] What does the user *need to know* before deciding (the minimum)?
- [ ] What can be deferred to a secondary screen?

If any answer is "I don't know," stop and resolve before going higher fidelity.

## Common mistakes

- Jumping to high-fi before the layout is settled — you'll spend the polish budget on the wrong pixels
- Wireframes with real copy *and* placeholder copy mixed — confuses the review
- Multiple primary CTAs on one screen
- Drawing every state in pixel-perfect detail before flow is approved
- Treating Balsamiq aesthetic as the *output* — it's a *constraint* on your thinking, not a deliverable
- Skipping empty / loading / error states because "the dev will figure it out"
