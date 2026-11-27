// 문서 언어 (위키 문서 · 이미지 · PDF에만 적용. 입력 화면은 항상 한국어)
// - 게임 고유명사: data/i18n-terms.js (42LAB Archive 에서 자동으로 가져옴)
// - 문서 틀 글 · 42LAB 에 없는 글 · 42LAB 번역을 바꾸고 싶은 글: 아래 DOC_TEXT (이쪽이 우선)
// - 사용자가 직접 쓴 글(이름·스킬 설명·스토리 등)은 번역하지 않는다.
//
// 쓰는 법: tr("한국어") → 지금 문서 언어의 글. trf("{0}초", 5) → 자리 채우기.
//          문서를 그릴 때만 withDocLang(언어, 함수) 안에서 바뀌고, 그 밖에서는 한국어 그대로 돌려준다.
//          같은 한국어인데 뜻이 다르면 "글@쓰임" 키를 쓴다 (한국어 문서에는 @ 앞만 나옴).

// 42LAB Archive 와 같은 언어 · 순서 · 이름
const DOC_LANGS = [
  { key: "ko", label: "한국어", tag: "ko" },
  { key: "ja", label: "日本語", tag: "ja" },
  { key: "en", label: "English", tag: "en" },
  { key: "tw", label: "繁體中文", tag: "zh-Hant" },
  { key: "zh", label: "简体中文", tag: "zh-Hans" },
];
const DOC_LANG_INDEX = { ja: 0, en: 1, tw: 2, zh: 3 }; // DOC_TEXT · TERM_TEXT 배열 순서

