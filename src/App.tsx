import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentType,
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

/* ═══════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════ */

type IconProps = { className?: string; size?: number };

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
    title: "arethusa@dev:~/portfolio",
    fileName: "intro.tsx",
    summary: "Boot sequence & profile",
    command: "npx arethusa --intro --live",
    icon: CodeIcon,
  },
  {
    key: "projects",
    path: "/projects",
    id: "projects",
    label: "Projects",
    title: "Projects | arethusa.dev",
    fileName: "projects.ts",
    summary: "Featured builds",
    command: "ls -la ./projects --featured",
    icon: CodeIcon,
  },
  {
    key: "experience",
    path: "/experience",
    id: "experience",
    label: "Experience",
    title: "Experience | arethusa.dev",
    fileName: "experience.log",
    summary: "Work timeline",
    command: "git log --oneline --graph career.log",
    icon: BriefcaseIcon,
  },
  {
    key: "skills",
    path: "/skills",
    id: "skills",
    label: "Skills",
    title: "Skills | arethusa.dev",
    fileName: "stack.json",
    summary: "Tech stack",
    command: "cat stack.json | jq '.skills'",
    icon: SkillsIcon,
  },
  {
    key: "certificates",
    path: "/certificates",
    id: "certificates",
    label: "Certs",
    title: "Certificates | arethusa.dev",
    fileName: "certs.md",
    summary: "Credentials",
    command: "cat certs.md --verified",
    icon: CertificateIcon,
  },
  {
    key: "education",
    path: "/education",
    id: "education",
    label: "Education",
    title: "Education | arethusa.dev",
    fileName: "education.yml",
    summary: "Academic record",
    command: "cat education.yml",
    icon: GraduationIcon,
  },
  {
    key: "contact",
    path: "/contact-person",
    id: "contact",
    label: "Contact",
    title: "Contact | arethusa.dev",
    fileName: "contact.sh",
    summary: "Reach out",
    command: "bash contact.sh --open",
    icon: ContactIcon,
  },
  {
    key: "social",
    path: "/social-media",
    id: "social",
    label: "Social",
    title: "Social | arethusa.dev",
    fileName: ".env.social",
    summary: "Online profiles",
    command: "source .env.social && echo $LINKS",
    icon: SocialIcon,
  },
];

const byPath = new Map(sections.map((s) => [s.path, s]));

const projects = [
  {
    name: "StackForge",
    desc: "Full-stack project scaffolding tool with template engine",
    tech: ["React", "Node.js", "TypeScript"],
    repo: "https://github.com/arethusaryandhana/stackforge",
    live: "https://stackforge.example.com",
  },
  {
    name: "Orderly POS",
    desc: "Point-of-sale system with real-time inventory sync",
    tech: ["React", "Redis", "WebSocket"],
    repo: "https://github.com/arethusaryandhana/orderly-pos",
    live: "https://orderly.example.com",
  },
  {
    name: "API Sentinel",
    desc: "API monitoring dashboard with alerting and analytics",
    tech: ["Node.js", "PostgreSQL", "Docker"],
    repo: "https://github.com/arethusaryandhana/api-sentinel",
    live: "https://sentinel.example.com",
  },
];

