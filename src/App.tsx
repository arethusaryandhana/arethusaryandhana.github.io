import {
  useCallback,
  useEffect,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import {
  BriefcaseIcon,
  CertificateIcon,
  GraduationIcon,
  ExternalLinkIcon,
} from "./icons";
import { techIcons, socialIcons } from "./iconMaps";
import { LanguageProvider } from "./components/LanguageProvider";
import { BrandLogo } from "./components/BrandLogo";
import { useLanguage } from "./i18n";
import { useTheme } from "./hooks/useTheme";
import type { ThemeMode } from "./lib/theme";

/* ═══════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════ */

const navItems = [
  { id: "about" },
  { id: "projects" },
  { id: "experience" },
  { id: "skills" },
  { id: "credentials" },
  { id: "contact" },
] as const;

const projects = [
  {
    name: "StackForge",
    tech: ["React", "Node.js", "TypeScript"],
    repo: "https://github.com/arethusaryandhana/stackforge",
  },
  {
    name: "Orderly POS",
    tech: ["React", "Redis", "WebSocket"],
    repo: "https://github.com/arethusaryandhana/orderly-pos",
  },
  {
    name: "API Sentinel",
    tech: ["Node.js", "PostgreSQL", "Docker"],
    repo: "https://github.com/arethusaryandhana/api-sentinel",
  },
];

const experienceCompanies = [
  "PT. Meratus Line",
  "PT. Meratus Line",
  "PT. Graha Multi Bintang",
  "PT. Graha Multi Bintang",
  "PT. SMART IT",
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
    key: "frontend",
    items: ["React", "Vue.js", "TypeScript"],
  },
  {
    key: "backend",
    items: ["Node.js", "PHP", "Laravel", ".NET", "Golang"],
  },
  {
    key: "database",
    items: ["PostgreSQL", "MySQL", "SQL Server", "MongoDB", "Redis"],
  },
  {
    key: "infra",
    items: ["Docker", "Kubernetes", "Kafka", "WebSocket"],
  },
];

const totalTechnologies = skillGroups.reduce((sum, group) => sum + group.items.length, 0);
const bootLineDelays = [0, 140, 280, 420];

/* ═══════════════════════════════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════════════════════════════ */

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: {
    transition: { staggerChildren: 0.07 },
  },
};

const staggerSlow = {
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

function useActiveSection() {
  const [activeId, setActiveId] = useState("about");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries.find((entry) => entry.isIntersecting);
        if (visibleSection) {
          setActiveId(visibleSection.target.id);
        }
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );

    document.querySelectorAll("section[id]").forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return activeId;
}

function handleCardMouseMove(event: MouseEvent<HTMLElement>) {
  const target = event.currentTarget;
  const rect = target.getBoundingClientRect();
  target.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
  target.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
}

function AmbientBackdrop() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      return;
    }

    let rafId = 0;
    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") {
        return;
      }

      if (rafId) {
        return;
      }

      rafId = window.requestAnimationFrame(() => {
        document.documentElement.style.setProperty("--mouse-x", `${event.clientX}px`);
        document.documentElement.style.setProperty("--mouse-y", `${event.clientY}px`);
        rafId = 0;
      });
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [reduced]);

  return (
    <div className="ambient-backdrop" aria-hidden="true">
      <div className="aurora-orb aurora-orb--1" />
      <div className="aurora-orb aurora-orb--2" />
      <div className="aurora-orb aurora-orb--3" />
      <div className="pointer-glow" />
    </div>
  );
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
      viewport={{ once: true, amount: 0.25 }}
      variants={stagger}
    >
      <motion.p className="eyebrow section-label" variants={fadeInUp} transition={{ duration: 0.45 }}>
        {label}
      </motion.p>
      <motion.h2 className="headline-lg section-title" variants={fadeInUp} transition={{ duration: 0.45 }}>
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p className="body-md section-subtitle" variants={fadeInUp} transition={{ duration: 0.45 }}>
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
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      {open ? (
        <>
          <path d="M6 6l12 12" />
          <path d="M18 6L6 18" />
        </>
      ) : (
        <>
          <path d="M4 7h16" />
          <path d="M4 12h16" />
          <path d="M4 17h16" />
        </>
      )}
    </svg>
  );
}

