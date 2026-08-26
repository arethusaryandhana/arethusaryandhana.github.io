import { useReducedMotion } from "framer-motion";

export function FloatingOrbs() {
  const reduced = useReducedMotion();

  if (reduced) {
    return null;
  }

  return (
    <div className="orbs-container">
      <div className="orb orb--1" />
      <div className="orb orb--2" />
      <div className="orb orb--3" />
    </div>
  );
}
