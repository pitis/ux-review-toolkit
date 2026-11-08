// Run: node --test skills/ux-report/assets/build.test.mjs
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const example = JSON.parse(readFileSync(join(here, 'example.data.json'), 'utf8'))

// Builds `data` in a fresh dir holding the example's shots and a stale index.html from an "earlier build".
function build(data) {
  const dir = mkdtempSync(join(tmpdir(), 'ux-report-'))
  mkdirSync(join(dir, 'shots'))
  for (const k of Object.keys(example.shots)) writeFileSync(join(dir, 'shots', `${k}.jpg`), 'jpg') // the build only checks they exist
  writeFileSync(join(dir, 'index.html'), 'stale')
  writeFileSync(join(dir, 'data.json'), JSON.stringify(data))
  const r = spawnSync(process.execPath, [join(here, 'build.mjs'), dir], { encoding: 'utf8' })
  return { ...r, html: existsSync(join(dir, 'index.html')) ? readFileSync(join(dir, 'index.html'), 'utf8') : null }
}
const edit = (fn) => { const d = structuredClone(example); fn(d); return d }

test('the example builds and lists every image plus data.json to publish', () => {
  const r = build(example)
  assert.equal(r.status, 0, r.stderr)
  const files = JSON.parse(r.stdout.split('publish files: ')[1])
  assert.deepEqual(Object.keys(files).sort(), ['data.json', 'shots/cart-after.jpg', 'shots/pay-after.jpg', 'shots/pay.jpg'])
})

test('markup in the data stays inside the JSON block', () => {
  const evil = '</script><img src=x onerror=alert(1)>'
  const r = build(edit((d) => { d.title = evil; d.open[0].title = evil }))
  assert.equal(r.status, 0, r.stderr)
  assert.ok(!r.html.includes('</script><img'))
  const json = r.html.match(/<script id="report-data" type="application\/json">(.*?)<\/script>/s)[1]
  assert.equal(JSON.parse(json).open[0].title, evil)
})

for (const [name, fn, message] of [
  ['a duplicate key', (d) => d.fixed.push({ ...d.fixed[0] }), /duplicate key/],
  ['CSS injection in a theme value', (d) => { d.theme.light.accent = 'red}body{display:none' }, /plain CSS value/],
  ['a channel triplet instead of a colour', (d) => { d.theme.light.accent = '262 83% 58%' }, /not a CSS colour/],
  ['a javascript: link', (d) => { d.meta.push({ label: 'x', href: 'javascript:alert(1)' }) }, /http\(s\) URL/],
  ['a list field given as a string', (d) => { d.unverifiable = 'Screen readers' }, /unverifiable: must be an array/],
  ['an image path outside shots/', (d) => { d.shots.pay.src = '../secret.txt' }, /must be shots\//],
  ['a pin outside the image', (d) => { d.open[0].pin.x = 105 }, /pin\.x must be a percentage/],
]) {
  test(`fails on ${name} and removes the stale page`, () => {
    const r = build(edit(fn))
    assert.equal(r.status, 1)
    assert.match(r.stderr, message)
    assert.equal(r.html, null)
  })
}
