import type { IconType } from "react-icons";

export type Tech = {
  label: string;
  /** Brand color, used as a subtle dot beside the label. */
  color: string;
};

export type ProjectStatus = "In Progress" | "Completed" | "Production";

export type ProjectLink = {
  label: string;
  href: string;
  icon: IconType;
};

export type Project = {
  id: string;
  title: string;
  /** One-line role/what-it-is, shown in mono. */
  kind: string;
  period: string;
  status: ProjectStatus;
  description: string;
  techStack: Tech[];
  links: ProjectLink[];
  /** Optional screenshot. [mobile, desktop] when both exist. */
  images?: { src: string; alt: string }[];
  /** Marks the flagship project for emphasis. */
  featured?: boolean;
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
