import { useState } from 'react';
import { ProjectItem } from '@/types/project';
import { glassmorphismStyle } from '@/pages/ExperiencePage';
import { Badge } from '../badge';

interface ProjectCardProps {
  project: ProjectItem;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [flipped, setFlipped] = useState(false);

  const handleClick = () => setFlipped(!flipped);

  const BackSideContent = (
    <div className="flex flex-col gap-3 p-4 border rounded-md shadow-lg" style={glassmorphismStyle}>
      <h3 className="mb-2">{project.title}</h3>
      <h6 className="font-semibold">
        {project.startDate} - {project.endDate}
      </h6>
      <p className="text-sm/6 mb-2 text-justify">{project.description}</p>

      <div className="flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <Badge key={tech.label} label={tech.label} color={tech.color} textColor={tech.textColor} />
        ))}
      </div>
    </div>
  );

  return (
    // Outer wrapper with a margin to avoid overlap with adjacent cards.
    <div className="cursor-pointer" style={{ perspective: '1000px' }} onClick={handleClick}>
      <div className="relative w-full md:w-[500px]">
        <div
          className="transition-transform duration-500"
          style={{
            transformStyle: 'preserve-3d',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          <div
            className="absolute inset-0 border rounded-md shadow-lg hover:scale-105 transition-all duration-300"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(0deg)',
            }}
          >
            <img src="https://via.placeholder.com/500x300" alt="Placeholder" className="object-cover w-full h-full" />
          </div>

          <div
            className="border rounded-md shadow-lg hover:scale-105 transition-all duration-300"
            style={{
              transform: 'rotateY(180deg)',
              backfaceVisibility: 'hidden',
            }}
          >
            {BackSideContent}
          </div>
        </div>
      </div>
    </div>
  );
}
