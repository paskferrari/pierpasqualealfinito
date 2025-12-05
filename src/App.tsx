import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Github,
  Linkedin,
  Download,
  ExternalLink,
  ArrowUpRight,
  Calendar,
  User,
  Briefcase,
  GraduationCap,
  Award,
  Code,
  Languages,
  Heart,
  FileText,
  Star,
  ChevronLeft,
  ChevronRight,
  Quote
} from "lucide-react";
import { CVData, Experience, Project, Testimonial } from './types';

const ACCENTS = [
  { name: "Navy", ring: "ring-slate-700", text: "text-slate-700", bg: "bg-slate-700", hover: "hover:bg-slate-800", soft: "bg-slate-50", gradient: "from-slate-700 to-slate-800" },
  { name: "Charcoal", ring: "ring-gray-800", text: "text-gray-800", bg: "bg-gray-800", hover: "hover:bg-gray-900", soft: "bg-gray-50", gradient: "from-gray-800 to-gray-900" },
  { name: "Midnight", ring: "ring-zinc-800", text: "text-zinc-800", bg: "bg-zinc-800", hover: "hover:bg-zinc-900", soft: "bg-zinc-50", gradient: "from-zinc-800 to-zinc-900" },
  { name: "Professional", ring: "ring-neutral-700", text: "text-neutral-700", bg: "bg-neutral-700", hover: "hover:bg-neutral-800", soft: "bg-neutral-50", gradient: "from-neutral-700 to-neutral-800" },
];

