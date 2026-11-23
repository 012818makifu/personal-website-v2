import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";
import { CopyEmail } from "./CopyEmail";
import { Reveal } from "./interactions";

export function SiteFooter() {
  return (
    <footer className="relative z-10 px-4 pb-6 pt-24">
      <Reveal className="mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] border-[1.5px] border-ink bg-ink p-8 text-background md:p-14">
        <div className="relative">
          <div aria-hidden className="absolute -right-24 -top-24 size-72 animate-blob bg-gradient-pop opacity-70 blur-2xl" />
          <p className="relative text-sm uppercase tracking-[0.3em] text-accent">{profile.footer.eyebrow}</p>
          <h2 className="relative mt-4 max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
            {profile.footer.title}
          </h2>
          <p className="relative mt-4 text-background/70">{profile.footer.description}</p>
          <div className="relative mt-8 flex flex-wrap items-center gap-3">
            <CopyEmail variant="pop" />
          </div>
          <div className="relative mt-12 flex flex-col justify-between gap-6 border-t border-background/15 pt-6 text-sm md:flex-row md:items-center">
            <div className="flex flex-wrap gap-2">
              {profile.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-1 rounded-full border border-background/25 px-4 py-2 transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground"
                >
                  {s.label}
                  <ArrowUpRight className="size-3.5 transition-transform group-hover:rotate-45" />
                </a>
              ))}
            </div>
            <p className="text-background/60">
              © {new Date().getFullYear()} {profile.name} {profile.enName}
            </p>
          </div>
        </div>
      </Reveal>
    </footer>
  );
}
