import { projects as existingProjects, projectFormats as existingFormats, type Project as ExistingProject } from "./profile";

export const projectFormats = [...existingFormats, "PDF"] as const;
export type ProjectFormat = (typeof projectFormats)[number];
export type Project = Omit<ExistingProject, "format"> & { format: ProjectFormat; pdfUrl?: string };

const projects: Project[] = [
  {
    id: "blockchain-finance", title: "區塊鏈金融期中報告", subtitle: "從分散式帳本到供應鏈金融",
    category: "商業分析", format: "PDF", year: "2026", image: "/reports/blockchain-finance.webp",
    role: "資料整理與報告撰寫", tools: ["Microsoft Word"],
    summary: "銀行、出口商與供應商如何共用一套可信的交易紀錄？這份報告從雜湊、共識機制與智能合約談起，探討區塊鏈在跨境支付、資產代幣化與供應鏈金融中的應用，再以 Ripple 與 Chainalysis 為例，對照支付服務與鏈上資金追蹤兩種商業模式。",
    results: [{ label: "課程", value: "東吳大學・區塊鏈金融" }, { label: "篇幅", value: "9 頁" }],
    pdfUrl: "/reports/blockchain-finance.pdf",
  },
  ...existingProjects,
];

export function filterProjects(format: "全部" | ProjectFormat) {
  return format === "全部" ? projects : projects.filter((project) => project.format === format);
}
