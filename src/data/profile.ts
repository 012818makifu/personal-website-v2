import plantApp from "@/assets/work-plant-app.jpg";
import cafeBrand from "@/assets/work-cafe-brand.jpg";
import dashboard from "@/assets/website-cover.png";
import poster from "@/assets/work-3d-poster.jpg";

// Example student content; school, contact details, and actual work await the owner.
export const skillCategories = ["商業分析", "程式作品", "業餘興趣"] as const;
export type SkillCategory = (typeof skillCategories)[number];
export const projectFormats = ["網站", "PPT"] as const;
export type ProjectFormat = (typeof projectFormats)[number];

export const profile = {
  name: "高湘芸", enName: "Kao, Siang-Yun", initials: "Y",
  roles: ["在學學生", "商業分析學習者", "程式專題實作者", "藝術與運動愛好者"],
  intro: "從商業問題出發，用資料分析與程式實作找答案。整理課程專題、學習歷程與課外探索，迎向職涯與研究所的下一步。",
  about: "目前仍在學，持續累積商業分析與程式實作經驗。我喜歡釐清問題、整理證據，再把想法做成網站或簡報。藝術讓我練習觀察與表達，運動讓我培養自律與團隊合作。期待在工作與研究中，延伸這些跨領域的探索。",
  email: "0119sharonkao@gmail.com", location: "台灣", languages: "中文、英文、日文",
  status: "在學中・求職與研究所準備",
  education: "東吳大學｜國際貿易學系｜大二",
  exampleNotice: "個人資料與作品為排版範例，尚非實際申請經歷。",
  educationFields: [
    { label: "學校", value: "東吳大學" },
    { label: "科系", value: "國際貿易學系" },
    { label: "年級", value: "大二" },
  ],
  stats: [
    { value: 3, suffix: "", label: "專長主軸" },
    { value: 2, suffix: "", label: "作品格式" },
    { value: 2, suffix: "", label: "申請方向" },
    { value: 2, suffix: "", label: "藝術與運動領域" },
  ],
  interests: ["🎨 藝術創作", "📷 攝影觀察", "🏃 運動訓練"],
  keywords: [
    { front: "分析", back: "先釐清問題與假設，再用資料整理有根據的觀點。", tone: "mint" },
    { front: "實作", back: "把課堂所學轉成程式與網站，透過實際成果檢驗想法。", tone: "sky" },
    { front: "探索", back: "在藝術與運動中練習觀察、自律與合作，帶回學習與研究。", tone: "lime" },
  ],
  socials: [] as { label: string; href: string }[],
  footer: { eyebrow: "Next chapter", title: "期待下一個學習與實作的機會", description: "求職機會、研究交流與專題合作" },
} as const;

export const timeline = {
  經歷: [
    { period: "課程專題・範例", title: "商業分析專題", org: "小組課程專題", detail: "從市場問題出發，整理公開資料、比較競爭者並提出策略建議；負責資料整理與成果簡報。" },
    { period: "自主學習・範例", title: "程式與網站實作", org: "個人學習計畫", detail: "把學習筆記轉為可操作的網站，練習程式邏輯、介面設計與版本管理。" },
    { period: "課外探索・範例", title: "藝術與運動參與", org: "課外活動", detail: "透過創作紀錄與規律運動，累積表達、團隊合作及時間管理的經驗。" },
  ],
  學歷: [
    { period: "目前在學", title: "大學在學", org: "學校／科系／年級待補", detail: "預計整理修課紀錄、專題方向與研究興趣，作為求職及研究所申請的學習脈絡。" },
  ],
} as const;

export const skills: { name: string; category: SkillCategory; icon: string; desc: string; tags: string[] }[] = [
  { name: "市場與競爭分析", category: "商業分析", icon: "📊", desc: "整理產業資料、比較競爭者，形成有依據的商業觀點。", tags: ["市場研究", "競品比較", "SWOT"] },
  { name: "資料整理與洞察", category: "商業分析", icon: "🔎", desc: "從資料清理、指標比較到視覺化，說明問題與發現。", tags: ["Excel", "資料視覺化", "指標分析"] },
  { name: "策略提案與簡報", category: "商業分析", icon: "📑", desc: "將分析結果整理成清楚的論點、建議與簡報。", tags: ["PowerPoint", "提案", "故事結構"] },
  { name: "網站專題實作", category: "程式作品", icon: "💻", desc: "把想法做成可操作的網站，呈現功能、流程與實作成果。", tags: ["HTML / CSS", "JavaScript", "網站"] },
  { name: "資料處理程式", category: "程式作品", icon: "🧩", desc: "以程式整理資料與自動化重複工作，記錄方法與限制。", tags: ["Python", "資料處理", "自動化"] },
  { name: "專題紀錄與協作", category: "程式作品", icon: "🗂️", desc: "整理開發歷程、個人貢獻與反思，讓成果可被理解。", tags: ["Git", "文件", "問題拆解"] },
  { name: "藝術與視覺表達", category: "業餘興趣", icon: "🎨", desc: "以創作與攝影練習觀察，記錄生活中的想法與感受。", tags: ["藝術", "攝影", "創作"] },
  { name: "運動與自律", category: "業餘興趣", icon: "🏃", desc: "透過規律訓練培養耐心、自律與持續投入的習慣。", tags: ["運動", "訓練紀錄", "自律"] },
  { name: "團隊活動", category: "業餘興趣", icon: "🏸", desc: "在球類與團體活動中練習溝通、合作與角色分工。", tags: ["球類", "團隊合作", "溝通"] },
];
export const process = [
  { step: "01", title: "提問", desc: "理解題目與背景，定義值得探索的問題。" },
  { step: "02", title: "分析", desc: "蒐集資料、驗證假設，整理方法與洞察。" },
  { step: "03", title: "實作", desc: "將想法轉為網站、程式或簡報，記錄個人貢獻。" },
  { step: "04", title: "反思", desc: "檢視成果與限制，提出下一步學習與研究方向。" },
] as const;
export const softSkills = [
  { name: "溝通協作", desc: "清楚說明自己的想法，也理解團隊不同的觀點。" },
  { name: "問題拆解", desc: "把複雜題目拆成可以研究、實作與驗證的小問題。" },
  { name: "時間管理", desc: "在課業、專題與興趣之間規劃進度，持續投入。" },
  { name: "簡報表達", desc: "用清楚的脈絡說明問題、方法與結論。" },
  { name: "自主學習", desc: "遇到不熟悉的工具與領域，主動找資料並嘗試實作。" },
] as const;
export const tools = ["Excel", "PowerPoint", "Python", "C++", "資料分析", "藝術", "運動"] as const;