const experience = [
  {
    role: "Middleware, DB & API Tech",
    company: "PT. Meratus Line",
    period: "Jun 2024 — Present",
    hash: "a3f7c2d",
  },
  {
    role: "Business Solution Software Developer",
    company: "PT. Meratus Line",
    period: "Jul 2023 — May 2024",
    hash: "e1b4a08",
  },
  {
    role: "IT Developer Supervisor",
    company: "PT. Graha Multi Bintang",
    period: "Jan 2023 — Jun 2023",
    hash: "c9d2f15",
  },
  {
    role: "Senior Full Stack Programmer",
    company: "PT. Graha Multi Bintang",
    period: "Oct 2021 — Jan 2023",
    hash: "b8e6a23",
  },
  {
    role: "Backend Software Developer",
    company: "PT. SMART IT",
    period: "Dec 2019 — Mar 2021",
    hash: "d4c1b97",
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
  { label: "GitHub", href: "https://github.com/arethusaryandhana", envKey: "GITHUB_URL" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/arethusa-aryandhana/", envKey: "LINKEDIN_URL" },
  { label: "Email", href: "mailto:ryan.arethusa@gmail.com", envKey: "EMAIL" },
];

const skillGroups = [
  {
    label: "Frontend",
    items: [
      { name: "React", level: 92 },
      { name: "Vue.js", level: 78 },
      { name: "TypeScript", level: 88 },
    ],
  },
  {
    label: "Backend",
    items: [
      { name: "Node.js", level: 90 },
      { name: "PHP", level: 82 },
      { name: "Laravel", level: 80 },
      { name: ".NET", level: 70 },
      { name: "Golang", level: 65 },
    ],
  },
  {
    label: "Data",
    items: [
      { name: "PostgreSQL", level: 88 },
      { name: "MySQL", level: 85 },
      { name: "SQL Server", level: 80 },
      { name: "MongoDB", level: 72 },
      { name: "Redis", level: 78 },
      { name: "CDC", level: 68 },
      { name: "Pentaho", level: 60 },
    ],
  },
  {
    label: "Platform",
    items: [
      { name: "Docker", level: 85 },
      { name: "Kubernetes", level: 70 },
      { name: "Kafka", level: 72 },
      { name: "WebSocket", level: 82 },
      { name: "MinIO", level: 65 },
    ],
  },
];

const typewriterPhrases = [
  "shipping dependable backend systems",
  "designing APIs and middleware flows",
  "building clean, maintainable interfaces",
];

const bootLines = [
  { text: "[    0.001] Kernel: loading arethusa.dev v2.0...", delay: 0 },
  { text: "[    0.024] CPU: Full-Stack Developer (5+ years)", delay: 200 },
  { text: "[    0.048] RAM: JavaScript • TypeScript • Go • PHP • C#", delay: 400 },
  { text: "[    0.096] DISK: Mounting /projects /experience /skills...", delay: 600 },
  { text: "[    0.128] NET: Connecting to middleware layer... [OK]", delay: 800 },
  { text: "[    0.256] GPU: Rendering terminal interface... [OK]", delay: 1000 },
  { text: "[    0.512] SYS: All systems operational ✓", delay: 1200 },
  { text: "", delay: 1400 },
  { text: "Welcome to arethusa.dev — type 'help' for commands", delay: 1500 },
];

const ASCII_ART = `
 █████╗ ██████╗ ███████╗████████╗██╗  ██╗██╗   ██╗███████╗ █████╗
██╔══██╗██╔══██╗██╔════╝╚══██╔══╝██║  ██║██║   ██║██╔════╝██╔══██╗
███████║██████╔╝█████╗     ██║   ███████║██║   ██║███████╗███████║
██╔══██║██╔══██╗██╔══╝     ██║   ██╔══██║██║   ██║╚════██║██╔══██║
██║  ██║██║  ██║███████╗   ██║   ██║  ██║╚██████╔╝███████║██║  ██║
╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝`.trim();

/* ═══════════════════════════════════════════════════════
   HOOKS
   ═══════════════════════════════════════════════════════ */

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
        const viewCenter = window.innerHeight / 2;
        let currentSection: SectionDef | null = null;
        let minDistance = Infinity;

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

/* ═══════════════════════════════════════════════════════
   SHARED COMPONENTS
   ═══════════════════════════════════════════════════════ */

function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    if (!canvasRef.current) return;

    const cvs = canvasRef.current!;
    const ctx = cvs.getContext("2d")!;
    if (!ctx) return;

    let animId: number;
    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
    const fontSize = 14;
    let columns = Math.floor(cvs.width / fontSize);
    let drops = Array.from({ length: columns }, () => 0);

    function resize() {
      cvs.width = window.innerWidth;
      cvs.height = window.innerHeight;
      columns = Math.floor(cvs.width / fontSize);
      drops = Array.from({ length: columns }, () =>
        Math.random() * cvs.height / fontSize * -1
      );
    }

    resize();
    window.addEventListener("resize", resize);

    function draw() {
      ctx.fillStyle = "rgba(8, 12, 20, 0.08)";
      ctx.fillRect(0, 0, cvs.width, cvs.height);

      ctx.fillStyle = "rgba(0, 255, 159, 0.35)";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(char, x, y);

        if (y > cvs.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += 0.5;
      }

      animId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, [reduced]);

  if (reduced) return null;
  return <canvas ref={canvasRef} className="matrix-canvas" />;
}

function TerminalDots() {
  return (
    <div className="terminal-dots">
      <span className="terminal-dot terminal-dot--red" />
      <span className="terminal-dot terminal-dot--yellow" />
      <span className="terminal-dot terminal-dot--green" />
    </div>
  );
}

function TypewriterText({ items }: { items: string[] }) {
  const [lineIndex, setLineIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = items[lineIndex];
    const step = isDeleting ? 18 : 45;

    const timeout = window.setTimeout(() => {
      if (!isDeleting && displayed.length < current.length) {
        setDisplayed(current.slice(0, displayed.length + 1));
        return;
      }
      if (!isDeleting && displayed.length === current.length) {
        window.setTimeout(() => setIsDeleting(true), 1500);
        return;
      }
      if (isDeleting && displayed.length > 0) {
        setDisplayed(current.slice(0, displayed.length - 1));
        return;
      }
      setIsDeleting(false);
      setLineIndex((prev) => (prev + 1) % items.length);
    }, step);

    return () => window.clearTimeout(timeout);
  }, [displayed, isDeleting, items, lineIndex]);

  return (
    <div className="typing-line">
      <span className="text-green">{">"}</span>
      <span className="text-secondary">{displayed}</span>
      <span className="cursor-block" />
    </div>
  );
}

