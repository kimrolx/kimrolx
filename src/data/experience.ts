import type { Experience } from "@/types";
import griffinLogo from "@/assets/griffin_logo.png";

export const experiences: Experience[] = [
  {
    id: "griffin31",
    company: "Griffin31",
    logo: griffinLogo,
    role: "Software Engineer",
    employmentType: "Full-time",
    period: "Aug 2024 – Present",
    highlights: [
      "Own features end to end, from system design and API architecture to React frontend integration and cloud deployment.",
      "Build REST APIs with NestJS and Axios, backed by PostgreSQL through TypeORM for accurate data and fast queries.",
      "Build and maintain CI/CD pipelines with GitHub Actions, making releases faster and more consistent.",
      "Containerize services with Docker and run cloud delivery on Azure (ACR, ACA), reducing operational overhead.",
      "Work with cross-functional teams to gather requirements and ship features that hold up in production.",
    ],
    techStack: [
      { label: "TypeScript" },
      { label: "NestJS" },
      { label: "React" },
      { label: "Redux" },
      { label: "PostgreSQL" },
      { label: "TypeORM" },
      { label: "Docker" },
      { label: "GitHub Actions" },
      { label: "Azure" },
    ],
  },
];
