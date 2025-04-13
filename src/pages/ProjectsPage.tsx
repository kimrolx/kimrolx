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
    techStack: ['Flutter', 'Dart', 'Firebase', 'Firestore'],
  },
  {
    id: 'ecopoints-webapp',
    title: 'EcoPoints Web Dashboard ',
    description:
      'A dashboard for EcoPoints, where data visualization and user interaction are key. The project focuses on creating a user-friendly interface for managing and visualizing EcoPoints data.',
    startDate: 'June 2024',
    endDate: 'April 2025',
    status: 'Completed',
    techStack: ['Typescript', 'Remix', 'React', 'Tailwind CSS', 'Firebase', 'Firestore'],
  },
];

export default function ProjectsPage() {
  return (
    <div className="px-6">
      <div className="flex flex-col text-center gap-4 mb-15">
        <h1>Projects</h1>
        <h5>Prototypes, Digital Products, University Projects, and Open Source Contributions.</h5>
      </div>
      <div className="flex flex-col md:flex-row">
        {projectItems.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
