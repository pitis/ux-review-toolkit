# ux-review-toolkit

Multi-agent UX review for Claude Code. One command, five independent lenses, one merged report — the same shape as a multi-agent PR review, applied to a screen instead of a diff.

```
/ux-review-toolkit:ux-review /contacts
/ux-review-toolkit:ux-review https://app.example.com/settings a11y content
/ux-review-toolkit:ux-review ./shots/checkout-step-2.png
/ux-review-toolkit:ux-review #412 --comment
```

## What runs

The orchestrator captures evidence **once** (screenshots at 1440 and 1920, the accessibility tree, console, and reachable empty/error/dialog states), then launches the selected lenses in parallel. Agents never touch the browser; they get files.

| Lens | Agent | Asks | Cites |
|---|---|---|---|
| `laws` | `ux-laws-reviewer` | Which cognitive law does this element break? | Hick's, Fitts's, Jakob's, Miller's, Gestalt, Tesler's, Peak-End, Von Restorff, Doherty, Visibility of System Status, … |
| `behavior` | `ux-behavior-reviewer` | Where does the screen lose the user on the way to its target action? | Funnel stage (Cue → Reaction → Evaluation → Ability → Timing → Experience) + behavior-design pattern |
| `visual` | `ux-visual-reviewer` | How does it score on the ten usability heuristics; is the hierarchy right? | Nielsen H1–H10 scored 0–4, hierarchy, consistency, template tells |
| `a11y` | `ux-a11y-reviewer` | Names, roles, landmarks, contrast, targets, keyboard, focus? | WCAG 2.2 success criteria |
| `content` | `ux-content-reviewer` | Does every string, state, and locale say the right thing? | Copy rules, state coverage, missing i18n keys, truncation risk |

Findings from all lenses share one shape (`element / finding / basis / severity / evidence / fix`), so the orchestrator can group them by element, take the highest severity, and rank P0 → P3 with a `flagged by n/5` confidence.

## Targets

| Argument | Behaviour |
|---|---|
| `/route` | Route on the project's dev stack. Base URL and login are read from the project's `CLAUDE.md` / `.env`. |
| `https://…` | Any reachable URL. |
| `shot.png …` | Screenshot-only mode: no capture, no accessibility tree; the report says what could not be verified. |
| `path/Component.vue` | Finds the route that renders it and captures that; otherwise code-only mode. |
| `#123` | Pull request: maps changed UI files to routes, captures those. `--comment` posts the summary to the PR — never without the flag. |

Evidence and the report land in the session scratchpad, never in a repository.

## Install

**Claude Code plugin** (agents + command):

```
claude plugin marketplace add pitis/ux-review-toolkit
claude plugin install ux-review-toolkit
```

**Skills only** (Claude Code, Cursor, Codex — via [skills.sh](https://skills.sh)):

```
npx skills add pitis/ux-review-toolkit
```

This installs `ux-review`, `ux-laws-auditor`, and `ux-behavior-design` as plain skills. Without the plugin's agents, `ux-review` runs the five lenses sequentially in one context instead of in parallel.

## Requirements

- Live capture needs a browser automation tool in the session — Playwright MCP or Chrome automation. Without one, pass screenshots.
- `gh` for PR targets.

## Layout

```
.claude-plugin/plugin.json        plugin manifest
.claude-plugin/marketplace.json   lets the repo be added as a marketplace
skills/ux-review/                 orchestrator
skills/ux-laws-auditor/           law catalogue + audit protocol
skills/ux-behavior-design/        behavior-design reference (roadmap.sh/ux-design distillation)
agents/ux-*-reviewer.md           the five lenses
```

## License

MIT
