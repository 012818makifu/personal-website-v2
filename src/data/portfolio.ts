import { projects as existingProjects, type Project as ExistingProject } from "./profile";

export const projectFormats = ["網站", "PDF", "影片"] as const;
export type ProjectFormat = (typeof projectFormats)[number];
export type Project = Omit<ExistingProject, "format" | "category"> & { category: string; format: ProjectFormat; pdfUrl?: string; videoUrl?: string };

const projects: Project[] = [
  {
    id: "blockchain-finance", title: "區塊鏈金融期中報告", subtitle: "從分散式帳本到供應鏈金融",
    category: "商業分析", format: "PDF", year: "2026", image: "/reports/blockchain-finance.webp",
    role: "資料整理與報告撰寫", tools: ["Microsoft Word"],
    summary: "銀行、出口商與供應商如何共用一套可信的交易紀錄？這份報告從雜湊、共識機制與智能合約談起，探討區塊鏈在跨境支付、資產代幣化與供應鏈金融中的應用，再以 Ripple 與 Chainalysis 為例，對照支付服務與鏈上資金追蹤兩種商業模式。",
    results: [{ label: "課程", value: "東吳大學・區塊鏈金融" }, { label: "篇幅", value: "9 頁" }],
    pdfUrl: "/reports/blockchain-finance.pdf",
  },
  {
    id: "beef-noodle-study", title: "老王原汁牛肉麵：行銷生活實錄與顧客洞察",
    subtitle: "從 30 筆訂單觀察顧客怎麼點餐", category: "商業分析", format: "PDF",
    year: "2026", image: "/reports/beef-noodle-study.webp", pdfUrl: "/reports/beef-noodle-study.pdf",
    summary: "我們記錄一家牛肉麵店在午餐與晚餐時段的 30 筆訂單，共觀察 45 位顧客。我負責製作統計圖表，呈現等候時間、消費金額與加購情形。小組也討論了尖峰時段樣本偏多，會如何影響對顧客偏好的判讀。",
    role: "第三組・統計圖表製作", tools: [], results: [{ label: "篇幅", value: "22 頁" }],
  },
  {
    id: "number-run", title: "跑亂數", subtitle: "用 C++ 寫的倍數反應遊戲",
    category: "程式作品", format: "PDF", year: "高一上", image: "/reports/number-run.webp", pdfUrl: "/reports/number-run.pdf",
    summary: "程式先從 2 到 9 抽出挑戰數字，再依序顯示 1 到 100。玩家要在倍數出現時按下空白鍵。作品紀錄了我如何產生亂數、讀取按鍵，並判斷玩家是否過關。",
    role: "遊戲設計與程式撰寫", tools: ["C++"], results: [{ label: "篇幅", value: "10 頁" }],
  },
  {
    id: "wood-charms", title: "木作吊飾", subtitle: "三片可以拆開、換序的角色木牌",
    category: "工藝設計", format: "PDF", year: "", image: "/reports/wood-charms.webp", pdfUrl: "/reports/wood-charms.pdf",
    summary: "靈感來自家裡的木頭風鈴。我把三個角色分別畫成木牌，在上下兩端加上吊環，讓每一片都能單用或串接。報告收錄手繪草稿、切割打磨的過程與成品照片。",
    role: "角色繪製、吊飾設計與製作", tools: ["Clip Studio Paint", "Photoshop", "線鋸機", "電燒筆"], results: [{ label: "篇幅", value: "8 頁" }],
  },
  {
    id: "rich-dad-reflection", title: "關於《富爸爸，窮爸爸》的反思", subtitle: "重讀一本理財書，檢視它對投資風險的假設",
    category: "閱讀與反思", format: "PDF", year: "", image: "/reports/rich-dad-reflection.webp", pdfUrl: "/reports/rich-dad-reflection.pdf",
    summary: "重新讀小時候看過的理財書，我整理了自己認同的資產觀，也追問：用負債投資時，誰能承受失敗？這份閱讀報告把書中的主張與不同人的經濟處境放在一起討論，最後記錄我的延伸學習。",
    role: "閱讀分析與簡報製作", tools: [], results: [{ label: "篇幅", value: "21 頁" }],
  },
  {
    id: "vocaloid-intro", title: "新手入門必看的VOCALOID介紹!!!", subtitle: "給初次接觸 VOCALOID 的觀眾",
    category: "音樂與影音", format: "影片", year: "", image: "/reports/vocaloid-intro.webp",
    videoUrl: "https://www.youtube.com/watch?v=F03Jgt_ty-M", summary: "我在「まきふ」頻道分享的 VOCALOID 入門介紹。",
    role: "", tools: [], results: [{ label: "YouTube 頻道", value: "まきふ" }],
  },
  ...existingProjects.filter((project) => project.format === "網站" && project.websiteUrl)
    .map((project) => ({ ...project, format: "網站" as const })),
];

export function filterProjects(format: "全部" | ProjectFormat) {
  return format === "全部" ? projects : projects.filter((project) => project.format === format);
}
