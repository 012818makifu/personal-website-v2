import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ChevronDown, Globe, MapPin, Sparkles } from "lucide-react";
import portrait from "@/assets/portrait.jpg";
import { Button } from "@/components/ui/button";
import { CopyEmail } from "@/components/site/CopyEmail";
import { EducationFields } from "@/components/site/EducationFields";
import { Counter, Magnetic, Reveal, Tilt, TypeRotator } from "@/components/site/interactions";
import { profile, timeline, siteCopy } from "@/data/profile";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "個人資訊｜高湘芸" },
      { name: "description", content: "認識我：學習經歷、商業分析與程式作品，為整理經歷以及作品所寫的個人網站。" },
      { property: "og:title", content: "個人資訊｜高湘芸" },
      { property: "og:description", content: "認識我：學習經歷、商業分析與程式作品，為整理經歷以及作品所寫的個人網站。" },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <Hero />
      <p className="mx-auto max-w-6xl px-5 text-sm text-muted-foreground">{profile.exampleNotice}</p>
      <Stats />
      <EducationFields />
      <AboutBento />
      <Keywords />
      <Timeline />
    </>
  );
}

function Hero() {
  return (
    <section className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pb-16 pt-32 md:grid-cols-[1.15fr_1fr] md:pt-40">
      <div>
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-ink bg-card px-4 py-1.5 text-sm font-medium">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex size-2.5 rounded-full bg-primary" />
            </span>
            {profile.status}
          </span>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="mt-6 text-5xl font-extrabold leading-[1.05] md:text-7xl">
            嗨，我是
            <br />
            <span className="text-gradient">{profile.name}</span>
          </h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-5 flex min-h-[2.5rem] items-center gap-2 font-display text-2xl font-bold md:text-3xl">
            <span className="text-muted-foreground">一位</span>
            <TypeRotator words={profile.roles} className="flex" />
          </p>
        </Reveal>
        <Reveal delay={300}>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">{profile.intro}</p>
          <p className="mt-3 text-sm font-semibold">{profile.education}</p>
        </Reveal>
        <Reveal delay={400} className="mt-8 flex flex-wrap gap-3">
          <Magnetic>
            <Button asChild variant="pop" size="xl">
              <Link to="/portfolio">
                看看作品 <ArrowRight />
              </Link>
            </Button>
          </Magnetic>
          <Magnetic>
            <Button asChild variant="soft" size="xl">
              <Link to="/skills">我的專長</Link>
            </Button>
          </Magnetic>
        </Reveal>
      </div>

      <Reveal delay={200} className="relative mx-auto w-full max-w-sm">
        <div aria-hidden className="absolute -inset-6 animate-blob bg-gradient-zest opacity-80" />
        <Tilt max={10} className="rounded-[2rem]">
          <div className="relative overflow-hidden rounded-[2rem] border-[1.5px] border-ink bg-card shadow-pop-lg">
            <img
              src={portrait}
              alt={`${profile.name} 的個人照`}
              width={896}
              height={1152}
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
        </Tilt>
        <RotatingBadge />
        <div className="absolute -left-6 bottom-10 animate-float rounded-2xl border-[1.5px] border-ink bg-card px-4 py-3 shadow-pop">
          <p className="text-xs text-muted-foreground">目前在</p>
          <p className="flex items-center gap-1 font-bold">
            <MapPin className="size-4 text-primary" />
            {profile.location}
          </p>
        </div>
      </Reveal>

      <a
        href="#about"
        className="absolute bottom-0 left-1/2 hidden -translate-x-1/2 animate-bounce text-muted-foreground md:block"
        aria-label="往下看更多"
      >
        <ChevronDown />
      </a>
    </section>
  );
}

function RotatingBadge() {
  return (
    <div className="absolute -right-5 -top-5 grid size-28 place-items-center rounded-full border-[1.5px] border-ink bg-accent shadow-pop">
      <svg viewBox="0 0 100 100" className="absolute inset-0 size-full animate-spin-slow">
        <defs>
          <path id="circle" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
        </defs>
        <text className="fill-accent-foreground font-display text-[11px] font-bold uppercase tracking-[0.2em]">
          <textPath href="#circle">Open to work • Hire me •</textPath>
        </text>
      </svg>
      <Sparkles className="size-7 text-accent-foreground" />
    </div>
  );
}

function Stats() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-10">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {profile.stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 90}>
            <div className="pop-card p-6 text-center">
              <p className="font-display text-4xl font-extrabold text-primary md:text-5xl">
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <Reveal className="mb-10">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">{eyebrow}</p>
      <h2 className="mt-2 text-4xl font-extrabold md:text-5xl">{title}</h2>
    </Reveal>
  );
}

