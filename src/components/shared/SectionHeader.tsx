import { motion, useReducedMotion } from "framer-motion";
import { fadeInUp, stagger } from "../../lib/motion";

type SectionHeaderProps = {
  label: string;
  title: string;
  subtitle?: string;
};

export function SectionHeader({ label, title, subtitle }: SectionHeaderProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
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
