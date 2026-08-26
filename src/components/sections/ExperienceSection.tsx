import { motion, useReducedMotion } from "framer-motion";
import { experience, experienceSectionContent } from "../../content/experience";
import { fadeInUp, staggerSlow } from "../../lib/motion";
import { Section } from "../shared/Section";
import { SectionHeader } from "../shared/SectionHeader";

export function ExperienceSection() {
  const reduced = useReducedMotion();

  return (
    <Section id="experience" className="section--dark">
      <SectionHeader
        label={experienceSectionContent.label}
        title={experienceSectionContent.title}
        subtitle={experienceSectionContent.subtitle}
      />

      <motion.div
        className="timeline"
        initial={reduced ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerSlow}
      >
        {experience.map((item) => (
          <motion.div
            key={`${item.role}-${item.company}`}
            className="timeline-item"
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
          >
            <div className="timeline-dot" />
            <div className="timeline-card">
              <div className="timeline-role">{item.role}</div>
              <div className="timeline-company">{item.company}</div>
              <div className="timeline-period">{item.period}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
