import { useCallback, useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight, Download, Globe, Presentation } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Reveal, Tilt } from "@/components/site/interactions";
import { filterProjects, projectFormats, profile, siteCopy, type Project, type ProjectFormat } from "@/data/profile";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/portfolio")({
  head: () => ({ meta: [
    { title: "作品集｜高湘芸" },
    { name: "description", content: "發揮我撰寫程式的能力，將過往的作品整理成清晰易讀的網頁。" },
    { property: "og:title", content: "作品集｜高湘芸" },
    { property: "og:description", content: "網站實作與簡報專題，呈現研究方法、個人貢獻與學習反思。" },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: PortfolioPage,
});
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
      // Slides handle their own navigation; project controls remain explicit.
      if (current?.format === "PPT") return;
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIdx, step, current?.format]);
  return <>
    <section className="mx-auto max-w-6xl px-5 pb-10 pt-32 md:pt-40">
      <Reveal>
        <p className="text-sm font-semibold uppercase text-primary">Selected works</p>
        <h1 className="mt-3 text-5xl font-extrabold leading-tight md:text-7xl">精選<span className="text-gradient">作品集</span></h1>
        <p className="mt-5 max-w-xl text-lg text-muted-foreground">{siteCopy.portfolioIntro}</p>
        <p className="mt-3 text-sm text-muted-foreground">{profile.exampleNotice}</p>
      </Reveal>
      <Reveal delay={150} className="mt-8 flex flex-wrap gap-3">
        {formats.map((f) => <Button key={f} variant={filter === f ? "ink" : "soft"} aria-pressed={filter === f} onClick={() => { setOpenIdx(null); setFilter(f); }} className="h-11">
          {f === "網站" ? <Globe /> : f === "PPT" ? <Presentation /> : null}{f}<span className="ml-1 text-xs opacity-70">{filterProjects(f).length}</span>
        </Button>)}
      </Reveal>
    </section>
    <section className="mx-auto max-w-6xl px-5 pb-10">
      <div key={filter} className="grid gap-6 md:grid-cols-2">
        {list.map((p, i) => <Tilt key={p.id} max={4} className="h-full">
          <Button variant="ghost" onClick={() => setOpenIdx(i)} aria-label={`查看${p.title}`} className="pop-card group flex h-full w-full flex-col items-stretch justify-start gap-0 overflow-hidden whitespace-normal p-0 text-left hover:bg-card">
            <div className="relative overflow-hidden border-b-[1.5px] border-ink">
              <img src={p.image} alt={`${p.title} 排版範例封面`} width={1200} height={675} className="aspect-video w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-ink bg-card px-3 py-1.5 text-xs font-bold">{p.format === "網站" ? <Globe /> : <Presentation />}{p.format}</span>
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
            <p className="text-xs font-bold text-primary">{current.category} / {current.format} / {current.year}</p>
            <DialogTitle className="mt-2 text-2xl font-bold md:text-3xl">{current.title}</DialogTitle>
            <DialogDescription className="mt-2 text-sm">{current.subtitle}</DialogDescription>
          </div>
          {current.format === "PPT" ? <Slides project={current} /> : <div className="mx-6 overflow-hidden rounded-lg border border-ink md:mx-8">
            <div className="flex items-center gap-2 border-b bg-muted px-4 py-2 text-xs text-muted-foreground"><Globe className="size-4" />{current.websiteUrl ? new URL(current.websiteUrl).hostname : "網站作品・範例封面"}</div>
            <img src={current.image} alt={`${current.title} 網站排版範例`} width={1200} height={675} className="aspect-video w-full object-cover" />
          </div>}
          <div className="p-6 md:p-8">
            <p className="leading-relaxed text-muted-foreground">{current.summary}</p>
            <dl className="mt-6 grid gap-6 border-y py-5 sm:grid-cols-2">
              <div><dt className="text-xs text-muted-foreground">個人貢獻</dt><dd className="mt-1 font-semibold">{current.role}</dd></div>
              <div><dt className="text-xs text-muted-foreground">使用工具</dt><dd className="mt-1 font-semibold">{current.tools.join(" / ")}</dd></div>
              {current.results.map((r) => <div key={r.label}><dt className="text-xs text-muted-foreground">{r.label}</dt><dd className="mt-1 font-semibold">{r.value}</dd></div>)}
            </dl>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {current.format === "網站" ? current.websiteUrl ? <Button asChild variant="pop"><a href={current.websiteUrl} target="_blank" rel="noreferrer">開啟網站<ArrowUpRight /></a></Button> : <Button variant="outline" disabled><Globe />網站網址待補</Button>
                : current.presentationUrl ? <Button asChild variant="pop"><a href={current.presentationUrl} download><Download />下載 PPT</a></Button> : <Button variant="outline" disabled><Download />PPT 檔案待補</Button>}
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
function Slides({ project }: { project: Project }) {
  const [index, setIndex] = useState(0);
  const slides = project.slides ?? [];
  const slide = slides[index];
  const step = useCallback((dir: number) => setIndex((i) => Math.max(0, Math.min(slides.length - 1, i + dir))), [slides.length]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step]);
  if (!slide) return null;
  return <div className="px-6 md:px-8">
    <div className="relative aspect-video overflow-hidden rounded-lg border border-ink bg-ink text-background">
      <div className="flex h-full flex-col justify-center p-4 sm:p-8 md:p-12">
        <p className="text-[10px] font-semibold text-accent sm:text-xs">{slide.body}</p>
        <h3 className="mt-2 text-lg font-bold leading-tight sm:mt-4 sm:text-3xl md:text-4xl">{slide.title}</h3>
        <ul className="mt-3 space-y-1 text-[11px] leading-relaxed text-background/80 sm:mt-6 sm:space-y-2 sm:text-base">{slide.points.map((p) => <li key={p} className="flex gap-2"><span className="text-accent">—</span><span>{p}</span></li>)}</ul>
      </div>
      <span className="absolute bottom-2 right-3 font-display text-xs text-background/50">{String(index + 1).padStart(2, "0")}</span>
    </div>
    <div className="mt-3 flex items-center justify-between gap-2">
      <div className="flex gap-1.5">{slides.map((s, i) => <Button key={s.title} variant="ghost" size="icon" aria-label={`第 ${i + 1} 張投影片`} aria-pressed={index === i} onClick={() => setIndex(i)} className={cn("size-8", index === i && "bg-accent text-accent-foreground")}>{i + 1}</Button>)}</div>
      <div className="flex items-center gap-2"><Button variant="ghost" size="icon" disabled={index === 0} onClick={() => step(-1)} aria-label="上一張投影片" title="上一張投影片"><ArrowLeft /></Button><span className="text-xs text-muted-foreground">{index + 1} / {slides.length}</span><Button variant="ghost" size="icon" disabled={index === slides.length - 1} onClick={() => step(1)} aria-label="下一張投影片" title="下一張投影片"><ArrowRight /></Button></div>
    </div>
  </div>;
}
