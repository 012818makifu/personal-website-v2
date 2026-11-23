import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Marquee, Reveal, Tilt } from "@/components/site/interactions";
import { process, skills, softSkills, tools, skillCategories, siteCopy } from "@/data/profile";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "個人專長｜高湘芸" },
      { name: "description", content: "虛擬商業分析、程式作品及課外嗜好，呈現我的技能與跨領域能力。" },
      { property: "og:title", content: "個人專長｜高湘芸" },
      { property: "og:description", content: "虛擬商業分析、程式作品及課外嗜好，呈現我的技能與跨領域能力。" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SkillsPage,
});

const FILTERS = ["全部", ...skillCategories] as const;
type Filter = (typeof FILTERS)[number];

function SkillsPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-5 pb-10 pt-32 md:pt-40">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Skills</p>
          <h1 className="mt-3 text-5xl font-extrabold leading-tight md:text-7xl">
            我擅長的<span className="text-gradient">事情</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">
            {siteCopy.skillsIntro}
          </p>
        </Reveal>
      </section>
      <SkillGrid />
      <div className="overflow-x-clip"><section className="relative z-10 -rotate-2 border-y-[1.5px] border-ink bg-accent py-6 text-accent-foreground">
        <Marquee items={tools} />
      </section></div>
      <Process />
      <SoftSkills />
    </>
  );
}

function SegmentedFilter({ value, onChange }: { value: Filter; onChange: (f: Filter) => void }) {
  return (
    <div className="flex w-fit max-w-full flex-wrap gap-1 rounded-2xl border-[1.5px] border-ink bg-card p-1" role="tablist">
      {FILTERS.map((f) => (
        <Button key={f} variant="ghost" role="tab" aria-selected={value === f} onClick={() => onChange(f)}
          className={cn("h-10 rounded-full px-4 text-sm font-semibold transition-colors", value === f ? "bg-ink text-background hover:bg-ink hover:text-background" : "text-muted-foreground hover:text-foreground")}>
          {f}
        </Button>
      ))}
    </div>
  );
}

function SkillGrid() {
  const [filter, setFilter] = useState<Filter>("全部");
  const list = filter === "全部" ? skills : skills.filter((s) => s.category === filter);
  return (
    <section className="mx-auto max-w-6xl px-5 pb-24">
      <Reveal className="mb-8">
        <SegmentedFilter value={filter} onChange={setFilter} />
      </Reveal>
      <div key={filter} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((s, i) => (
          <div key={s.name} className="animate-page-in" style={{ animationDelay: `${i * 60}ms` }}>
            <Tilt className="h-full rounded-3xl">
              <div className="pop-card flex h-full flex-col gap-4 p-6">
                <div className="flex items-start justify-between">
                  <span className="grid size-14 place-items-center rounded-2xl border-[1.5px] border-ink bg-secondary text-2xl">
                    {s.icon}
                  </span>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-primary">{s.category}</p>
                  <h3 className="mt-1 text-xl font-bold">{s.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                </div>
                <div className="mt-auto flex flex-wrap gap-1.5">
                  {s.tags.map((t) => (
                    <span key={t} className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Tilt>
          </div>
        ))}
      </div>
    </section>
  );
}

function Process() {
  const [active, setActive] = useState(0);
  return (
    <section className="mx-auto max-w-6xl px-5 py-24">
      <Reveal className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Process</p>
        <h2 className="mt-2 text-4xl font-extrabold md:text-5xl">我的學習與實作方式</h2>
      </Reveal>
      <Reveal className="flex flex-col gap-3 md:h-80 md:flex-row">
        {process.map((p, i) => {
          const isActive = active === i;
          return (
            <Button
              variant="ghost"
              key={p.step}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              className={cn(
                "group relative flex h-auto whitespace-normal items-stretch overflow-hidden rounded-3xl border-[1.5px] border-ink p-6 text-left transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:flex-col md:justify-between",
                isActive ? "bg-gradient-fresh text-primary-foreground shadow-pop md:flex-[3]" : "bg-card text-foreground md:flex-1",
              )}
            >
              <div className="flex w-full items-center justify-between gap-4 md:items-start">
                <span className="font-display text-5xl font-extrabold opacity-90">{p.step}</span>
                <h3 className="text-2xl font-bold md:hidden">{p.title}</h3>
              </div>
              <div
                className={cn(
                  "hidden transition-all duration-500 md:block",
                  isActive ? "translate-y-0 opacity-100" : "translate-y-2 opacity-70",
                )}
              >
                <h3 className="text-2xl font-bold">{p.title}</h3>
                <p
                  className={cn(
                    "mt-2 max-w-sm leading-relaxed transition-opacity duration-500",
                    isActive ? "opacity-100" : "h-0 opacity-0",
                  )}
                >
                  {p.desc}
                </p>
              </div>
              {isActive && <p className="sr-only md:hidden">{p.desc}</p>}
            </Button>
          );
        })}
      </Reveal>
      <p className="mt-4 rounded-2xl bg-card/70 p-4 text-muted-foreground md:hidden">{process[active]?.desc}</p>
    </section>
  );
}

function SoftSkills() {
  const [picked, setPicked] = useState(0);
  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      <div className="grid gap-8 md:grid-cols-[1fr_1.2fr] md:items-center">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Soft skills</p>
          <h2 className="mt-2 text-4xl font-extrabold md:text-5xl">技能之外</h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {softSkills.map((s, i) => (
              <Button
                variant="ghost"
                key={s.name}
                onClick={() => setPicked(i)}
                className={cn(
                  "h-auto rounded-full border-[1.5px] border-ink px-5 py-2.5 font-semibold transition-all duration-200 hover:animate-wiggle",
                  picked === i ? "bg-accent text-accent-foreground shadow-pop" : "bg-card hover:bg-secondary",
                )}
              >
                {s.name}
              </Button>
            ))}
          </div>
        </Reveal>
        <Reveal delay={150}>
          <div className="relative overflow-hidden rounded-[2rem] border-[1.5px] border-ink bg-ink p-10 text-background shadow-pop-lg">
            <div aria-hidden className="absolute -right-10 -top-10 size-40 animate-blob bg-gradient-pop opacity-80" />
            <p key={picked} className="relative mt-4 animate-page-in text-3xl font-bold leading-snug">
              {softSkills[picked]?.desc}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