function Prompt({
  command,
  typing = false,
}: {
  command: string;
  typing?: boolean;
}) {
  return (
    <div className="prompt">
      <span className="prompt-user">arethusa@dev</span>
      <span className="text-dim">:</span>
      <span className="prompt-path">~/portfolio</span>
      <span className="prompt-symbol">$</span>
      <span className="prompt-command">{command}</span>
      {typing && <span className="cursor-block" />}
    </div>
  );
}

function TerminalOutput({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`pl-0 mt-1 ${className}`} style={{ paddingLeft: 0 }}>
      {children}
    </div>
  );
}

function SectionPanel({
  id,
  fileName,
  command,
  icon,
  children,
}: {
  id: string;
  fileName: string;
  command: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  const reduced = useReducedMotion();

  return (
    <section id={id} className="scroll-mt-16">
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 16 }}
        whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="section-panel">
          <div className="section-header">
            <div className="section-filename">
              <span className="section-filename-icon">{icon}</span>
              <span>{fileName}</span>
            </div>
            <div className="section-command">{command}</div>
          </div>

          <div className="section-body space-y-4">
            <Prompt command={command} />
            <TerminalOutput>{children}</TerminalOutput>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function CodeLine({
  num,
  children,
}: {
  num: number;
  children: ReactNode;
}) {
  return (
    <div className="code-line">
      <span className="line-number">{num}</span>
      <span className="line-content">{children}</span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   BOOT SEQUENCE
   ═══════════════════════════════════════════════════════ */

function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [progress, setProgress] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      onComplete();
      return;
    }

    const timers: number[] = [];

    bootLines.forEach((line, i) => {
      timers.push(
        window.setTimeout(() => {
          setVisibleLines(i + 1);
          setProgress(Math.round(((i + 1) / bootLines.length) * 100));
        }, line.delay)
      );
    });

    timers.push(
      window.setTimeout(() => {
        onComplete();
      }, 2400)
    );

    return () => timers.forEach(clearTimeout);
  }, [onComplete, reduced]);

  return (
    <motion.div
      className="boot-screen"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-lg space-y-0">
        {bootLines.slice(0, visibleLines).map((line, i) => (
          <motion.div
            key={i}
            className="boot-line"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.15 }}
          >
            {line.text.includes("[OK]") ? (
              <>
                {line.text.replace("[OK]", "")}
                <span className="ok">[OK]</span>
              </>
            ) : line.text.includes("✓") ? (
              <span className="ok">{line.text}</span>
            ) : line.text === "" ? (
              <br />
            ) : (
              line.text
            )}
          </motion.div>
        ))}

        <div className="boot-progress mt-4">
          <div
            className="boot-progress-bar"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-2 text-xs text-dim">
          {progress}% — {progress < 100 ? "Loading..." : "Ready"}
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   HEADER
   ═══════════════════════════════════════════════════════ */

