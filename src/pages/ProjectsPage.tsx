import { ProjectCard } from '@/components/project-card/ProjectCard';
import { ProjectItem } from '@/types/project';

const projectItems: ProjectItem[] = [
  {
    id: 'ecopoints-mobileapp',
    title: 'EcoPoints',
    description:
      'EcoPoints enhances recycling engagement at the University of San Jose – Recoletos by using a gamified, point-based reward system. A semi-smart trashcan identifies and counts plastic bottles, awarding points redeemable for meals, supplies, event tickets, and more. This project leverages technology and behavioral science to foster a sustainable culture on campus.',
    startDate: 'June 2024',
    endDate: 'April 2025',
    status: 'Completed',
    techStack: [
      { label: 'Flutter', color: '#5FC9F8', textColor: '#000000' },
      { label: 'Dart', color: '#04599C' },
      { label: 'Firebase', color: '#DD2C00' },
      { label: 'Firestore', color: '#FF9100' },
    ],
  },
  {
    id: 'ecopoints-webapp',
    title: 'EcoPoints Web Dashboard ',
    description:
      'A dashboard for EcoPoints, where data visualization and user interaction are key. The project focuses on creating a user-friendly interface for managing and visualizing EcoPoints data.',
    startDate: 'June 2024',
    endDate: 'April 2025',
    status: 'Completed',
    techStack: [
      { label: 'TypeScript', color: '#3079C6' },
      { label: 'Remix', color: '#000000' },
      { label: 'React', color: '#61DAFB', textColor: '#000000' },
      {
        label: 'Tailwind CSS',
        color: '#16BECB',
      },
      { label: 'Firebase', color: '#DD2C00' },
      { label: 'Firestore', color: '#FF9100' },
    ],
  },
];

export default function ProjectsPage() {
  return (
    <div className="px-12">
      <div className="flex flex-col text-center gap-4 mb-15">
        <h1>Projects</h1>
        <h5>Prototypes, Digital Products, University Projects, and Open Source Contributions.</h5>
      </div>
      <div className="flex flex-col md:flex-row justify-center gap-10 md:gap-30">
        {projectItems.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
