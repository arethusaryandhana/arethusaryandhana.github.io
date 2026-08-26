export const profile = {
  fullName: "Arethusa Aryandhana",
  firstName: "Arethusa",
  lastName: "Aryandhana",
  title: "Full-Stack Developer",
  email: "ryan.arethusa@gmail.com",
  githubHandle: "arethusaryandhana",
  githubUrl: "https://github.com/arethusaryandhana",
  linkedInUrl: "https://www.linkedin.com/in/arethusa-aryandhana/",
  locationDisplay: "Indonesia 🇮🇩",
  availability: "Available for new opportunities",
  yearsExperience: "5+ years",
  status: "open to work",
};

export const navItems = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "credentials", label: "Credentials" },
  { id: "contact", label: "Contact" },
];

export const socials = [
  { label: "GitHub", href: profile.githubUrl },
  { label: "LinkedIn", href: profile.linkedInUrl },
  { label: "Email", href: `mailto:${profile.email}` },
];

export const bootLines = [
  { text: "[sys] Initializing arethusa.dev v2.0...", delay: 0 },
  { text: `[cpu] ${profile.title} · ${profile.yearsExperience}`, delay: 180 },
  { text: "[mem] JavaScript · TypeScript · Go · PHP · C#", delay: 350 },
  { text: "[net] Connecting services... [OK]", delay: 520 },
  { text: "[gpu] Rendering interface... [OK]", delay: 680 },
  { text: "[sys] All systems ready ✓", delay: 850 },
];