// 한국어 → [일본어, 영어, 번체 중국어, 간체 중국어]
const DOC_TEXT = {
  /* ----- 42LAB 번역 바꾸기 ----- */
  "스바로그": ["スヴァローグ", "Svarog", "火神重工", "火神重工"],
  "스바로그 중공업": ["スヴァローグ重工", "Svarog Heavy Industries", "火神重工", "火神重工"],
  "기업": ["企業", "Company", "企業", "企业"],
  "기본": ["基本", "Basic", "基本", "基本"],
  "알고리즘": ["アルゴリズム", "Algorithm", "演算法", "算法"],
  "일반": ["通常", "General", "一般", "一般"],
  "타이틀 콜": ["タイトルコール", "Title Call", "標題語音", "标题语音"],
  "얼티라이프": ["最終生命", "Ultimate Life", "最終生命", "最终生命"],
  "스토리": ["ストーリー", "Story", "劇情", "剧情"],
  "메인": ["メイン", "Main Story", "主線", "主线"], // 일러스트 CG 묶음 이름
  "전속": ["専属", "Character Events", "專屬", "专属"],
  // 스토리 칸 이름 ("인형 프로필 1" → 번호는 tr()이 붙임)
  "인형 프로필": ["人形プロフィール", "Doll Profile", "人形檔案", "人形档案"],
  "인형 보이스": ["人形ボイス", "Doll Voice", "人形語音", "人形语音"],

  /* ----- 42LAB 에 없는 게임 용어 ----- */
  "유니버설 애니씽 서비스": ["ユニバーサル・エニシング・サービス", "Universal Anything Services", "環球萬事服務", "环球万事服务"],
  "특수": ["特殊", "Special", "特殊", "特殊"],
  "일본": ["日本", "Japan", "日本", "日本"],
  "한국": ["韓国", "Korea", "韓國", "韩国"],
  "중국": ["中国", "China", "中國", "中国"],
  "대만": ["台湾", "Taiwan", "臺灣", "台湾"],
  "미국": ["アメリカ", "USA", "美國", "美国"],
  "치료 효과": ["治療効果", "Healing Effect", "治療效果", "治疗效果"],
  "1티어": ["ランク1", "Tier 1", "1級", "1级"],
  "2티어": ["ランク2", "Tier 2", "2級", "2级"],
  "3티어": ["ランク3", "Tier 3", "3級", "3级"],
  "보통": ["普通", "Neutral", "普通", "普通"],
  "패스트 푸드": ["お一人様セット", "Fast Food", "速食", "快餐"],
  "모든 피해량": ["与ダメージ", "All Damage Dealt", "全傷害", "全伤害"],
  "방어력": ["防御力", "DEF", "防禦", "防御"],
  "최대 체력": ["最大HP", "Max HP", "最大生命", "最大生命"],
  "재능 돌파": ["潜在能力突破", "Potential Breakthrough", "潛能突破", "潜能突破"],
  "3D모델": ["3Dモデル", "3D Model", "3D模型", "3D模型"],
  "SD가 변경됨": ["SDモデル変更", "Changes the SD model", "變更SD模型", "变更SD模型"],
  "Live2D가 추가됨": ["Live2D追加", "Adds Live2D", "新增Live2D", "新增Live2D"],
  "움직임있는 일러스트가 추가됨": ["動くイラスト追加", "Adds an animated illustration", "新增動態立繪", "新增动态立绘"],
  "궁극기 컷씬이 변경됨": ["必殺技カットイン変更", "Changes the Ultimate cut-in", "變更終極技特寫", "变更终极技特写"],
  "보이스 세트가 추가됨": ["ボイスセット追加", "Adds a voice set", "新增語音包", "新增语音包"],
  "마인드 확장 ★★★☆ 달성": ["メンタル拡張 ★★★☆ 達成", "Reach Neural Expansion ★★★☆", "心智擴容 ★★★☆ 達成", "心智扩容 ★★★☆ 达成"],
  "마인드 확장 ★★★★ 달성": ["メンタル拡張 ★★★★ 達成", "Reach Neural Expansion ★★★★", "心智擴容 ★★★★ 達成", "心智扩容 ★★★★ 达成"],
  // 기본 · 확장 / 완벽 투영 설명 (42LAB 스킨 설명 첫 줄과 같은 글)
  "인형이 마그라세아에 들어온 후 마인드맵으로 투영한 의상입니다. 가장 익숙하면서도 편안하죠.": [
    "人形がマグラシアを訪れた際に、メンタル映写に基づいて構築された服装。やっぱり、着慣れたものが一番快適だ。",
    "Attire produced with Neural Cloud Projection upon a Doll's arrival in Magrasea. These are the clothes they are most comfortable in.",
    "人形抵達麥戈拉後，由心智所投影而出的衣著。最為熟悉也最為舒適。",
    "人形抵达麦戈拉后，由心智所投影而出的衣着。最为熟悉也最为舒适。",
  ],
  "마그라세아에 들어온 인형의 마인드맵으로 투영한 의상과 환경으로, 현실 세계에서의 삶을 비춥니다.": [
    "人形がマグラシアを訪れた際に、メンタル映写に基づいて構築された服装および環境。現実世界での暮らしを反映している。",
    "Attire and environment produced with Neural Cloud Projection upon a Doll's arrival in Magrasea, which mirrors their life in the real world.",
    "人形抵達麥戈拉後，由心智投影出的衣著與環境，映照著現實世界中的生活。",
    "人形抵达麦戈拉后，由心智投影出的衣着与环境，映照着现实世界中的生活。",
  ],
  "5성 60레벨": ["5星 Lv.60", "5★ Lv.60", "5星 Lv.60", "5星 Lv.60"],
  "5성 70레벨": ["5星 Lv.70", "5★ Lv.70", "5星 Lv.70", "5星 Lv.70"],

  /* ----- 문서 틀 ----- */
  // 문단 제목
  "개요": ["概要", "Overview", "概要", "概要"],
  "성능": ["性能", "Performance", "性能", "性能"],
  "추천 알고리즘": ["おすすめアルゴリズム", "Recommended Algorithms", "推薦演算法", "推荐算法"],
  "작중 행적": ["作中での動向", "In-Story History", "劇情經歷", "剧情经历"],
  "인형 관계": ["人形関係", "Doll Relationships", "人形關係", "人形关系"],
  "대사": ["セリフ", "Voice Lines", "台詞", "台词"],
  "각인돌파": ["刻印突破", "AI Breakthrough", "印記突破", "印记突破"],
  "각인강화": ["刻印強化", "AI Enhancement", "印記強化", "印记强化"],
  "평가": ["評価", "Review", "評價", "评价"],
  "추천 조합": ["おすすめ編成", "Recommended Setup", "推薦搭配", "推荐搭配"],
  "알고리즘 배치": ["アルゴリズム配置", "Algorithm Layout", "演算法配置", "算法配置"],
  "일러스트": ["イラスト", "Illustrations", "插圖", "插图"],
  "스탠딩 CG": ["立ち絵", "Standing CG", "立繪", "立绘"],
  "일러스트 CG": ["イラストCG", "Illustration CG", "插圖CG", "插图CG"],
  "감정 표현": ["表情", "Expressions", "表情", "表情"],
  // 프로필 · 정보 표
  "일러스트@info": ["イラスト", "Illustrator", "繪師", "画师"],
  "불명": ["不明", "Unknown", "不明", "不明"],
  "이미지 업로드 예정": ["画像準備中", "Image coming soon", "圖片準備中", "图片准备中"],
  "레어도": ["レアリティ", "Rarity", "稀有度", "稀有度"],
  "동영상": ["動画", "Video", "影片", "视频"],
  "모바일 게임 {0}에 등장하는 인형.": ["モバイルゲーム{0}に登場する人形。", "A Doll appearing in the mobile game {0}.", "手機遊戲{0}中登場的人形。", "手机游戏{0}中登场的人形。"],
  "피험 인형 프로필": ["被験人形プロフィール", "Test Subject Doll Profile", "受試人形檔案", "受试人形档案"],
  "모델": ["型番", "Model", "型號", "型号"],
  // 스킨
  "일러스트레이터": ["イラストレーター", "Illustrator", "繪師", "画师"],
  "입수방법": ["入手方法", "How to Obtain", "獲取方式", "获取方式"],
  "적용범위": ["適用範囲", "Includes", "適用範圍", "适用范围"],
  // 스킬 · 능력치 · 무장각인
  "{0}초": ["{0}秒", "{0}s", "{0}秒", "{0}秒"],
  "예충전": ["プリチャージ", "Pre-charge", "預充能", "预充能"],
  "{0}성 1레벨": ["{0}星 Lv.1", "{0}★ Lv.1", "{0}星 Lv.1", "{0}星 Lv.1"],
  "최초 1레벨": ["初期 Lv.1", "Initial Lv.1", "初始 Lv.1", "初始 Lv.1"],
  "궁극기 컷씬": ["必殺技カットイン", "Ultimate Cut-in", "終極技特寫", "终极技特写"],
  "모든 레벨 효과": ["全レベルの効果", "Effects by Level", "全等級效果", "全等级效果"],
  "Lv.1 ~ {0} 전체 보기": ["Lv.1 ~ {0} すべて見る", "Show all Lv.1 ~ {0}", "查看全部 Lv.1 ~ {0}", "查看全部 Lv.1 ~ {0}"],
  // 대사
  "'{0}' 투영 보이스 세트": ["「{0}」映写ボイスセット", "'{0}' Projection Voice Set", "「{0}」投影語音包", "“{0}”投影语音包"],
  "투영 보이스 세트": ["映写ボイスセット", "Projection Voice Set", "投影語音包", "投影语音包"],
  "{0} 투영으로 추가되는 보이스 세트이다.": ["{0}映写で追加されるボイスセット。", "A voice set added with the {0} projection.", "{0}投影追加的語音包。", "{0}投影追加的语音包。"],
  "'{0}' 투영 보이스": ["「{0}」映写ボイス", "'{0}' Projection Voice", "「{0}」投影語音", "“{0}”投影语音"],
  "투영 보이스": ["映写ボイス", "Projection Voice", "投影語音", "投影语音"],
  // 작중 행적
  "자세한 내용은 {0} 문서를 참고하십시오.": ["詳しくは{0}を参照してください。", "For details, see {0}.", "詳細內容請參閱{0}。", "详细内容请参阅{0}。"],
  // 알고리즘
  "주 옵션": ["メインステータス", "Main Stat", "主屬性", "主属性"],
  "부 옵션": ["サブステータス", "Sub Stats", "副屬性", "副属性"],
  "추천 배치 {0}": ["おすすめ配置 {0}", "Recommended Layout {0}", "推薦配置 {0}", "推荐配置 {0}"],
  "부가 옵션 없음": ["サブステータスなし", "No sub stat", "無副屬性", "无副属性"],
  "알고리즘 상세": ["アルゴリズム詳細", "Algorithm Details", "演算法詳情", "算法详情"],
  "기본 능력": ["基本ステータス", "Base Stats", "基礎屬性", "基础属性"],
  "알고리즘 세트": ["アルゴリズムセット", "Algorithm Sets", "演算法套裝", "算法套装"],
  "켜진 세트 효과 없음": ["発動中のセット効果なし", "No active set effect", "無生效的套裝效果", "无生效的套装效果"],
  // 친밀도
  "{0} {1} 상승.": ["{0}+{1}。", "{0} +{1}.", "{0}提升{1}。", "{0}提升{1}。"],
  "서<br>약": ["誓<br>約", "Oath", "誓<br>約", "誓<br>约"],
  "친밀도 스킬": ["親密度スキル", "Intimacy Skills", "親密度技能", "亲密度技能"],
  "좋아하는 선물": ["好きなプレゼント", "Liked Gifts", "喜歡的禮物", "喜欢的礼物"],
  "싫어하는 선물": ["嫌いなプレゼント", "Disliked Gifts", "討厭的禮物", "讨厌的礼物"],
  "칭호": ["称号", "Title", "稱號", "称号"],
  "친밀도 Lv.{0}에 개방": ["親密度 Lv.{0} で解放", "Unlocks at Intimacy Lv.{0}", "親密度 Lv.{0} 解鎖", "亲密度 Lv.{0} 解锁"],
};