function ThemeIcon({ theme }: { theme: ThemeMode }) {
  if (theme === "dark") {
    return (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>
    );
  }

  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

function ChevronDown({ size = 16 }: { size?: number }) {
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
  const { t } = useLanguage();
  const lines = t.boot.lines;

  useEffect(() => {
    if (reduced) {
      onComplete();
      return;
    }

    const timers = lines.map((_, index) =>
      window.setTimeout(() => {
        setVisibleLines(index + 1);
        setProgress(Math.round(((index + 1) / lines.length) * 100));
      }, bootLineDelays[index]),
    );
    timers.push(window.setTimeout(onComplete, (bootLineDelays.at(-1) ?? 420) + 360));

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onComplete();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onComplete, reduced, lines]);

  return (
    <motion.div
      className="boot-screen"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onComplete}
    >
      <div className="boot-card" onClick={(event) => event.stopPropagation()}>
        <p className="boot-kicker">{t.boot.kicker}</p>
        {lines.slice(0, visibleLines).map((line) => (
          <motion.div
            key={line}
            className="boot-line"
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.12 }}
          >
            {line.includes("[READY]") ? (
              <>
                {line.replace("[READY]", "")}
                <span className="boot-check">[READY]</span>
              </>
            ) : line.includes("[OK]") ? (
              <>
                {line.replace("[OK]", "")}
                <span className="boot-ok">[OK]</span>
              </>
            ) : (
              line
            )}
          </motion.div>
        ))}
        <div className="boot-progress">
          <div className="boot-progress-bar" style={{ width: `${progress}%` }} />
        </div>
        <div className="boot-footer">
          <span className="boot-percent">
            {progress < 100 ? `${progress}% · ${t.boot.loading}` : `100% · ${t.boot.ready}`}
          </span>
          <button type="button" className="boot-skip" onClick={onComplete}>
            {t.boot.skip}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   NAVIGATION
   ═══════════════════════════════════════════════════════ */

