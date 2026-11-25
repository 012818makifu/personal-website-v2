import { useCallback, useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight, Download, FileText, Globe, Video } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Reveal, Tilt } from "@/components/site/interactions";
import { filterProjects, projectFormats, type ProjectFormat } from "@/data/portfolio";
import { siteCopy } from "@/data/profile";

export const Route = createFileRoute("/portfolio")({
  head: () => ({ meta: [
    { title: "作品集｜高湘芸" },
    { name: "description", content: "發揮我撰寫程式的能力，將過往的作品整理成清晰易讀的網頁。" },
    { property: "og:title", content: "作品集｜高湘芸" },
    { property: "og:description", content: "網站實作與簡報專題，呈現研究方法、個人貢獻與學習反思。" },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: PortfolioPage,
});
const formatIcons = { 網站: Globe, 影片: Video, PDF: FileText };
function FormatIcon({ format }: { format: ProjectFormat }) {
  const Icon = formatIcons[format];
  return <Icon />;
}
const formats = ["全部", ...projectFormats] as const;

function PortfolioPage() {
  const [filter, setFilter] = useState<"全部" | ProjectFormat>("全部");
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const list = filterProjects(filter);
  const current = openIdx === null ? null : list[openIdx];
  const step = useCallback((dir: 1 | -1) => setOpenIdx((i) => i === null || !list.length ? null : (i + dir + list.length) % list.length), [list.length]);
  useEffect(() => {
    if (openIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIdx, step]);
  return <>
    <section className="mx-auto max-w-6xl px-5 pb-10 pt-32 md:pt-40">
      <Reveal>
        <p className="text-sm font-semibold uppercase text-primary">Selected works</p>
        <h1 className="mt-3 text-5xl font-extrabold leading-tight md:text-7xl">精選<span className="text-gradient">作品集</span></h1>
        <p className="mt-5 max-w-xl text-lg text-muted-foreground">{siteCopy.portfolioIntro}</p>
      </Reveal>
      <Reveal delay={150} className="mt-8 flex flex-wrap gap-3">
        {formats.map((f) => <Button key={f} variant={filter === f ? "ink" : "soft"} aria-pressed={filter === f} onClick={() => { setOpenIdx(null); setFilter(f); }} className="h-11">
          {f !== "全部" && <FormatIcon format={f} />}{f}<span className="ml-1 text-xs opacity-70">{filterProjects(f).length}</span>
        </Button>)}
      </Reveal>
    </section>
    <section className="mx-auto max-w-6xl px-5 pb-10">
      <div key={filter} className="grid gap-6 md:grid-cols-2">
        {list.map((p, i) => <Tilt key={p.id} max={4} className="h-full">
          <Button variant="ghost" onClick={() => setOpenIdx(i)} aria-label={`查看${p.title}`} className="pop-card group flex h-full w-full flex-col items-stretch justify-start gap-0 overflow-hidden whitespace-normal p-0 text-left hover:bg-card">
            <div className="relative overflow-hidden border-b-[1.5px] border-ink">
              <img src={p.image} alt={`${p.title} 封面`} width={1200} height={675} className="aspect-video w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-ink bg-card px-3 py-1.5 text-xs font-bold"><FormatIcon format={p.format} />{p.format}</span>
              <span className="absolute bottom-4 right-4 grid size-10 place-items-center rounded-full border border-ink bg-accent text-accent-foreground"><ArrowUpRight /></span>
            </div>
            <div className="p-6">
              <p className="text-xs font-semibold text-muted-foreground">{p.category}</p>
              <h2 className="mt-2 text-2xl font-bold">{p.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{p.subtitle}</p>
            </div>
          </Button>
        </Tilt>)}
      </div>
    </section>
    <Dialog open={Boolean(current)} onOpenChange={(o) => { if (!o) setOpenIdx(null); }}>
      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()} className="top-[4dvh] block max-h-[92dvh] w-[calc(100%-2rem)] max-w-4xl translate-y-0 gap-0 overflow-y-auto border-[1.5px] border-ink p-0 shadow-pop-lg">
        {current && <div key={current.id}>
          <div className="p-6 pb-4 pr-12 md:px-8">
            <p className="text-xs font-bold text-primary">{[current.category, current.format, current.year].filter(Boolean).join(" / ")}</p>
            <DialogTitle className="mt-2 text-2xl font-bold md:text-3xl">{current.title}</DialogTitle>
            <DialogDescription className="mt-2 text-sm">{current.subtitle}</DialogDescription>
          </div>
          <img src={current.image} alt={`${current.title} 封面`} className="mx-auto aspect-video w-[calc(100%-3rem)] rounded-lg border object-cover" />
          <div className="p-6 md:p-8">
            <p className="whitespace-pre-line leading-relaxed text-muted-foreground">{current.summary}</p>
            <dl className="mt-6 grid gap-6 border-y py-5 sm:grid-cols-2">
              {current.role && <div><dt className="text-xs text-muted-foreground">個人貢獻</dt><dd className="mt-1 font-semibold">{current.role}</dd></div>}
              {current.tools.length > 0 && <div><dt className="text-xs text-muted-foreground">使用工具</dt><dd className="mt-1 font-semibold">{current.tools.join(" / ")}</dd></div>}
              {current.results?.map((r) => <div key={r.label}><dt className="text-xs text-muted-foreground">{r.label}</dt><dd className="mt-1 font-semibold">{r.value}</dd></div>)}
            </dl>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {current.websiteUrl && <Button asChild variant="pop"><a href={current.websiteUrl} target="_blank" rel="noreferrer">開啟網站<ArrowUpRight /></a></Button>}
              {current.videoUrl && <Button asChild variant="pop"><a href={current.videoUrl} target="_blank" rel="noreferrer">在 YouTube 觀看<ArrowUpRight /></a></Button>}
              {current.pdfUrl && <>
                <Button asChild variant="pop"><a href={current.pdfUrl.replace(/\.pdf$/, ".html")} target="_blank" rel="noreferrer"><FileText />閱讀 PDF</a></Button>
                <Button asChild variant="outline"><a href={current.pdfUrl} download={`${current.title}.pdf`}><Download />下載 PDF</a></Button>
              </>}

            </div>
            <div className="mt-8 flex items-center justify-between gap-2 border-t pt-5">
              <Button variant="soft" size="icon" onClick={() => step(-1)} aria-label="上一個作品" title="上一個作品"><ArrowLeft /></Button>
              <span className="text-sm text-muted-foreground">作品 {(openIdx ?? 0) + 1} / {list.length}</span>
              <Button variant="pop" size="icon" onClick={() => step(1)} aria-label="下一個作品" title="下一個作品"><ArrowRight /></Button>
            </div>
          </div>
        </div>}
      </DialogContent>
    </Dialog>
  </>;
}
