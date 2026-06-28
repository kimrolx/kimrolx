import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import type { SocialLink } from '@/types';

export const profile = {
  name: 'Kim Roland Berame',
  role: 'Software Engineer',
  location: 'Philippines',
  city: 'Cebu, Philippines',
  resumeUrl: `${import.meta.env.BASE_URL}KIM_ROLAND_BERAME-RESUME.pdf`,
  education: {
    degree: 'B.S. Information Technology',
    school: 'University of San Jose – Recoletos',
  },
  /** Multilingual greetings for the typewriter. Filipino first. */
  greetings: [
    'Kumusta?', // Filipino
    'Hello', // English
    'Bonjour', // French
    'Hola', // Spanish
    'नमस्ते', // Hindi
    'こんにちは', // Japanese
    '안녕하세요', // Korean
    '你好', // Chinese
    'שלום', // Hebrew
    'Привет', // Russian
    'สวัสดี', // Thai
  ],
  /** Cycled in the hero role line, as "> {phrase}". Self-contained verb phrases. */
  roles: [
    'building full-stack systems, end to end',
    'designing APIs in NestJS and PostgreSQL',
    'shipping iOS apps in React Native',
    'wiring CI/CD and cloud delivery on Azure',
  ],
  intro:
    "I'm a software engineer who ships full-stack systems end to end, from system design and API architecture to frontend integration and cloud deployment. I work mainly in TypeScript, NestJS, PostgreSQL, and React. Currently building at Griffin31.",
  about: [
    'I take ownership of features from start to finish: designing the system and its APIs, building the React frontend, and deploying to the cloud. My core stack is TypeScript, NestJS, PostgreSQL, and React, with MongoDB and Redis on projects that need them. I hold a B.S. in Information Technology from the University of San Jose – Recoletos.',
    'A lot of my work is in platform reliability and release efficiency. I build and maintain CI/CD pipelines with GitHub Actions, containerize services with Docker, and run cloud delivery on Azure (ACR and ACA), which keeps releases faster, more consistent, and lower on operational overhead.',
    'I care about ownership and long-term maintainability: systems that hold up in production, not just on the first deploy.',
  ],
} as const;

export const socials: SocialLink[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/kimrolx',
    handle: '@kimrolx',
    icon: FaGithub,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/kim-roland-berame',
    handle: 'in/kim-roland-berame',
    icon: FaLinkedin,
  },
  {
    label: 'Email',
    href: 'mailto:beramekimrol@gmail.com',
    handle: 'beramekimrol@gmail.com',
    icon: FaEnvelope,
  },
];
