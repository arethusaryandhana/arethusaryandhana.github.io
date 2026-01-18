import { useEffect, useMemo, useRef, useState } from "react";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTheme } from "./hooks/useTheme";

type SectionKey =
  | "top"
  | "projects"
  | "experience"
  | "skills"
  | "certificates"
  | "education"
  | "contact"
  | "social";

type SectionDef = {
  key: SectionKey;
  path: string;
  id: string;
  label: string;
  title: string;
};

const sections: SectionDef[] = [
  {
    key: "top",
    path: "/",
    id: "top",
    label: "Home",
    title: "Arethusa Aryandhana | Full‑Stack Developer",
  },
  {
    key: "projects",
    path: "/projects",
    id: "projects",
    label: "Projects",
    title: "Projects | Arethusa Aryandhana",
  },
  {
    key: "experience",
    path: "/experience",
    id: "experience",
    label: "Experience",
    title: "Experience | Arethusa Aryandhana",
  },
  {
    key: "skills",
    path: "/skills",
    id: "skills",
    label: "Skills",
    title: "Skills | Arethusa Aryandhana",
  },
  {
    key: "certificates",
    path: "/certificates",
    id: "certificates",
    label: "Certificates",
    title: "Certificates | Arethusa Aryandhana",
  },
  {
    key: "education",
    path: "/education",
    id: "education",
    label: "Education",
    title: "Education | Arethusa Aryandhana",
  },
  {
    key: "contact",
    path: "/contact-person",
    id: "contact",
    label: "Contact",
    title: "Contact | Arethusa Aryandhana",
  },
  {
    key: "social",
    path: "/social-media",
    id: "social",
    label: "Social",
    title: "Social | Arethusa Aryandhana",
  },
];

const byPath = new Map(sections.map((s) => [s.path, s]));

function useActiveSection({ rootId }: { rootId: string }) {
  const location = useLocation();
  const [activeId, setActiveId] = useState<string>(
    () => (byPath.get(location.pathname) ?? byPath.get("/"))!.id,
  );

  // Track if we're programmatically scrolling (from navigation click)
  const isNavigatingRef = useRef(false);

  // Handle route changes (from navigation clicks or browser back/forward)
  useEffect(() => {
    const def = byPath.get(location.pathname) ?? byPath.get("/");
    if (!def) return;

    document.title = def.title;
    setActiveId(def.id);

    const el = document.getElementById(def.id);
    if (!el) return;

    // Scroll to the section smoothly
    isNavigatingRef.current = true;
    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    // Reset the flag after scroll animation completes
    const timeout = window.setTimeout(() => {
      isNavigatingRef.current = false;
    }, 1000);

    return () => window.clearTimeout(timeout);
  }, [location.pathname]);

  // Track active section during manual scroll
  useEffect(() => {
    const root = document.getElementById(rootId);
    if (!root) return;

    let rafId: number;
    let lastScrollTime = 0;

    const handleScroll = () => {
      // Skip if we're currently navigating programmatically
      if (isNavigatingRef.current) return;

      const now = Date.now();
      // Throttle to every 100ms
      if (now - lastScrollTime < 100) return;
      lastScrollTime = now;

      // Cancel any pending animation frame
      if (rafId) cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        const scrollTop = root.scrollTop;
        const viewportHeight = root.clientHeight;
        const scrollCenter = scrollTop + viewportHeight / 2;

        // Find which section is currently in view
        let currentSection: SectionDef | null = null;
        let minDistance = Infinity;

        for (const section of sections) {
          const el = document.getElementById(section.id);
          if (!el) continue;

          const rect = el.getBoundingClientRect();
          const elTop = rect.top + scrollTop;
          const elCenter = elTop + rect.height / 2;
          const distance = Math.abs(scrollCenter - elCenter);

          if (distance < minDistance) {
            minDistance = distance;
            currentSection = section;
          }
        }

        if (currentSection && currentSection.id !== activeId) {
          setActiveId(currentSection.id);
        }
      });
    };

    root.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      root.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [rootId, activeId]);

  return { activeId };
}

function Header({ activeId }: { activeId: string }) {
  const { mode, resolvedMode, setMode } = useTheme();

  function cycleTheme() {
    const next =
      mode === "system" ? "light" : mode === "light" ? "dark" : "system";
    setMode(next);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-zinc-200/70 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-zinc-950/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-accent-500" />
          <span className="text-sm font-semibold tracking-wide text-zinc-900 dark:text-zinc-100">
            Arethusa
          </span>
        </Link>

        <nav className="hidden items-center gap-4 text-sm text-zinc-700 sm:flex dark:text-zinc-200">
          {sections
            .filter((s) => s.id !== "top")
            .slice(0, 4)
            .map((s) => (
              <Link
                key={s.id}
                to={s.path}
                className={
                  activeId === s.id
                    ? "text-zinc-950 dark:text-white"
                    : "hover:text-zinc-950 dark:hover:text-white"
                }
              >
                {s.label}
              </Link>
            ))}
        </nav>

        <button
          type="button"
          onClick={cycleTheme}
          className="rounded-lg border border-zinc-200/70 bg-white/70 px-3 py-1.5 text-xs font-medium text-zinc-900 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500 dark:border-white/10 dark:bg-white/5 dark:text-zinc-100 dark:hover:bg-white/10"
          aria-label="Toggle theme"
          title={`Theme: ${mode} (resolved: ${resolvedMode})`}
        >
          {resolvedMode === "dark" ? "Dark" : "Light"}
        </button>
      </div>
    </header>
  );
}

