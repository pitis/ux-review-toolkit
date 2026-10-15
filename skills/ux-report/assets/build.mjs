#!/usr/bin/env node
// Usage: node build.mjs <report dir>
// Reads <dir>/data.json, checks it against <dir>/shots/, writes <dir>/index.html from template.html.
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const dir = process.argv[2]
if (!dir) {
  console.error('usage: node build.mjs <report dir>')
  process.exit(2)
}
const data = JSON.parse(readFileSync(join(dir, 'data.json'), 'utf8'))
const template = readFileSync(join(dirname(fileURLToPath(import.meta.url)), 'template.html'), 'utf8')

const errors = []
const warnings = []
const shots = data.shots || {}
const srcOf = (k) => shots[k]?.src || `shots/${k}.jpg`
const checkShot = (k, where) => {
  if (!shots[k]) warnings.push(`${where}: shot "${k}" has no entry in "shots" (label falls back to the key)`)
  const file = join(dir, srcOf(k))
  if (!existsSync(file)) errors.push(`${where}: image ${srcOf(k)} not found in ${dir}`)
}

const keys = new Set()
for (const kind of ['open', 'fixed']) {
  for (const [i, f] of (data[kind] || []).entries()) {
    const where = `${kind}[${i}] "${f.title || '?'}"`
    if (!f.key) errors.push(`${where}: missing key`)
    else if (keys.has(f.key)) errors.push(`${where}: duplicate key "${f.key}"`)
    else keys.add(f.key)
    if (!f.title) errors.push(`${where}: missing title`)
    if (kind === 'open') {
      if (!['P0', 'P1', 'P2', 'P3'].includes(f.sev)) errors.push(`${where}: sev must be P0–P3`)
      if (!f.fix) errors.push(`${where}: missing fix`)
    } else if (!f.how) errors.push(`${where}: missing how`)
    if (f.pin) {
      checkShot(f.pin.shot, where)
      for (const axis of ['x', 'y'])
        if (typeof f.pin[axis] !== 'number' || f.pin[axis] < -10 || f.pin[axis] > 110)
          errors.push(`${where}: pin.${axis} must be a percentage (0–100)`)
    }
  }
}
for (const [i, p] of (data.pairs || []).entries()) {
  checkShot(p.before, `pairs[${i}] before`)
  checkShot(p.after, `pairs[${i}] after`)
}
for (const k of Object.keys(shots)) if (!existsSync(join(dir, srcOf(k)))) errors.push(`shots.${k}: ${srcOf(k)} not found`)

// Project theme: tokens from the reviewed project's own design system, layered over the template's neutral defaults.
const TOKENS = ['bg', 'surface', 'surface-2', 'ink', 'muted', 'line', 'accent', 'accent-soft', 'heading',
  'p0', 'p0-bg', 'p1', 'p1-bg', 'p2', 'p2-bg', 'p3', 'p3-bg', 'ok', 'ok-bg', 'shot-bg', 'shadow', 'radius']