function Header({ activeId }: { activeId: string }) {
  const current = sections.find((s) => s.id === activeId) ?? sections[0];

  return (
    <header className="main-header">
      <div className="main-header-inner">
        <div className="flex items-center gap-3">
          <TerminalDots />
          <span className="text-secondary text-xs hidden sm:inline">
            arethusa@dev:~/portfolio/{current.fileName}
          </span>
          <span className="text-secondary text-xs sm:hidden">
            ~/{current.fileName}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="status-badge status-badge--green">
            <span className="status-dot" />
            <span className="hidden sm:inline">available for hire</span>
            <span className="sm:hidden">online</span>
          </span>
        </div>
      </div>
    </header>
  );
}

/* ═══════════════════════════════════════════════════════
   TAB BAR
   ═══════════════════════════════════════════════════════ */

function TabBar({ activeId }: { activeId: string }) {
  return (
    <div className="tab-bar">
      {sections.map((s) => (
        <Link
          key={s.id}
          to={s.path}
          className={`tab-item ${activeId === s.id ? "tab-item--active" : ""}`}
        >
          {s.fileName}
        </Link>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SIDEBAR
   ═══════════════════════════════════════════════════════ */

function Sidebar({ activeId }: { activeId: string }) {
  return (
    <aside className="space-y-3 xl:sticky xl:top-14 xl:self-start">
      {/* Explorer */}
      <div className="sidebar-panel">
        <div className="sidebar-title">Explorer</div>
        <nav className="py-1">
          {sections.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.id}
                to={s.path}
                className={`sidebar-item ${activeId === s.id ? "sidebar-item--active" : ""}`}
              >
                <span className="sidebar-item-icon">
                  <Icon size={14} />
                </span>
                <span className="sidebar-item-name">{s.fileName}</span>
                <span className="sidebar-item-meta">{s.summary}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Quick Info */}
      <div className="sidebar-panel">
        <div className="sidebar-title">Process Info</div>
        <div className="p-3 space-y-3 text-xs">
          <div>
            <span className="text-dim">PID:</span>{" "}
            <span className="text-green">1337</span>
          </div>
          <div>
            <span className="text-dim">Role:</span>{" "}
            <span className="text-cyan">Full-Stack Developer</span>
          </div>
          <div>
            <span className="text-dim">Experience:</span>{" "}
            <span className="text-amber">5+ years</span>
          </div>
          <div>
            <span className="text-dim">Stack:</span>{" "}
            <span className="text-purple">20+ technologies</span>
          </div>
          <div>
            <span className="text-dim">Status:</span>{" "}
            <span className="text-green">● Running</span>
          </div>
          <div>
            <span className="text-dim">Uptime:</span>{" "}
            <UptimeCounter />
          </div>
        </div>
      </div>
    </aside>
  );
}

function UptimeCounter() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  const pad = (n: number) => String(n).padStart(2, "0");

  return <span className="text-string">{pad(h)}:{pad(m)}:{pad(s)}</span>;
}

/* ═══════════════════════════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════════════════════════ */

function HeroSection() {
  const reduced = useReducedMotion();

  return (
    <section id="top" className="scroll-mt-16">
      <div className="section-panel">
        <div className="section-header">
          <div className="section-filename">
            <span className="section-filename-icon">
              <CodeIcon size={14} />
            </span>
            <span>intro.tsx</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="status-badge status-badge--green">
              <span className="status-dot" />
              live
            </span>
          </div>
        </div>

        <div className="section-body">
          <Prompt command="npx arethusa --intro --live" />

          <TerminalOutput className="mt-4 space-y-6">
            {/* ASCII Art Name */}
            <motion.pre
              className="ascii-art"
              initial={reduced ? false : { opacity: 0 }}
              animate={reduced ? undefined : { opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              {ASCII_ART}
            </motion.pre>

            {/* Bio as code */}
            <motion.div
              className="code-block"
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <CodeLine num={1}>
                <span className="syn-keyword">const</span>{" "}
                <span className="syn-variable">developer</span>{" "}
                <span className="syn-operator">=</span>{" "}
                <span className="syn-bracket">{"{"}</span>
              </CodeLine>
              <CodeLine num={2}>
                {"  "}
                <span className="syn-property">name</span>
                <span className="syn-punctuation">:</span>{" "}
                <span className="syn-string">"Arethusa Aryandhana"</span>
                <span className="syn-punctuation">,</span>
              </CodeLine>
              <CodeLine num={3}>
                {"  "}
                <span className="syn-property">title</span>
                <span className="syn-punctuation">:</span>{" "}
                <span className="syn-string">"Full-Stack Developer"</span>
                <span className="syn-punctuation">,</span>
              </CodeLine>
              <CodeLine num={4}>
                {"  "}
                <span className="syn-property">focus</span>
                <span className="syn-punctuation">:</span>{" "}
                <span className="syn-bracket">[</span>
                <span className="syn-string">"APIs"</span>
                <span className="syn-punctuation">,</span>{" "}
                <span className="syn-string">"Middleware"</span>
                <span className="syn-punctuation">,</span>{" "}
                <span className="syn-string">"Data Systems"</span>
                <span className="syn-bracket">]</span>
                <span className="syn-punctuation">,</span>
              </CodeLine>
              <CodeLine num={5}>
                {"  "}
                <span className="syn-property">location</span>
                <span className="syn-punctuation">:</span>{" "}
                <span className="syn-string">"Indonesia"</span>
                <span className="syn-punctuation">,</span>
              </CodeLine>
              <CodeLine num={6}>
                {"  "}
                <span className="syn-property">available</span>
                <span className="syn-punctuation">:</span>{" "}
                <span className="syn-number">true</span>
                <span className="syn-punctuation">,</span>
              </CodeLine>
              <CodeLine num={7}>
                <span className="syn-bracket">{"}"}</span>
                <span className="syn-punctuation">;</span>
              </CodeLine>
            </motion.div>

            {/* Description */}
            <motion.div
              className="text-secondary text-sm leading-7 max-w-2xl"
              initial={reduced ? false : { opacity: 0 }}
              animate={reduced ? undefined : { opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <span className="syn-comment">
                {"// "}Full-stack developer focused on dependable product delivery,
                <br />
                {"// "}API architecture, middleware orchestration, and business
                <br />
                {"// "}workflows that need both clarity and momentum.
              </span>
            </motion.div>

            {/* Typewriter */}
            <motion.div
              initial={reduced ? false : { opacity: 0 }}
              animate={reduced ? undefined : { opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.9 }}
            >
              <TypewriterText items={typewriterPhrases} />
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-4 gap-3"
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.1 }}
            >
              {[
                { label: "years_exp", value: "5+", color: "text-green" },
                { label: "tech_stack", value: "20+", color: "text-cyan" },
                { label: "certificates", value: "05", color: "text-amber" },
                { label: "roles_held", value: "05", color: "text-purple" },
              ].map((stat) => (
                <div key={stat.label} className="terminal-card text-center">
                  <div className="text-dim text-xs uppercase tracking-wider">
                    {stat.label}
                  </div>
                  <div className={`text-2xl font-bold mt-1 ${stat.color}`}>
                    {stat.value}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap gap-3"
              initial={reduced ? false : { opacity: 0 }}
              animate={reduced ? undefined : { opacity: 1 }}
              transition={{ duration: 0.4, delay: 1.3 }}
            >
              <Link to="/projects" className="btn-terminal btn-terminal--primary">
                ./view-projects.sh
              </Link>
              <Link to="/contact-person" className="btn-terminal">
                ./contact.sh --open
              </Link>
            </motion.div>
          </TerminalOutput>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   PROJECT SECTION
   ═══════════════════════════════════════════════════════ */

function ProjectsSection() {
  return (
    <SectionPanel
      id="projects"
      fileName="projects.ts"
      command="ls -la ./projects --featured"
      icon={<CodeIcon size={14} />}
    >
      {/* Table header */}
      <div className="text-xs text-dim mb-3 hidden sm:block">
        <span>total {projects.length} projects</span>
      </div>

      <div className="grid gap-3 lg:grid-cols-2 xl:grid-cols-3">
        {projects.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
          >
            <div className="terminal-card">
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <div className="text-xs text-dim">
                    drwxr-xr-x {i + 1} arethusa dev
                  </div>
                  <div className="text-base font-bold mt-1 text-green">
                    {p.name}/
                  </div>
                </div>
                <div className="flex gap-2">
                  <a
                    href={p.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="text-dim hover:text-cyan transition-colors"
                    aria-label={`${p.name} repository`}
                  >
                    <ExternalLinkIcon size={14} />
                  </a>
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noreferrer"
                    className="text-dim hover:text-green transition-colors"
                    aria-label={`${p.name} live site`}
                  >
                    <ExternalLinkIcon size={14} />
                  </a>
                </div>
              </div>

              <p className="text-secondary text-xs leading-5 mb-3">
                {p.desc}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {p.tech.map((t) => (
                  <span key={t} className="status-badge status-badge--cyan text-[10px]">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionPanel>
  );
}

/* ═══════════════════════════════════════════════════════
   EXPERIENCE SECTION (git log style)
   ═══════════════════════════════════════════════════════ */

function ExperienceSection() {
  return (
    <SectionPanel
      id="experience"
      fileName="experience.log"
      command="git log --oneline --graph career.log"
      icon={<BriefcaseIcon size={14} />}
    >
      <div className="space-y-4">
        {experience.map((exp, i) => (
          <motion.div
            key={`${exp.role}-${exp.company}`}
            className="timeline-item"
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
          >
            <div className="timeline-dot" />
            {i < experience.length - 1 && <div className="timeline-line" />}

            <div className="terminal-card terminal-card-cyan">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                <div>
                  <div className="flex items-center gap-2 text-xs mb-1">
                    <span className="text-amber">commit</span>
                    <span className="text-string">{exp.hash}</span>
                  </div>
                  <div className="font-bold text-sm">{exp.role}</div>
                  <div className="text-secondary text-xs mt-0.5">
                    @ {exp.company}
                  </div>
                </div>
                <div className="text-dim text-xs whitespace-nowrap">
                  {exp.period}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionPanel>
  );
}

/* ═══════════════════════════════════════════════════════
   SKILLS SECTION (JSON + progress bars)
   ═══════════════════════════════════════════════════════ */

function SkillsSection() {
  const toneMap: Record<string, string> = {
    Frontend: "green",
    Backend: "cyan",
    Data: "purple",
    Platform: "amber",
  };

  return (
    <SectionPanel
      id="skills"
      fileName="stack.json"
      command="cat stack.json | jq '.skills'"
      icon={<SkillsIcon size={14} />}
    >
      <div className="grid gap-4 xl:grid-cols-2">
        {skillGroups.map((group) => {
          const tone = toneMap[group.label] || "green";
          return (
            <div key={group.label} className="terminal-card">
              <div className="flex items-center justify-between mb-3">
                <span className={`text-${tone} font-bold text-sm`}>
                  "{group.label}"
                </span>
                <span className="text-dim text-xs">
                  [{group.items.length} items]
                </span>
              </div>

              <div className="space-y-3">
                {group.items.map((item) => {
                  const Icon = techIcons[item.name];
                  return (
                    <div key={item.name}>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2">
                          {Icon && (
                            <span className="text-cyan">
                              <Icon size={14} />
                            </span>
                          )}
                          <span className="text-xs">{item.name}</span>
                        </div>
                        <span className={`text-${tone} text-xs`}>
                          {item.level}%
                        </span>
                      </div>
                      <div className="skill-bar">
                        <motion.div
                          className={`skill-bar-fill skill-bar-fill--${tone}`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.level}%` }}
                          viewport={{ once: true, amount: 0.6 }}
                          transition={{
                            duration: 0.8,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </SectionPanel>
  );
}

/* ═══════════════════════════════════════════════════════
   CERTIFICATES SECTION
   ═══════════════════════════════════════════════════════ */

function CertificatesSection() {
  return (
    <SectionPanel
      id="certificates"
      fileName="certs.md"
      command="cat certs.md --verified"
      icon={<CertificateIcon size={14} />}
    >
      <div className="code-block">
        <CodeLine num={1}>
          <span className="syn-comment"># Verified Credentials</span>
        </CodeLine>
        <CodeLine num={2}>{""}</CodeLine>

        {certificates.map((cert, i) => (
          <a
            key={cert.title}
            href={cert.href}
            target="_blank"
            rel="noreferrer"
            className="block hover:bg-[rgba(86,212,221,0.04)] transition-colors rounded"
          >
            <CodeLine num={i + 3}>
              <span className="syn-keyword">##</span>{" "}
              <span className="syn-function">{cert.title}</span>
            </CodeLine>
            <CodeLine num={i + 3}>
              {"  "}
              <span className="syn-comment">
                issuer: {cert.issuer} · year: {cert.year}
              </span>
              {"  "}
              <span className="text-green text-xs">✓ verified</span>
            </CodeLine>
          </a>
        ))}
      </div>
    </SectionPanel>
  );
}

/* ═══════════════════════════════════════════════════════
   EDUCATION SECTION (YAML style)
   ═══════════════════════════════════════════════════════ */

function EducationSection() {
  return (
    <SectionPanel
      id="education"
      fileName="education.yml"
      command="cat education.yml"
      icon={<GraduationIcon size={14} />}
    >
      <div className="code-block">
        <CodeLine num={1}>
          <span className="syn-comment"># Academic Background</span>
        </CodeLine>
        <CodeLine num={2}>
          <span className="syn-tag">education</span>
          <span className="syn-punctuation">:</span>
        </CodeLine>
        <CodeLine num={3}>
          {"  "}<span className="syn-property">degree</span>
          <span className="syn-punctuation">:</span>{" "}
          <span className="syn-string">"B.Sc. Computer Science"</span>
        </CodeLine>
        <CodeLine num={4}>
          {"  "}<span className="syn-property">university</span>
          <span className="syn-punctuation">:</span>{" "}
          <span className="syn-string">"Surabaya University"</span>
        </CodeLine>
        <CodeLine num={5}>
          {"  "}<span className="syn-property">period</span>
          <span className="syn-punctuation">:</span>{" "}
          <span className="syn-string">"2015 - 2019"</span>
        </CodeLine>
        <CodeLine num={6}>
          {"  "}<span className="syn-property">status</span>
          <span className="syn-punctuation">:</span>{" "}
          <span className="syn-number">completed</span>
        </CodeLine>
        <CodeLine num={7}>
          {"  "}<span className="syn-property">gpa_status</span>
          <span className="syn-punctuation">:</span>{" "}
          <span className="syn-string">"graduated"</span>
        </CodeLine>
      </div>
    </SectionPanel>
  );
}

/* ═══════════════════════════════════════════════════════
   CONTACT SECTION (shell script style)
   ═══════════════════════════════════════════════════════ */

function ContactSection() {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText("ryan.arethusa@gmail.com");
      setCopyState("copied");
      window.setTimeout(() => setCopyState("idle"), 1500);
    } catch {
      setCopyState("error");
      window.setTimeout(() => setCopyState("idle"), 1500);
    }
  }, []);

  return (
    <SectionPanel
      id="contact"
      fileName="contact.sh"
      command="bash contact.sh --open"
      icon={<ContactIcon size={14} />}
    >
      <div className="code-block mb-4">
        <CodeLine num={1}>
          <span className="syn-comment">#!/bin/bash</span>
        </CodeLine>
        <CodeLine num={2}>
          <span className="syn-comment"># Primary contact channel</span>
        </CodeLine>
        <CodeLine num={3}>{""}</CodeLine>
        <CodeLine num={4}>
          <span className="syn-keyword">export</span>{" "}
          <span className="syn-variable">EMAIL</span>
          <span className="syn-operator">=</span>
          <span className="syn-string">"ryan.arethusa@gmail.com"</span>
        </CodeLine>
        <CodeLine num={5}>{""}</CodeLine>
        <CodeLine num={6}>
          <span className="syn-function">echo</span>{" "}
          <span className="syn-string">"Best for collaboration, freelance"</span>
        </CodeLine>
        <CodeLine num={7}>
          <span className="syn-function">echo</span>{" "}
          <span className="syn-string">"opportunities, and engineering discussions."</span>
        </CodeLine>
      </div>

      <div className="flex flex-wrap gap-3">
        <a
          href="mailto:ryan.arethusa@gmail.com"
          className="btn-terminal btn-terminal--primary"
        >
          $ mailto $EMAIL
        </a>
        <button type="button" onClick={copyEmail} className="btn-terminal">
          {copyState === "idle"
            ? "$ echo $EMAIL | pbcopy"
            : copyState === "copied"
            ? "✓ Copied!"
            : "✗ Failed"}
        </button>
      </div>
    </SectionPanel>
  );
}

/* ═══════════════════════════════════════════════════════
   SOCIAL SECTION (env variables style)
   ═══════════════════════════════════════════════════════ */

function SocialSection() {
  return (
    <SectionPanel
      id="social"
      fileName=".env.social"
      command="source .env.social && echo $LINKS"
      icon={<SocialIcon size={14} />}
    >
      <div className="code-block mb-4">
        <CodeLine num={1}>
          <span className="syn-comment"># Social & Public Profiles</span>
        </CodeLine>
        {socials.map((s, i) => {
          const Icon = socialIcons[s.label];
          return (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={s.href.startsWith("mailto:") ? undefined : "noreferrer"}
              className="block hover:bg-[rgba(0,255,159,0.04)] transition-colors rounded"
            >
              <CodeLine num={i + 2}>
                <span className="syn-keyword">export</span>{" "}
                <span className="syn-variable">{s.envKey}</span>
                <span className="syn-operator">=</span>
                <span className="syn-string">
                  "{s.href.replace("mailto:", "").replace("https://", "")}"
                </span>
                {Icon && (
                  <span className="ml-2 text-cyan inline-flex align-middle">
                    <Icon size={12} />
                  </span>
                )}
              </CodeLine>
            </a>
          );
        })}
      </div>

      <div className="text-dim text-xs border-t border-[var(--border-dim)] pt-3 mt-4">
        © {new Date().getFullYear()} Arethusa Aryandhana — Built with React + TypeScript
      </div>
    </SectionPanel>
  );
}

/* ═══════════════════════════════════════════════════════
   STATUS BAR (bottom footer)
   ═══════════════════════════════════════════════════════ */

function StatusBar() {
  return (
    <footer className="terminal-footer">
      <div className="flex items-center gap-4">
        <span className="text-green">● main</span>
        <span>UTF-8</span>
        <span>TypeScript React</span>
      </div>
      <div className="flex items-center gap-4">
        <span>Ln 1, Col 1</span>
        <span>Spaces: 2</span>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════ */

function HomePage() {
  const { activeId } = useActiveSection();

  return (
    <div className="min-h-dvh flex flex-col">
      <MatrixRain />
      <Header activeId={activeId} />

      <div className="flex-1 flex flex-col">
        <div className="mx-auto w-full max-w-[1400px] flex-1 grid gap-0 xl:grid-cols-[240px_minmax(0,1fr)]">
          {/* Sidebar — desktop only */}
          <div className="hidden xl:block border-r border-[var(--border-dim)] overflow-y-auto">
            <div className="p-3">
              <Sidebar activeId={activeId} />
            </div>
          </div>

          {/* Main content */}
          <div className="flex flex-col min-w-0">
            <TabBar activeId={activeId} />

            <main className="flex-1 p-3 sm:p-4 lg:p-5 space-y-4">
              <HeroSection />
              <ProjectsSection />
              <ExperienceSection />
              <SkillsSection />
              <CertificatesSection />
              <EducationSection />
              <ContactSection />
              <SocialSection />
            </main>
          </div>
        </div>
      </div>

      <StatusBar />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   APP ROOT
   ═══════════════════════════════════════════════════════ */

export default function App() {
  useTheme();
  const location = useLocation();
  const reduced = useReducedMotion();

  const [booted, setBooted] = useState(() => {
    // Only show boot once per session
    return sessionStorage.getItem("aa-booted") === "true";
  });

  const handleBootComplete = useCallback(() => {
    sessionStorage.setItem("aa-booted", "true");
    setBooted(true);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {!booted ? (
        <BootSequence key="boot" onComplete={handleBootComplete} />
      ) : (
        <motion.div
          key={location.pathname}
          initial={reduced ? false : { opacity: 0 }}
          animate={reduced ? undefined : { opacity: 1 }}
          exit={reduced ? undefined : { opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <Routes location={location}>
            <Route path="*" element={<HomePage />} />
          </Routes>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
