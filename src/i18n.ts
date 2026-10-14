import {
  createContext,
  useContext,
} from "react";

export type Language = "en" | "id";

type Translation = {
  meta: { title: string; description: string };
  navigation: {
    items: string[];
    contact: string;
    homeLabel: string;
    menuLabel: string;
    languageLabel: string;
    languageNames: Record<Language, string>;
  };
  boot: { kicker: string; lines: string[]; loading: string; ready: string };
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    focus: string;
    viewWork: string;
    email: string;
    stats: string[];
    workLabel: string;
    workItems: string[];
  };
  projects: {
    label: string;
    title: string;
    subtitle: string;
    repositoryLabel: string;
    descriptions: string[];
  };
  experience: {
    label: string;
    title: string;
    subtitle: string;
    roles: string[];
    periods: string[];
  };
  skills: { label: string; title: string; groups: string[] };
  credentials: {
    label: string;
    title: string;
    verified: string;
    education: string;
    educationBadge: string;
    degree: string;
    university: string;
    graduated: string;
  };
  contact: {
    label: string;
    title: string;
    description: string;
    email: string;
    findMe: string;
    sendEmail: string;
    copyEmail: string;
    copiedEmail: string;
    panelTitle: string;
    panelDescription: string;
    panelDetail: string;
  };
  footer: string;
};

