import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

const LINKS = [
  { label: "About", href: "#about", id: "about" },
  { label: "Milestones", href: "#journey", id: "journey" },
  { label: "Arsenal", href: "#toolkit", id: "toolkit" },
  { label: "Practice", href: "#experience", id: "experience" },
  { label: "Repositories", href: "#repos", id: "repos" },
  { label: "Credentials", href: "#certifications", id: "certifications" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);
  const lockRef = useRef<{ id: string; until: number } | null>(null);
  const idleTimer = useRef<number | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      if (menuOpen) setMenuOpen(false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768 && menuOpen) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [menuOpen]);

  // Close menu when clicking outside
  useEffect(() => {
    if (!menuOpen) return;
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [menuOpen]);

  const computeActive = () => {
    const ids = [...LINKS.map((l) => l.id), "contact"];
    const mid = window.innerHeight * 0.35;
    let bestId = "";
    let bestDist = Infinity;
    for (const id of ids) {
      const el = document.getElementById(id);
      if (!el) continue;
      const r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) continue;
      const dist = Math.abs(r.top - mid);
      if (dist < bestDist) {
        bestDist = dist;
        bestId = id;
      }
    }
    return bestId;
  };

  useEffect(() => {
    const onScroll = () => {
      const lock = lockRef.current;
      if (lock) {
        const el = document.getElementById(lock.id);
        if (el) {
          const r = el.getBoundingClientRect();
          const arrived = Math.abs(r.top) < 8;
          if (arrived || performance.now() > lock.until) {
            lockRef.current = null;
          } else {
            return;
          }
        } else {
          lockRef.current = null;
        }
      }
      if (idleTimer.current) window.clearTimeout(idleTimer.current);
      idleTimer.current = window.setTimeout(() => {
        const id = computeActive();
        if (id) setActive(id);
      }, 60);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (idleTimer.current) window.clearTimeout(idleTimer.current);
    };
  }, []);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    setActive(id);
    setMenuOpen(false);
    lockRef.current = { id, until: performance.now() + 1400 };
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    if (history.replaceState) history.replaceState(null, "", `#${id}`);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-md bg-samurai-black/60 border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1600px] items-center gap-4 px-4 md:px-10">
        <a href="/" className="flex shrink-0 items-center gap-3">
          <span className="font-display text-lg tracking-widest text-bright-steel">刀</span>
          <span className="hidden font-mono text-[10px] tracking-[0.4em] uppercase text-blade-silver sm:inline">
            Aravind Pyli
          </span>
        </a>

        {/* Desktop nav */}
        <nav
          className="hidden min-w-0 flex-1 items-center gap-5 overflow-x-auto scrollbar-none md:flex md:justify-center md:gap-8"
          style={{ scrollbarWidth: "none" }}
        >
          {LINKS.map((l) => {
            const isActive = active === l.id;
            return (
              <a
                key={l.label}
                href={l.href}
                onClick={(e) => handleNav(e, l.id)}
                aria-current={isActive ? "true" : undefined}
                className={`relative min-w-0 truncate font-mono text-[10px] tracking-[0.3em] uppercase transition-colors md:tracking-[0.4em] ${
                  isActive
                    ? "text-bright-steel"
                    : "text-muted-foreground hover:text-bright-steel"
                }`}
              >
                {l.label}
                <span
                  className={`pointer-events-none absolute -bottom-2 left-0 h-px bg-blood-red transition-all duration-300 ${
                    isActive ? "w-full opacity-100" : "w-0 opacity-0"
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Mobile menu toggle */}
        <div className="flex flex-1 items-center justify-end gap-3 md:hidden">
          <a
            href="#contact"
            onClick={(e) => handleNav(e, "contact")}
            className={`relative inline-flex items-center gap-2 border px-3 py-2 font-mono text-[10px] tracking-[0.3em] uppercase text-bright-steel transition-colors ${
              active === "contact"
                ? "border-blood-red"
                : "border-border hover:border-blade-silver"
            }`}
          >
            Contact
            <span className="h-px w-3 bg-bright-steel" />
          </a>
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((s) => !s)}
            className="grid h-10 w-10 place-items-center rounded-md border border-border text-bright-steel transition hover:border-blade-silver"
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        {/* Desktop contact CTA */}
        <a
          href="#contact"
          onClick={(e) => handleNav(e, "contact")}
          className={`hidden md:inline-flex shrink-0 items-center gap-2 border px-3 py-2 font-mono text-[10px] tracking-[0.3em] uppercase text-bright-steel transition-colors md:px-4 md:tracking-[0.4em] ${
            active === "contact"
              ? "border-blood-red"
              : "border-border hover:border-blade-silver"
          }`}
        >
          Contact
          <span className="h-px w-3 bg-bright-steel transition-all group-hover:w-5" />
        </a>
      </div>

      {/* Mobile dropdown */}
      <div
        ref={menuRef}
        id="mobile-menu"
        className={`md:hidden absolute left-0 right-0 top-full border-b border-border backdrop-blur-xl bg-samurai-black/95 transition-all duration-300 ${
          menuOpen
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-2 opacity-0 pointer-events-none"
        }`}
      >
        <nav className="mx-auto flex max-w-[1600px] flex-col px-4 py-4">
          {LINKS.map((l) => {
            const isActive = active === l.id;
            return (
              <a
                key={l.label}
                href={l.href}
                onClick={(e) => handleNav(e, l.id)}
                aria-current={isActive ? "true" : undefined}
                className={`flex items-center justify-between py-4 font-mono text-xs tracking-[0.35em] uppercase transition-colors border-b border-border/40 last:border-0 ${
                  isActive
                    ? "text-bright-steel"
                    : "text-muted-foreground hover:text-bright-steel"
                }`}
              >
                <span>{l.label}</span>
                {isActive && (
                  <span className="h-1.5 w-1.5 rounded-full bg-blood-red" />
                )}
              </a>
            );
          })}
          <a
            href="#contact"
            onClick={(e) => handleNav(e, "contact")}
            className={`mt-2 inline-flex items-center justify-center gap-2 border px-4 py-3 font-mono text-xs tracking-[0.35em] uppercase text-bright-steel transition-colors ${
              active === "contact"
                ? "border-blood-red"
                : "border-border hover:border-blade-silver"
            }`}
          >
            Contact
            <span className="h-px w-3 bg-bright-steel" />
          </a>
        </nav>
      </div>
    </header>
  );
}