function AboutBento() {
  const info = [
    { icon: MapPin, label: "所在地", value: profile.location },
    { icon: Globe, label: "語言", value: profile.languages },
  ];
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-28 px-5 py-20">
      <SectionTitle eyebrow="About me" title="關於我" />
      <div className="grid gap-4 md:grid-cols-3">
        <Reveal className="md:col-span-2 md:row-span-2">
          <div className="pop-card relative h-full overflow-hidden p-8">
            <div aria-hidden className="absolute -bottom-16 -right-16 size-56 rounded-full bg-mint" />
            <p className="relative text-xl leading-loose md:text-2xl">{profile.about}</p>
            <div className="relative mt-8">
              <CopyEmail variant="ink" size="lg" />
            </div>
          </div>
        </Reveal>
        {info.map((item, i) => (
          <Reveal key={item.label} delay={i * 80}>
            <div className="pop-card group flex h-full items-start gap-4 p-6">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl border-[1.5px] border-ink bg-secondary transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110">
                <item.icon className="size-5" />
              </span>
              <div className="min-w-0">
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <p className="break-words font-semibold">{item.value}</p>
              </div>
            </div>
          </Reveal>
        ))}
        <Reveal className="md:col-span-3" delay={100}>
          <div className="pop-card p-6">
            <p className="mb-4 text-sm text-muted-foreground">{siteCopy.interests}</p>
            <div className="flex flex-wrap gap-2">
              {profile.interests.map((it) => (
                <span
                  key={it}
                  className="cursor-default rounded-full border-[1.5px] border-ink bg-background px-4 py-2 text-sm font-medium transition-all duration-200 hover:-translate-y-1 hover:rotate-[-4deg] hover:bg-accent"
                >
                  {it}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const toneClass = { mint: "bg-mint", sky: "bg-sky", lime: "bg-accent" } as const;

function Keywords() {
  const [flipped, setFlipped] = useState<number | null>(null);
  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <SectionTitle eyebrow="Keywords" title="三個形容我的詞" />
      <p className="-mt-6 mb-8 text-muted-foreground">把滑鼠移上去或點一下卡片，翻面看看 👀</p>
      <div className="grid gap-5 md:grid-cols-3">
        {profile.keywords.map((k, i) => (
          <Reveal key={k.front} delay={i * 120}>
            <button
              type="button"
              onClick={() => setFlipped(flipped === i ? null : i)}
              className="group block h-64 w-full cursor-pointer text-left [perspective:1200px]"
              aria-pressed={flipped === i}
            >
              <div
                data-flipped={flipped === i}
                className="relative size-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] preserve-3d group-hover:[transform:rotateY(180deg)] data-[flipped=true]:[transform:rotateY(180deg)]"
              >
                <div
                  className={cn(
                    "absolute inset-0 flex flex-col justify-between rounded-3xl border-[1.5px] border-ink p-7 shadow-pop backface-hidden",
                    toneClass[k.tone],
                  )}
                >
                  <span className="font-display text-lg font-bold">0{i + 1}</span>
                  <span className="text-6xl font-black">{k.front}</span>
                </div>
                <div className="absolute inset-0 flex items-center rounded-3xl border-[1.5px] border-ink bg-ink p-7 text-lg leading-relaxed text-background shadow-pop backface-hidden [transform:rotateY(180deg)]">
                  {k.back}
                </div>
              </div>
            </button>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Timeline() {
  const tabs = Object.keys(timeline) as (keyof typeof timeline)[];
  const [tab, setTab] = useState<keyof typeof timeline>("經歷");
  const [open, setOpen] = useState(0);
  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionTitle eyebrow="Journey" title="一路走來" />
        <Reveal className="mb-10 inline-flex rounded-full border-[1.5px] border-ink bg-card p-1">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => {
                setTab(t);
                setOpen(0);
              }}
              className={cn(
                "rounded-full px-6 py-2 text-sm font-semibold transition-all duration-300",
                tab === t ? "bg-ink text-background" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {t}
            </button>
          ))}
        </Reveal>
      </div>

      <ol key={tab} className="relative space-y-4 border-l-2 border-dashed border-ink/30 pl-6 md:pl-10">
        {timeline[tab].map((item, i) => {
          const isOpen = open === i;
          return (
            <li key={item.title} className="relative animate-page-in" style={{ animationDelay: `${i * 90}ms` }}>
              <span
                className={cn(
                  "absolute -left-[33px] top-6 size-4 rounded-full border-[1.5px] border-ink transition-colors md:-left-[49px]",
                  isOpen ? "bg-accent" : "bg-card",
                )}
              />
              <button
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                className={cn(
                  "w-full rounded-3xl border-[1.5px] border-ink p-6 text-left transition-all duration-300",
                  isOpen ? "bg-card shadow-pop" : "bg-card/60 hover:bg-card",
                )}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-primary">{item.period}</p>
                    <h3 className="mt-1 text-xl font-bold md:text-2xl">{item.title}</h3>
                    <p className="text-muted-foreground">{item.org}</p>
                  </div>
                  <span
                    className={cn(
                      "grid size-10 place-items-center rounded-full border-[1.5px] border-ink transition-all duration-300",
                      isOpen ? "rotate-180 bg-accent" : "bg-background",
                    )}
                  >
                    <ChevronDown className="size-5" />
                  </span>
                </div>
                <div
                  className={cn(
                    "grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="pt-4 leading-relaxed text-muted-foreground">{item.detail}</p>
                  </div>
                </div>
              </button>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