function Navigation({
  activeId,
  theme,
  onToggleTheme,
}: {
  activeId: string;
  theme: ThemeMode;
  onToggleTheme: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });
  const themeLabel = theme === "dark" ? t.navigation.themeToLight : t.navigation.themeToDark;

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="nav">
      <div className="nav-inner">
        <button
          className="nav-logo"
          onClick={() => scrollTo("about")}
          type="button"
          aria-label={t.navigation.homeLabel}
        >
          <span className="nav-logo-mark">
            <BrandLogo size={34} />
          </span>
          <span className="nav-logo-text">Arethusa</span>
        </button>

        <div className={`nav-menu ${menuOpen ? "nav-menu--open" : ""}`}>
          <ul className="nav-links">
            {navItems.map((item, index) => (
              <li key={item.id}>
                <button
                  className={`nav-link ${activeId === item.id ? "nav-link--active" : ""}`}
                  onClick={() => scrollTo(item.id)}
                  type="button"
                >
                  {t.navigation.items[index]}
                </button>
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            <div className="language-switch" role="group" aria-label={t.navigation.languageLabel}>
              {(["en", "id"] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`language-option ${language === option ? "language-option--active" : ""}`}
                  aria-label={t.navigation.languageNames[option]}
                  aria-pressed={language === option}
                  title={t.navigation.languageNames[option]}
                  onClick={() => {
                    setLanguage(option);
                    setMenuOpen(false);
                  }}
                >
                  {option.toUpperCase()}
                </button>
              ))}
            </div>

            <button
              type="button"
              className="theme-toggle"
              onClick={onToggleTheme}
              aria-label={themeLabel}
              title={themeLabel}
            >
              <ThemeIcon theme={theme} />
            </button>

            <a className="nav-cta" href="mailto:ryan.arethusa@gmail.com">
              {t.navigation.contact}
            </a>
          </div>
        </div>

        <div className="nav-mobile-controls">
          <button
            type="button"
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-label={themeLabel}
            title={themeLabel}
          >
            <ThemeIcon theme={theme} />
          </button>

          <button
            type="button"
            className="nav-toggle"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={t.navigation.menuLabel}
            aria-expanded={menuOpen}
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </div>
      {!reduced && (
        <motion.div
          className="nav-scroll-progress"
          style={{ scaleX }}
          aria-hidden="true"
        />
      )}
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════════════════════════ */

function HeroSection() {
  const reduced = useReducedMotion();
  const { t } = useLanguage();

  const stats = [
    { value: "6+", label: t.hero.stats[0] },
    { value: `${totalTechnologies}+`, label: t.hero.stats[1] },
    { value: String(experienceCompanies.length), label: t.hero.stats[2] },
    { value: String(certificates.length), label: t.hero.stats[3] },
  ];

  return (
    <Section id="about" className="section--hero">
      <div className="hero-layout">
        <div className="hero-content">
          <motion.div initial={reduced ? false : "hidden"} animate="visible" variants={stagger}>
            <motion.div className="hero-meta-row" variants={fadeInUp} transition={{ duration: 0.45 }}>
              <span className="status-pill">
                <span className="status-dot" />
                {t.hero.status}
              </span>
              <span className="location-pill">{t.hero.location}</span>
            </motion.div>

            <motion.h1 className="headline-xl hero-name" variants={fadeInUp} transition={{ duration: 0.5 }}>
              Arethusa Aryandhana
            </motion.h1>

            <motion.p className="hero-role-line gradient-text" variants={fadeInUp} transition={{ duration: 0.5 }}>
              {t.hero.role} · {t.hero.title}
            </motion.p>

            <motion.p className="hero-desc" variants={fadeInUp} transition={{ duration: 0.5 }}>
              {t.hero.description}
            </motion.p>

            <motion.div className="hero-cta-row" variants={fadeInUp} transition={{ duration: 0.5 }}>
              <a
                href="#projects"
                className="btn-primary"
                onClick={(event) => {
                  event.preventDefault();
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {t.hero.viewWork}
                <ChevronDown />
              </a>
              <a href="mailto:ryan.arethusa@gmail.com" className="btn-secondary">
                {t.hero.email}
              </a>
            </motion.div>
          </motion.div>
        </div>

        <motion.aside
          className="hero-bento spotlight-card"
          onMouseMove={handleCardMouseMove}
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
        >
          <div className="hero-stats-grid">
            {stats.map((stat) => (
              <div key={stat.label} className="stat-card">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>

          <p className="hero-bento-heading">{t.hero.workLabel}</p>
          <ul className="hero-focus-list">
            {t.hero.workItems.map((item, index) => (
              <li key={item.title} className="hero-focus-item">
                <span className="hero-focus-num">0{index + 1}</span>
                <div>
                  <div className="hero-focus-title">{item.title}</div>
                  <div className="hero-focus-detail">{item.detail}</div>
                </div>
              </li>
            ))}
          </ul>
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
  const { t } = useLanguage();

  return (
    <Section id="projects" className="section--alt">
      <SectionHeader
        label={t.projects.label}
        title={t.projects.title}
        subtitle={t.projects.subtitle}
      />

      <motion.div
        className="projects-grid"
        initial={reduced ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={stagger}
      >
        {projects.map((project, index) => {
          const copy = t.projects.items[index];

          return (
            <motion.article key={project.name} variants={fadeInUp} transition={{ duration: 0.45 }}>
              <div className="project-card spotlight-card" onMouseMove={handleCardMouseMove}>
                <div className="project-card-top">
                  <span className="project-category">{copy.category}</span>
                  <span className="project-index">0{index + 1}</span>
                </div>

                <h3 className="project-title">{project.name}</h3>
                <p className="project-desc">{copy.description}</p>
                <p className="project-highlight">{copy.highlight}</p>

                <div className="project-footer">
                  <div className="tag-list">
                    {project.tech.map((tech) => {
                      const Icon = techIcons[tech];
                      return (
                        <span key={tech} className="tech-tag">
                          {Icon && <Icon size={14} />}
                          {tech}
                        </span>
                      );
                    })}
                  </div>

                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="project-link"
                    aria-label={t.projects.repositoryLabel.replace("{name}", project.name)}
                  >
                    <span>{t.projects.viewRepo}</span>
                    <ExternalLinkIcon size={14} />
                  </a>
                </div>
              </div>
            </motion.article>
          );
        })}
      </motion.div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════
   EXPERIENCE SECTION
   ═══════════════════════════════════════════════════════ */

function ExperienceSection() {
  const reduced = useReducedMotion();
  const { t } = useLanguage();

  return (
    <Section id="experience" className="section--base">
      <SectionHeader
        label={t.experience.label}
        title={t.experience.title}
        subtitle={t.experience.subtitle}
      />

      <motion.div
        className="timeline"
        initial={reduced ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerSlow}
      >
        {experienceCompanies.map((company, index) => {
          const item = t.experience.items[index];
          const isCurrent = index === 0;

          return (
            <motion.div
              key={`${company}-${item.role}-${index}`}
              className="timeline-item"
              variants={fadeInUp}
              transition={{ duration: 0.45 }}
            >
              <div className={`timeline-dot ${isCurrent ? "timeline-dot--current" : ""}`} />
              <div className="timeline-card spotlight-card" onMouseMove={handleCardMouseMove}>
                <div className="timeline-top">
                  <div>
                    <div className="timeline-role">{item.role}</div>
                    <div className="timeline-company">{company}</div>
                  </div>
                  <div className="timeline-meta">
                    <span className="timeline-period">{item.period}</span>
                    {isCurrent && (
                      <span className="timeline-current-badge">{t.experience.currentBadge}</span>
                    )}
                  </div>
                </div>
                <p className="timeline-summary">{item.summary}</p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════
   SKILLS SECTION
   ═══════════════════════════════════════════════════════ */

function SkillsSection() {
  const reduced = useReducedMotion();
  const { t } = useLanguage();

  return (
    <Section id="skills" className="section--alt">
      <SectionHeader
        label={t.skills.label}
        title={t.skills.title}
        subtitle={t.skills.subtitle}
      />

      <motion.div
        className="skills-bento"
        initial={reduced ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={stagger}
      >
        {skillGroups.map((group, index) => {
          const groupCopy = t.skills.groups[index];

          return (
            <motion.div
              key={group.key}
              className="skill-group-card spotlight-card"
              onMouseMove={handleCardMouseMove}
              variants={fadeInUp}
              transition={{ duration: 0.45 }}
            >
              <div className="skill-group-header">
                <h3 className="skill-group-title">{groupCopy.title}</h3>
                <p className="skill-group-desc">{groupCopy.description}</p>
              </div>

              <div className="skill-chips">
                {group.items.map((techName) => {
                  const Icon = techIcons[techName];
                  return (
                    <span key={techName} className="skill-chip">
                      <span className="skill-chip-icon">
                        {Icon ? <Icon size={18} /> : <BriefcaseIcon size={18} />}
                      </span>
                      <span>{techName}</span>
                    </span>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════
   CREDENTIALS SECTION (Education + Certificates)
   ═══════════════════════════════════════════════════════ */

function CredentialsSection() {
  const reduced = useReducedMotion();
  const { t } = useLanguage();

  return (
    <Section id="credentials" className="section--base">
      <SectionHeader
        label={t.credentials.label}
        title={t.credentials.title}
        subtitle={t.credentials.subtitle}
      />

      <div className="credentials-layout">
        <motion.div
          initial={reduced ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeInUp}
          transition={{ duration: 0.45 }}
        >
          <p className="credentials-col-label">{t.credentials.education}</p>
          <div className="edu-card spotlight-card" onMouseMove={handleCardMouseMove}>
            <div className="edu-top">
              <div className="edu-icon">
                <GraduationIcon size={22} />
              </div>
              <span className="edu-badge">{t.credentials.educationBadge}</span>
            </div>
            <h3 className="edu-degree">{t.credentials.degree}</h3>
            <div className="edu-university">{t.credentials.university}</div>
            <p className="edu-note">{t.credentials.educationNote}</p>
            <div className="edu-status">{t.credentials.graduated}</div>
          </div>
        </motion.div>

        <motion.div
          initial={reduced ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
        >
          <p className="credentials-col-label">{t.credentials.certsLabel}</p>
          <div className="certs-list">
            {certificates.map((cert) => (
              <motion.a
                key={cert.title}
                href={cert.href}
                target="_blank"
                rel="noreferrer"
                className="cert-card spotlight-card"
                onMouseMove={handleCardMouseMove}
                variants={fadeInUp}
                transition={{ duration: 0.4 }}
              >
                <div className="cert-main">
                  <div className="cert-icon">
                    <CertificateIcon size={20} />
                  </div>
                  <div>
                    <div className="cert-title">{cert.title}</div>
                    <div className="cert-meta">
                      <span>{cert.issuer}</span>
                      <span>·</span>
                      <span>{cert.year}</span>
                      <span>·</span>
                      <span className="cert-verified">✓ {t.credentials.verified}</span>
                    </div>
                  </div>
                </div>
                <span className="cert-arrow" aria-label={t.credentials.viewCert}>
                  <ExternalLinkIcon size={15} />
                </span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════
   CONTACT SECTION
   ═══════════════════════════════════════════════════════ */

function ContactSection() {
  const [copyState, setCopyState] = useState<"idle" | "copied">("idle");
  const reduced = useReducedMotion();
  const { t } = useLanguage();

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText("ryan.arethusa@gmail.com");
      setCopyState("copied");
      window.setTimeout(() => setCopyState("idle"), 2000);
    } catch {
      // Clipboard unavailable in restricted context.
    }
  }, []);

  return (
    <Section id="contact" className="section--alt">
      <SectionHeader
        label={t.contact.label}
        title={t.contact.title}
        subtitle={t.contact.description}
      />

      <motion.div
        className="contact-grid"
        initial={reduced ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
      >
        <motion.div
          className="contact-card spotlight-card"
          onMouseMove={handleCardMouseMove}
          variants={fadeInUp}
          transition={{ duration: 0.45 }}
        >
          <div>
            <div className="contact-field-label">{t.contact.email}</div>
            <a href="mailto:ryan.arethusa@gmail.com" className="contact-email">
              ryan.arethusa@gmail.com
            </a>
          </div>

          <div className="contact-cta-row">
            <a href="mailto:ryan.arethusa@gmail.com" className="btn-primary">
              <span>{t.contact.sendEmail}</span>
              <ArrowIcon />
            </a>
            <button onClick={copyEmail} className="btn-secondary" type="button">
              {copyState === "copied" ? `✓ ${t.contact.copiedEmail}` : t.contact.copyEmail}
            </button>
          </div>

          <div>
            <div className="contact-field-label">{t.contact.findMe}</div>
            <div className="contact-socials">
              {socials.map((social) => {
                const Icon = socialIcons[social.label];
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={social.href.startsWith("mailto:") ? undefined : "noreferrer"}
                    className="social-pill-link"
                  >
                    {Icon ? <Icon size={17} /> : social.label[0]}
                    <span>{social.label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </motion.div>

        <motion.aside
          className="contact-panel spotlight-card"
          onMouseMove={handleCardMouseMove}
          variants={fadeInUp}
          transition={{ duration: 0.45 }}
        >
          <div>
            <p className="eyebrow section-label">{t.contact.panelTitle}</p>
            <ul className="contact-panel-list">
              {t.contact.panelItems.map((item) => (
                <li key={item}>
                  <span className="contact-panel-check" aria-hidden="true">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="contact-location-box">
            <span className="contact-field-label" style={{ marginBottom: 0 }}>
              {t.contact.locationLabel}
            </span>
            <span className="contact-location-val">{t.contact.locationValue}</span>
          </div>
        </motion.aside>
      </motion.div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════ */

function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <BrandLogo size={24} />
          <p className="footer-text">© {new Date().getFullYear()} Arethusa Aryandhana</p>
        </div>
        <p className="footer-text footer-stack">{t.footer}</p>
        <div className="footer-links">
          {socials.map((social) => {
            const Icon = socialIcons[social.label];
            return (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={social.href.startsWith("mailto:") ? undefined : "noreferrer"}
                className="btn-icon"
                aria-label={social.label}
                title={social.label}
              >
                {Icon ? <Icon size={16} /> : social.label[0]}
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN PAGE & ROOT
   ═══════════════════════════════════════════════════════ */

function HomePage({
  theme,
  onToggleTheme,
}: {
  theme: ThemeMode;
  onToggleTheme: () => void;
}) {
  const activeId = useActiveSection();

  return (
    <div className="app-shell">
      <AmbientBackdrop />
      <Navigation activeId={activeId} theme={theme} onToggleTheme={onToggleTheme} />

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

function AppContent() {
  const reduced = useReducedMotion();
  const { theme, toggleTheme } = useTheme();
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
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <HomePage theme={theme} onToggleTheme={toggleTheme} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
