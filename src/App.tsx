import {
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  techIcons,
  socialIcons,
  BriefcaseIcon,
  CertificateIcon,
  GraduationIcon,
  ExternalLinkIcon,
} from "./icons";

/* ═══════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════ */

const navItems = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "credentials", label: "Credentials" },
  { id: "contact", label: "Contact" },
];

const projects = [
  {
    name: "StackForge",
    desc: "A full-stack project scaffolding tool that helps teams spin up production-ready apps in minutes with customizable templates.",
    tech: ["React", "Node.js", "TypeScript"],
    repo: "https://github.com/arethusaryandhana/stackforge",
    live: "https://stackforge.example.com",
  },
  {
    name: "Orderly POS",
    desc: "Point-of-sale system with real-time inventory tracking, built for retail businesses that need speed and reliability.",
    tech: ["React", "Redis", "WebSocket"],
    repo: "https://github.com/arethusaryandhana/orderly-pos",
    live: "https://orderly.example.com",
  },
  {
    name: "API Sentinel",
    desc: "API monitoring dashboard that watches your endpoints 24/7, with smart alerts and performance analytics.",
    tech: ["Node.js", "PostgreSQL", "Docker"],
    repo: "https://github.com/arethusaryandhana/api-sentinel",
    live: "https://sentinel.example.com",
  },
];

const experience = [
  {
    role: "Middleware, Database & API Tech",
    company: "PT. Meratus Line",
    period: "Jun 2024 — Present",
  },
  {
    role: "Business Solution Software Developer",
    company: "PT. Meratus Line",
    period: "Jul 2023 — May 2024",
  },
  {
    role: "IT Developer Supervisor",
    company: "PT. Graha Multi Bintang",
    period: "Jan 2023 — Jun 2023",
  },
  {
    role: "Senior Full Stack Programmer",
    company: "PT. Graha Multi Bintang",
    period: "Oct 2021 — Jan 2023",
  },
  {
    role: "Backend Software Developer",
    company: "PT. SMART IT",
    period: "Dec 2019 — Mar 2021",
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
  { label: "LinkedIn", href: "https://www.linkedin.com/in/arethusa-aryandhana/" },
  { label: "Email", href: "mailto:ryan.arethusa@gmail.com" },
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
    label: "Database",
    items: [
      { name: "PostgreSQL", level: 88 },
      { name: "MySQL", level: 85 },
      { name: "SQL Server", level: 80 },
      { name: "MongoDB", level: 72 },
      { name: "Redis", level: 78 },
    ],
  },
  {
    label: "Platform & Tools",
    items: [
      { name: "Docker", level: 85 },
      { name: "Kubernetes", level: 70 },
      { name: "Kafka", level: 72 },
      { name: "WebSocket", level: 82 },
    ],
  },
];

const bootLines = [
  { text: "[sys] Initializing arethusa.dev...", delay: 0 },
  { text: "[cpu] Full-stack systems profile loaded", delay: 160 },
  { text: "[net] Integration services ready [OK]", delay: 320 },
  { text: "[db] Data layer connected [OK]", delay: 480 },
  { text: "[ui] Interface ready [OK]", delay: 640 },
  { text: "[sys] All systems running [READY]", delay: 800 },
];

