#!/usr/bin/env python3
"""42LAB Archive 의 인형 다국어명을 data/doll-names.js 로 가져온다.

사용법: python3 tools/sync-42lab-names.py <42lab-archive 경로>
  예)  python3 tools/sync-42lab-names.py ../42lab-archive
"""
import json, sys, pathlib

# 42LAB 언어 키 -> pnc-wiki profile.names 키 (ko 는 profile.name)
LANGS = {"ko": "ko", "zh": "cn", "tw": "tw", "ja": "jp", "en": "en"}

src = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else "../42lab-archive") / "data"
out = pathlib.Path(__file__).resolve().parent.parent / "data" / "doll-names.js"

by_id = {}
for lab, key in LANGS.items():
    for d in json.loads((src / lab / "doll_index.json").read_text("utf-8"))["dolls"]:
        by_id.setdefault(d["heroId"], {})[key] = d["name"].strip()

rows = [by_id[k] for k in sorted(by_id)]
lines = ",\n".join("  " + json.dumps({k: r.get(k, "") for k in LANGS.values()}, ensure_ascii=False) for r in rows)
out.write_text(
    "// 인형 다국어명 (42LAB Archive doll_index.json 에서 가져옴 — 직접 고치지 말 것)\n"
    "// 다시 만들기: python3 tools/sync-42lab-names.py <42lab-archive 경로>\n"
    "// ko = 한국어명(profile.name), cn = 간체, tw = 번체, jp = 일본어, en = 영어\n"
    f"const DOLL_NAMES = [\n{lines}\n];\n",
    "utf-8",
)
print(f"{len(rows)} dolls -> {out}")