export const siteCopy = {
  interests: "課業之外，我的探索", skillsIntro: "結合本系的商業、國際貿易知識，以及程式技能，記錄跨領域的學習與累積。",
  portfolioIntro: "課程專題與自主實作，從問題、方法到成果，留下每一步的學習紀錄。",
} as const;
export type ProjectCategory = SkillCategory;
export type Project = {
  id: string; title: string; subtitle: string; category: ProjectCategory; format: ProjectFormat;
  year: string; image: string; role: string; tools: string[]; summary: string;
  results: { value: string; label: string }[]; featured?: boolean;
  websiteUrl?: string; presentationUrl?: string; slides?: { title: string; body: string; points: string[] }[];
};
export const projects: Project[] = [
  { id: "market-study", title: "校園咖啡市場分析", subtitle: "課程分析簡報・範例", category: "商業分析", format: "PPT", year: "範例", image: cafeBrand, role: "資料整理 / 分析 / 簡報", tools: ["Excel", "PowerPoint"], summary: "以校園周邊咖啡消費為題，整理市場背景、競爭者與消費需求，提出可驗證的策略建議。", results: [{ value: "市場研究", label: "分析方法" }, { value: "策略提案", label: "成果形式" }], featured: true, slides: [
    { title: "校園咖啡市場分析", body: "課程專題｜商業分析", points: ["研究問題：學生如何選擇咖啡店？", "市場背景 → 競爭分析 → 策略建議"] },
    { title: "研究方法", body: "建立比較框架", points: ["整理公開市場資料", "比較價格、地點與產品定位", "記錄資料來源與分析限制"] },
    { title: "策略與反思", body: "從資料回到商業問題", points: ["提出差異化定位假設", "規劃後續驗證方式", "反思樣本與資料限制"] },
  ] },
  {
    id: "website-project-01",
    title: "童行資源地圖",
    subtitle: "網站作品",
    category: "程式作品",
    format: "網站",
    year: "2026",
    image: dashboard,
    role: "自行完成",
    tools: ["Claude", "netlify"],
    summary: "為統合弱勢未成年的食、衣、教育，三個方面資源的網站。\n使用對象:\n1.需要以上資源的孩童、家庭\n2.期望提供資源的志願者\n使用方式:\n1.使用關鍵字，或是問答，找出查詢者可以用的資源\n2.點擊地圖，一步步縮小範圍，查看活動範圍附近的資源",
    results: [],
    websiteUrl: "https://astonishing-sunburst-c57be3.netlify.app/",
  },
  { id: "plant-log", title: "植物觀察日誌", subtitle: "個人網站實作・範例", category: "程式作品", format: "網站", year: "範例", image: plantApp, role: "需求整理 / 網站實作", tools: ["JavaScript", "Git"], summary: "從日常觀察出發，規劃可記錄植物狀態的網站，累積表單與資料整理經驗。正式作品網址待補。", results: [{ value: "紀錄流程", label: "功能規劃" }, { value: "自主實作", label: "專題形式" }] },
  { id: "art-journal", title: "藝術與運動探索", subtitle: "課外學習簡報・範例", category: "業餘興趣", format: "PPT", year: "範例", image: poster, role: "活動紀錄 / 視覺整理", tools: ["PowerPoint", "攝影"], summary: "整理藝術創作與運動參與的觀察，呈現課業之外的自律、表達與團隊合作。", results: [{ value: "藝術", label: "視覺與觀察" }, { value: "運動", label: "自律與合作" }], slides: [
    { title: "藝術與運動探索", body: "課外學習紀錄", points: ["藝術：練習觀察與表達", "運動：建立自律與合作"] },
    { title: "學習與反思", body: "把興趣帶回學習", points: ["記錄創作過程與想法", "整理運動參與與團隊角色", "反思持續投入帶來的改變"] },
  ] },
];
export function filterProjects(format: "全部" | ProjectFormat) {
  return format === "全部" ? projects : projects.filter((p) => p.format === format);
}