let DOC_LANG = "ko";

function isDocLang(key) {
  return DOC_LANGS.some((lang) => lang.key === key);
}

// 문서를 그리는 동안만 언어를 바꾼다 (끝나면 원래대로 — 입력 화면은 한국어 유지)
function withDocLang(lang, fn) {
  const prev = DOC_LANG;
  DOC_LANG = isDocLang(lang) ? lang : "ko";
  try {
    return fn();
  } finally {
    DOC_LANG = prev;
  }
}

function docLangTag() {
  const lang = DOC_LANGS.find((l) => l.key === DOC_LANG);
  return lang ? lang.tag : "ko";
}

function lookupText(ko) {
  const i = DOC_LANG_INDEX[DOC_LANG];
  const own = (table) => (Object.prototype.hasOwnProperty.call(table, ko) ? table[ko][i] : "");
  return own(DOC_TEXT) || (typeof TERM_TEXT !== "undefined" ? own(TERM_TEXT) : "");
}

// 한국어 → 문서 언어. 번역이 없으면 한국어 그대로.
// "인형 프로필 3"처럼 끝이 번호면 번호 앞만 찾아서 붙인다.
function tr(ko) {
  if (typeof ko !== "string" || !ko) return ko;
  if (DOC_LANG === "ko") return ko.split("@")[0];
  const found = lookupText(ko);
  if (found) return found;
  const m = /^(.*\S) (\d+)$/.exec(ko);
  if (m) {
    const head = lookupText(m[1]);
    if (head) return `${head}${DOC_LANG === "en" ? " " : ""}${m[2]}`;
  }
  return ko.split("@")[0];
}

// 자리 채우기: trf("{0}초", 5) → "5초" / "5秒" / "5s". 넣는 값은 그대로 들어감 (HTML이면 미리 esc)
function trf(ko, ...args) {
  return tr(ko).replace(/\{(\d+)\}/g, (all, n) => (args[n] == null ? "" : String(args[n])));
}

// 생일 같은 「월 · 일」 표기
const EN_MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
function formatMonthDay(month, day) {
  const m = Number(month) || 0;
  const d = Number(day) || 0;
  if (DOC_LANG === "en") return [m ? EN_MONTHS[m - 1] : "", d ? (m ? String(d) : `Day ${d}`) : ""].filter(Boolean).join(" ");
  if (DOC_LANG === "ko") return [m ? `${m}월` : "", d ? `${d}일` : ""].filter(Boolean).join(" ");
  return `${m ? `${m}月` : ""}${d ? `${d}日` : ""}`;
}
