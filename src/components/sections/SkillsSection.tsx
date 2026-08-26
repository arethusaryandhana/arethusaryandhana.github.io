import { motion, useReducedMotion } from "framer-motion";
import { skillGroups, skillsSectionContent } from "../../content/skills";
import { fadeInUp, stagger } from "../../lib/motion";
import { techIcons, BriefcaseIcon } from "../../iconMaps";
import { Section } from "../shared/Section";
import { SectionHeader } from "../shared/SectionHeader";

export function SkillsSection() {
  const reduced = useReducedMotion();

  return (
    <Section id="skills" className="section--glow">
      <SectionHeader
        label={skillsSectionContent.label}
        title={skillsSectionContent.title}
        subtitle={skillsSectionContent.subtitle}
      />

      <motion.div
        className="skills-grid"
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
                    <div className="skill-icon">{Icon ? <Icon size={18} /> : <BriefcaseIcon size={18} />}</div>
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
