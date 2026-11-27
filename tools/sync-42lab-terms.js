#!/usr/bin/env node
// 42LAB Archive 의 언어별 데이터에서 게임 고유명사 번역을 뽑아 data/i18n-terms.js 를 만든다.
//
// 사용법:  node tools/sync-42lab-terms.js <42lab-archive 경로>
//   예)    node tools/sync-42lab-terms.js ../42lab-archive
//
// 방식: 42LAB 은 data/<언어>/*.json 이 같은 구조라서, 같은 자리에 있는 글끼리 짝지으면
//       「한국어 → 일본어 · 영어 · 번체 · 간체」 사전이 된다. (+ assets/js/i18n.js 의 5개 언어 표)
//       그 사전에서 GAME_DATA 의 한국어 이름·설명과 문서 틀 글을 찾아 적는다.
//       못 찾은 글은 마지막에 목록으로 보여 준다 → data/i18n.js 의 DOC_TEXT 에 직접 적으면 됨.
//       (DOC_TEXT 가 이 파일보다 우선이라, 42LAB 번역이 마음에 안 들 때도 거기서 덮어쓴다)

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const LAB = path.resolve(process.argv[2] || "../42lab-archive");
const ROOT = path.resolve(__dirname, "..");
const LANGS = ["ja", "en", "tw", "zh"]; // ko 는 원문
const OUT = path.join(ROOT, "data", "i18n-terms.js");

if (!fs.existsSync(path.join(LAB, "data", "ko"))) {
  console.error(`42LAB Archive 경로가 아닙니다: ${LAB}`);
  process.exit(1);
}

/* ---------- 1. 42LAB 사전 만들기 ---------- */
const HANGUL = /[가-힣]/;
const pairs = new Map(); // ko → { lang → Map(번역 → 횟수) }
function addPair(ko, lang, text) {
  ko = ko.trim();
  text = text.trim();
  if (!HANGUL.test(ko) || !text || ko === text) return;
  if (!pairs.has(ko)) pairs.set(ko, {});
  const byLang = pairs.get(ko);
  byLang[lang] = byLang[lang] || new Map();
  byLang[lang].set(text, (byLang[lang].get(text) || 0) + 1);
}
function walk(ko, other, lang) {
  if (typeof ko === "string" && typeof other === "string") addPair(ko, lang, other);
  else if (Array.isArray(ko) && Array.isArray(other) && ko.length === other.length) ko.forEach((v, i) => walk(v, other[i], lang));
  else if (ko && other && typeof ko === "object" && typeof other === "object") {
    for (const k of Object.keys(ko)) if (k in other) walk(ko[k], other[k], lang);
  }
}
function jsonFiles(dir, base = dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    const p = path.join(dir, d.name);
    if (d.isDirectory()) return d.name === "episodes" ? [] : jsonFiles(p, base);
    return d.name.endsWith(".json") ? [path.relative(base, p)] : [];
  });
}
const koDir = path.join(LAB, "data", "ko");
const readJson = (p) => JSON.parse(fs.readFileSync(p, "utf8"));
for (const rel of jsonFiles(koDir)) {
  const ko = readJson(path.join(koDir, rel));
  for (const lang of LANGS) {
    const p = path.join(LAB, "data", lang, rel);
    if (fs.existsSync(p)) walk(ko, readJson(p), lang);
  }
}
// 화면 글 표: ['한국어','日本語','English','繁體','简体']
const i18nJs = fs.readFileSync(path.join(LAB, "assets", "js", "i18n.js"), "utf8");
for (const m of i18nJs.matchAll(/\[('(?:[^'\\]|\\.)*'(?:,'(?:[^'\\]|\\.)*'){4})\]/g)) {
  const row = [...m[1].matchAll(/'((?:[^'\\]|\\.)*)'/g)].map((x) => x[1]);
  if (row.length === 5) LANGS.forEach((lang, i) => addPair(row[0], lang, row[i + 1]));
}
const best = (counts) => [...counts.entries()].sort((a, b) => b[1] - a[1])[0][0];
function lookup(ko) {
  const byLang = pairs.get(ko);
  if (!byLang || !LANGS.every((l) => byLang[l])) return null;
  return LANGS.map((l) => best(byLang[l]));
}

