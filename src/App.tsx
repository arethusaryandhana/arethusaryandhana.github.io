import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ComponentType,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTheme } from "./hooks/useTheme";
import {
  techIcons,
  socialIcons,
  CodeIcon,
  BriefcaseIcon,
  SkillsIcon,
  CertificateIcon,
  GraduationIcon,
  ContactIcon,
  SocialIcon,
  ExternalLinkIcon,
} from "./icons";

type SectionKey =
  | "top"
  | "projects"
  | "experience"
  | "skills"
  | "certificates"
  | "education"
  | "contact"
  | "social";

type IconProps = {
  className?: string;
  size?: number;
};

type SectionDef = {
  key: SectionKey;
  path: string;
  id: string;
  label: string;
  title: string;
  fileName: string;
  summary: string;
  command: string;
  icon: ComponentType<IconProps>;
};

const sections: SectionDef[] = [
  {
    key: "top",
    path: "/",
    id: "top",
    label: "Home",
    title: "Arethusa Aryandhana | Full-Stack Developer",
    fileName: "intro.tsx",
    summary: "Boot sequence and profile overview",
    command: "npx arethusa --intro --live",
    icon: CodeIcon,
  },
  {
    key: "projects",
    path: "/projects",
    id: "projects",
    label: "Projects",
    title: "Projects | Arethusa Aryandhana",
    fileName: "projects.ts",
    summary: "Selected builds and shipped work",
    command: "ls ./projects --featured --interactive",
    icon: CodeIcon,
  },
  {
    key: "experience",
    path: "/experience",
    id: "experience",
    label: "Experience",
    title: "Experience | Arethusa Aryandhana",
    fileName: "experience.log",
    summary: "Professional timeline and roles",
    command: "cat experience.log | tail -n 5",
    icon: BriefcaseIcon,
  },
  {
    key: "skills",
    path: "/skills",
    id: "skills",
    label: "Skills",
    title: "Skills | Arethusa Aryandhana",
    fileName: "stack.json",
    summary: "Core engineering toolkit",
    command: "parse stack.json --grouped --visual",
    icon: SkillsIcon,
  },
  {
    key: "certificates",
    path: "/certificates",
    id: "certificates",
    label: "Certificates",
    title: "Certificates | Arethusa Aryandhana",
    fileName: "certifications.md",
    summary: "Verified learning records",
    command: "open certifications.md --verified",
    icon: CertificateIcon,
  },
  {
    key: "education",
    path: "/education",
    id: "education",
    label: "Education",
    title: "Education | Arethusa Aryandhana",
    fileName: "education.yml",
    summary: "Academic background",
    command: "cat education.yml --timeline",
    icon: GraduationIcon,
  },
  {
    key: "contact",
    path: "/contact-person",
    id: "contact",
    label: "Contact",
    title: "Contact | Arethusa Aryandhana",
    fileName: "contact.sh",
    summary: "Primary contact channel",
    command: "./contact.sh --open --collab",
    icon: ContactIcon,
  },
  {
    key: "social",
    path: "/social-media",
    id: "social",
    label: "Social",
    title: "Social | Arethusa Aryandhana",
    fileName: "links.env",
    summary: "Public profiles and network",
    command: "source links.env --public",
    icon: SocialIcon,
  },
];

const byPath = new Map(sections.map((section) => [section.path, section]));

const projects = [
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
];

const experience = [
  {
    role: "Middleware, DB & API Tech",
    company: "PT. Meratus Line",
    period: "Jun 2024 - Now",
  },
  {
    role: "Business Solution Software Developer",
    company: "PT. Meratus Line",
    period: "Jul 2023 - May 2024",
  },
  {
    role: "IT Developer Supervisor",
    company: "PT. Graha Multi Bintang",
    period: "Jan 2023 - Jun 2023",
  },
  {
    role: "Senior Full Stack Programmer",
    company: "PT. Graha Multi Bintang",
    period: "Oct 2021 - Jan 2023",
  },
  {
    role: "Backend Software Developer",
    company: "PT. SMART IT",
    period: "Dec 2019 - Mar 2021",
  },
];