function SectionShell({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const reduced = useReducedMotion();

  return (
    <section id={id} className="snap-start min-h-dvh px-4 pb-16 pt-24">
      <div className="mx-auto flex min-h-[calc(100dvh-6rem-4rem)] max-w-6xl items-center">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 22, filter: "blur(6px)" }}
          whileInView={
            reduced
              ? undefined
              : {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                }
          }
          viewport={{ once: false, amount: 0.7 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="w-full"
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-zinc-200/70 bg-white/70 px-3 py-1 text-xs text-zinc-700 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200">
      {children}
    </span>
  );
}

function MinimalGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4 md:grid-cols-3">{children}</div>;
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-zinc-200/70 bg-white/70 p-5 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-zinc-300 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20 dark:hover:bg-white/10">
      {children}
    </div>
  );
}

function HomePage() {
  const reduced = useReducedMotion();
  const { activeId } = useActiveSection({ rootId: "scroll-root" });

  const socials = useMemo(
    () => [
      { label: "GitHub", href: "https://github.com/arethusaryandhana" },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/arethusa-aryandhana/",
      },
      { label: "Email", href: "mailto:ryan.arethusa@gmail.com" },
    ],
    [],
  );

  const projects = useMemo(
    () => [
      {
        name: "StackForge",
        tech: ["React", "Node"],
        repo: "https://github.com/arethusaryandhana/stackforge",
        live: "https://stackforge.example.com",
      },
      {
        name: "Orderly POS",
        tech: ["React", "Redis"],
        repo: "https://github.com/arethusaryandhana/orderly-pos",
        live: "https://orderly.example.com",
      },
      {
        name: "API Sentinel",
        tech: ["Node", "Postgres"],
        repo: "https://github.com/arethusaryandhana/api-sentinel",
        live: "https://sentinel.example.com",
      },
    ],
    [],
  );

  const experience = useMemo(
    () => [
      { role: "Full‑Stack", company: "TechNova", period: "2024—Now" },
      { role: "Backend", company: "CloudWorks", period: "2022—2024" },
      { role: "Frontend", company: "PixelCraft", period: "2021—2022" },
    ],
    [],
  );

  const certificates = useMemo(
    () => [
      {
        title: "Full‑Stack Web Dev",
        issuer: "Coursera",
        year: "2024",
        href: "https://example.com/cert-1",
      },
      {
        title: "Cloud Fundamentals",
        issuer: "GCP",
        year: "2023",
        href: "https://example.com/cert-2",
      },
      {
        title: "System Design",
        issuer: "Udemy",
        year: "2022",
        href: "https://example.com/cert-3",
      },
    ],
    [],
  );

  return (
    <div className="bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <a
        href="#projects"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 rounded-md bg-accent-500 px-3 py-2 text-sm font-semibold text-zinc-950"
      >
        Skip
      </a>

      <Header activeId={activeId} />

      <main
        id="scroll-root"
        className="h-dvh snap-y snap-mandatory overflow-y-auto overscroll-contain"
        style={{ scrollBehavior: "smooth" }}
      >
        <SectionShell id="top">
          <div className="grid items-center gap-10 md:grid-cols-[1.2fr_0.8fr]">
            <div>
              <Pill>Full‑Stack Developer</Pill>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
                Arethusa Aryandhana
              </h1>

              <div className="mt-5 flex flex-wrap gap-2">
                <Pill>React</Pill>
                <Pill>Node</Pill>
                <Pill>Postgres</Pill>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/projects"
                  className="rounded-xl bg-accent-500 px-5 py-2.5 text-sm font-semibold text-zinc-950 hover:bg-accent-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
                >
                  Projects
                </Link>
                <Link
                  to="/contact-person"
                  className="rounded-xl border border-zinc-200/70 bg-white/70 px-5 py-2.5 text-sm font-medium text-zinc-900 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500 dark:border-white/10 dark:bg-white/5 dark:text-zinc-100 dark:hover:bg-white/10"
                >
                  Contact
                </Link>
              </div>
            </div>

            <motion.div
              initial={reduced ? false : { opacity: 0, scale: 0.98 }}
              animate={reduced ? undefined : { opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex justify-center md:justify-end"
            >
              <div className="relative">
                <div className="absolute -inset-10 rounded-full bg-accent-500/10 blur-3xl" />
                <img
                  src="/avatar.jpg"
                  alt="Arethusa Aryandhana"
                  className="relative h-48 w-48 rounded-full border border-zinc-200/70 object-cover shadow-xl dark:border-white/10"
                />
              </div>
            </motion.div>
          </div>
        </SectionShell>

        <SectionShell id="projects">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Projects</h2>
            <div className="mt-6">
              <MinimalGrid>
                {projects.map((p) => (
                  <Card key={p.name}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="text-sm font-semibold">{p.name}</div>
                      <div className="flex gap-2 text-xs">
                        <a
                          className="text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white"
                          href={p.repo}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Repo
                        </a>
                        <a
                          className="text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white"
                          href={p.live}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Live
                        </a>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.tech.map((t) => (
                        <Pill key={t}>{t}</Pill>
                      ))}
                    </div>
                  </Card>
                ))}
              </MinimalGrid>
            </div>
          </div>
        </SectionShell>

        <SectionShell id="experience">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">
              Experience
            </h2>
            <div className="mt-6 grid gap-4">
              {experience.map((e) => (
                <Card key={`${e.role}-${e.company}`}>
                  <div className="flex items-baseline justify-between gap-3">
                    <div className="text-sm font-semibold">{e.role}</div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">
                      {e.period}
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-zinc-700 dark:text-zinc-200">
                    {e.company}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </SectionShell>

        <SectionShell id="skills">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Skills</h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {["React", "TypeScript", "Node.js", "PostgreSQL", "Docker"].map(
                (t) => (
                  <Pill key={t}>{t}</Pill>
                ),
              )}
            </div>
          </div>
        </SectionShell>

        <SectionShell id="certificates">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">
              Certificates
            </h2>
            <div className="mt-6">
              <MinimalGrid>
                {certificates.map((c) => (
                  <a
                    key={c.title}
                    href={c.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Card>
                      <div className="text-sm font-semibold">{c.title}</div>
                      <div className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                        {c.issuer} · {c.year}
                      </div>
                    </Card>
                  </a>
                ))}
              </MinimalGrid>
            </div>
          </div>
        </SectionShell>

        <SectionShell id="education">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Education</h2>
            <div className="mt-6 max-w-xl">
              <Card>
                <div className="text-sm font-semibold">
                  B.Sc. Computer Science
                </div>
                <div className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                  Example University · 2019—2023
                </div>
              </Card>
            </div>
          </div>
        </SectionShell>

        <SectionShell id="contact">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Contact</h2>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="mailto:ryan.arethusa@gmail.com"
                className="rounded-xl border border-zinc-200/70 bg-white/70 px-5 py-2.5 text-sm font-semibold text-zinc-900 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-zinc-100 dark:hover:bg-white/10"
              >
                ryan.arethusa@gmail.com
              </a>
              <CopyEmailButton email="ryan.arethusa@gmail.com" />
            </div>
          </div>
        </SectionShell>

        <SectionShell id="social">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Social</h2>
            <div className="mt-6">
              <MinimalGrid>
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={
                      s.href.startsWith("mailto:") ? undefined : "noreferrer"
                    }
                  >
                    <Card>
                      <div className="text-sm font-semibold">{s.label}</div>
                      <div className="mt-2 break-all text-xs text-zinc-500 dark:text-zinc-400">
                        {s.href}
                      </div>
                    </Card>
                  </a>
                ))}
              </MinimalGrid>
            </div>

            <div className="mt-10 text-xs text-zinc-500">
              © {new Date().getFullYear()} Arethusa
            </div>
          </div>
        </SectionShell>
      </main>
    </div>
  );
}

function CopyEmailButton({ email }: { email: string }) {
  const [state, setState] = useState<"idle" | "copied" | "error">("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
      window.setTimeout(() => setState("idle"), 1200);
    } catch {
      setState("error");
      window.setTimeout(() => setState("idle"), 1200);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="rounded-xl border border-zinc-200/70 bg-white/70 px-5 py-2.5 text-sm font-medium text-zinc-900 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500 dark:border-white/10 dark:bg-white/5 dark:text-zinc-100 dark:hover:bg-white/10"
    >
      {state === "idle" ? "Copy" : state === "copied" ? "Copied" : "Failed"}
    </button>
  );
}

function NotFoundRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/", { replace: true });
  }, [navigate]);

  return null;
}

export default function App() {
  const location = useLocation();
  const reduced = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={reduced ? false : { opacity: 0 }}
        animate={reduced ? undefined : { opacity: 1 }}
        exit={reduced ? undefined : { opacity: 0 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      >
        <Routes location={location}>
          <Route path="/*" element={<HomePage />} />
          <Route path="*" element={<NotFoundRedirect />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}
