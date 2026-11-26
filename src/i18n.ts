import { createContext, useContext } from "react";

export type Language = "en" | "id";

export type Translation = {
  meta: {
    title: string;
    description: string;
  };
  navigation: {
    items: string[];
    contact: string;
    homeLabel: string;
    menuLabel: string;
    languageLabel: string;
    languageNames: Record<Language, string>;
    themeToLight: string;
    themeToDark: string;
  };
  boot: {
    kicker: string;
    lines: string[];
    loading: string;
    ready: string;
    skip: string;
  };
  hero: {
    status: string;
    location: string;
    role: string;
    title: string;
    description: string;
    viewWork: string;
    email: string;
    stats: string[];
    workLabel: string;
    workItems: Array<{ title: string; detail: string }>;
  };
  projects: {
    label: string;
    title: string;
    subtitle: string;
    viewRepo: string;
    repositoryLabel: string;
    items: Array<{
      category: string;
      description: string;
      highlight: string;
    }>;
  };
  experience: {
    label: string;
    title: string;
    subtitle: string;
    currentBadge: string;
    items: Array<{
      role: string;
      period: string;
      summary: string;
    }>;
  };
  skills: {
    label: string;
    title: string;
    subtitle: string;
    groups: Array<{
      title: string;
      description: string;
    }>;
  };
  credentials: {
    label: string;
    title: string;
    subtitle: string;
    certsLabel: string;
    verified: string;
    viewCert: string;
    education: string;
    educationBadge: string;
    degree: string;
    university: string;
    graduated: string;
    educationNote: string;
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
    panelItems: string[];
    locationLabel: string;
    locationValue: string;
  };
  footer: string;
};

