import { motion, useReducedMotion } from "framer-motion";
import { projects, projectsSectionContent } from "../../content/projects";
import { fadeInUp, stagger } from "../../lib/motion";
import { ExternalLinkIcon } from "../../icons";
import { Section } from "../shared/Section";
import { SectionHeader } from "../shared/SectionHeader";

export function ProjectsSection() {
  const reduced = useReducedMotion();

  return (
    <Section id="projects" className="section--gradient">
      <SectionHeader
        label={projectsSectionContent.label}
        title={projectsSectionContent.title}
        subtitle={projectsSectionContent.subtitle}
      />

      <motion.div
        className="projects-grid"
        initial={reduced ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={stagger}
      >
        {projects.map((project) => (
          <motion.div key={project.name} variants={fadeInUp} transition={{ duration: 0.5 }}>
            <div className="card project-card">
              <div className="project-card-main">
                <div className="project-card-header">
                  <h3 className="card-title">{project.name}</h3>
                  <div className="project-card-actions">
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-icon btn-icon--compact"
                      aria-label={`${project.name} repo`}
                    >
                      <ExternalLinkIcon size={14} />
                    </a>
                  </div>
                </div>
                <p className="card-desc">{project.desc}</p>
              </div>
              <div className="tag-list">
                {project.tech.map((tech) => (
                  <span key={tech} className="tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
