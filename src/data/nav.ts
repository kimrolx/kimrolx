export type NavItem = {
  n: string;
  label: string;
  to: string;
  /** home-anchor section id (scroll-spy) */
  section?: string;
  /** standalone route path */
  route?: string;
};

export const NAV_ITEMS: NavItem[] = [
  { n: '01', label: 'Experience', to: '/#experience', section: 'experience' },
  { n: '02', label: 'Projects', to: '/#projects', section: 'projects' },
  { n: '03', label: 'About', to: '/#about', section: 'about' },
  { n: '04', label: 'Contact', to: '/#contact', section: 'contact' },
  { n: '05', label: 'Gear', to: '/gear', route: '/gear' },
  { n: '06', label: 'Now', to: '/now', route: '/now' },
];

export const SECTION_IDS = ['home', ...NAV_ITEMS.flatMap((item) => (item.section ? [item.section] : []))];
