export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const stagger = {
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

export const staggerSlow = {
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};
