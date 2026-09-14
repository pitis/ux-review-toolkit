---
name: ux-review
description: Use when asked for a UX review, usability audit, or design critique of a screen, route, URL, screenshot, component, or the UI changes in a pull request. Triggers on "ux review", "review the UX", "audit this page", "usability review", "is this screen usable", "design critique", "review the UI of this PR".
argument-hint: "<route | url | screenshot... | PR#> [laws behavior visual a11y content] [--comment]"
---

# UX Review — orchestrator

Runs five independent UX lenses over one target and merges them into a single ranked report. Same shape as a multi-agent PR review: capture once, fan out, dedupe, rank.

**Arguments:** `$ARGUMENTS`

## 1. Parse arguments

- **Target** (first non-flag argument):
  - `#123` or a bare number → pull request
  - starts with `/` → route on the project's dev stack
  - starts with `http` → URL
  - ends with `.png/.jpg/.jpeg/.webp` (one or more) → screenshot-only mode
  - any other existing file path → component-source mode
- **Aspects**: any of `laws behavior visual a11y content`. None given → all five.
- **Flags**: `--comment` posts the summary to the PR (PR targets only). Nothing is ever posted without it.

No target → ask for one. That is the only question this skill asks up front.

## 2. Resolve the target to something reviewable

| Target | Do |
|---|---|
| PR | `gh pr diff <n> --name-only`. Keep UI files (`.vue .tsx .jsx .svelte .astro .html`, page/route files, locale files). Map page files to routes by the project's routing convention (`pages/foo/[id].vue` → `/foo/:id`); for components, Grep for the pages that import them. Result: 1–3 routes plus the component paths. If no route can be derived, ask which route renders the change. |
| Route | Base URL, login and account/org slug come from the project's `CLAUDE.md`, `.env`, or README — Grep for `localhost`, `login`, `dev@`. Not found → ask. |
| URL | Use as given. |
| Screenshot(s) | No capture. Evidence = the given files. Note in the manifest that states, hover, timing and the accessibility tree are unavailable. |
| Component source | Read it; try to find the route that renders it (Grep imports). Reachable → capture that route. Not reachable → code-only mode, say so in the manifest. |

## 3. Capture evidence once (orchestrator only)

The browser (Playwright MCP, or a Chrome automation tool) is a **single session**. Agents never receive browser tools; they get file paths. Skip this step in screenshot-only or code-only mode.

If navigation fails with `Browser is already in use` (another session holds the profile), do not retry in a loop: tell the user which mode you are falling back to, use any screenshots they provide or that already exist for the target, and mark the missing evidence in `capture.md`. The user can release the browser and re-run for a live capture.

Evidence dir: `<scratchpad>/ux-review/<slug>-<yyyymmdd-hhmm>/` where `<scratchpad>` is the session scratchpad directory. Never inside a repository.

1. Log in per the project instructions if the route needs it.
2. Viewport 1440×900 → navigate → wait until the network is idle and skeletons are gone → `settled-1440.png`.
3. Accessibility snapshot (`browser_snapshot` or equivalent) → `a11y-snapshot.md`. Console messages → `console.txt`.
4. Viewport 1920×1080 → `settled-1920.png`. If the project targets mobile (CLAUDE.md or the target says so), also 390×844 → `settled-390.png`.
5. States, only when reachable in ≤3 read-only actions — **never create, delete, send, or submit real data**:
   - search/filter with a nonsense query → `empty-1440.png`
   - submit an empty form to trigger validation → `error-1440.png`
   - open the primary dialog/drawer → `dialog-1440.png`
6. Locate the source by **following imports from the route's page file** (layout → page → feature components → their children), not by filename: a similarly named component often belongs to another feature (a `ContactSidebar.vue` that is a conversation card, not the contacts rail). List the files that actually render. Lenses may read one hop further — files the listed sources import — and should say when a finding comes from there.
7. Write `capture.md`:

