import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  className?: string;
  children: ReactNode;
};

export function Section({ id, className = "", children }: SectionProps) {
  return (
    <section id={id} className={`section ${className}`}>
      <div className="section-inner">{children}</div>
    </section>
  );
}
