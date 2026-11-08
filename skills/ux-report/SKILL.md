---
name: ux-report
description: Use when asked to publish, share, or present UX review results as an artifact or page — open issues and fixed issues in tabs, numbered dots on screenshots, filterable lists, before/after screenshot pairs. Triggers on "ux report", "publish the review", "make the review artifact", "before and after page", "add this page to the report", "update the UX report".
argument-hint: "<route | url | evidence dir> [--update <artifact url>] [--title \"Name\"]"
---

# UX Report — publish a review as a tabbed artifact

Turns a UX review (from `ux-review` or from this conversation) into one published page: **Open** and **Fixed** tabs, an annotated screenshot viewer with severity-coloured dots, filterable finding cards, and before/after pairs. The page is a fixed template; each run only writes `data.json` and the screenshots.

**Arguments:** `$ARGUMENTS`

Files next to this SKILL.md:
- `assets/template.html` — the page. Do not edit it per run.
- `assets/build.mjs` — validates `data.json` and the images, writes `index.html`, prints the `files` map to publish.
- `assets/example.data.json` — a working example of the common fields; §6 lists every field.

## 1. Find the findings

In order, first hit wins:
1. An evidence dir given as the argument, or the newest `<scratchpad>/ux-review/<slug>-*/report.md` whose `capture.md` target matches the argument.
2. A `ux-review` report or a list of findings already in this conversation.
3. None → run the `ux-review` skill on the target first, then continue here.

Each finding becomes one card. Keep the merged report's severity, lenses and basis; do not re-audit or add findings here.

## 2. Decide open vs fixed

A finding is **fixed** only when the change is in the working tree or branch **and** you saw it in the running app after the change (a screenshot or an accessibility-tree check). Otherwise it stays **open**. A fix that only exists in code is open, with `who: "Not verified"`.

`who` marks who acts next on an open item: `"You"` (needs the user, e.g. a dashboard setting), `"Your call"` (a product decision), `"Not started"`, `"Not verified"` (fix in code only), `"Regressed"` (was fixed, flagged again).

## 3. Screenshots

Work dir: `<scratchpad>/ux-report/<slug>/` with `shots/` inside. Never inside a repository.

- **Before** shots: copy from the review's evidence dir (`settled-1440.png`, state shots). For a re-review, the previous report's shots are already published (see §7).
- **After** shots: for every fixed finding, recapture the same route, viewport and state as its before shot, after the change. Same viewport as the before shot, or the pair is not comparable.
- Name keys by screen and state: `dash-empty`, `dash-empty-after`, `popup-de-after`. The key is the file name without extension.
- Convert to JPEG and cap the width at 1600px to stay far under the 16MB page limit:
  `sips -s format jpeg -s formatOptions 80 in.png --out shots/<key>.jpg` (macOS), then `sips --resampleWidth 1600` only if it is wider. Elsewhere use `magick`, or keep the PNG and set `src` in `shots`.
- Keep the before/after pairs to the screens that changed visibly; a text-only fix needs no pair.

## 4. Place the dots

Each finding may carry `pin: { shot, x, y }`, x and y in percent of the image. Open findings pin to the current (before) shot, fixed findings to the after shot, on the element the finding is about.

With a live browser, measure, don't guess. On the page as captured, run for each element. It measures the element's content (its text and child elements), so a full-width line of text pins on its words, not on the empty middle of the line; inputs, images and empty elements use their own box.

```js
// full-page screenshot
(sel) => { const el = document.querySelector(sel), rg = document.createRange(), d = document.documentElement;
  rg.selectNodeContents(el); const t = rg.getBoundingClientRect(), r = t.width ? t : el.getBoundingClientRect();
  return { x: +((r.left + r.width / 2 + scrollX) / d.scrollWidth * 100).toFixed(2),
           y: +((r.top + r.height / 2 + scrollY) / d.scrollHeight * 100).toFixed(2) } }
// viewport screenshot: divide by innerWidth / innerHeight and drop scrollX / scrollY
```

Without a browser (screenshot-only), estimate from the image and add "Dot positions are approximate" to `unverifiable`. Findings with no on-screen element (copy in emails, console, keyboard order) get no pin; they still appear in the list.

## 5. Take the design from the project

The report wears the reviewed project's design, not this plugin's: its colours, fonts and corner radius go into `data.theme`. Severity colours (P0–P3) and the green "fixed" stay semantic unless the project has its own danger / warning / info / success tokens. The dots and number circles always keep the template's fixed colours, so their white numbers stay readable.