const certificates = [
  {
    title: "Test Driven Development (TDD) for .NET",
    issuer: "ExecuTrain of Jakarta",
    year: "2024",
    href: "https://executrain.id/verify/result.php?code=50-0724-C-000753",
  },
  {
    title: "Security Dashboard",
    issuer: "CAST",
    year: "2025",
    href: "https://castsoftware.360learning.com/api/certification/5348366530447693/file.pdf",
  },
  {
    title: "Health Dashboard",
    issuer: "CAST",
    year: "2025",
    href: "https://castsoftware.360learning.com/api/certification/7932858974648840/file.pdf",
  },
  {
    title: "Engineering Dashboard",
    issuer: "CAST",
    year: "2025",
    href: "https://castsoftware.360learning.com/api/certification/7257159805310887/file.pdf",
  },
  {
    title: "CAST Highlight Foundation Certificate",
    issuer: "CAST",
    year: "2025",
    href: "https://castsoftware.360learning.com/api/certification/4166135992262663/file.pdf",
  },
];

const socials = [
  { label: "GitHub", href: "https://github.com/arethusaryandhana" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/arethusa-aryandhana/",
  },
  { label: "Email", href: "mailto:ryan.arethusa@gmail.com" },
];

const overviewStats = [
  { label: "Experience roles", value: `0${experience.length}`.slice(-2) },
  { label: "Core stack items", value: "20" },
  { label: "Certificates", value: `0${certificates.length}`.slice(-2) },
];

const skillGroups = [
  {
    label: "Frontend",
    items: ["React", "Vue.js", "TypeScript"],
  },
  {
    label: "Backend",
    items: ["Node.js", "PHP", "Laravel", ".NET", "Golang"],
  },
  {
    label: "Data",
    items: ["PostgreSQL", "MySQL", "SQL Server", "MongoDB", "Redis", "CDC", "Pentaho"],
  },
  {
    label: "Platform",
    items: ["Docker", "Kubernetes", "Kafka", "WebSocket", "MinIO"],
  },
];

const typewriterLines = [
  "shipping dependable backend systems",
  "designing APIs and middleware flows",
  "turning business workflows into clean interfaces",
];

const liveSignals = [
  { label: "api-architecture", value: 92, tone: "cyan" },
  { label: "middleware-sync", value: 88, tone: "violet" },
  { label: "delivery-focus", value: 96, tone: "lime" },
] as const;

function updatePointerGlow(event: ReactPointerEvent<HTMLElement>) {
  const rect = event.currentTarget.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  event.currentTarget.style.setProperty("--pointer-x", `${x}px`);
  event.currentTarget.style.setProperty("--pointer-y", `${y}px`);
}

