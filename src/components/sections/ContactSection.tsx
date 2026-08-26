import { useCallback, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { contactSectionContent } from "../../content/contact";
import { profile, socials } from "../../content/site";
import { fadeInUp, stagger } from "../../lib/motion";
import { Section } from "../shared/Section";
import { SocialLinks } from "../shared/SocialLinks";

function ArrowIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

export function ContactSection() {
  const [copyState, setCopyState] = useState<"idle" | "copied">("idle");
  const reduced = useReducedMotion();

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopyState("copied");
      window.setTimeout(() => setCopyState("idle"), 2000);
    } catch {
      // Clipboard access can fail in some browsers or contexts.
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
          {contactSectionContent.label}
        </motion.p>
        <motion.h2 className="headline-lg section-title gradient-text-subtle" variants={fadeInUp} transition={{ duration: 0.5 }}>
          {contactSectionContent.title}
        </motion.h2>
        <motion.p className="body-md contact-description" variants={fadeInUp} transition={{ duration: 0.5 }}>
          {contactSectionContent.description}
        </motion.p>

        <motion.div className="contact-grid" variants={fadeInUp} transition={{ duration: 0.5 }}>
          <div className="contact-info">
            <div>
              <div className="contact-meta-label">
                {contactSectionContent.emailLabel}
              </div>
              <a href={`mailto:${profile.email}`} className="contact-email">
                {profile.email}
              </a>
            </div>

            <div className="contact-action-row">
              <a href={`mailto:${profile.email}`} className="btn-primary">
                {contactSectionContent.sendEmailLabel}
                <ArrowIcon />
              </a>
              <button onClick={copyEmail} className="btn-secondary" type="button">
                {copyState === "copied"
                  ? contactSectionContent.copiedEmailLabel
                  : contactSectionContent.copyEmailLabel}
              </button>
            </div>

            <div>
              <div className="contact-meta-label contact-meta-label--spaced">
                {contactSectionContent.socialsLabel}
              </div>
              <SocialLinks links={socials} />
            </div>
          </div>

          <div className="code-card code-card--full">
            <div className="code-card-dots">
              <span />
              <span />
              <span />
            </div>
            <div className="code-card-note">
              <span className="syn-comment">{contactSectionContent.codeComment}</span>
            </div>
            <div>
              <span className="syn-keyword">const</span>{" "}
              <span className="syn-variable">contact</span>{" "}
              <span className="syn-operator">=</span>{" "}
              <span className="syn-punctuation">{"{"}</span>
            </div>
            <div className="code-card-indent">
              <span className="syn-property">email</span>
              <span className="syn-punctuation">:</span>{" "}
              <span className="syn-string">"{profile.email}"</span>
              <span className="syn-punctuation">,</span>
            </div>
            <div className="code-card-indent">
              <span className="syn-property">github</span>
              <span className="syn-punctuation">:</span>{" "}
              <span className="syn-string">"{profile.githubHandle}"</span>
              <span className="syn-punctuation">,</span>
            </div>
            <div className="code-card-indent">
              <span className="syn-property">status</span>
              <span className="syn-punctuation">:</span>{" "}
              <span className="syn-string">"{profile.status}"</span>
            </div>
            <div>
              <span className="syn-punctuation">{"}"}</span>
              <span className="syn-punctuation">;</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
}