```
target: <as given>
url: <resolved>
mode: live | screenshot-only | code-only
product context: <audience, platform, one line, from CLAUDE.md / PRODUCT.md if present>
evidence:
  settled-1440.png, settled-1920.png, a11y-snapshot.md, console.txt, <states>
not captured: <states not reachable and why>
source: <component/page paths>
```

Close the tab you opened when done.

## 4. Launch the lenses in parallel

One message, one Agent call per selected aspect. Every agent gets the **same brief**:

```
Review the target described in <evidence dir>/capture.md. Read that file first, then every evidence file it lists, then the source files it lists.
Reference skills (read the one your agent file names): <resolved paths, see below>
Return your report in the exact output contract of your agent definition. Do not use browser tools. Do not modify any file.
```

Agent names: `ux-laws-reviewer`, `ux-behavior-reviewer`, `ux-visual-reviewer`, `ux-a11y-reviewer`, `ux-content-reviewer`. Installed as a plugin they appear namespaced — `ux-review-toolkit:ux-laws-reviewer` — so try the namespaced name first, then the bare one. If neither is an available agent type, launch `general-purpose` with the brief prefixed by: `Read <plugin root>/agents/<name>.md and act as that agent.`

**Resolve reference paths** before launching (Glob, first hit wins):
- laws: `**/ux-laws-auditor/SKILL.md` under the plugin root, `~/.claude/skills`, `.agents/skills`, `.claude/skills`
- behavior: `**/ux-behavior-design/SKILL.md` (same roots; `ux-agent/SKILL.md` accepted as a fallback)
- plugin root: the directory containing this SKILL.md's parent `skills/` folder

If the Agent tool is not available in this runtime, run the lenses yourself, sequentially, by reading each `agents/<name>.md` and following it; keep each lens's output separate until the merge.

## 5. Merge

Every lens returns findings in the shared shape (`element / finding / basis / severity / evidence / fix`). Merge rules:

1. **Group by element.** Same element or same location on screen → one entry. List every lens that flagged it and each lens's basis.
2. **Severity = the highest any lens assigned.** P0 blocks the primary task or misleads about system state · P1 significant difficulty on a frequent path, or a WCAG A/AA failure · P2 friction with a workaround · P3 polish.
3. **Rank** by severity, then by number of lenses (`flagged by 3/5`), then by the order the first lens gave.
4. **Disagreement** (one lens calls it a strength, another a violation) → keep both, mark `lenses disagree`, do not resolve it yourself.
5. **Keep "not verifiable from input" marks.** Never upgrade an estimate into a fact during the merge.
6. **Do not add findings of your own** during the merge. Each lens already audited; the orchestrator only combines.

## 6. Report

Write `<evidence dir>/report.md` in this format and print sections 1–3 to the user:

```
# UX review — <target>
Mode · evidence dir · lenses run · viewports

## Summary
Two sentences: overall usability, the primary bottleneck.
Heuristic scores from the visual lens (if run): <table>

## Findings (P0 → P3)
- **[P0] <element>** — <finding>. Basis: <law / stage / heuristic / WCAG SC>. Flagged by <n>/<lenses>. Evidence: <file>. Fix: <one concrete change>.
…

## Strengths
- <element> — <what it does right> (<basis>)

## Not verifiable from this input
- <hover, timing, keyboard, states not captured>

## Action plan
1. P0s, 2. P1s, 3. P2s grouped by screen area, 4. re-run `/ux-review <same target>` after fixes.
```

Evidence (screenshots, snapshots, report) stays in the scratchpad. Never commit it to a repository.

## 7. `--comment` (PR targets only)

`gh pr comment <n> --body-file <report summary>` with sections *Summary*, *Findings*, *Action plan*. Only when the flag was given.

## Common mistakes

- Letting agents drive the browser: they collide on the single session and each re-captures. Capture once here.
- Auditing a mid-load capture as if settled. Wait for skeletons to disappear; if they never do, say so in `capture.md`.
- Posting to a PR without `--comment`.
- Padding the merged report with orchestrator opinions. The merge combines; it does not audit.
- Writing evidence into the repo.