function useActiveSection() {
  const location = useLocation();
  const [activeId, setActiveId] = useState<string>(
    () => (byPath.get(location.pathname) ?? byPath.get("/"))!.id,
  );
  const isNavigatingRef = useRef(false);

  useEffect(() => {
    const def = byPath.get(location.pathname) ?? byPath.get("/");
    if (!def) return;

    document.title = def.title;
    setActiveId(def.id);

    const el = document.getElementById(def.id);
    if (!el) return;

    isNavigatingRef.current = true;
    el.scrollIntoView({ behavior: "smooth", block: "start" });

    const timeout = window.setTimeout(() => {
      isNavigatingRef.current = false;
    }, 700);

    return () => window.clearTimeout(timeout);
  }, [location.pathname]);

  useEffect(() => {
    let rafId = 0;
    let lastScrollTime = 0;

    const handleScroll = () => {
      if (isNavigatingRef.current) return;

      const now = Date.now();
      if (now - lastScrollTime < 100) return;
      lastScrollTime = now;

      if (rafId) cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        const viewportHeight = window.innerHeight;
        const viewCenter = viewportHeight / 2;

        let currentSection: SectionDef | null = null;
        let minDistance = Number.POSITIVE_INFINITY;

        for (const section of sections) {
          const el = document.getElementById(section.id);
          if (!el) continue;

          const rect = el.getBoundingClientRect();
          const distance = Math.abs(viewCenter - (rect.top + rect.height / 2));

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

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [activeId]);

  return { activeId };
}

function TypewriterText({ items }: { items: string[] }) {
  const [lineIndex, setLineIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = items[lineIndex];
    const step = isDeleting ? 22 : 42;

    const timeout = window.setTimeout(() => {
      if (!isDeleting && displayed.length < current.length) {
        setDisplayed(current.slice(0, displayed.length + 1));
        return;
      }

      if (!isDeleting && displayed.length === current.length) {
        setIsDeleting(true);
        return;
      }

      if (isDeleting && displayed.length > 0) {
        setDisplayed(current.slice(0, displayed.length - 1));
        return;
      }

      setIsDeleting(false);
      setLineIndex((prev) => (prev + 1) % items.length);
    }, displayed.length === current.length && !isDeleting ? 1200 : step);

    return () => window.clearTimeout(timeout);
  }, [displayed, isDeleting, items, lineIndex]);

  return (
    <div className="typewriter-line mono-label text-sm text-[color:var(--text-soft)] sm:text-base">
      <span className="text-[color:var(--accent-cyan)]">&gt;</span> {displayed}
      <span className="command-caret" />
    </div>
  );
}

function WindowControls() {
  return (
    <div className="flex items-center gap-2">
      <span className="window-dot bg-[#ff5f57]" />
      <span className="window-dot bg-[#febc2e]" />
      <span className="window-dot bg-[#28c840]" />
    </div>
  );
}

function ThemeButton() {
  const { mode, resolvedMode, setMode } = useTheme();

  function cycleTheme() {
    const next =
      mode === "system" ? "light" : mode === "light" ? "dark" : "system";
    setMode(next);
  }

  return (
    <button
      type="button"
      onClick={cycleTheme}
      className="editor-button mono-label text-xs"
      aria-label="Toggle theme"
      title={`Theme: ${mode} (resolved: ${resolvedMode})`}
    >
      {resolvedMode === "dark" ? "dark-ui" : "light-ui"}
    </button>
  );
}

function GlassCard({
  children,
  className = "",
  hover = true,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      onPointerMove={updatePointerGlow}
      whileHover={hover && !reduced ? { y: -6, scale: 1.01 } : undefined}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className={`glass-card ${className}`}
    >
      {children}
    </motion.div>
  );
}

function CommandLine({
  children,
  vibrant = false,
}: {
  children: ReactNode;
  vibrant?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 overflow-hidden text-xs sm:text-sm">
      <span className="mono-label text-[color:var(--accent-cyan)]">$</span>
      <span
        className={`mono-label truncate ${
          vibrant ? "text-[color:var(--text-main)]" : "text-[color:var(--text-soft)]"
        }`}
      >
        {children}
      </span>
    </div>
  );
}

function StatTile({
  label,
  value,
  tone = "cyan",
}: {
  label: string;
  value: string;
  tone?: "cyan" | "violet" | "lime";
}) {
  return (
    <GlassCard className={`tone-${tone} rounded-[22px] px-4 py-3`}>
      <div className="mono-label text-[11px] uppercase tracking-[0.22em] text-[color:var(--text-dim)]">
        {label}
      </div>
      <div className="mt-2 text-sm font-medium leading-6 text-[color:var(--text-main)]">
        {value}
      </div>
    </GlassCard>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <GlassCard className="metric-card rounded-[22px] px-4 py-4">
      <div className="mono-label text-[11px] uppercase tracking-[0.22em] text-[color:var(--text-dim)]">
        {label}
      </div>
      <div className="mt-2 text-2xl font-semibold tracking-tight text-[color:var(--text-main)]">
        {value}
      </div>
    </GlassCard>
  );
}

function Badge({ children, tone = "cyan" }: { children: ReactNode; tone?: string }) {
  return (
    <span className={`terminal-chip tone-${tone}`}>
      {children}
    </span>
  );
}

function ActionLink({
  href,
  children,
  primary = false,
}: {
  href: string;
  children: ReactNode;
  primary?: boolean;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("mailto:") ? undefined : "_blank"}
      rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
      className={primary ? "editor-button-primary" : "editor-button"}
    >
      {children}
    </a>
  );
}

function SignalMeter({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "cyan" | "violet" | "lime";
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <span className="mono-label text-[11px] uppercase tracking-[0.2em] text-[color:var(--text-dim)]">
          {label}
        </span>
        <span className="mono-label text-xs text-[color:var(--text-soft)]">{value}%</span>
      </div>
      <div className="signal-track">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`signal-fill tone-${tone}`}
        />
      </div>
    </div>
  );
}

