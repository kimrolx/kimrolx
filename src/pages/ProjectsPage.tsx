import { ProjectCard } from '@/components/project-card/ProjectCard';
import { ProjectItem } from '@/types/project';
import MobileScreenCoverPage from '@/assets/mobile_cover_image.png';
import MobileScreenCoverPage2 from '@/assets/mobile_cover_image2.png';
import DesktopScreenCoverPage from '@/assets/desktop_cover_image.png';
import DesktopScreenCoverPage2 from '@/assets/desktop_cover_image2.png';
import WebMobileCoverImage from '@/assets/web_mobile_cover_image.png';
import WebMobileCoverImage2 from '@/assets/web_mobile_cover_image2.png';
import WebDesktopCoverImage from '@/assets/web_desktop_cover_image.png';
import WebDesktopCoverImage2 from '@/assets/web_desktop_cover_image2.png';

const projectItems: ProjectItem[] = [
  {
    id: 'ecopoints-mobileapp',
    title: 'EcoPoints',
    coverImage: [MobileScreenCoverPage, DesktopScreenCoverPage],
    images: [MobileScreenCoverPage2, DesktopScreenCoverPage2],
    description:
      'EcoPoints enhances recycling engagement at the University of San Jose – Recoletos by using a gamified, point-based reward system. A semi-smart trashcan identifies and counts plastic bottles, awarding points redeemable for meals, supplies, event tickets, and more. This project leverages technology and behavioral science to foster a sustainable culture on campus.',
    startDate: 'June 2024',
    endDate: 'April 2025',
    status: { label: 'Completed', color: 'var(--complete-green)' },
    techStack: [
      { label: 'Flutter', color: '#5FC9F8' },
      { label: 'Dart', color: '#04599C' },
      { label: 'Firebase', color: '#DD2C00' },
      { label: 'Firestore', color: '#FF9100' },
    ],
    githubUrl: 'https://github.com/kimrolx/EcoPoints-Mobile',
  },
  {
    id: 'ecopoints-webapp',
    title: 'EcoPoints Web Dashboard ',
    coverImage: [WebMobileCoverImage, WebDesktopCoverImage],
    images: [WebMobileCoverImage2, WebDesktopCoverImage2],
    description:
      'A dashboard for EcoPoints, where data visualization and user interaction are key. The project focuses on creating a user-friendly interface for managing and visualizing EcoPoints data.',
    startDate: 'June 2024',
    endDate: 'April 2025',
    status: { label: 'Completed', color: 'var(--complete-green)' },
    techStack: [
      { label: 'TypeScript', color: '#3079C6' },
      { label: 'Remix', color: '#000000' },
      { label: 'React', color: '#61DAFB' },
      {
        label: 'Tailwind CSS',
        color: '#16BECB',
      },
      { label: 'Firebase', color: '#DD2C00' },
      { label: 'Firestore', color: '#FF9100' },
    ],
    githubUrl: 'https://github.com/nnyyyy3/EcoPoints-Web',
  },
];

export default function ProjectsPage() {
  return (
    <div className="px-12">
      <div className="flex flex-col text-center gap-4 mb-15">
        <h1>Projects</h1>
        <h5>Prototypes, Digital Products, University Projects, and Open Source Contributions.</h5>
      </div>
      <div className="flex flex-col md:flex-row justify-center gap-15 md:gap-30">
        {projectItems.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