Where to look, first hit wins per token:
1. A design doc in the repo: `DESIGN.md`, `PRODUCT.md`, `.impeccable.md`, `docs/design*`, a brand or tokens file (`tokens.json`, `*.tokens.json`).
2. The CSS the app actually loads: custom properties in the global stylesheet (`globals.css`, `main.css`, `app.css`, `assets/css/*`), a Tailwind v4 `@theme` block or `tailwind.config.*` `theme.extend`, a UI-kit theme (`app.config.ts` for Nuxt UI, shadcn's `--background/--foreground/--primary`, HeroUI/MUI theme objects). Read the light **and** dark sets.
3. The running app, if captured live: `getComputedStyle` on `body` (background, color, font-family), the page `h1`, a primary button (background → accent), a card (background, border colour, radius), and the same with the app in dark mode if it has one.

Map them to the report's tokens:

| Report token | Project role |
|---|---|
| `bg` / `surface` / `surface2` | page background / card background / subtle fill (muted, secondary) |
| `ink` / `muted` / `line` | body text / secondary text / borders |
| `accent` / `accentSoft` | primary brand colour / its tint (left out → mixed from accent) |
| `heading` | heading colour if the brand uses one (left out → ink) |
| `p0`…`p3`, `p0Bg`…, `ok`, `okBg` | danger, warning, info, neutral, success — only if the project defines them |
| `radius` | card radius |

```json
"theme": {
  "source": "app/assets/css/main.css @theme + computed styles of /dashboard",
  "light": { "bg": "#FAFAF9", "surface": "#FFFFFF", "ink": "#18181B", "muted": "#52525B", "line": "#E4E4E7", "accent": "#7C3AED", "radius": "8px" },
  "dark":  { "bg": "#09090B", "surface": "#18181B", "ink": "#FAFAFA", "muted": "#A1A1AA", "line": "#27272A", "accent": "#A78BFA" },
  "fonts": { "display": "\"Inter\", system-ui, sans-serif", "body": "\"Inter\", system-ui, sans-serif",
             "stylesheet": "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" }
}
```

- Values are resolved CSS colours (hex preferred, so the build can check contrast). Resolve `var()` chains and Tailwind palette names to their values; convert `oklch`/`hsl` channel triplets (shadcn's `222 47% 11%`) to full colours.
- No dark tokens in the project → leave `dark` out; the report stays in the project's light theme in dark mode too.
- Fonts load only from Google Fonts in an artifact. A self-hosted or commercial font → use it by name first in the stack with the closest Google font or a system stack after it, and say so in `theme.source`.
- The build warns when a text pair falls under 4.5:1 (e.g. a pale brand accent used as link text). Then use the project's darker shade for that token, not a colour of your own.
- Nothing found (a bare URL with no repo) → take what you can from the computed styles; with no browser either, leave `theme` out and the report uses neutral defaults. Say which in the summary to the user.

## 6. Write data.json and build

Copy `assets/example.data.json` for the shape and replace every value, theme and `meta` links included. Required: `title`, and each finding's `key`, `title`, plus `sev` + `fix` (open) or `how` (fixed). Everything else is optional and hidden when absent.

| Field | Content |
|---|---|
| `title` | `--title "Name"` from the arguments if given; else 2–4 words, a name: "Acme Checkout Review". Not "UX review: explainer". |
| `eyebrow` | "UX review · 15 Oct 2026" |
| `meta` | A list of strings or `{label, href}` links (`href` must be `http(s)://`): branch @ sha, stack, lenses run, previous review link |
| `summary` | Two or three plain sentences: what is open, what is fixed, the main bottleneck |
| `stats` | Extra count tiles `{value, label, tone: OK\|P0\|P1\|P2\|P3}`, e.g. tests passing. Open/Fixed tiles are added automatically. |
| `measures` | Before/after table `{title, columns, rows:[{check, before, after, bad}], note}` for measured values (contrast, widths, focus target); `bad: true` shows the before value in red. Say which "before" values were estimates. |
| `shots` | `{key: {label, src?}}`. `src` defaults to `shots/<key>.jpg`; set it only for another format, as `shots/<key>.png` or `.webp`. |
| `key` | A finding's id: `<group>-<element>` in lowercase with hyphens, e.g. `checkout-coupon-field`. Keep it unchanged across runs; `--update` matches findings by it. |
| `open[]` | `{key, sev, group, screen, title, finding, fix, laws[], lenses[], basis, who, disagree, pin}` — `screen` is the element or sub-area; `disagree: true` when the report marks "lenses disagree" |
| `fixed[]` | `{key, sev (was), group, screen, title, finding?, how, laws[], lenses, test, pin}` — `test` is `true` or a label like "E2E test" |
| `pairs[]` | `{group, title, before, after, note}` — `note` reads "what it was → what it is now" |
| `theme` | The project's design tokens — see §5 |
| `verified` | A list of short chips of what was run: "lint · typecheck", "41/41 E2E" |
| `verifiedNote` | One sentence under the chips, e.g. what the E2E run covered |
| `unverifiable` | A list of what could not be checked: screen readers, zoom, states not reached |

`laws` names the UX law(s) the finding breaks, shown as a chip on the card and in the viewer: "Hick's law", "Fitts's law", "Visibility of system status". Take them from the laws lens's basis for that finding (and any law another lens cites); never invent one for a finding no lens tied to a law. Leave WCAG criteria, Nielsen heuristics and funnel stages in `basis`. Fixed findings keep the law they broke.

`group` is the page or area ("Dashboard", "Sign-up flow"); with more than one group the lists get group filters, and pairs are grouped under it. `lensTotal` is the number of lenses that ran (default 5), the denominator for "Flagged by n/5".

Write plainly: titles say what was wrong ("End session ended at once"), `how` says what it does now. No marketing tone.

Build:

```bash
node <skill dir>/assets/build.mjs <work dir>
```

It fails on missing images or image paths outside `shots/`, duplicate keys, missing fields, out-of-range pins, a list field given as a string, non-http(s) links, and theme values that are not a CSS colour or length. On failure it deletes `index.html`; fix `data.json` and rerun. Fix every `warn:` line too, or name the ones you left in the summary to the user. The JSON after `publish files:` is the `files` map for the publish.

## 7. Publish

Use the Artifact tool:
- **New report:** `file_path: <work dir>/index.html`, `files:` the map the build printed (all images plus `data.json`), `icon: "checklist"`, a one-sentence `description`.
- **Same conversation, changed data:** rebuild and publish the same `file_path` again; pass `data.json` plus only new or changed images in `files`. A stale published `data.json` makes the next `--update` lose these changes.
- **`--update <url>` (another page, a re-review, a later session):**
  1. `Artifact read` the url, then `Artifact read` with `path: "data.json"` and `out_dir: <work dir>`, so it lands at `<work dir>/data.json`.
  2. `Artifact list` with `scope: "files"`, then `Artifact read` with `paths` set to every `shots/…` path in that listing and `out_dir: <work dir>`, so they land in `<work dir>/shots/`. The build needs every image the data names.
  3. Merge by `key`:
     - A new finding whose key (or element, if an older key was named differently) is already in the report updates that entry in place. Append only findings that are new, under their own `group`.
     - A key now verified fixed (§2) moves from `open` to `fixed`: add `how`, re-pin it to the after shot, drop `fix` and `who`, and add a pair if the change is visible.
     - A key in `fixed` that the new review flags again moves back to `open` with `who: "Regressed"`.
     - Never delete a key to make the build pass. Update `summary`, the `eyebrow` date and `stats`.
  4. Build, then publish with `url`, `file_path: <work dir>/index.html`, and `files` holding `data.json` plus the new images only: drop the paths fetched in step 2 from the printed map (published files you leave out are kept).
  - An artifact without a `data.json` (made before this skill) cannot be merged automatically. Say so, and offer a new report linked from its `meta`.

Give the user the link and a two-line summary (open count by severity, fixed count). Don't paste the findings into chat; they are on the page.

## Common mistakes

- Marking a finding fixed from the diff alone, without seeing it in the app.
- Before and after at different viewports or states, so the pair shows nothing.
- Guessing dot positions when a browser is available.
- Shipping the report in the plugin's neutral look (or another project's colours) when the reviewed repo has its own tokens.
- Editing `template.html` for one report. Add a field to the template for everyone instead, or leave it out.
- Uploading full-resolution PNGs; a page of 40 shots goes past the size limit.
- Publishing evidence to a new URL on every run when the user wanted one growing report; ask once which, then reuse the url.