const DATA: CVData = {
  identity: {
    fullName: "Pierpasquale Alfinito",
    role: "Responsabile IT • Developer",
    location: "Battipaglia, Campania · Italia",
    avatarUrl: "/5.jpg"
  },
  contacts: {
    email: "pieroalfinito12@gmail.com",
    phone: "+39 389 204 1070",
  },
  links: {
    website: "",
    linkedin: "https://www.linkedin.com/in/pierpasquale-alfinito-b8b926162",
    github: "",
  },
  summary: "",
  summaryHtml: `
    <p><strong></strong> Giovane professionista con background in <strong>Economia &amp; Management</strong> e forte passione per la tecnologia. Oggi <strong>Responsabile Area IT</strong> in Area Finanza S.p.A., coordino lo sviluppo e l'integrazione di soluzioni digitali a supporto della consulenza e mediazione finanziaria.</p>
    
    <ul style="margin-top:8px">
      <li><strong>Sviluppo Web Full‑Stack</strong>: React, Node.js, Firebase, Supabase.</li>
      <br><li><strong>Gestione IT &amp; CRM</strong>: CRM personalizzati, automazioni (Make, Zapier), integrazioni API.</li>
      <br><li><strong>Data Management &amp; KPI</strong>: Python/SQL/Apps Script; dashboard/report dinamici (HTML, PDF, Google Docs).</li>
      <br><li><strong>Digital Transformation</strong>: workflow e strumenti per efficienza operativa.</li>
    </ul>
    <p style="margin-top:8px"><strong>Oltre il lavoro.</strong> Sviluppo progetti digitali e sportivi (community, analisi e gestione eventi) con attenzione a design moderno e scalabilità.</p>
  `,
  highlights: [
    "CRM proprietario (Glide + Supabase + Make): -35% tempi onboarding, +22% lead qualificati",
    "ETL JSON → Supabase + report automatici con mapping codici di bilancio",
    "PWA React con NFC per tracciamento eventi e statistiche",
  ],
  skills: {
    top: ["React", "Node.js", "Supabase", "PostgreSQL", "Make", "Glide", "Python", "Tailwind", "Public speaking", "Comunicazione", "Gestione team"],
    groups: {
      "Linguaggi & Framework": ["TypeScript/JavaScript", "React/Next.js", "Node/Express", "Python"],
      "Data & Cloud": ["PostgreSQL/Supabase", "Firebase", "ETL/JSON", "Make.com"],
      "Dev & UI": ["TailwindCSS", "Material Design", "Git/GitHub", "CI/CD di base"],
      "Soft skills": ["Public speaking", "Comunicazione", "Gestione team"]
    },
  },
  languages: [
    { name: "Italiano", level: "Madrelingua" },
    { name: "Inglese", level: "Professional Working" },
    { name: "Spagnolo", level: "Limited Working" }
  ],
  experience: [
    {
      title: "Responsabile Area IT",
      company: "Area Finanza S.p.A.",
      period: "nov 2024 – Presente",
      location: "Battipaglia, Campania / Roma",
      bullets: [
        "Coordinamento sviluppo soluzioni digitali per consulenza e mediazione finanziaria",
        "CRM personalizzati, integrazioni API, automazioni (Make/Zapier)",
        "Estrazione e analisi dati (Python/SQL) con dashboard e report (HTML/PDF)",
      ],
      stack: ["React", "Node", "Supabase", "Make", "Google Apps Script"],
    },
    {
      title: "Presidente",
      company: "A.S.D BOCA",
      period: "set 2024 – Presente",
      location: "Battipaglia, Campania",
      bullets: [
        "Gestione e organizzazione associazione sportiva giovanile (calcio)",
        "Sviluppo attività e community locale",
      ],
      stack: ["Gestione associazioni", "Organizzazione eventi"],
    },
    {
      title: "Sviluppatore Front‑End",
      company: "Area Finanza S.r.l.",
      period: "gen 2022 – nov 2024",
      location: "Battipaglia, Campania",
      bullets: [
        "Siti e web app (Next.js/Tailwind), integrazioni Stripe/PayPal",
        "Dashboard dati e analytics di base, deploy su Vercel",
      ],
      stack: ["Next.js", "Tailwind", "Stripe", "Vercel"],
    },
    {
      title: "Staff — Internazionali BNL d'Italia (Tennis)",
      company: "FITP",
      period: "apr–mag 2023, 2024, 2025 (stagionale)",
      location: "Roma — Foro Italico",
      bullets: [
        "Gestione spogliatoi (Centrale/Pietrangeli) e supporto operativo atleti",
        "Interfaccia con giocatori, coach e staff; problem solving in contesto internazionale",
      ],
      stack: ["Operations", "Google Workspace"],
    },
    {
      title: "Staff — BNL Italy Major Premier Padel",
      company: "FITP",
      period: "giu–lug 2023, 2024, 2025 (stagionale)",
      location: "Roma",
      bullets: [
        "Supporto organizzativo e operazioni di campo",
        "Turnazioni, logistica e coordinamento flussi giornalieri",
      ],
      stack: ["Operations"],
    },
    {
      title: "Gestione Eventi",
      company: "Fiera Roma s.r.l.",
      period: "set 2023 – apr 2025",
      location: "Roma",
      bullets: [
        "Coordinamento attività di sala e supporto espositori",
        "Flussi accreditamento e gestione imprevisti in tempo reale",
      ],
      stack: ["Operations"],
    }
  ],
  projects: [
    {
      name: "DigiFlow CRM",
      description: "Piattaforma CRM per mediazione finanziaria con ETL JSON → Supabase, generazione report e KPI di bilancio, automazioni Make.",
      stack: ["Glide", "Supabase", "Make", "PostgreSQL"],
      link: "#",
    },
    {
      name: "PWA Event Tracker",
      description: "App React/PWA per presenze, badge e statistiche con storico serate.",
      stack: ["React", "localStorage", "Chart.js"],
      link: "#",
    },
    {
      name: "Financial Dashboard",
      description: "Dashboard interattiva per analisi KPI finanziari con grafici real-time e export automatico PDF/Excel.",
      stack: ["Next.js", "Chart.js", "Tailwind", "jsPDF"],
      link: "https://github.com/pieroalfinito",
    },
    {
      name: "Tennis Stats API",
      description: "API REST per gestione statistiche tornei tennis con autenticazione JWT e integrazione database.",
      stack: ["Node.js", "Express", "PostgreSQL", "JWT"],
      link: "https://github.com/pieroalfinito",
    },
  ],
  education: [
    { title: "Laurea triennale — Economia e Management", place: "Università di Roma Tor Vergata", period: "2019 – ott 2025" },
    { title: "ITT Basilio Focaccia — DS1 Scienze dell'Educazione e della Formazione · Programmazione informatica", place: "Battipaglia", period: "2015 – 2019" }
  ],
  certifications: [
    { name: "Diploma di maturità", issuer: "ITT Basilio Focaccia", year: "2019" }
  ],
  interests: ["Automazione processi", "Design sistemi UI", "Sport (tennis/padel)"],
  testimonials: [
    {
      name: "Giuseppe",
      role: "CEO",
      company: "Area Finanza S.p.A.",
      content: "Pierpasquale ha trasformato completamente i nostri processi digitali. Il CRM che ha sviluppato ha ridotto i tempi di onboarding del 35% e migliorato significativamente la qualità dei lead.",
      avatar: "/media/testimonial1.jpg",
      rating: 5
    },
    {
      name: "Mattia ",
      role: "Art Director",
      company: "MOVIEBOLI",
      content: "Collaborare con Piero è stato fantastico. La sua capacità di tradurre requisiti complessi in soluzioni eleganti e funzionali è impressionante. Sempre puntuale e professionale.",
      avatar: "/media/testimonial2.jpg",
      rating: 5
    }
  ]
};

