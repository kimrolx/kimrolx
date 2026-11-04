import type { IconType } from "react-icons";

export type ProjectStatus = "In Progress" | "Completed" | "Production";

export type ProjectLink = {
  label: string;
  href: string;
  icon: IconType;
};

export type CaseStudySection = {
  /** Short ruled-row label, e.g. "The problem". */
  label: string;
  /** A paragraph, or a list of points. */
  body: string | string[];
};

export type CaseStudy = {
  sections: CaseStudySection[];
  /** Optional single honest headline stat for the outcome. */
  stat?: { value: string; label: string };
};

export type ProjectCategory = "Production" | "University" | "Experiment";

export type Project = {
  id: string;
  title: string;
  kind: string;
  category: ProjectCategory;
  year: number;
  /** Deck only, e.g. "2026 — Present". */
  period?: string;
  /** Deck only; archive entries omit it. */
  status?: ProjectStatus;
  description: string;
  /** Full list; drives `?stack=` matching. */
  techStack: string[];
  /** Display subset for the deck and archive rows; defaults to `techStack`. */
  stack?: string[];
  /** `links[0]` is the primary CTA, `links[1]` the secondary text link. */
  links: ProjectLink[];
  cover?: { src: string; alt: string };
  caseStudy?: CaseStudy;
};

export type Experience = {
  id: string;
  company: string;
  logo: string;
  role: string;
  employmentType: string;
  period: string;
  highlights: string[];
  techStack: string[];
};

export type SkillGroup = {
  category: string;
  items: string[];
};

export type SocialLink = {
  label: string;
  href: string;
  handle: string;
  icon: IconType;
};

export type Track = {
  title: string;
  artist: string;
  /** Imported asset URL (Vite-hashed). */
  src: string;
};
