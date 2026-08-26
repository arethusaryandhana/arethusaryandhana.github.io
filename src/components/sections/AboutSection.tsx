import { motion, useReducedMotion } from "framer-motion";
import { aboutContent } from "../../content/about";
import { certificates } from "../../content/credentials";
import { experience } from "../../content/experience";
import { skillGroups } from "../../content/skills";
import { profile } from "../../content/site";
import { fadeIn, fadeInUp, stagger } from "../../lib/motion";
import { FloatingOrbs } from "../shared/FloatingOrbs";
import { Section } from "../shared/Section";
import { TypewriterText } from "../shared/TypewriterText";

function ChevronDown({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 8l5 5 5-5" />
    </svg>
  );
}

export function AboutSection() {
  const reduced = useReducedMotion();
  const totalTechnologies = skillGroups.reduce((total, group) => total + group.items.length, 0);
  const stats = [
    ...aboutContent.coreStats.slice(0, 1),
    { value: `${totalTechnologies}+`, label: "Technologies" },
    { value: String(certificates.length), label: "Certifications" },
    { value: String(experience.length), label: "Roles Held" },
  ];

  return (
    <Section id="about" className="section--hero">
      <FloatingOrbs />
      <div className="hero-content">
        <motion.div initial={reduced ? false : "hidden"} animate="visible" variants={stagger}>
          <motion.div variants={fadeInUp} transition={{ duration: 0.6 }}>
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              {profile.availability}
            </div>
          </motion.div>

          <motion.h1 className="headline-xl hero-name gradient-text" variants={fadeInUp} transition={{ duration: 0.6 }}>
            {profile.firstName}
            <br />
            {profile.lastName}
          </motion.h1>

          <motion.p className="hero-title" variants={fadeInUp} transition={{ duration: 0.6 }}>
            {profile.title}
          </motion.p>

          <motion.p className="hero-desc" variants={fadeInUp} transition={{ duration: 0.6 }}>
            {aboutContent.description}
          </motion.p>

          <motion.div variants={fadeIn} transition={{ duration: 0.4, delay: 0.6 }}>
            <TypewriterText items={aboutContent.typewriterPhrases} />
          </motion.div>

          <motion.div className="hero-cta-row" variants={fadeInUp} transition={{ duration: 0.6 }}>
            <a
              href="#projects"
              className="btn-primary"
              onClick={(event) => {
                event.preventDefault();
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              View My Work
              <ChevronDown size={16} />
            </a>
            <a href={`mailto:${profile.email}`} className="btn-secondary">
              Get In Touch
            </a>
          </motion.div>

          <motion.div className="stats-row" variants={fadeInUp} transition={{ duration: 0.7, delay: 0.3 }}>
            {stats.map((stat) => (
              <div key={stat.label} className="stat-item">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          <motion.div variants={fadeInUp} transition={{ duration: 0.7, delay: 0.5 }}>
            <div className="code-card">
              <div className="code-card-dots">
                <span />
                <span />
                <span />
              </div>
              <div>
                <span className="syn-keyword">const</span>{" "}
                <span className="syn-variable">arethusa</span>{" "}
                <span className="syn-operator">=</span>{" "}
                <span className="syn-punctuation">{"{"}</span>
              </div>
              <div className="code-card-indent">
                <span className="syn-property">role</span>
                <span className="syn-punctuation">:</span>{" "}
                <span className="syn-string">"{profile.title}"</span>
                <span className="syn-punctuation">,</span>
              </div>
              <div className="code-card-indent">
                <span className="syn-property">experience</span>
                <span className="syn-punctuation">:</span>{" "}
                <span className="syn-string">"{profile.yearsExperience}"</span>
                <span className="syn-punctuation">,</span>
              </div>
              <div className="code-card-indent">
                <span className="syn-property">focus</span>
                <span className="syn-punctuation">:</span>{" "}
                <span className="syn-punctuation">[</span>
                {aboutContent.focusAreas.map((focusArea, index) => (
                  <span key={focusArea}>
                    <span className="syn-string">"{focusArea}"</span>
                    {index < aboutContent.focusAreas.length - 1 && <span className="syn-punctuation">, </span>}
                  </span>
                ))}
                <span className="syn-punctuation">]</span>
                <span className="syn-punctuation">,</span>
              </div>
              <div className="code-card-indent">
                <span className="syn-property">location</span>
                <span className="syn-punctuation">:</span>{" "}
                <span className="syn-string">"{profile.locationDisplay}"</span>
              </div>
              <div>
                <span className="syn-punctuation">{"}"}</span>
                <span className="syn-punctuation">;</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}