function HeroConsole() {
  const reduced = useReducedMotion();

  return (
    <GlassCard className="hero-monitor rounded-[30px] p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3 border-b border-[color:var(--border-soft)] pb-4">
        <div>
          <div className="mono-label text-[11px] uppercase tracking-[0.24em] text-[color:var(--text-dim)]">
            live_session.sys
          </div>
          <div className="mt-1 text-base font-semibold text-[color:var(--text-main)]">
            Kinetic glass terminal
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-[color:var(--border-soft)] bg-[color:var(--chip)] px-3 py-1.5 text-xs text-[color:var(--text-soft)]">
          <span className="status-pulse" />
          live
        </div>
      </div>

      <div className="relative mt-5 overflow-hidden rounded-[24px] border border-[color:var(--border-soft)] bg-[color:var(--surface-secondary)] p-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(50,215,255,0.24),transparent_36%),radial-gradient(circle_at_bottom_left,rgba(139,92,246,0.24),transparent_34%)]" />
        <div className="relative space-y-4">
          <CommandLine vibrant>boot workspace --mode kinetic</CommandLine>
          <TypewriterText items={typewriterLines} />

          <div className="grid gap-3 sm:grid-cols-3">
            <GlassCard className="tone-cyan rounded-[20px] px-3 py-3 text-center" hover={false}>
              <div className="mono-label text-[11px] uppercase tracking-[0.18em] text-[color:var(--text-dim)]">
                focus
              </div>
              <div className="mt-2 text-sm font-semibold text-[color:var(--text-main)]">
                APIs
              </div>
            </GlassCard>
            <GlassCard className="tone-violet rounded-[20px] px-3 py-3 text-center" hover={false}>
              <div className="mono-label text-[11px] uppercase tracking-[0.18em] text-[color:var(--text-dim)]">
                layer
              </div>
              <div className="mt-2 text-sm font-semibold text-[color:var(--text-main)]">
                Middleware
              </div>
            </GlassCard>
            <GlassCard className="tone-lime rounded-[20px] px-3 py-3 text-center" hover={false}>
              <div className="mono-label text-[11px] uppercase tracking-[0.18em] text-[color:var(--text-dim)]">
                state
              </div>
              <div className="mt-2 text-sm font-semibold text-[color:var(--text-main)]">
                Shipping
              </div>
            </GlassCard>
          </div>

          <div className="space-y-3">
            {liveSignals.map((signal) => (
              <SignalMeter key={signal.label} {...signal} />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <GlassCard className="rounded-[22px] px-4 py-4" hover={false}>
          <div className="mono-label text-[11px] uppercase tracking-[0.22em] text-[color:var(--text-dim)]">
            runtime_notes.log
          </div>
          <div className="mt-3 space-y-2 text-sm leading-6 text-[color:var(--text-soft)]">
            <p>Designing data-heavy tools with responsive frontends and practical systems thinking.</p>
            <p>Balanced between engineering clarity, delivery pace, and maintainable UI patterns.</p>
          </div>
        </GlassCard>

        <div className="relative flex min-h-[170px] items-center justify-center overflow-hidden rounded-[22px] border border-[color:var(--border-soft)] bg-[color:var(--surface-secondary)]">
          <motion.div
            animate={reduced ? undefined : { rotate: 360 }}
            transition={reduced ? undefined : { duration: 14, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="hero-orbit hero-orbit-outer"
          />
          <motion.div
            animate={reduced ? undefined : { rotate: -360 }}
            transition={reduced ? undefined : { duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="hero-orbit hero-orbit-inner"
          />
          <motion.div
            animate={reduced ? undefined : { y: [0, -8, 0], scale: [1, 1.04, 1] }}
            transition={reduced ? undefined : { duration: 3.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="hero-core"
          >
            AA
          </motion.div>
          <span className="hero-node hero-node-a">API</span>
          <span className="hero-node hero-node-b">UI</span>
          <span className="hero-node hero-node-c">DATA</span>
        </div>
      </div>
    </GlassCard>
  );
}

function EditorHeader({ activeId }: { activeId: string }) {
  const current = sections.find((section) => section.id === activeId) ?? sections[0];

  return (
    <header className="editor-shell sticky top-3 z-50 rounded-[28px] px-4 py-3 sm:px-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 items-center gap-4">
          <WindowControls />
          <div className="min-w-0">
            <div className="mono-label text-[11px] uppercase tracking-[0.26em] text-[color:var(--text-dim)]">
              arethusa.workspace
            </div>
            <div className="truncate text-sm font-semibold text-[color:var(--text-main)] sm:text-base">
              {current.fileName}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between lg:justify-end">
          <div className="mono-label text-xs text-[color:var(--text-dim)]">
            ~/portfolio/{current.path === "/" ? current.fileName : current.path.slice(1)}
          </div>
          <div className="flex items-center gap-2">
            <span className="header-badge">
              <span className="status-pulse" />
              available for collaboration
            </span>
            <ThemeButton />
          </div>
        </div>
      </div>
    </header>
  );
}

function Sidebar({ activeId }: { activeId: string }) {
  const reduced = useReducedMotion();

  return (
    <aside className="space-y-4 xl:sticky xl:top-24 xl:self-start">
      <GlassCard className="rounded-[30px] p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3 border-b border-[color:var(--border-soft)] pb-3">
          <div>
            <div className="mono-label text-[11px] uppercase tracking-[0.24em] text-[color:var(--text-dim)]">
              Explorer
            </div>
            <div className="mt-1 text-sm font-semibold text-[color:var(--text-main)]">
              src/content
            </div>
          </div>
          <div className="mono-label text-xs text-[color:var(--text-dim)]">8 files</div>
        </div>

        <nav className="mt-4 space-y-2">
          {sections.map((section, index) => {
            const Icon = section.icon;

            return (
              <motion.div
                key={section.id}
                initial={reduced ? false : { opacity: 0, x: -10 }}
                animate={reduced ? undefined : { opacity: 1, x: 0 }}
                transition={{ delay: index * 0.04, duration: 0.32 }}
              >
                <Link
                  to={section.path}
                  className={`sidebar-entry ${activeId === section.id ? "sidebar-entry-active" : ""}`}
                  onPointerMove={updatePointerGlow}
                >
                  <span className="sidebar-entry-icon">
                    <Icon size={16} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2 text-sm font-medium text-[color:var(--text-main)]">
                      {section.fileName}
                    </span>
                    <span className="mt-1 block text-xs text-[color:var(--text-dim)]">
                      {section.summary}
                    </span>
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </nav>
      </GlassCard>

      <GlassCard className="rounded-[30px] p-4 sm:p-5">
        <div className="mono-label text-[11px] uppercase tracking-[0.24em] text-[color:var(--text-dim)]">
          Signal Matrix
        </div>
        <div className="mt-4 grid gap-3">
          <StatTile label="Primary role" value="Full-Stack Developer" tone="cyan" />
          <StatTile label="Current stack" value="API, middleware, data-heavy systems" tone="violet" />
          <StatTile label="Preferred vibe" value="Reliable build, kinetic interface" tone="lime" />
        </div>
      </GlassCard>
    </aside>
  );
}

function TabStrip({ activeId }: { activeId: string }) {
  return (
    <div className="editor-shell overflow-x-auto rounded-[26px] px-2 py-2">
      <div className="flex min-w-max items-center gap-2">
        {sections.map((section) => (
          <Link
            key={section.id}
            to={section.path}
            className={`tab-pill ${activeId === section.id ? "tab-pill-active" : ""}`}
          >
            <span className="mono-label text-xs">{section.fileName}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function SectionShell({
  id,
  fileName,
  command,
  title,
  icon,
  children,
}: {
  id: string;
  fileName: string;
  command: string;
  title: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  const reduced = useReducedMotion();

  return (
    <section id={id} className="snap-start scroll-mt-28">
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 22, scale: 0.985 }}
        whileInView={reduced ? undefined : { opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.18 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        <GlassCard className="section-shell editor-scan overflow-hidden rounded-[32px]" hover={false}>
          <div className="flex flex-col gap-3 border-b border-[color:var(--border-soft)] px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div className="flex min-w-0 items-center gap-3">
              <WindowControls />
              <div className="min-w-0">
                <div className="mono-label text-[11px] uppercase tracking-[0.24em] text-[color:var(--text-dim)]">
                  {fileName}
                </div>
                <div className="mt-1 flex items-center gap-2 text-sm font-semibold text-[color:var(--text-main)] sm:text-base">
                  <span className="text-[color:var(--accent-cyan)]">{icon}</span>
                  <span className="truncate">{title}</span>
                </div>
              </div>
            </div>

            <div className="mono-label truncate text-xs text-[color:var(--text-dim)]">
              {command}
            </div>
          </div>

          <div className="border-b border-[color:var(--border-soft)] bg-[color:var(--surface-secondary)] px-4 py-2 sm:px-5">
            <CommandLine vibrant>{command}</CommandLine>
          </div>

          <div className="p-4 sm:p-5 lg:p-6">{children}</div>
        </GlassCard>
      </motion.div>
    </section>
  );
}

function ProjectCard({
  name,
  tech,
  repo,
  live,
}: {
  name: string;
  tech: string[];
  repo: string;
  live: string;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.article
      onPointerMove={updatePointerGlow}
      whileHover={reduced ? undefined : { y: -8, rotateX: 1.5, rotateY: -1.5 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="project-card"
      style={{ transformPerspective: 1400 } as CSSProperties}
    >
      <div className="project-card-stripe" />
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="mono-label text-[11px] uppercase tracking-[0.24em] text-[color:var(--text-dim)]">
            project
          </div>
          <div className="mt-2 text-lg font-semibold text-[color:var(--text-main)]">
            {name}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={repo}
            target="_blank"
            rel="noreferrer"
            className="icon-link"
            aria-label={`Open ${name} repository`}
          >
            <ExternalLinkIcon size={16} />
          </a>
          <a
            href={live}
            target="_blank"
            rel="noreferrer"
            className="icon-link"
            aria-label={`Open ${name} live site`}
          >
            <ExternalLinkIcon size={16} />
          </a>
        </div>
      </div>

      <p className="mt-3 text-sm leading-6 text-[color:var(--text-soft)]">
        Built like a working case tile: source, deployment, and stack context all surfaced in one lively panel.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {tech.map((item, index) => (
          <Badge key={item} tone={index % 2 === 0 ? "cyan" : "violet"}>
            {item}
          </Badge>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-[color:var(--border-soft)] pt-4 text-xs text-[color:var(--text-dim)]">
        <span className="mono-label">repo + live linked</span>
        <span className="mono-label text-[color:var(--accent-amber)]">active card</span>
      </div>
    </motion.article>
  );
}

function ExperienceRow({
  role,
  company,
  period,
}: {
  role: string;
  company: string;
  period: string;
}) {
  return (
    <div className="experience-row">
      <div className="experience-dot" />
      <div className="experience-line" />
      <GlassCard className="rounded-[26px] px-4 py-4 sm:px-5 sm:py-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="text-base font-semibold text-[color:var(--text-main)]">{role}</div>
            <div className="mt-1 text-sm text-[color:var(--text-soft)]">{company}</div>
          </div>
          <div className="mono-label text-xs text-[color:var(--text-dim)]">{period}</div>
        </div>
      </GlassCard>
    </div>
  );
}

function SkillGroup({ label, items }: { label: string; items: string[] }) {
  return (
    <GlassCard className="rounded-[28px] p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="mono-label text-[11px] uppercase tracking-[0.24em] text-[color:var(--text-dim)]">
          {label}
        </div>
        <span className="rounded-full bg-[color:var(--chip)] px-3 py-1 text-[11px] text-[color:var(--accent-violet)]">
          {items.length} items
        </span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
        {items.map((item, index) => {
          const Icon = techIcons[item];
          const tone = index % 3 === 0 ? "cyan" : index % 3 === 1 ? "violet" : "lime";

          return (
            <GlassCard
              key={item}
              className={`tone-${tone} rounded-[22px] px-3 py-3 text-center`}
            >
              <div className="flex justify-center text-[color:var(--accent-cyan)]">
                {Icon ? <Icon size={24} /> : null}
              </div>
              <div className="mt-2 text-xs font-medium leading-5 text-[color:var(--text-main)] sm:text-sm">
                {item}
              </div>
            </GlassCard>
          );
        })}
      </div>
    </GlassCard>
  );
}

function CertificateCard({
  title,
  issuer,
  year,
  href,
}: {
  title: string;
  issuer: string;
  year: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="glass-link-card"
      onPointerMove={updatePointerGlow}
    >
      <div className="mono-label text-[11px] uppercase tracking-[0.24em] text-[color:var(--text-dim)]">
        verified credential
      </div>
      <div className="mt-3 text-base font-semibold leading-7 text-[color:var(--text-main)]">
        {title}
      </div>
      <div className="mt-2 text-sm text-[color:var(--text-soft)]">
        {issuer} · {year}
      </div>
    </a>
  );
}

function SocialCard({ label, href }: { label: string; href: string }) {
  const Icon = socialIcons[label];

  return (
    <a
      href={href}
      target={href.startsWith("mailto:") ? undefined : "_blank"}
      rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
      className="glass-link-card"
      onPointerMove={updatePointerGlow}
    >
      <div className="flex items-center gap-3">
        <span className="rounded-xl border border-[color:var(--border-soft)] bg-[color:var(--chip)] p-2 text-[color:var(--accent-cyan)]">
          {Icon ? <Icon size={20} /> : null}
        </span>
        <div>
          <div className="text-sm font-semibold text-[color:var(--text-main)]">{label}</div>
          <div className="mt-1 break-all text-xs text-[color:var(--text-dim)]">
            {href.replace("mailto:", "").replace("https://", "")}
          </div>
        </div>
      </div>
    </a>
  );
}

function HomePage() {
  const { activeId } = useActiveSection();

  return (
    <div className="kinetic-stage relative min-h-dvh px-3 pb-6 pt-3 sm:px-4 sm:pt-4">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="backdrop-orb orb-a" />
        <div className="backdrop-orb orb-b" />
        <div className="backdrop-orb orb-c" />
        <div className="noise-overlay" />
      </div>

      <a
        href="#projects"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-xl focus:bg-[color:var(--accent-cyan)] focus:px-3 focus:py-2 focus:text-sm focus:font-semibold focus:text-slate-950"
      >
        Skip to projects
      </a>

      <div className="mx-auto flex max-w-[1520px] flex-col gap-4">
        <EditorHeader activeId={activeId} />

        <div className="grid gap-4 xl:grid-cols-[320px_minmax(0,1fr)]">
          <Sidebar activeId={activeId} />

          <div className="min-w-0 space-y-4">
            <TabStrip activeId={activeId} />

            <main className="editor-shell overflow-hidden rounded-[34px]">
              <div className="flex flex-col gap-2 border-b border-[color:var(--border-soft)] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                <div>
                  <div className="mono-label text-[11px] uppercase tracking-[0.24em] text-[color:var(--text-dim)]">
                    workspace
                  </div>
                  <div className="mt-1 text-sm font-semibold text-[color:var(--text-main)] sm:text-base">
                    kinetic glass terminal shell
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-[color:var(--text-dim)]">
                  <Badge tone="cyan">react</Badge>
                  <Badge tone="violet">framer motion</Badge>
                  <Badge tone="lime">interactive depth</Badge>
                </div>
              </div>

              <div className="space-y-5 p-3 sm:p-4 lg:p-5">
                <SectionShell
                  id="top"
                  fileName="intro.tsx"
                  command="npx arethusa --intro --live"
                  title="Developer Workspace"
                  icon={<CodeIcon size={18} />}
                >
                  <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <Badge tone="violet">kinetic glass terminal</Badge>
                        <CommandLine vibrant>whoami --focus systems --mood energetic</CommandLine>
                        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-[color:var(--text-main)] sm:text-5xl xl:text-6xl">
                          Building <span className="gradient-text">reliable systems</span> with a more alive interface.
                        </h1>
                        <p className="max-w-2xl text-base leading-8 text-[color:var(--text-soft)] sm:text-lg">
                          Full-stack developer focused on dependable product delivery,
                          API architecture, middleware orchestration, and business workflows
                          that need both clarity and momentum.
                        </p>
                        <TypewriterText items={typewriterLines} />
                      </div>

                      <div className="grid gap-3 sm:grid-cols-3">
                        {overviewStats.map((item) => (
                          <MetricCard key={item.label} label={item.label} value={item.value} />
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {["React", "Vue", "Docker", "Kubernetes", "Postgres"].map(
                          (item, index) => (
                            <Badge
                              key={item}
                              tone={index % 3 === 0 ? "cyan" : index % 3 === 1 ? "violet" : "lime"}
                            >
                              {item}
                            </Badge>
                          ),
                        )}
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <Link to="/projects" className="editor-button-primary">
                          Open projects
                        </Link>
                        <Link to="/contact-person" className="editor-button">
                          Open contact
                        </Link>
                      </div>
                    </div>

                    <HeroConsole />
                  </div>
                </SectionShell>

                <SectionShell
                  id="projects"
                  fileName="projects.ts"
                  command="ls ./projects --featured --interactive"
                  title="Featured Projects"
                  icon={<CodeIcon size={18} />}
                >
                  <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
                    {projects.map((project) => (
                      <ProjectCard key={project.name} {...project} />
                    ))}
                  </div>
                </SectionShell>

                <SectionShell
                  id="experience"
                  fileName="experience.log"
                  command="cat experience.log | tail -n 5"
                  title="Experience Timeline"
                  icon={<BriefcaseIcon size={18} />}
                >
                  <div className="space-y-4">
                    {experience.map((item) => (
                      <ExperienceRow key={`${item.role}-${item.company}`} {...item} />
                    ))}
                  </div>
                </SectionShell>

                <SectionShell
                  id="skills"
                  fileName="stack.json"
                  command="parse stack.json --grouped --visual"
                  title="Engineering Stack"
                  icon={<SkillsIcon size={18} />}
                >
                  <div className="grid gap-4 xl:grid-cols-2">
                    {skillGroups.map((group) => (
                      <SkillGroup key={group.label} label={group.label} items={group.items} />
                    ))}
                  </div>
                </SectionShell>

                <SectionShell
                  id="certificates"
                  fileName="certifications.md"
                  command="open certifications.md --verified"
                  title="Certificates"
                  icon={<CertificateIcon size={18} />}
                >
                  <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
                    {certificates.map((certificate) => (
                      <CertificateCard key={certificate.title} {...certificate} />
                    ))}
                  </div>
                </SectionShell>

                <SectionShell
                  id="education"
                  fileName="education.yml"
                  command="cat education.yml --timeline"
                  title="Education"
                  icon={<GraduationIcon size={18} />}
                >
                  <GlassCard className="rounded-[30px] p-5 sm:p-6">
                    <div className="mono-label text-[11px] uppercase tracking-[0.24em] text-[color:var(--text-dim)]">
                      degree
                    </div>
                    <div className="mt-3 text-xl font-semibold text-[color:var(--text-main)]">
                      B.Sc. Computer Science
                    </div>
                    <div className="mt-2 text-sm leading-7 text-[color:var(--text-soft)]">
                      Surabaya University · 2015 - 2019
                    </div>
                  </GlassCard>
                </SectionShell>

                <SectionShell
                  id="contact"
                  fileName="contact.sh"
                  command="./contact.sh --open --collab"
                  title="Contact"
                  icon={<ContactIcon size={18} />}
                >
                  <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
                    <GlassCard className="rounded-[30px] p-5 sm:p-6">
                      <div className="mono-label text-[11px] uppercase tracking-[0.24em] text-[color:var(--text-dim)]">
                        primary channel
                      </div>
                      <div className="mt-3 break-all text-xl font-semibold text-[color:var(--text-main)] sm:text-2xl">
                        ryan.arethusa@gmail.com
                      </div>
                      <p className="mt-3 text-sm leading-7 text-[color:var(--text-soft)]">
                        Best for collaboration, freelance opportunities, and engineering discussions.
                      </p>
                    </GlassCard>

                    <div className="flex flex-wrap items-stretch gap-3 lg:flex-col">
                      <ActionLink href="mailto:ryan.arethusa@gmail.com" primary>
                        Send email
                      </ActionLink>
                      <CopyEmailButton email="ryan.arethusa@gmail.com" />
                    </div>
                  </div>
                </SectionShell>

                <SectionShell
                  id="social"
                  fileName="links.env"
                  command="source links.env --public"
                  title="Social Links"
                  icon={<SocialIcon size={18} />}
                >
                  <div className="grid gap-4 lg:grid-cols-3">
                    {socials.map((social) => (
                      <SocialCard key={social.label} label={social.label} href={social.href} />
                    ))}
                  </div>

                  <GlassCard className="mt-6 rounded-[24px] px-4 py-3 text-xs text-[color:var(--text-dim)]" hover={false}>
                    © {new Date().getFullYear()} Arethusa Aryandhana
                  </GlassCard>
                </SectionShell>
              </div>
            </main>
          </div>
        </div>
      </div>
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
    <button type="button" onClick={copy} className="editor-button">
      {state === "idle" ? "Copy email" : state === "copied" ? "Copied" : "Failed"}
    </button>
  );
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
        transition={{ duration: 0.22, ease: "easeOut" }}
      >
        <Routes location={location}>
          <Route path="*" element={<HomePage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}