/* ---------- 2. 우리 쪽 한국어 글 모으기 ---------- */
const sandbox = { console };
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(ROOT, "data", "game-data.js"), "utf8") + "\nthis.GAME_DATA = GAME_DATA;", sandbox);
const GD = sandbox.GAME_DATA;

// 문서에 나오는 GAME_DATA 칸만 (입력 화면 전용 설명은 번역하지 않음)
const FIELDS = ["label", "fullLabel", "short", "stat", "set2", "set3", "desc", "acquisition", "description", "fixed"];
const SKIP = new Set(["termColor", "voiceGroups", "termDictionary", "namedColor", "statStages"]);
const wanted = new Map(); // ko → 어디서 왔는지
for (const [cat, table] of Object.entries(GD)) {
  if (SKIP.has(cat) || !table || typeof table !== "object") continue;
  const items = Array.isArray(table) ? table : Object.values(table);
  for (const item of items) {
    if (!item || typeof item !== "object" || Array.isArray(item)) continue;
    for (const f of FIELDS) if (typeof item[f] === "string" && HANGUL.test(item[f])) wanted.set(item[f], `${cat}.${f}`);
  }
}

// 문서 틀 글 (renderer.js 의 tr("...") 에 쓰는 글) — 42LAB 에 있으면 그대로 가져옴
const rendererSrc = fs.readFileSync(path.join(ROOT, "renderer.js"), "utf8");
for (const m of rendererSrc.matchAll(/\btrf?\(\s*"([^"]*[가-힣][^"]*)"/g)) if (!wanted.has(m[1])) wanted.set(m[1], "renderer");
for (const m of rendererSrc.matchAll(/\{ key: "\w+", title: "([^"]+)"/g)) if (!wanted.has(m[1])) wanted.set(m[1], "renderer.SECTION_DEFS");
for (const f of ["data/game-data.js", "excel.js"]) {
  const src = fs.readFileSync(path.join(ROOT, f), "utf8");
  for (const m of src.matchAll(/\btrf?\(\s*"([^"]*[가-힣][^"]*)"/g)) if (!wanted.has(m[1])) wanted.set(m[1], f);
}

/* ---------- 3. 알고리즘 세트 효과는 이름으로 맞춤 (우리 문장과 42LAB 문장이 조금 달라도) ---------- */
const sets = {}; // 한국어 세트 이름 → { two:[..], three:[..] }
const koSets = readJson(path.join(koDir, "algorithms.json")).sets;
const langSets = Object.fromEntries(LANGS.map((l) => [l, readJson(path.join(LAB, "data", l, "algorithms.json")).sets]));
koSets.forEach((s) => {
  const other = LANGS.map((l) => langSets[l].find((x) => x.id === s.id));
  if (other.some((x) => !x)) return;
  sets[s.name] = { two: other.map((x) => x.two || ""), three: other.map((x) => x.three || "") };
});

/* ---------- 4. 결과 ---------- */
const out = {};
const missing = [];
for (const [ko, from] of wanted) {
  const found = lookup(ko);
  if (found) out[ko] = found;
}
for (const item of Object.values(GD.algorithm)) {
  const s = sets[item.label];
  if (!s) continue;
  if (item.set2 && !out[item.set2] && s.two.every(Boolean)) out[item.set2] = s.two;
  if (item.set3 && !out[item.set3] && s.three.every(Boolean)) out[item.set3] = s.three;
}
for (const [ko, from] of wanted) if (!out[ko] && !ko.includes("@")) missing.push(`${from}\t${ko}`);

const body = Object.entries(out)
  .map(([ko, list]) => `  ${JSON.stringify(ko)}: ${JSON.stringify(list)},`)
  .join("\n");
fs.writeFileSync(
  OUT,
  `// 게임 고유명사 번역 (42LAB Archive 에서 자동으로 가져옴 — 직접 고치지 말 것)
// 다시 만들기: node tools/sync-42lab-terms.js <42lab-archive 경로>
// 고치고 싶은 번역 · 없는 번역은 data/i18n.js 의 DOC_TEXT 에 적는다 (그쪽이 우선).
// 한국어 → [일본어, 영어, 번체 중국어, 간체 중국어]
const TERM_TEXT = {
${body}
};
`
);
console.log(`${Object.keys(out).length}개 → ${path.relative(ROOT, OUT)}`);
if (missing.length) console.log(`\n42LAB 에서 못 찾음 (${missing.length}개, DOC_TEXT 에 있으면 괜찮음):\n${missing.join("\n")}`);