/* ═══════════════════════════════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════════════════════════════ */

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const stagger = {
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const staggerSlow = {
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

function useActiveSection() {
  const [activeId, setActiveId] = useState("about");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries.find((entry) => entry.isIntersecting);
        if (visibleSection) setActiveId(visibleSection.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px" },
    );

    document.querySelectorAll("section[id]").forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return activeId;
}

/* ═══════════════════════════════════════════════════════
   SHARED COMPONENTS
   ═══════════════════════════════════════════════════════ */

function Section({
  id,
  className = "",
  children,
}: {
  id: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`section ${className}`}>
      <div className="section-inner">{children}</div>
    </section>
  );
}

function SectionHeader({
  label,
  title,
  subtitle,
}: {
  label: string;
  title: string;
  subtitle?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className="section-header"
      initial={reduced ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={stagger}
    >
      <motion.p className="label section-label" variants={fadeInUp} transition={{ duration: 0.5 }}>
        {label}
      </motion.p>
      <motion.h2 className="headline-lg section-title gradient-text-subtle" variants={fadeInUp} transition={{ duration: 0.5 }}>
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p className="body-md section-subtitle" variants={fadeInUp} transition={{ duration: 0.5 }}>
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}

function ArrowIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      {open ? (
        <>
          <path d="M6 6l12 12" />
          <path d="M18 6L6 18" />
        </>
      ) : (
        <>
          <path d="M4 8h16" />
          <path d="M4 16h16" />
        </>
      )}
    </svg>
  );
}

function ChevronDown({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 8l5 5 5-5" />
    </svg>
  );
}

function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [progress, setProgress] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      onComplete();
      return;
    }

    const timers = bootLines.map((line, index) =>
      window.setTimeout(() => {
        setVisibleLines(index + 1);
        setProgress(Math.round(((index + 1) / bootLines.length) * 100));
      }, line.delay),
    );
    timers.push(window.setTimeout(onComplete, 1350));

    return () => timers.forEach(clearTimeout);
  }, [onComplete, reduced]);

  return (
    <motion.div className="boot-screen" exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
      <div className="boot-content">
        <p className="boot-kicker">ARETHUSA ARYANDHANA / SYSTEMS PORTFOLIO</p>
        {bootLines.slice(0, visibleLines).map((line) => (
          <motion.div
            key={line.text}
            className="boot-line"
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.14 }}
          >
            {line.text.includes("[READY]") ? (
              <>
                {line.text.replace("[READY]", "")}
                <span className="boot-check">[READY]</span>
              </>
            ) : line.text.includes("[OK]") ? (
              <>
                {line.text.replace("[OK]", "")}
                <span className="boot-ok">[OK]</span>
              </>
            ) : line.text}
          </motion.div>
        ))}
        <div className="boot-progress">
          <div className="boot-progress-bar" style={{ width: `${progress}%` }} />
        </div>
        <div className="boot-percent">{progress < 100 ? `${progress}% / Loading` : "100% / Ready"}</div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   NAVIGATION
   ═══════════════════════════════════════════════════════ */

function Navigation({ activeId }: { activeId: string }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const section = document.getElementById(id);
    if (section) window.scrollTo({ top: section.offsetTop, behavior: "smooth" });
  };

  return (
    <nav className="nav">
      <div className="nav-inner">
        <button className="nav-logo" onClick={() => scrollTo("about")} type="button" aria-label="Go to home">
          A.
        </button>

        <ul className={`nav-links ${menuOpen ? "nav-links--open" : ""}`}>
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                className={`nav-link ${activeId === item.id ? "nav-link--active" : ""}`}
                onClick={() => scrollTo(item.id)}
                type="button"
              >
                {item.label}
              </button>
            </li>
          ))}
          <li>
            <a
              className="nav-cta"
              href="mailto:ryan.arethusa@gmail.com"
            >
              Hire Me
            </a>
          </li>
        </ul>

        <button
          className="nav-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <MenuIcon open={menuOpen} />
        </button>
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════════════════════════ */