const DATA_EN: CVData = {
  identity: {
    fullName: "Pierpasquale Alfinito",
    role: "IT Area Manager • Developer",
    location: "Battipaglia, Campania · Italy",
    avatarUrl: "/5.jpg"
  },
  contacts: {
    email: "pieroalfinito12@gmail.com",
    phone: "+39 389 204 1070",
  },
  links: {
    website: "",
    linkedin: "https://www.linkedin.com/in/pierpasquale-alfinito-b8b926162",
    github: "",
  },
  summary: "",
  summaryHtml: `
    <p><strong></strong> Young professional with a background in <strong>Economics &amp; Management</strong> and a strong passion for technology. Currently <strong>IT Area Manager</strong> at Area Finanza S.p.A., I coordinate the development and integration of digital solutions supporting financial consulting and brokerage.</p>

    <ul style="margin-top:8px">
      <li><strong>Full‑Stack Web Development</strong>: React, Node.js, Firebase, Supabase.</li>
      <br><li><strong>IT &amp; CRM Management</strong>: Custom CRMs, automations (Make, Zapier), API integrations.</li>
      <br><li><strong>Data Management &amp; KPI</strong>: Python/SQL/Apps Script; dynamic dashboards/reports (HTML, PDF, Google Docs).</li>
      <br><li><strong>Digital Transformation</strong>: workflows and tools for operational efficiency.</li>
    </ul>
    <p style="margin-top:8px"><strong>Beyond work.</strong> I develop digital and sports projects (community, analysis and event management) with a focus on modern design and scalability.</p>
  `,
  highlights: [
    "Proprietary CRM (Glide + Supabase + Make): -35% onboarding time, +22% qualified leads",
    "ETL JSON → Supabase + automatic reports with chart of accounts mapping",
    "React PWA with NFC for event tracking and statistics",
  ],
  skills: {
    top: ["React", "Node.js", "Supabase", "PostgreSQL", "Make", "Glide", "Python", "Tailwind", "Public speaking", "Communication", "Team management"],
    groups: {
      "Languages & Frameworks": ["TypeScript/JavaScript", "React/Next.js", "Node/Express", "Python"],
      "Data & Cloud": ["PostgreSQL/Supabase", "Firebase", "ETL/JSON", "Make.com"],
      "Dev & UI": ["TailwindCSS", "Material Design", "Git/GitHub", "Basic CI/CD"],
      "Soft skills": ["Public speaking", "Communication", "Team management"]
    },
  },
  languages: [
    { name: "Italian", level: "Native" },
    { name: "English", level: "Professional Working" },
    { name: "Spanish", level: "Limited Working" }
  ],
  experience: [
    {
      title: "IT Area Manager",
      company: "Area Finanza S.p.A.",
      period: "Nov 2024 – Present",
      location: "Battipaglia, Campania / Rome",
      bullets: [
        "Coordination of digital solutions for financial consulting and brokerage",
        "Custom CRMs, API integrations, automations (Make/Zapier)",
        "Data extraction and analysis (Python/SQL) with dashboards and reports (HTML/PDF)",
      ],
      stack: ["React", "Node", "Supabase", "Make", "Google Apps Script"],
    },
    {
      title: "President",
      company: "A.S.D BOCA",
      period: "Sep 2024 – Present",
      location: "Battipaglia, Campania",
      bullets: [
        "Management and organization of a youth sports association (football)",
        "Development of activities and local community",
      ],
      stack: ["Association management", "Event organization"],
    },
    {
      title: "Front‑End Developer",
      company: "Area Finanza S.r.l.",
      period: "Jan 2022 – Nov 2024",
      location: "Battipaglia, Campania",
      bullets: [
        "Websites and web apps (Next.js/Tailwind), Stripe/PayPal integrations",
        "Basic data dashboards and analytics, deploy on Vercel",
      ],
      stack: ["Next.js", "Tailwind", "Stripe", "Vercel"],
    },
    {
      title: "Staff — Internazionali BNL d'Italia (Tennis)",
      company: "FITP",
      period: "Apr–May 2023, 2024, 2025 (seasonal)",
      location: "Rome — Foro Italico",
      bullets: [
        "Locker room management (Centrale/Pietrangeli) and operational support to athletes",
        "Interface with players, coaches and staff; problem solving in an international context",
      ],
      stack: ["Operations", "Google Workspace"],
    },
    {
      title: "Staff — BNL Italy Major Premier Padel",
      company: "FITP",
      period: "Jun–Jul 2023, 2024, 2025 (seasonal)",
      location: "Rome",
      bullets: [
        "Organizational support and on-court operations",
        "Shifts, logistics and coordination of daily flows",
      ],
      stack: ["Operations"],
    },
    {
      title: "Event Management",
      company: "Fiera Roma s.r.l.",
      period: "Sep 2023 – Apr 2025",
      location: "Rome",
      bullets: [
        "Coordination of room activities and support to exhibitors",
        "Accreditation flows and real-time incident management",
      ],
      stack: ["Operations"],
    }
  ],
  projects: [
    {
      name: "DigiFlow CRM",
      description: "CRM platform for financial brokerage with ETL JSON → Supabase, report generation and balance sheet KPIs, Make automations.",
      stack: ["Glide", "Supabase", "Make", "PostgreSQL"],
      link: "#",
    },
    {
      name: "PWA Event Tracker",
      description: "React/PWA app for attendance, badges and statistics with event history.",
      stack: ["React", "localStorage", "Chart.js"],
      link: "#",
    },
    {
      name: "Financial Dashboard",
      description: "Interactive dashboard for financial KPI analysis with real-time charts and automatic PDF/Excel export.",
      stack: ["Next.js", "Chart.js", "Tailwind", "jsPDF"],
      link: "https://github.com/pieroalfinito",
    },
    {
      name: "Tennis Stats API",
      description: "REST API for managing tennis tournament statistics with JWT authentication and database integration.",
      stack: ["Node.js", "Express", "PostgreSQL", "JWT"],
      link: "https://github.com/pieroalfinito",
    },
  ],
  education: [
    { title: "Bachelor’s degree — Economics and Management", place: "University of Rome Tor Vergata", period: "2019 – Oct 2025" },
    { title: "ITT Basilio Focaccia — DS1 Educational Sciences · Computer Programming", place: "Battipaglia", period: "2015 – 2019" }
  ],
  certifications: [
    { name: "High school diploma", issuer: "ITT Basilio Focaccia", year: "2019" }
  ],
  interests: ["Process automation", "UI system design", "Sports (tennis/padel)"],
  testimonials: [
    {
      name: "Giuseppe",
      role: "CEO",
      company: "Area Finanza S.p.A.",
      content: "Pierpasquale completely transformed our digital processes. The CRM he developed reduced onboarding times by 35% and significantly improved lead quality.",
      avatar: "/media/testimonial1.jpg",
      rating: 5
    },
    {
      name: "Mattia",
      role: "Art Director",
      company: "MOVIEBOLI",
      content: "Working with Piero was fantastic. His ability to translate complex requirements into elegant and functional solutions is impressive. Always punctual and professional.",
      avatar: "/media/testimonial2.jpg",
      rating: 5
    }
  ]
};

