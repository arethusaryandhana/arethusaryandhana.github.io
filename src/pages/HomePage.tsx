import { useActiveSection } from "../hooks/useActiveSection";
import { Navigation } from "../components/layout/Navigation";
import { Footer } from "../components/layout/Footer";
import { AboutSection } from "../components/sections/AboutSection";
import { ProjectsSection } from "../components/sections/ProjectsSection";
import { ExperienceSection } from "../components/sections/ExperienceSection";
import { SkillsSection } from "../components/sections/SkillsSection";
import { CredentialsSection } from "../components/sections/CredentialsSection";
import { ContactSection } from "../components/sections/ContactSection";

export function HomePage() {
  const activeId = useActiveSection();

  return (
    <div className="page-shell">
      <Navigation activeId={activeId} />

      <main>
        <AboutSection />
        <div className="section-divider" />
        <ProjectsSection />
        <div className="section-divider" />
        <ExperienceSection />
        <div className="section-divider" />
        <SkillsSection />
        <div className="section-divider" />
        <CredentialsSection />
        <div className="section-divider" />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