function HeroSection() {
  const reduced = useReducedMotion();

  return (
    <Section id="about" className="section--hero">
      <div className="hero-layout">
      <div className="hero-content">
        <motion.div
          initial={reduced ? false : "hidden"}
          animate="visible"
          variants={stagger}
        >
          <motion.div variants={fadeInUp} transition={{ duration: 0.6 }}>
            <p className="label hero-eyebrow">Full-stack developer · Surabaya, Indonesia</p>
          </motion.div>

          <motion.h1 className="headline-xl hero-name" variants={fadeInUp} transition={{ duration: 0.6 }}>
            Arethusa
            <br />
            Aryandhana
          </motion.h1>

          {/* Title */}
          <motion.p className="hero-title" variants={fadeInUp} transition={{ duration: 0.6 }}>
            Software systems, integrations, and web applications.
          </motion.p>

          {/* Description */}
          <motion.p className="hero-desc" variants={fadeInUp} transition={{ duration: 0.6 }}>
            I build dependable products for teams that need clarity across their interfaces, APIs, integrations, and data infrastructure.
          </motion.p>

          <motion.p className="hero-focus" variants={fadeIn} transition={{ duration: 0.4, delay: 0.6 }}>
            Focused on practical, maintainable software delivery.
          </motion.p>

          {/* CTA */}
          <motion.div className="hero-cta-row" variants={fadeInUp} transition={{ duration: 0.6 }}>
            <a href="#projects" className="btn-primary" onClick={(event) => { event.preventDefault(); const section = document.getElementById("projects"); if (section) window.scrollTo({ top: section.offsetTop, behavior: "smooth" }); }}>
              View selected work
              <ChevronDown size={16} />
            </a>
            <a href="mailto:ryan.arethusa@gmail.com" className="btn-secondary">
              Start a conversation
            </a>
          </motion.div>

        </motion.div>
      </div>
        <motion.aside
          className="hero-summary"
          initial={reduced ? false : { opacity: 0, x: 20 }}
          animate={reduced ? undefined : { opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="stats-row hero-stats">
            {[
              { value: "5+", label: "Years Experience" },
              { value: "5", label: "Professional Roles" },
              { value: "5", label: "Certifications" },
              { value: "4", label: "Technical Domains" },
            ].map((stat) => (
              <div key={stat.label} className="stat-item">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
          <p className="label">Core capabilities</p>
          <ul>
            <li><span>01</span> Product-oriented web applications</li>
            <li><span>02</span> APIs, middleware, and integrations</li>
            <li><span>03</span> Database and data-flow design</li>
            <li><span>04</span> Containerised platform delivery</li>
          </ul>
          <p className="hero-summary-note">Turning complex operational needs into reliable software.</p>
        </motion.aside>
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════
   PROJECTS SECTION
   ═══════════════════════════════════════════════════════ */

function ProjectsSection() {
  const reduced = useReducedMotion();

  return (
    <Section id="projects" className="section--gradient">
      <SectionHeader
        label="Selected work"
        title="Systems built for real operations"
        subtitle="A selection of product and platform work across the modern web stack."
      />

      <motion.div
        style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))" }}
        initial={reduced ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={stagger}
      >
        {projects.map((p) => (
          <motion.div key={p.name} variants={fadeInUp} transition={{ duration: 0.5 }}>
            <div className="card" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                  <h3 className="card-title">{p.name}</h3>
                  <div style={{ display: "flex", gap: 8 }}>
                    <a href={p.repo} target="_blank" rel="noreferrer" className="btn-icon" style={{ width: 32, height: 32 }} aria-label={`${p.name} repo`}>
                      <ExternalLinkIcon size={14} />
                    </a>
                  </div>
                </div>
                <p className="card-desc">{p.desc}</p>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {p.tech.map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════
   EXPERIENCE SECTION
   ═══════════════════════════════════════════════════════ */

function ExperienceSection() {
  const reduced = useReducedMotion();

  return (
    <Section id="experience" className="section--dark">
      <SectionHeader
        label="Experience"
        title="Professional track record"
        subtitle="Over five years building software and business solutions across multiple industries."
      />

      <motion.div
        className="timeline"
        initial={reduced ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerSlow}
      >
        {experience.map((exp) => (
          <motion.div
            key={`${exp.role}-${exp.company}`}
            className="timeline-item"
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
          >
            <div className="timeline-dot" />
            <div className="timeline-card">
              <div className="timeline-role">{exp.role}</div>
              <div className="timeline-company">{exp.company}</div>
              <div className="timeline-period">{exp.period}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════
   SKILLS SECTION
   ═══════════════════════════════════════════════════════ */

function SkillsSection() {
  const reduced = useReducedMotion();

  return (
    <Section id="skills" className="section--glow">
      <SectionHeader
        label="Technical expertise"
        title="Tools chosen for the job"
        subtitle="A practical toolkit across frontend, backend, data, and platform delivery."
      />

      <motion.div
        style={{ display: "grid", gap: 24, gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}
        initial={reduced ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={stagger}
      >
        {skillGroups.map((group) => (
          <motion.div key={group.label} variants={fadeInUp} transition={{ duration: 0.5 }}>
            <div className="card">
              <div className="skills-group-title">{group.label}</div>
              {group.items.map((item) => {
                const Icon = techIcons[item.name];
                return (
                  <div key={item.name} className="skill-item">
                    <div className="skill-icon">
                      {Icon ? <Icon size={18} /> : <BriefcaseIcon size={18} />}
                    </div>
                    <span className="skill-name">{item.name}</span>
                    <div className="skill-bar-track">
                      <motion.div
                        className="skill-bar-fill"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.level}%` }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════
   CREDENTIALS SECTION (Certificates + Education)
   ═══════════════════════════════════════════════════════ */

function CredentialsSection() {
  const reduced = useReducedMotion();

  return (
    <Section id="credentials" className="section--gradient">
      <SectionHeader
        label="Credentials"
        title="Credentials and education"
        subtitle="Professional certifications and academic background."
      />

      {/* Certificates */}
      <motion.div
        style={{ display: "grid", gap: 12, marginBottom: 60 }}
        initial={reduced ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={stagger}
      >
        {certificates.map((cert) => (
          <motion.a
            key={cert.title}
            href={cert.href}
            target="_blank"
            rel="noreferrer"
            className="cert-card"
            variants={fadeInUp}
            transition={{ duration: 0.4 }}
          >
            <div className="cert-icon">
              <CertificateIcon size={20} />
            </div>
            <div>
              <div className="cert-title">{cert.title}</div>
              <div className="cert-meta">
                {cert.issuer} · {cert.year}
              </div>
              <div className="cert-verify">
                ✓ Verified
              </div>
            </div>
          </motion.a>
        ))}
      </motion.div>

      {/* Education */}
      <motion.div
        initial={reduced ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={stagger}
      >
        <motion.p className="label" style={{ marginBottom: 16 }} variants={fadeInUp} transition={{ duration: 0.5 }}>
          Education
        </motion.p>
        <motion.div variants={fadeInUp} transition={{ duration: 0.5 }}>
          <div className="edu-card">
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div className="cert-icon">
                <GraduationIcon size={20} />
              </div>
              <span style={{ fontSize: 13, color: "var(--text-tertiary)" }}>Academic Background</span>
            </div>
            <div className="edu-degree">B.Sc. Computer Science</div>
            <div className="edu-university">Surabaya University</div>
            <div className="edu-period">2015 — 2019</div>
            <div className="edu-status">
              <span>🎓</span> Graduated
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════
   CONTACT SECTION
   ═══════════════════════════════════════════════════════ */

function ContactSection() {
  const [copyState, setCopyState] = useState<"idle" | "copied">("idle");
  const reduced = useReducedMotion();

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText("ryan.arethusa@gmail.com");
      setCopyState("copied");
      window.setTimeout(() => setCopyState("idle"), 2000);
    } catch {
      // fallback - do nothing
    }
  }, []);

  return (
    <Section id="contact" className="section--dark">
      <motion.div
        initial={reduced ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={stagger}
      >
        <motion.p className="label section-label" variants={fadeInUp} transition={{ duration: 0.5 }}>
          Contact
        </motion.p>
        <motion.h2 className="headline-lg section-title gradient-text-subtle" variants={fadeInUp} transition={{ duration: 0.5 }}>
          Let’s discuss your next project
        </motion.h2>
        <motion.p className="body-md" style={{ maxWidth: 560, marginBottom: 48 }} variants={fadeInUp} transition={{ duration: 0.5 }}>
          I’m available to discuss software development, systems integration, and technical discovery for your next initiative.
        </motion.p>

        <motion.div className="contact-grid" variants={fadeInUp} transition={{ duration: 0.5 }}>
          <div className="contact-info">
            <div>
              <div style={{ fontSize: 13, color: "var(--text-tertiary)", marginBottom: 8 }}>Email</div>
              <a href="mailto:ryan.arethusa@gmail.com" className="contact-email">
                ryan.arethusa@gmail.com
              </a>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <a href="mailto:ryan.arethusa@gmail.com" className="btn-primary">
                Send Email
                <ArrowIcon />
              </a>
              <button onClick={copyEmail} className="btn-secondary" type="button">
                {copyState === "copied" ? "✓ Copied!" : "Copy Email"}
              </button>
            </div>

            <div>
              <div style={{ fontSize: 13, color: "var(--text-tertiary)", marginBottom: 12 }}>Find me on</div>
              <div className="social-links">
                {socials.map((s) => {
                  const Icon = socialIcons[s.label];
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                      rel={s.href.startsWith("mailto:") ? undefined : "noreferrer"}
                      className="btn-icon"
                      aria-label={s.label}
                      title={s.label}
                    >
                      {Icon ? <Icon size={20} /> : s.label[0]}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <aside className="contact-panel">
            <p className="label">A practical partnership</p>
            <p>I work comfortably across product, platform, and integration concerns—especially where reliability and maintainability matter.</p>
            <div className="contact-panel-detail">Typically available for full-stack development, integration work, and technical discovery.</div>
          </aside>
        </motion.div>
      </motion.div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════ */

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <p className="footer-text">
          © {new Date().getFullYear()} Arethusa Aryandhana
        </p>
        <p className="footer-text" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>
          Built with React + TypeScript
        </p>
        <div className="footer-links">
          {socials.map((s) => {
            const Icon = socialIcons[s.label];
            return (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={s.href.startsWith("mailto:") ? undefined : "noreferrer"}
                className="btn-icon"
                style={{ width: 36, height: 36 }}
                aria-label={s.label}
              >
                {Icon ? <Icon size={16} /> : s.label[0]}
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════ */

function HomePage() {
  const activeId = useActiveSection();

  return (
    <div className="app-shell">
      <Navigation activeId={activeId} />

      <main>
        <HeroSection />
        <ProjectsSection />
        <ExperienceSection />
        <SkillsSection />
        <CredentialsSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   APP ROOT
   ═══════════════════════════════════════════════════════ */

export default function App() {
  const reduced = useReducedMotion();
  const [booted, setBooted] = useState(() => sessionStorage.getItem("aa-booted") === "true");
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
          key="app"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <HomePage />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
