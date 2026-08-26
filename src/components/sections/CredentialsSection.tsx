import { motion, useReducedMotion } from "framer-motion";
import {
  certificates,
  credentialsSectionContent,
  education,
} from "../../content/credentials";
import { fadeInUp, stagger } from "../../lib/motion";
import { CertificateIcon, GraduationIcon } from "../../icons";
import { Section } from "../shared/Section";
import { SectionHeader } from "../shared/SectionHeader";

export function CredentialsSection() {
  const reduced = useReducedMotion();

  return (
    <Section id="credentials" className="section--gradient">
      <SectionHeader
        label={credentialsSectionContent.label}
        title={credentialsSectionContent.title}
        subtitle={credentialsSectionContent.subtitle}
      />

      <motion.div
        className="cert-list"
        initial={reduced ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={stagger}
      >
        {certificates.map((certificate) => (
          <motion.a
            key={certificate.title}
            href={certificate.href}
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
              <div className="cert-title">{certificate.title}</div>
              <div className="cert-meta">
                {certificate.issuer} · {certificate.year}
              </div>
              <div className="cert-verify">✓ Verified</div>
            </div>
          </motion.a>
        ))}
      </motion.div>

      <motion.div
        initial={reduced ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={stagger}
      >
        <motion.p className="label education-label" variants={fadeInUp} transition={{ duration: 0.5 }}>
          {credentialsSectionContent.educationLabel}
        </motion.p>
        <motion.div variants={fadeInUp} transition={{ duration: 0.5 }}>
          <div className="edu-card">
            <div className="education-header">
              <div className="cert-icon">
                <GraduationIcon size={20} />
              </div>
              <span className="eyebrow-text">
                {credentialsSectionContent.educationBadge}
              </span>
            </div>
            <div className="edu-degree">{education.degree}</div>
            <div className="edu-university">{education.university}</div>
            <div className="edu-period">{education.period}</div>
            <div className="edu-status">
              <span>🎓</span> {education.status}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
}
