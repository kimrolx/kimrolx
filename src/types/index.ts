import type { IconType } from "react-icons";

export type Tech = {
  label: string;
};

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

export type Project = {
  id: string;
  title: string;
  /** One-line role/what-it-is, shown in mono. */
  kind: string;
  /** Optional compact release/version note for shipped apps. */
  version?: string;
  period: string;
  status: ProjectStatus;
  description: string;
  techStack: Tech[];
  links: ProjectLink[];
  /** Optional screenshot. [mobile, desktop] when both exist. */
  images?: { src: string; alt: string }[];
  /** Marks the flagship project for emphasis. */
  featured?: boolean;
  /** Optional expandable deep-dive, shown under the project. */
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
  techStack: Tech[];
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
