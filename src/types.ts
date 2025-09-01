export type Testimonial = {
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
  rating: number;
};

export type CVData = {
  identity: { fullName: string; role: string; location: string; avatarUrl?: string };
  contacts: { email?: string; phone?: string };
  links: { website?: string; linkedin?: string; github?: string };
  summary?: string;
  summaryHtml?: string;
  highlights?: string[];
  skills: { top: string[]; groups: Record<string, string[]> };
  languages: { name: string; level: string }[];
  experience: Experience[];
  projects?: Project[];
  education: { title: string; place: string; period: string }[];
  certifications: { name: string; issuer: string; year: string }[];
  interests?: string[];
  testimonials?: Testimonial[];
};

export type Experience = {
  title: string;
  company: string;
  period: string;
  location: string;
  bullets: string[];
  stack?: string[];
};

export type Project = {
  name: string;
  description: string;
  stack?: string[];
  link?: string;
  repo?: string;
};