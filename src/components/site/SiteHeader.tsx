import { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";
import { Magnetic } from "./interactions";

const NAV = [
  { to: "/", label: "個人資訊" },
  { to: "/skills", label: "個人專長" },
  { to: "/portfolio", label: "作品集" },
] as const;

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const active = Math.max(0, NAV.findIndex((n) => n.to === (pathname.replace(/\/$/, "") || "/")));
  const [hover, setHover] = useState<number | null>(null);
  const [pill, setPill] = useState({ left: 0, width: 0, ready: false });
  const refs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const place = () => {
      const el = refs.current[hover ?? active];
      if (el) setPill({ left: el.offsetLeft, width: el.offsetWidth, ready: true });
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [hover, active]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 md:top-5">
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full border-[1.5px] px-2 py-2 transition-all duration-300 ${
          scrolled ? "border-ink bg-card/85 shadow-pop backdrop-blur-md" : "border-transparent"
        }`}
      >
        <Link
          to="/"
          className="group flex items-center gap-2 rounded-full pl-1 pr-2 font-display font-bold"
          aria-label="回到首頁"
        >
          <span className="grid size-10 place-items-center rounded-full border-[1.5px] border-ink bg-gradient-fresh text-primary-foreground transition-transform duration-500 group-hover:rotate-[360deg]">
            {profile.initials}
          </span>
          <span className="hidden text-lg sm:inline">{profile.enName}</span>
        </Link>

        <nav
          className="relative flex items-center rounded-full border-[1.5px] border-ink bg-card p-1"
          onMouseLeave={() => setHover(null)}
        >
          <span
            aria-hidden
            className="absolute inset-y-1 rounded-full bg-accent transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ left: pill.left, width: pill.width, opacity: pill.ready ? 1 : 0 }}
          />
          {NAV.map((item, i) => (
            <Link
              key={item.to}
              to={item.to}
              ref={(el) => {
                refs.current[i] = el;
              }}
              onMouseEnter={() => setHover(i)}
              className={`relative z-10 rounded-full px-3 py-1.5 text-sm font-medium transition-colors sm:px-5 ${
                i === active ? "text-accent-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Magnetic className="hidden md:inline-block">
          <a
            href={`mailto:${profile.email}`}
            className="group flex items-center gap-1.5 rounded-full border-[1.5px] border-ink bg-ink px-5 py-2.5 text-sm font-semibold text-background transition-colors hover:bg-accent"
          >
            聯絡我
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
          </a>
        </Magnetic>
      </div>
    </header>
  );
}
