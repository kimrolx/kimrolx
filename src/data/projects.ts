import { FaGithub, FaApple } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';
import type { Project } from '@/types';

import ecoMobile from '@/assets/mobile_cover_image2.webp';
import ecoWeb from '@/assets/web_desktop_cover_image2.webp';
import machinaDashboard from '@/assets/machina/3.webp';
import machinaHistory from '@/assets/machina/5.webp';

export const projects: Project[] = [
  {
    id: 'machina',
    title: 'MACHINA: Know Your Ride',
    kind: 'iOS App - Motorcycle Maintenance Tracker',
    version: '1.2.0 released on June 29, 2026',
    period: '2026 – Present',
    status: 'Production',
    description:
      "Offline-first iOS app that tracks motorcycle service intervals and history per bike. What's due, what's overdue, and what you last paid. Multi-bike, no account, fully on-device. Live on the App Store since June 2026, peaked #3 in Utilities. Android-support in active development.",
    techStack: [
      { label: 'TypeScript' },
      { label: 'React Native' },
      { label: 'Expo' },
      { label: 'Expo Router' },
      { label: 'SQLite' },
      { label: 'Drizzle ORM' },
      { label: 'Zustand' },
      { label: 'Reanimated' },
    ],
    links: [
      {
        label: 'Get on the App Store',
        href: 'https://apps.apple.com/us/app/machina-know-your-ride/id6775355789',
        icon: FaApple,
      },
    ],
    images: [
      { src: machinaDashboard, alt: 'MACHINA dashboard showing odometer, overdue and due-soon service counts' },
      { src: machinaHistory, alt: 'MACHINA service history list with logged maintenance and costs' },
    ],
    featured: true,
    caseStudy: {
      sections: [
        {
          label: 'The problem',
          body: "Riders carry service intervals in their heads or scatter them across receipts and notes. It's easy to lose track of what's due, what's already overdue, and what the last job cost, especially across more than one bike.",
        },
        {
          label: 'What I built',
          body: "An offline-first iOS app that tracks service intervals and full maintenance history per motorcycle. The dashboard reads like an instrument cluster: what's due, what's overdue, and what you last paid, at a glance. Multi-bike, no account, every record stored on the device.",
        },
        {
          label: 'Key decisions',
          body: [
            'No account, fully on-device. Maintenance data is personal and a garage often has no signal, so the app never depends on a network. SQLite through Drizzle ORM is the single source of truth, with a typed schema and migrations.',
            'React Native on Expo for a fast path to the App Store, with Expo Router for navigation and EAS for builds and submission.',
            'Zustand keeps UI state small and predictable; Reanimated drives the gauge and transition motion so the instrument-cluster feel stays smooth.',
          ],
        },
        {
          label: 'Outcome',
          body: 'Shipped solo and live on the App Store since June 2026, where it peaked at #3 in the Utilities category.',
        },
      ],
      stat: { value: '#3', label: 'App Store · Utilities' },
    },
  },
  {
    id: 'trimly',
    title: 'Trimly',
    kind: 'URL Shortener & Link Management Platform',
    period: '2026 – Present',
    status: 'Production',
    description:
      'A URL shortener and link manager: shorten long links, organize them, and track click metrics with free link analytics. Built on a NestJS backend with MongoDB and Redis to keep high-volume link generation and lookups fast.',
    techStack: [
      { label: 'TypeScript' },
      { label: 'NestJS' },
      { label: 'React' },
      { label: 'Tailwind CSS' },
      { label: 'MongoDB' },
      { label: 'Redis' },
    ],
    links: [{ label: 'Visit trimmly.xyz', href: 'https://www.trimmly.xyz', icon: FiExternalLink }],
    featured: true,
  },
  {
    id: 'ecopoints',
    title: 'EcoPoints',
    kind: 'Gamified Recycling Platform: Mobile Application + Admin Dashboard',
    period: 'Jun 2024 – Apr 2025',
    status: 'Completed',
    description:
      'Recycling engagement platform for the University of San Jose – Recoletos. A semi-smart trashcan identifies and counts plastic bottles, awarding points redeemable for meals, supplies, and event tickets. The companion dashboard lets administrators manage accounts and read recycling activity at a glance, pairing technology with behavioral nudges to build a sustainable campus habit.',
    techStack: [
      { label: 'Flutter' },
      { label: 'Dart' },
      { label: 'TypeScript' },
      { label: 'Remix' },
      { label: 'React' },
      { label: 'Tailwind CSS' },
      { label: 'Firebase' },
      { label: 'Firestore' },
    ],
    links: [
      { label: 'Mobile source', href: 'https://github.com/kimrolx/EcoPoints-Mobile', icon: FaGithub },
      { label: 'Web source', href: 'https://github.com/nnyyyy3/EcoPoints-Web', icon: FaGithub },
    ],
    images: [
      { src: ecoMobile, alt: 'EcoPoints mobile app screens showing points and rewards' },
      { src: ecoWeb, alt: 'EcoPoints web dashboard with recycling analytics' },
    ],
  },
];