// Helper function to get initials
function initials(name: string): string {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase();
}

function SkillIcon({ skill, accent, size = 16, className = "" }: { skill: string; accent: any; size?: number; className?: string }) {
  const s = skill.toLowerCase();
  const icon = null;

  const containerClasses = `w-6 h-6 rounded-md bg-white/80 border border-white/60 flex items-center justify-center ${className}`;
  const isSoft = s.includes('public') || s.includes('comunicazione') || s.includes('communication') || s.includes('gestione') || s.includes('team');
  const FallbackIcon = isSoft ? Heart : Code;
  return (
    <div className={containerClasses} aria-hidden>
      <FallbackIcon className="w-4 h-4 text-gray-600" />
    </div>
  );
}
export default function CVPage() {
  const [accentIndex, setAccentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  // Add locale state and translations
  const [locale, setLocale] = useState<'it' | 'en'>(typeof window !== 'undefined' && localStorage.getItem('locale') === 'it' ? 'it' : 'en');
  useEffect(() => { if (typeof window !== 'undefined') localStorage.setItem('locale', locale); }, [locale]);
  const translations = {
    it: {
      downloadPdf: 'Scarica PDF',
      tabs: { overview: 'Panoramica', experience: 'Esperienza', projects: 'Progetti', skills: 'Competenze', education: 'Formazione', languages: 'Lingue', testimonials: 'Testimonianze' },
      headers: {
        about: 'Chi sono',
        experience: 'Esperienza Professionale',
        projects: 'Progetti',
        skills: 'Competenze',
        education: 'Formazione',
        languages: 'Lingue',
        projectsSubtitle: 'I miei progetti più significativi',
        skillsTitle: 'Competenze Principali',
        skillsSubtitle: 'Le mie competenze più forti e utilizzate',
        languagesSubtitle: 'Le lingue che parlo',
        viewAll: 'Vedi tutto',
        highlights: 'Risultati Chiave',
        experienceSubtitle: 'Il mio percorso lavorativo',
        educationSubtitle: 'Il mio percorso formativo',
        testimonials: 'Testimonianze'
      }
    },
    en: {
      downloadPdf: 'Download PDF',
      tabs: { overview: 'Overview', experience: 'Experience', projects: 'Projects', skills: 'Skills', education: 'Education', languages: 'Languages', testimonials: 'Testimonials' },
      headers: {
        about: 'About',
        experience: 'Professional Experience',
        projects: 'Projects',
        skills: 'Skills',
        education: 'Education',
        languages: 'Languages',
        projectsSubtitle: 'My most significant projects',
        skillsTitle: 'Key Skills',
        skillsSubtitle: 'My strongest and most used skills',
        languagesSubtitle: 'Languages I speak',
        viewAll: 'View all',
        highlights: 'Highlights',
        experienceSubtitle: 'My professional journey',
        educationSubtitle: 'My academic background',
        testimonials: 'Testimonials'
      }
    }
  } as const;
  const accent = ACCENTS[accentIndex];
  const data = useMemo(() => (locale === 'en' ? DATA_EN : DATA), [locale]);


  const tabs = [
    { id: 'overview', label: translations[locale].tabs.overview, icon: User },
    { id: 'experience', label: translations[locale].tabs.experience, icon: Briefcase },
    { id: 'projects', label: translations[locale].tabs.projects, icon: Code },
    { id: 'skills', label: translations[locale].tabs.skills, icon: Award },
    { id: 'education', label: translations[locale].tabs.education, icon: GraduationCap },
    { id: 'languages', label: translations[locale].tabs.languages, icon: Languages },
    { id: 'testimonials', label: translations[locale].tabs.testimonials, icon: Quote }
  ];

  const downloadPDF = () => {
    const link = document.createElement('a');
    link.href = '/pierpasquale_alfinito_cv .pdf';
    link.download = 'pierpasquale_alfinito_cv.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen transition-colors duration-300 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <motion.div 
          className="bg-white border-gray-100 rounded-3xl p-8 shadow-xl border mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
            <div className="flex-shrink-0">
              <motion.div 
                className="relative w-32 h-48 sm:w-36 sm:h-52 lg:w-40 lg:h-56 rounded-2xl overflow-hidden shadow-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Gradient background strips */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 opacity-20"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 via-transparent to-transparent"></div>
                
                <img 
                  src={data.identity.avatarUrl} 
                  alt={data.identity.fullName}
                  className="relative w-full h-full object-cover object-center"
                />
              </motion.div>
            </div>
            
            <div className="flex-grow">
              <motion.h1 
                className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                {data.identity.fullName}
              </motion.h1>
              <motion.p 
                className="text-xl text-gray-600 mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                {data.identity.role}
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap gap-4 text-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center gap-2 text-gray-500">
                  <MapPin className="w-4 h-4" />
                  {data.identity.location}
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <Mail className="w-4 h-4" />
                  {data.contacts.email}
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <Phone className="w-4 h-4" />
                  {data.contacts.phone}
                </div>
              </motion.div>
            </div>
            
            <div className="flex flex-col gap-3">
              <motion.button
                onClick={downloadPDF}
                className={`${accent.bg} ${accent.hover} text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 shadow-lg transition-colors`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="w-4 h-4" />
                {translations[locale].downloadPdf}
              </motion.button>
              <div className="flex items-center gap-2">
                <motion.button
                  onClick={() => setLocale('it')}
                  className={`${locale === 'it' ? `${accent.bg} text-white` : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} px-4 py-2 rounded-xl font-medium`}
                  whileHover={{ scale: 1.05 }}
                >
                  IT
                </motion.button>
                <motion.button
                  onClick={() => setLocale('en')}
                  className={`${locale === 'en' ? `${accent.bg} text-white` : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} px-4 py-2 rounded-xl font-medium`}
                  whileHover={{ scale: 1.05 }}
                >
                  EN
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div 
          className="bg-white border-gray-100 rounded-2xl p-2 shadow-lg border mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab, index) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                    isActive 
                      ? `${accent.bg} text-white shadow-md` 
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + (index * 0.05) }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{(translations as any)[locale].tabs[tab.id]}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Summary */}
              <motion.div 
                className="bg-white border-gray-100 rounded-2xl p-8 shadow-lg border"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-10 h-10 rounded-xl ${accent.bg} flex items-center justify-center`}>
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">{translations[locale].headers.about}</h2>
                </div>
                <div 
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: data.summaryHtml || '' }}
                />
              </motion.div>

              {/* Highlights */}
              <motion.div 
                className="bg-white border-gray-100 rounded-2xl p-8 shadow-lg border"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-10 h-10 rounded-xl ${accent.bg} flex items-center justify-center`}>
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">{translations[locale].headers.highlights}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {data.highlights?.map((highlight: string, i: number) => (
                    <motion.div
                      key={i}
                      className="p-4 bg-gray-50 border-gray-200/50 rounded-xl border"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + (i * 0.1) }}
                      whileHover={{ y: -2 }}
                    >
                      <p className="text-sm text-gray-700">{highlight}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Experience Preview */}
              <motion.div 
                className="bg-white border-gray-100 rounded-2xl p-8 shadow-lg border"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${accent.bg} flex items-center justify-center`}>
                      <Briefcase className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">{translations[locale].headers.experience}</h2>
                  </div>
                  <motion.button
                    onClick={() => setActiveTab('experience')}
                    className={`${accent.text} hover:${accent.bg} hover:text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {translations[locale].headers.viewAll}
                    <ArrowUpRight className="w-4 h-4" />
                  </motion.button>
                </div>
                <div className="space-y-4">
                  {data.experience.slice(0, 2).map((exp: Experience, i: number) => (
                    <ExperienceCard key={i} exp={exp} accent={accent} />
                  ))}
                </div>
              </motion.div>

              {/* Projects Preview */}
              <motion.div 
                className="bg-white border-gray-100 rounded-2xl p-8 shadow-lg border"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${accent.bg} flex items-center justify-center`}>
                      <Code className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">{translations[locale].headers.projects}</h2>
                  </div>
                  <motion.button
                    onClick={() => setActiveTab('projects')}
                    className={`${accent.text} hover:${accent.bg} hover:text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {translations[locale].headers.viewAll}
                    <ArrowUpRight className="w-4 h-4" />
                  </motion.button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {data.projects?.slice(0, 2).map((proj: Project, i: number) => (
                    <ProjectCard key={i} proj={proj} accent={accent} />
                  ))}
                </div>
              </motion.div>

              {/* Skills Preview */}
              <motion.div 
                className="bg-white border-gray-100 rounded-2xl p-8 shadow-lg border"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${accent.bg} flex items-center justify-center`}>
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">{translations[locale].headers.skills}</h2>
                  </div>
                  <motion.button
                    onClick={() => setActiveTab('skills')}
                    className={`${accent.text} hover:${accent.bg} hover:text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {translations[locale].headers.viewAll}
                    <ArrowUpRight className="w-4 h-4" />
                  </motion.button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {data.skills.top.slice(0, 8).map((skill: string, i: number) => (
                    <motion.div
                      key={skill}
                      className="p-3 bg-gray-50 border-gray-200/50 rounded-lg border text-center"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 + (i * 0.05) }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className="text-sm font-medium text-gray-700">{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Education Preview */}
              <motion.div 
                className="bg-white border-gray-100 rounded-2xl p-8 shadow-lg border"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${accent.bg} flex items-center justify-center`}>
                      <GraduationCap className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">{translations[locale].headers.education}</h2>
                  </div>
                  <motion.button
                    onClick={() => setActiveTab('education')}
                    className={`${accent.text} hover:${accent.bg} hover:text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {translations[locale].headers.viewAll}
                    <ArrowUpRight className="w-4 h-4" />
                  </motion.button>
                </div>
                <div className="space-y-4">
                  {data.education.slice(0, 1).map((edu: any, i: number) => (
                    <motion.div
                      key={i}
                      className="p-6 bg-gray-50 border-gray-200/50 rounded-xl border"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      <h3 className="text-lg font-bold text-gray-800 mb-2">{edu.title}</h3>
                      <p className="text-gray-600 mb-1">{edu.place}</p>
                      <p className="text-sm text-gray-500">{edu.period}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Languages Preview */}
              <motion.div 
                className="bg-white border-gray-100 rounded-2xl p-8 shadow-lg border"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${accent.bg} flex items-center justify-center`}>
                      <Languages className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">{translations[locale].headers.languages}</h2>
                  </div>
                  <motion.button
                    onClick={() => setActiveTab('languages')}
                    className={`${accent.text} hover:${accent.bg} hover:text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {translations[locale].headers.viewAll}
                    <ArrowUpRight className="w-4 h-4" />
                  </motion.button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {data.languages.map((lang: any, i: number) => (
                    <motion.div
                      key={lang.name}
                      className="p-4 bg-gray-50 border-gray-200/50 rounded-xl border text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 + (i * 0.1) }}
                      whileHover={{ y: -2 }}
                    >
                      <h3 className="text-lg font-bold text-gray-800 mb-2">{lang.name}</h3>
                      <p className="text-gray-600">{lang.level}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          )}

          {/* Experience Tab */}
          {activeTab === 'experience' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white border-gray-100 rounded-2xl p-8 shadow-lg border">
                <div className="flex items-center gap-3 mb-8">
                  <div className={`w-10 h-10 rounded-xl ${accent.bg} flex items-center justify-center`}>
                    <Briefcase className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{translations[locale].headers.experience}</h2>
                    <p className="text-gray-600 text-sm">{translations[locale].headers.experienceSubtitle}</p>
                  </div>
                </div>
                <div className="space-y-6">
                  {data.experience.map((exp: Experience, i: number) => (
                    <ExperienceCard key={i} exp={exp} accent={accent} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Projects Tab */}
          {activeTab === 'projects' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white border-gray-100 rounded-2xl p-8 shadow-lg border">
                <div className="flex items-center gap-3 mb-8">
                  <div className={`w-10 h-10 rounded-xl ${accent.bg} flex items-center justify-center`}>
                    <Code className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{translations[locale].headers.projects}</h2>
                    <p className="text-gray-600 text-sm">{translations[locale].headers.projectsSubtitle}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {data.projects?.map((proj: Project, i: number) => (
                    <ProjectCard key={i} proj={proj} accent={accent} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Skills Tab */}
          {activeTab === 'skills' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-8">
                {/* Top Skills Section */}
                <div className="bg-white border-gray-100 rounded-2xl p-8 shadow-lg border">
                  <div className="flex items-center gap-3 mb-8">
                    <div className={`w-10 h-10 rounded-xl ${accent.bg} flex items-center justify-center`}>
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">{translations[locale].headers.skillsTitle}</h2>
                      <p className="text-gray-600 text-sm">{translations[locale].headers.skillsSubtitle}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.skills.top.slice(0, 9).map((skill: string, i: number) => {
                      const skillLevels: Record<string, number> = {
                        'React': 95, 'Node.js': 90, 'Supabase': 88, 'PostgreSQL': 85, 'Make': 92,
                        'Glide': 90, 'Python': 80, 'Tailwind': 95, 'Public speaking': 85,
                        'Comunicazione': 90, 'Gestione team': 88
                      };
                      const level = skillLevels[skill] || 75;
                      
                      return (
                        <motion.div
                          key={skill}
                          className="bg-gradient-to-br from-gray-50 to-white border-gray-200 p-4 rounded-xl border hover:shadow-md transition-all duration-300"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * i }}
                          whileHover={{ y: -2 }}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <SkillIcon skill={skill} accent={accent} />
                              <h4 className="font-semibold text-gray-800 text-sm">{skill}</h4>
                            </div>
                            <span className={`text-xs font-bold ${accent.text}`}>{level}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                            <motion.div
                              className={`h-full ${accent.bg} rounded-full`}
                              initial={{ width: 0 }}
                              animate={{ width: `${level}%` }}
                              transition={{ delay: 0.2 + (0.1 * i), duration: 1, ease: "easeOut" }}
                            />
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Skills Categories */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {Object.entries(data.skills.groups).map(([category, skills], categoryIndex) => {
                    const categoryIcons: Record<string, any> = {
                      'Linguaggi & Framework': Code,
                      'Data & Cloud': Globe,
                      'Dev & UI': Award,
                      'Soft skills': Heart
                    };
                    const IconComponent = categoryIcons[category] || Code;
                    const categoryColors: Record<string, string> = {
                      'Linguaggi & Framework': 'from-blue-50 to-indigo-50 border-blue-200',
                      'Data & Cloud': 'from-green-50 to-emerald-50 border-green-200',
                      'Dev & UI': 'from-purple-50 to-violet-50 border-purple-200',
                      'Soft skills': 'from-pink-50 to-rose-50 border-pink-200'
                    };
                    const bgColor = categoryColors[category] || 'from-gray-50 to-slate-50 border-gray-200';
                    
                    return (
                      <motion.div
                        key={category}
                        className={`bg-gradient-to-br ${bgColor} rounded-2xl p-6 border`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 * categoryIndex }}
                      >
                        <div className="flex items-center gap-3 mb-6">
                          <div className={`w-8 h-8 rounded-lg ${accent.bg} flex items-center justify-center`}>
                            <IconComponent className="w-4 h-4 text-white" />
                          </div>
                          <h3 className="text-lg font-bold text-gray-800">{category}</h3>
                        </div>
                        <div className="space-y-3">
                          {skills.map((skill: string, i: number) => (
                            <motion.div
                              key={skill}
                              className="flex items-center justify-between p-3 bg-white/70 border-white/50 hover:bg-white/90 rounded-lg border transition-all duration-300"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 + (0.05 * i) }}
                              whileHover={{ x: 4 }}
                            >
                              <div className="flex items-center gap-2">
                                <SkillIcon skill={skill} accent={accent} size={14} />
                                <span className="font-medium text-gray-700">{skill}</span>
                              </div>
                              <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((dot) => {
                                  const skillLevel = skill.includes('React') || skill.includes('Tailwind') ? 5 :
                                                   skill.includes('Node') || skill.includes('Make') ? 4 :
                                                   skill.includes('Python') || skill.includes('Git') ? 3 : 4;
                                  return (
                                    <motion.div
                                      key={dot}
                                      className={`w-2 h-2 rounded-full ${
                                        dot <= skillLevel
                                          ? accent.bg : 'bg-gray-300'
                                      }`}
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      transition={{ delay: 0.4 + (0.1 * i) + (0.05 * dot) }}
                                    />
                                  );
                                })}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* Education Tab */}
          {activeTab === 'education' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white border-gray-100 rounded-2xl p-8 shadow-lg border">
                <div className="flex items-center gap-3 mb-8">
                  <div className={`w-10 h-10 rounded-xl ${accent.bg} flex items-center justify-center`}>
                    <GraduationCap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{translations[locale].headers.education}</h2>
                    <p className="text-gray-600 text-sm">{translations[locale].headers.educationSubtitle}</p>
                  </div>
                </div>
                <div className="space-y-6">
                  {data.education.map((edu: any, i: number) => (
                    <motion.div
                      key={i}
                      className="p-6 bg-gray-50 border-gray-200/50 rounded-xl border"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * i }}
                    >
                      <h3 className="text-lg font-bold text-gray-800 mb-2">{edu.title}</h3>
                      <p className="text-gray-600 mb-1">{edu.place}</p>
                      <p className="text-sm text-gray-500">{edu.period}</p>
                    </motion.div>
                  ))}
                  {data.certifications.map((cert: any, i: number) => (
                    <motion.div
                      key={i}
                      className="p-6 bg-gray-50 border-gray-200/50 rounded-xl border"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * (data.education.length + i) }}
                    >
                      <h3 className="text-lg font-bold text-gray-800 mb-2">{cert.name}</h3>
                      <p className="text-gray-600 mb-1">{cert.issuer}</p>
                      <p className="text-sm text-gray-500">{cert.year}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Languages Tab */}
          {activeTab === 'languages' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white border-gray-100 rounded-2xl p-8 shadow-lg border">
                <div className="flex items-center gap-3 mb-8">
                  <div className={`w-10 h-10 rounded-xl ${accent.bg} flex items-center justify-center`}>
                    <Languages className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{translations[locale].headers.languages}</h2>
                    <p className="text-gray-600 text-sm">{translations[locale].headers.languagesSubtitle}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {data.languages.map((lang: any, i: number) => (
                    <motion.div
                      key={lang.name}
                      className="p-6 bg-gray-50 border-gray-200/50 rounded-xl border text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * i }}
                      whileHover={{ y: -2 }}
                    >
                      <h3 className="text-lg font-bold text-gray-800 mb-2">{lang.name}</h3>
                      <p className="text-gray-600">{lang.level}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Testimonials Tab */}
          {activeTab === 'testimonials' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <TestimonialsSection testimonials={data.testimonials || []} accent={accent} currentTestimonial={currentTestimonial} setCurrentTestimonial={setCurrentTestimonial} title={translations[locale].headers.testimonials} subtitle={locale === 'en' ? 'What people say about me' : 'Cosa dicono di me'} />
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

function ExperienceCard({ exp, accent }: { exp: Experience; accent: any }) {
  return (
    <motion.div
      className="p-6 bg-gray-50 border-gray-200/50 rounded-xl border hover:shadow-md transition-all duration-300"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: 4 }}
    >
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
        <div className="flex-grow">
          <h3 className="text-xl font-bold text-gray-800 mb-1">{exp.title}</h3>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <p className={`font-semibold ${accent.text}`}>{exp.company}</p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              {exp.period}
            </div>
            {exp.location && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <MapPin className="w-4 h-4" />
                {exp.location}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        {exp.bullets.map((bullet, i) => (
          <motion.div
            key={i}
            className="flex items-start gap-3 text-sm text-gray-600"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * i }}
          >
            <div className={`w-1.5 h-1.5 rounded-full ${accent.bg} mt-2 flex-shrink-0`} />
            <span>{bullet}</span>
          </motion.div>
        ))}
      </div>

      {exp.stack && exp.stack.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {exp.stack.map((tech, i) => (
            <motion.span
              key={tech}
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs font-medium"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.05 * i }}
            >
              {tech}
            </motion.span>
          ))}
        </div>
      )}
    </motion.div>
  );
}

function TestimonialsSection({ testimonials, accent, currentTestimonial, setCurrentTestimonial, title, subtitle }: {
  testimonials: Testimonial[];
  accent: any;
  currentTestimonial: number;
  setCurrentTestimonial: (index: number) => void;
  title: string;
  subtitle: string;
}) {
  const nextTestimonial = () => {
    setCurrentTestimonial((currentTestimonial + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setCurrentTestimonial(currentTestimonial === 0 ? testimonials.length - 1 : currentTestimonial - 1);
  };
  
  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, [currentTestimonial]);
  
  return (
    <div className="bg-white border-gray-100 rounded-2xl p-8 shadow-lg border">
      <div className="flex items-center gap-3 mb-8">
        <div className={`w-10 h-10 rounded-xl ${accent.bg} flex items-center justify-center`}>
          <Quote className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <p className="text-gray-600 text-sm">{subtitle}</p>
        </div>
      </div>
  
      <div className="relative">
        <motion.div
          key={currentTestimonial}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="bg-gray-50 border-gray-200/50 rounded-2xl p-8 border mb-6">
            <Quote className={`w-8 h-8 ${accent.text} mx-auto mb-4`} />
            <p className="text-lg text-gray-700 leading-relaxed mb-6 italic">
              "{testimonials[currentTestimonial].content}"
            </p>
            <div className="flex items-center justify-center gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${
                    star <= testimonials[currentTestimonial].rating
                      ? `${accent.text} fill-current`
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center justify-center gap-4">
              <div className={`w-12 h-12 rounded-full ${accent.bg} flex items-center justify-center text-white font-bold`}>
                {initials(testimonials[currentTestimonial].name)}
              </div>
              <div className="text-left">
                <h4 className="font-bold text-gray-800">
                  {testimonials[currentTestimonial].name}
                </h4>
                <p className="text-sm text-gray-600">
                  {testimonials[currentTestimonial].role} • {testimonials[currentTestimonial].company}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
  
        <div className="flex items-center justify-center gap-4">
          <motion.button
            onClick={prevTestimonial}
            className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>
  
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentTestimonial
                    ? accent.bg
                    : 'bg-gray-300'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
              />
            ))}
          </div>
  
          <motion.button
            onClick={nextTestimonial}
            className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ proj, accent }: { proj: Project; accent: any }) {
  return (
    <motion.div
      className="p-6 bg-gray-50 border-gray-200/50 rounded-xl border hover:shadow-md transition-all duration-300 group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-grow">
          <h3 className={`text-xl font-bold text-gray-800 mb-2 group-hover:${accent.text} transition-colors`}>{proj.name}</h3>
          <p className="text-gray-600 mb-4 leading-relaxed">{proj.description}</p>
        </div>
        {proj.link && proj.link !== '#' && !proj.link.includes('github.com') && (
          <motion.a
            href={proj.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`${accent.bg} ${accent.hover} text-white p-2 rounded-lg transition-colors flex-shrink-0 ml-4`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ExternalLink className="w-4 h-4" />
          </motion.a>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2">
        {proj.stack?.map((tech, i) => (
          <motion.span
            key={tech}
            className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs font-medium"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.05 * i }}
          >
            {tech}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
