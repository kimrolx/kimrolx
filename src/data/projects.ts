import { FaGithub } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';
import type { Project } from '@/types';

import ecoMobile from '@/assets/mobile_cover_image2.png';
import ecoWeb from '@/assets/web_desktop_cover_image2.png';

export const projects: Project[] = [
  {
    id: 'trimly',
    title: 'Trimly',
    kind: 'URL Shortener & Link Management Platform',
    period: '2024 – Present',
    status: 'Production',
    description:
      'A URL shortener and link manager: shorten long links, organize them, and track click metrics with free link analytics. Built on a NestJS backend with MongoDB and Redis to keep high-volume link generation and lookups fast.',
    techStack: [
      { label: 'TypeScript', color: '#3079c6' },
      { label: 'NestJS', color: '#ea2845' },
      { label: 'React', color: '#61dafb' },
      { label: 'Tailwind CSS', color: '#16becb' },
      { label: 'MongoDB', color: '#13aa52' },
      { label: 'Redis', color: '#dc382d' },
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
      { label: 'Flutter', color: '#5fc9f8' },
      { label: 'Dart', color: '#04599c' },
      { label: 'TypeScript', color: '#3079c6' },
      { label: 'Remix', color: '#888888' },
      { label: 'React', color: '#61dafb' },
      { label: 'Tailwind CSS', color: '#16becb' },
      { label: 'Firebase', color: '#dd2c00' },
      { label: 'Firestore', color: '#ff9100' },
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