const kebab = (k) => k.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase().replace(/^surface-?2$/, 'surface-2')
const theme = data.theme || {}
function tokens(mode, where) {
  const out = {}
  for (const [k, v] of Object.entries(mode || {})) {
    const name = kebab(k)
    if (!TOKENS.includes(name)) { warnings.push(`${where}.${k}: unknown token (known: ${TOKENS.join(', ')})`); continue }
    if (/[;{}<>]/.test(String(v))) { errors.push(`${where}.${k}: value must be a plain CSS value`); continue }
    out[name] = String(v)
  }
  return out
}
const light = tokens(theme.light, 'theme.light')
const dark = theme.dark ? tokens(theme.dark, 'theme.dark') : null
const fonts = theme.fonts || {}
for (const f of ['display', 'body', 'mono']) if (fonts[f] && /[;{}<>]/.test(fonts[f])) errors.push(`theme.fonts.${f}: must be a font-family list`)
if (fonts.stylesheet && !/^https:\/\/fonts\.googleapis\.com\//.test(fonts.stylesheet))
  errors.push('theme.fonts.stylesheet: only Google Fonts stylesheets load in an artifact; use the closest Google font or a system stack')

// Contrast of the text pairs the page uses, for hex values the theme sets.
const lum = (hex) => {
  const m = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(hex || ''); if (!m) return null
  const h = m[1].length === 3 ? [...m[1]].map((c) => c + c).join('') : m[1]
  const [r, g, b] = [0, 2, 4].map((i) => { const c = parseInt(h.slice(i, i + 2), 16) / 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4 })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
for (const [label, t] of [['light', light], ['dark', dark]]) {
  if (!t) continue
  for (const [fg, bg] of [['ink', 'bg'], ['ink', 'surface'], ['muted', 'surface'], ['accent', 'surface'], ['heading', 'bg'], ['accent', 'accent-soft']]) {
    const a = lum(t[fg]), b = lum(t[bg]); if (a == null || b == null) continue
    const ratio = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)
    if (ratio < 4.5) warnings.push(`theme.${label}: ${fg} on ${bg} is ${ratio.toFixed(2)}:1, under 4.5:1 — pick a darker/lighter project token for the report`)
  }
}

const decl = (t) => Object.entries(t).map(([k, v]) => `--${k}:${v};`).join('')
const derived = (t) => (t['accent-soft'] ? '' : (t.accent ? '--accent-soft:color-mix(in srgb,var(--accent) 14%,var(--surface));' : '')) + (t.heading || !t.ink ? '' : '--heading:var(--ink);')
const fontDecl = ['display', 'body', 'mono'].filter((f) => fonts[f]).map((f) => `--${f}:${fonts[f]};`).join('')
let themeCss = ''
if (Object.keys(light).length || fontDecl) themeCss += `:root{${decl(light)}${derived(light)}${fontDecl}}`
if (dark) {
  const darkBody = `${decl(dark)}${derived(dark)}color-scheme:dark;`
  themeCss += `@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){${darkBody}}}:root[data-theme="dark"]{${darkBody}}`
}
// Light tokens but no dark ones: drop the neutral dark defaults so the report stays in the project's light theme
// instead of mixing its brand colours with a generic dark palette.
const dropDarkDefaults = Object.keys(light).length > 0 && !dark
const fontLink = fonts.stylesheet ? `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="stylesheet" href="${fonts.stylesheet.replace(/"/g, '&quot;')}">` : ''
if (!data.theme) warnings.push('no "theme": the report uses neutral defaults instead of the project\'s design')

for (const w of warnings) console.warn('warn:', w)
if (errors.length) {
  for (const e of errors) console.error('error:', e)
  process.exit(1)
}

// JSON inside <script type="application/json">: escape "<" so "</script>" can't close it.
const json = JSON.stringify(data).replace(/</g, '\\u003c')
const title = String(data.title || 'UX Review').replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c])
const html = (dropDarkDefaults ? template.replace(/\/\*dark-defaults\*\/[\s\S]*?\/\*\/dark-defaults\*\//, '') : template)
  .replace('__UX_REPORT_TITLE__', () => title)
  .replace('<!--__UX_REPORT_FONTS__-->', () => fontLink)
  .replace('/*__UX_REPORT_THEME__*/', () => themeCss)
  .replace('__UX_REPORT_DATA__', () => json)
writeFileSync(join(dir, 'index.html'), html)

const files = new Set(Object.keys(shots).map(srcOf))
for (const p of data.pairs || []) files.add(srcOf(p.before)).add(srcOf(p.after))
for (const kind of ['open', 'fixed']) for (const f of data[kind] || []) if (f.pin) files.add(srcOf(f.pin.shot))
console.log(`built ${join(dir, 'index.html')}: ${(data.open || []).length} open, ${(data.fixed || []).length} fixed, ${(data.pairs || []).length} pairs, ${files.size} images`)
console.log('publish files:', JSON.stringify(Object.fromEntries([...files, 'data.json'].map((f) => [f, join(dir, f)]))))