export const translations: Record<Language, Translation> = {
  en: {
    meta: {
      title: "Arethusa Aryandhana | Full-Stack Developer",
      description:
        "Arethusa Aryandhana is a full-stack developer based in Surabaya, Indonesia, building web applications, APIs, middleware, and database systems.",
    },
    navigation: {
      items: ["About", "Projects", "Experience", "Skills", "Credentials", "Contact"],
      contact: "Get in touch",
      homeLabel: "Back to top",
      menuLabel: "Toggle navigation menu",
      languageLabel: "Select language",
      languageNames: { en: "English", id: "Bahasa Indonesia" },
      themeToLight: "Switch to light mode",
      themeToDark: "Switch to dark mode",
    },
    boot: {
      kicker: "ARETHUSA ARYANDHANA / FULL-STACK DEVELOPER",
      lines: [
        "[sys] Initializing arethusa.dev...",
        "[cpu] Loading full-stack profile [OK]",
        "[net] Connecting APIs & middleware [OK]",
        "[ui] Preparing interface [READY]",
      ],
      loading: "Loading",
      ready: "Ready",
      skip: "Skip intro",
    },
    hero: {
      status: "Open to projects & engineering roles",
      location: "Surabaya, Indonesia",
      role: "Full-Stack Developer",
      title: "Building dependable web apps and the systems behind them.",
      description:
        "For over six years, I have built software end to end: from React and TypeScript interfaces to the APIs, middleware, and databases that keep daily business operations running.",
      viewWork: "Explore Projects",
      email: "Send Email",
      stats: ["Years Experience", "Core Technologies", "Industry Roles", "Certifications"],
      workLabel: "Core Focus",
      workItems: [
        {
          title: "Web Applications",
          detail: "Responsive dashboards and internal tools with React, Vue, and TypeScript.",
        },
        {
          title: "APIs & Middleware",
          detail: "Reliable service bridges using Node.js, PHP/Laravel, .NET, and Go.",
        },
        {
          title: "Database & Data Flow",
          detail: "Schema design, query tuning, and caching across PostgreSQL, SQL Server, and Redis.",
        },
        {
          title: "Containers & Deployment",
          detail: "Predictable releases with Docker, Kubernetes, and event-driven Kafka streams.",
        },
      ],
    },
    projects: {
      label: "Projects",
      title: "Selected Projects",
      subtitle:
        "Tools and applications built around developer productivity, live retail operations, and service reliability.",
      viewRepo: "View on GitHub",
      repositoryLabel: "Open {name} repository on GitHub",
      items: [
        {
          category: "Developer Tooling",
          description:
            "A project scaffolder that sets up new repositories from customizable team templates. Developers can skip repetitive setup and start shipping features with a consistent structure from day one.",
          highlight: "Standardizes folder layout, base configs, and starter dependencies.",
        },
        {
          category: "Retail & Real-Time",
          description:
            "A web point-of-sale application for retail stores backed by Redis and WebSockets. Every checkout updates inventory counts live so cashiers and stockrooms stay in sync without page reloads.",
          highlight: "Live multi-register stock updates powered by Redis and WebSockets.",
        },
        {
          category: "API Monitoring",
          description:
            "An uptime and latency monitor that tracks HTTP endpoint health in PostgreSQL. Sends automated alerts when responses slow down or fail so teams can step in before users hit errors.",
          highlight: "Historical latency tracking and early failure alerts in Docker.",
        },
      ],
    },
    experience: {
      label: "Experience",
      title: "Work Experience",
      subtitle:
        "Building business software, integrations, and backend services since 2019 across shipping logistics, retail distribution, and IT consulting.",
      currentBadge: "Current",
      items: [
        {
          role: "Middleware, Database & API Tech",
          period: "Jun 2024 – Present",
          summary:
            "Design and maintain middleware pipelines, API gateways, and database integrations connecting core logistics and enterprise systems.",
        },
        {
          role: "Business Solutions Software Developer",
          period: "Jul 2023 – May 2024",
          summary:
            "Built internal web applications and operational workflows tailored to maritime shipping and finance teams.",
        },
        {
          role: "IT Developer Supervisor",
          period: "Jan 2023 – Jun 2023",
          summary:
            "Guided engineering delivery, coordinated sprint priorities, and reviewed code quality across internal product teams.",
        },
        {
          role: "Senior Full-Stack Programmer",
          period: "Oct 2021 – Jan 2023",
          summary:
            "Developed end-to-end web platforms and backend services for retail distribution and inventory operations.",
        },
        {
          role: "Backend Software Developer",
          period: "Dec 2019 – Mar 2021",
          summary:
            "Implemented REST APIs, database schemas, and server-side business logic for client software projects.",
        },
      ],
    },
    skills: {
      label: "Skills",
      title: "Tech Stack & Tools",
      subtitle:
        "Languages, databases, and infrastructure I rely on to build, connect, and ship software.",
      groups: [
        {
          title: "Frontend",
          description: "Clean, accessible interfaces and type-safe client state.",
        },
        {
          title: "Backend & API",
          description: "REST services, middleware integrations, and business logic.",
        },
        {
          title: "Database & Caching",
          description: "Relational modeling, query tuning, and in-memory speed.",
        },
        {
          title: "Infra & Messaging",
          description: "Containerized deployments and real-time event pipelines.",
        },
      ],
    },
    credentials: {
      label: "Credentials",
      title: "Education & Certifications",
      subtitle:
        "Formal computer science training paired with verified certifications in testing and software intelligence.",
      certsLabel: "Professional Certifications",
      verified: "Verified Certificate",
      viewCert: "Open certificate",
      education: "Education",
      educationBadge: "Bachelor's Degree",
      degree: "B.Sc. in Computer Science",
      university: "University of Surabaya (Ubaya)",
      graduated: "Graduated · 2015 – 2019",
      educationNote:
        "Focused on software engineering, relational databases, and distributed systems fundamentals.",
    },
    contact: {
      label: "Contact",
      title: "Let's Work Together",
      description:
        "Planning a web application, untangling system integrations, or hiring for an engineering role? Send me an email and I will be glad to talk through what you need.",
      email: "Direct Email",
      findMe: "Elsewhere",
      sendEmail: "Send Email",
      copyEmail: "Copy Email",
      copiedEmail: "Copied to clipboard",
      panelTitle: "How I Can Contribute",
      panelItems: [
        "End-to-end web application development",
        "API design, middleware, and third-party integration",
        "Database schema modeling and query optimization",
        "Technical scoping and system architecture review",
      ],
      locationLabel: "Based in",
      locationValue: "Surabaya, Indonesia (UTC+7)",
    },
    footer: "Built with React & TypeScript",
  },
  id: {
    meta: {
      title: "Arethusa Aryandhana | Full-Stack Developer",
      description:
        "Arethusa Aryandhana adalah Full-Stack Developer di Surabaya, Indonesia, yang berpengalaman membangun aplikasi web, API, middleware, dan sistem basis data.",
    },
    navigation: {
      items: ["Profil", "Proyek", "Pengalaman", "Keahlian", "Kualifikasi", "Kontak"],
      contact: "Hubungi Saya",
      homeLabel: "Kembali ke atas",
      menuLabel: "Buka atau tutup menu navigasi",
      languageLabel: "Pilih bahasa",
      languageNames: { en: "English", id: "Bahasa Indonesia" },
      themeToLight: "Ganti ke mode terang",
      themeToDark: "Ganti ke mode gelap",
    },
    boot: {
      kicker: "ARETHUSA ARYANDHANA / FULL-STACK DEVELOPER",
      lines: [
        "[sys] Menyiapkan arethusa.dev...",
        "[cpu] Memuat profil full-stack [OK]",
        "[net] Menghubungkan API & middleware [OK]",
        "[ui] Antarmuka siap ditampilkan [READY]",
      ],
      loading: "Memuat",
      ready: "Siap",
      skip: "Lewati",
    },
    hero: {
      status: "Terbuka untuk proyek & diskusi teknis",
      location: "Surabaya, Indonesia",
      role: "Full-Stack Developer",
      title: "Membangun aplikasi web yang rapi dan integrasi sistem yang andal.",
      description:
        "Selama lebih dari 6 tahun, saya menggarap perangkat lunak dari tampilan depan hingga aliran data di belakang layar: membangun antarmuka web, merancang API dan middleware, serta menjaga kinerja database untuk kebutuhan operasional harian.",
      viewWork: "Lihat Proyek",
      email: "Kirim Email",
      stats: ["Tahun Pengalaman", "Teknologi Inti", "Peran Industri", "Sertifikasi Resmi"],
      workLabel: "Fokus Pengerjaan",
      workItems: [
        {
          title: "Aplikasi Web",
          detail: "Dashboard operasional dan antarmuka modern dengan React, Vue, dan TypeScript.",
        },
        {
          title: "API & Middleware",
          detail: "Penghubung layanan yang stabil memakai Node.js, PHP/Laravel, .NET, dan Go.",
        },
        {
          title: "Database & Alur Data",
          detail: "Perancangan skema, optimasi query, dan caching pada PostgreSQL, SQL Server, serta Redis.",
        },
        {
          title: "Container & Deployment",
          detail: "Rilis aplikasi yang konsisten dengan Docker, Kubernetes, dan aliran data Kafka.",
        },
      ],
    },
    projects: {
      label: "Proyek",
      title: "Proyek Pilihan",
      subtitle:
        "Beberapa proyek seputar otomasi setup tim, aplikasi kasir real-time, dan pemantauan layanan API.",
      viewRepo: "Lihat di GitHub",
      repositoryLabel: "Buka repositori {name} di GitHub",
      items: [
        {
          category: "Developer Tooling",
          description:
            "Generator kerangka proyek untuk tim developer dengan template yang bisa disesuaikan. Tim bisa langsung mulai membangun fitur baru tanpa mengulang setup awal yang sama setiap kali membuat repositori.",
          highlight: "Standarisasi struktur folder, konfigurasi awal, dan dependensi tim.",
        },
        {
          category: "Ritel & Real-Time",
          description:
            "Aplikasi kasir berbasis web untuk operasional ritel dengan sinkronisasi stok langsung melalui Redis dan WebSocket. Setiap transaksi otomatis memperbarui jumlah barang sehingga kasir dan tim gudang selalu melihat data yang sama.",
          highlight: "Sinkronisasi stok langsung antar-kasir tanpa muat ulang halaman.",
        },
        {
          category: "API Monitoring",
          description:
            "Dashboard pemantauan yang mencatat uptime dan waktu respons layanan HTTP ke PostgreSQL. Dilengkapi peringatan otomatis ketika ada endpoint yang melambat atau gagal merespons sebelum mengganggu pengguna.",
          highlight: "Pencatatan histori latensi dan peringatan dini di lingkungan Docker.",
        },
      ],
    },
    experience: {
      label: "Pengalaman",
      title: "Perjalanan Karier",
      subtitle:
        "Berkarier di dunia software sejak 2019, menangani sistem logistik pelayaran, distribusi ritel, hingga solusi TI.",
      currentBadge: "Sekarang",
      items: [
        {
          role: "Middleware, Database & API Tech",
          period: "Jun 2024 – Sekarang",
          summary:
            "Merancang dan menjaga jalur middleware, API gateway, serta integrasi database yang menghubungkan sistem inti logistik perusahaan.",
        },
        {
          role: "Business Solutions Software Developer",
          period: "Jul 2023 – Mei 2024",
          summary:
            "Membangun aplikasi web internal dan alur kerja digital untuk mendukung tim operasional pelayaran dan keuangan.",
        },
        {
          role: "IT Developer Supervisor",
          period: "Jan 2023 – Jun 2023",
          summary:
            "Mengawal eksekusi pengembangan tim, menyelaraskan prioritas sprint, dan meninjau kualitas kode proyek internal.",
        },
        {
          role: "Senior Full-Stack Programmer",
          period: "Okt 2021 – Jan 2023",
          summary:
            "Mengembangkan platform web dan layanan backend secara menyeluruh untuk mendukung operasional distribusi dan inventaris.",
        },
        {
          role: "Backend Software Developer",
          period: "Des 2019 – Mar 2021",
          summary:
            "Membangun REST API, struktur basis data, dan logika bisnis server-side untuk berbagai aplikasi kebutuhan klien.",
        },
      ],
    },
    skills: {
      label: "Keahlian",
      title: "Teknologi Sehari-hari",
      subtitle:
        "Bahasa pemrograman, basis data, dan infrastruktur yang biasa saya gunakan untuk membangun serta menjalankan sistem.",
      groups: [
        {
          title: "Frontend",
          description: "Antarmuka web yang responsif, rapi, dan mudah dirawat.",
        },
        {
          title: "Backend & API",
          description: "Layanan REST, middleware integrasi, dan logika bisnis.",
        },
        {
          title: "Database & Caching",
          description: "Pemodelan relasional, optimasi query, dan caching cepat.",
        },
        {
          title: "Infra & Messaging",
          description: "Deployment berbasis kontainer dan pertukaran event real-time.",
        },
      ],
    },
    credentials: {
      label: "Kualifikasi",
      title: "Pendidikan & Sertifikasi",
      subtitle:
        "Latar belakang akademis ilmu komputer yang dilengkapi sertifikasi resmi di bidang pengujian dan analisis kualitas kode.",
      certsLabel: "Sertifikasi Profesional",
      verified: "Sertifikat Terverifikasi",
      viewCert: "Buka sertifikat",
      education: "Pendidikan Akademis",
      educationBadge: "Gelar Sarjana",
      degree: "Sarjana Komputer (Ilmu Komputer)",
      university: "Universitas Surabaya (Ubaya)",
      graduated: "Lulus · 2015 – 2019",
      educationNote:
        "Mempelajari rekayasa perangkat lunak, perancangan basis data, dan dasar-dasar sistem terdistribusi.",
    },
    contact: {
      label: "Kontak",
      title: "Mari Berdiskusi",
      description:
        "Punya rencana membangun aplikasi web, merapikan integrasi antar-sistem, atau ingin berdiskusi soal peluang kerja sama? Kirimkan pesan lewat email, saya akan senang membalasnya.",
      email: "Email Langsung",
      findMe: "Tautan Lainnya",
      sendEmail: "Kirim Email",
      copyEmail: "Salin Email",
      copiedEmail: "Email tersalin",
      panelTitle: "Area Kolaborasi",
      panelItems: [
        "Pengembangan aplikasi web end-to-end",
        "Perancangan API, middleware, dan integrasi pihak ketiga",
        "Pemodelan database dan optimasi performa query",
        "Diskusi arsitektur sistem dan kebutuhan teknis",
      ],
      locationLabel: "Domisili",
      locationValue: "Surabaya, Indonesia (WIB / UTC+7)",
    },
    footer: "Dibangun dengan React & TypeScript",
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
