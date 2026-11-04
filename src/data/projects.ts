import { FaApple, FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import type { Project } from "@/types";
import { pickFeatured } from "@/lib/projectList";

import ecoWeb from "@/assets/web_desktop_cover_image2.webp";
import machinaCover from "@/assets/projects/machina.webp";
import parsCover from "@/assets/projects/pars.webp";
import trimlyCover from "@/assets/projects/trimly.webp";

const source = (href: string) => [{ label: "Source", href, icon: FaGithub }];

export const projects: Project[] = [
  {
    id: "pars",
    title: "Pars",
    kind: "Mobile app for splitting trip expenses",
    category: "Production",
    year: 2026,
    period: "2026 — Present",
    status: "Production",
    description:
      "A mobile app for friend groups who split expenses on trips. Log who paid, split it fair, and settle up in a tap.",
    techStack: [
      "TypeScript",
      "React Native",
      "Expo",
      "TanStack Query",
      "Hono",
      "Astro",
      "GSAP",
      "Preact",
    ],
    stack: ["TypeScript", "React Native", "Expo", "TanStack Query", "Hono"],
    links: [
      {
        label: "Get on the App Store",
        href: "https://apps.apple.com/us/app/pars-split-bills-expenses/id6822402266",
        icon: FaApple,
      },
      {
        label: "splitpars.app",
        href: "https://splitpars.app",
        icon: FiExternalLink,
      },
    ],
    cover: {
      src: parsCover,
      alt: "Pars home screen showing a Siargao trip where you get back ₱2,450, with other groups below",
    },
  },
  {
    id: "machina",
    title: "MACHINA",
    kind: "iOS motorcycle maintenance tracker",
    category: "Production",
    year: 2026,
    period: "2026 — Present",
    status: "Production",
    description:
      "Offline-first app that tracks service intervals, history and costs per bike. Multi-bike, no account, fully on-device.",
    techStack: [
      "TypeScript",
      "React Native",
      "Expo",
      "Expo Router",
      "SQLite",
      "Drizzle ORM",
      "Zustand",
      "Reanimated",
    ],
    stack: ["TypeScript", "React Native", "Expo", "SQLite", "Drizzle ORM"],
    links: [
      {
        label: "Get on the App Store",
        href: "https://apps.apple.com/us/app/machina-know-your-ride/id6775355789",
        icon: FaApple,
      },
      {
        label: "ridemachina.app",
        href: "https://ridemachina.app",
        icon: FiExternalLink,
      },
    ],
    cover: {
      src: machinaCover,
      alt: "MACHINA dashboard showing estimated odometer, urgent and due-soon service counts",
    },
    caseStudy: {
      sections: [
        {
          label: "The problem",
          body: "Riders carry service intervals in their heads or scatter them across receipts and notes. It's easy to lose track of what's due, what's already overdue, and what the last job cost, especially across more than one bike.",
        },
        {
          label: "What I built",
          body: "An offline-first iOS app that tracks service intervals and full maintenance history per motorcycle. The dashboard reads like an instrument cluster: what's due, what's overdue, and what you last paid, at a glance. Multi-bike, no account, every record stored on the device.",
        },
        {
          label: "Key decisions",
          body: [
            "No account, fully on-device. Maintenance data is personal and a garage often has no signal, so the app never depends on a network. SQLite through Drizzle ORM is the single source of truth, with a typed schema and migrations.",
            "React Native on Expo for a fast path to the App Store, with Expo Router for navigation and EAS for builds and submission.",
            "Zustand keeps UI state small and predictable; Reanimated drives the gauge and transition motion so the instrument-cluster feel stays smooth.",
          ],
        },
        {
          label: "Outcome",
          body: "Shipped solo and live on the App Store since June 2026, where it peaked at #3 in the Utilities category.",
        },
      ],
      stat: { value: "#3", label: "App Store · Utilities Category" },
    },
  },
  {
    id: "trimly",
    title: "Trimly",
    kind: "URL shortener and link manager",
    category: "Production",
    year: 2026,
    period: "2026 — Present",
    status: "Production",
    description:
      "Shorten long links and manage them in one place. Built on a NestJS backend with MongoDB and Redis.",
    techStack: [
      "TypeScript",
      "NestJS",
      "React",
      "Tailwind CSS",
      "MongoDB",
      "Redis",
    ],
    stack: ["TypeScript", "NestJS", "React", "MongoDB", "Redis"],
    links: [
      {
        label: "Visit trimmly.xyz",
        href: "https://www.trimmly.xyz",
        icon: FiExternalLink,
      },
    ],
    cover: {
      src: trimlyCover,
      alt: "Trimly shortening a long URL into a trimmly.xyz short link",
    },
  },
  {
    id: "ecopoints",
    title: "EcoPoints",
    kind: "Gamified recycling platform: mobile app + admin dashboard",
    category: "University",
    year: 2024,
    period: "Jun 2024 — Apr 2025",
    status: "Completed",
    description:
      "Recycling engagement platform for the University of San Jose – Recoletos. A semi-smart trashcan identifies and counts plastic bottles, awarding points redeemable for meals, supplies, and event tickets.",
    techStack: [
      "Flutter",
      "Dart",
      "TypeScript",
      "Remix",
      "React",
      "Tailwind CSS",
      "Firebase",
      "Firestore",
    ],
    links: [
      {
        label: "Mobile source",
        href: "https://github.com/kimrolx/EcoPoints-Mobile",
        icon: FaGithub,
      },
      {
        label: "Web source",
        href: "https://github.com/nnyyyy3/EcoPoints-Web",
        icon: FaGithub,
      },
    ],
    cover: {
      src: ecoWeb,
      alt: "EcoPoints web dashboard with recycling analytics",
    },
  },
  {
    id: "haven",
    title: "Haven",
    kind: "Real-time anonymous chat rooms",
    category: "Experiment",
    year: 2024,
    description: "Real-time anonymous chat rooms.",
    techStack: ["Next.js", "TypeScript"],
    links: source("https://github.com/kimrolx/Haven"),
  },
  {
    id: "soundsense",
    title: "SoundSense",
    kind: "Android app that captures ambient noise and reads its decibel level",
    category: "Experiment",
    year: 2024,
    description:
      "Android app that captures ambient noise and reads its decibel level.",
    techStack: ["Flutter", "Dart"],
    links: source("https://github.com/kimrolx/SoundSense"),
  },
  {
    id: "pokeinfo",
    title: "PokeInfo",
    kind: "Pokémon lookup built on the PokéAPI",
    category: "Experiment",
    year: 2024,
    description: "Pokémon lookup built on the PokéAPI.",
    techStack: ["React", "TypeScript"],
    links: source("https://github.com/kimrolx/PokeInfo"),
  },
  {
    id: "stats-and-estates",
    title: "Stats & Estates",
    kind: "Real estate browsing app with property listings and detail views",
    category: "Experiment",
    year: 2023,
    description:
      "Real estate browsing app with property listings and detail views.",
    techStack: ["Flutter", "Dart"],
    links: source("https://github.com/kimrolx/Stats-and-Estates"),
  },
];

export const featuredProjects = pickFeatured(projects, [
  "machina",
  "pars",
  "trimly",
]);