export const translations: Record<Language, Translation> = {
  en: {
    meta: {
      title: "Arethusa Aryandhana — Full-Stack Developer",
      description:
        "Arethusa Aryandhana is a full-stack developer in Surabaya, Indonesia, working on web applications, APIs, and systems integration.",
    },
    navigation: {
      items: ["About", "Projects", "Experience", "Skills", "Credentials", "Contact"],
      contact: "Contact me",
      homeLabel: "Go to profile",
      menuLabel: "Toggle menu",
      languageLabel: "Select language",
      languageNames: { en: "English", id: "Bahasa Indonesia" },
    },
    boot: {
      kicker: "ARETHUSA ARYANDHANA / FULL-STACK DEVELOPER",
      lines: [
        "[sys] Initializing arethusa.dev...",
        "[cpu] Full-stack developer profile loaded",
        "[net] APIs and integrations ready [OK]",
        "[db] Database connected [OK]",
        "[ui] Portfolio ready [OK]",
        "[sys] Ready [READY]",
      ],
      loading: "Loading",
      ready: "Ready",
    },
    hero: {
      eyebrow: "Full-stack developer · Surabaya, Indonesia",
      title: "Web applications, APIs, and integrations.",
      description:
        "I build web applications and connect the APIs, services, and data behind them.",
      focus: "I work across frontend, backend, and data systems.",
      viewWork: "View selected work",
      email: "Email me",
      stats: ["Years of experience", "Roles", "Certifications", "Areas of work"],
      workLabel: "What I work on",
      workItems: [
        "Web applications",
        "APIs, middleware, and integrations",
        "Database and data-flow design",
        "Containers and deployment",
      ],
    },
    projects: {
      label: "Projects",
      title: "Selected projects",
      subtitle:
        "Projects for application scaffolding, retail point of sale, and API monitoring.",
      repositoryLabel: "Open {name} repository",
      descriptions: [
        "A project scaffolding tool with customizable templates for a team's application structure.",
        "A point-of-sale app that updates inventory in real time for retail teams.",
        "Monitors API uptime and response times, with alerts when an endpoint needs attention.",
      ],
    },
    experience: {
      label: "Experience",
      title: "Work history",
      subtitle:
        "Since 2019, I have held software roles at Meratus Line, Graha Multi Bintang, and SMART IT.",
      roles: [
        "Middleware, Database & API Tech",
        "Business Solutions Software Developer",
        "IT Developer Supervisor",
        "Senior Full-Stack Programmer",
        "Backend Software Developer",
      ],
      periods: [
        "Jun 2024 — Present",
        "Jul 2023 — May 2024",
        "Jan 2023 — Jun 2023",
        "Oct 2021 — Jan 2023",
        "Dec 2019 — Mar 2021",
      ],
    },
    skills: {
      label: "Skills",
      title: "Tools I use",
      groups: ["Frontend", "Backend", "Database", "Platform & Tools"],
    },
    credentials: {
      label: "Credentials",
      title: "Education and certifications",
      verified: "Verified",
      education: "Education",
      educationBadge: "Academic background",
      degree: "B.Sc. Computer Science",
      university: "Surabaya University",
      graduated: "Graduated",
    },
    contact: {
      label: "Contact",
      title: "Get in touch",
      description:
        "I welcome full-stack development and systems integration projects. Email me to discuss a project.",
      email: "Email",
      findMe: "Find me on",
      sendEmail: "Send email",
      copyEmail: "Copy email",
      copiedEmail: "✓ Copied!",
      panelTitle: "How I can help",
      panelDescription: "Web applications, APIs, middleware, and database work.",
      panelDetail: "I can also help with technical discovery.",
    },
    footer: "Built with React + TypeScript",
  },
  id: {
    meta: {
      title: "Arethusa Aryandhana — Pengembang Full-Stack",
      description:
        "Arethusa Aryandhana adalah pengembang full-stack di Surabaya, Indonesia, yang membangun aplikasi web, API, dan integrasi sistem.",
    },
    navigation: {
      items: ["Profil", "Proyek", "Pengalaman", "Keahlian", "Kualifikasi", "Kontak"],
      contact: "Hubungi saya",
      homeLabel: "Ke profil",
      menuLabel: "Buka atau tutup menu",
      languageLabel: "Pilih bahasa",
      languageNames: { en: "English", id: "Bahasa Indonesia" },
    },
    boot: {
      kicker: "ARETHUSA ARYANDHANA / PENGEMBANG FULL-STACK",
      lines: [
        "[sys] Menyiapkan arethusa.dev...",
        "[cpu] Profil pengembang full-stack dimuat",
        "[net] API dan integrasi siap [OK]",
        "[db] Basis data tersambung [OK]",
        "[ui] Portofolio siap [OK]",
        "[sys] Sistem siap [READY]",
      ],
      loading: "Memuat",
      ready: "Siap",
    },
    hero: {
      eyebrow: "Pengembang full-stack · Surabaya, Indonesia",
      title: "Aplikasi web, API, dan integrasi.",
      description:
        "Saya membangun aplikasi web dan menghubungkan API, layanan, serta data yang mendukungnya.",
      focus: "Saya bekerja di bidang frontend, backend, dan sistem data.",
      viewWork: "Lihat proyek pilihan",
      email: "Kirim email",
      stats: ["Tahun pengalaman", "Posisi", "Sertifikasi", "Area kerja"],
      workLabel: "Bidang pekerjaan",
      workItems: [
        "Aplikasi web",
        "API, middleware, dan integrasi",
        "Desain basis data dan alur data",
        "Kontainer dan deployment",
      ],
    },
    projects: {
      label: "Proyek",
      title: "Proyek pilihan",
      subtitle:
        "Proyek untuk menyiapkan struktur aplikasi, mengelola transaksi ritel, dan memantau API.",
      repositoryLabel: "Buka repositori {name}",
      descriptions: [
        "Alat untuk membuat struktur awal proyek dengan templat yang dapat disesuaikan sesuai kebutuhan tim.",
        "Aplikasi kasir dengan pembaruan stok secara langsung untuk tim ritel.",
        "Memantau ketersediaan dan waktu respons API, serta memberi notifikasi saat endpoint perlu ditangani.",
      ],
    },
    experience: {
      label: "Pengalaman",
      title: "Riwayat pekerjaan",
      subtitle:
        "Sejak 2019, saya bekerja di bidang pengembangan perangkat lunak di Meratus Line, Graha Multi Bintang, dan SMART IT.",
      roles: [
        "Middleware, Database & API Tech",
        "Pengembang Perangkat Lunak Solusi Bisnis",
        "Supervisor Pengembang TI",
        "Programmer Full-Stack Senior",
        "Pengembang Perangkat Lunak Backend",
      ],
      periods: [
        "Jun 2024 — sekarang",
        "Jul 2023 — Mei 2024",
        "Jan 2023 — Jun 2023",
        "Okt 2021 — Jan 2023",
        "Des 2019 — Mar 2021",
      ],
    },
    skills: {
      label: "Keahlian",
      title: "Teknologi yang saya gunakan",
      groups: ["Frontend", "Backend", "Basis Data", "Platform & Alat"],
    },
    credentials: {
      label: "Kualifikasi",
      title: "Pendidikan dan sertifikasi",
      verified: "Terverifikasi",
      education: "Pendidikan",
      educationBadge: "Latar belakang akademis",
      degree: "Sarjana Sains bidang Ilmu Komputer",
      university: "Universitas Surabaya",
      graduated: "Lulus",
    },
    contact: {
      label: "Kontak",
      title: "Hubungi saya",
      description:
        "Saya terbuka untuk proyek pengembangan full-stack dan integrasi sistem. Hubungi saya melalui email untuk membahas kebutuhan proyek Anda.",
      email: "Email",
      findMe: "Temukan saya di",
      sendEmail: "Kirim email",
      copyEmail: "Salin email",
      copiedEmail: "✓ Tersalin!",
      panelTitle: "Dukungan yang dapat saya berikan",
      panelDescription: "Aplikasi web, API, middleware, dan basis data.",
      panelDetail: "Saya juga dapat membantu analisis kebutuhan teknis.",
    },
    footer: "Dibuat dengan React + TypeScript",
  },
};

export type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: Translation;
};

export const LanguageContext = createContext<LanguageContextValue | null>(null);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return context;
}
