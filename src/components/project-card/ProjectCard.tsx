import { useState } from 'react';
import { ProjectItem } from '@/types/project';
import { glassmorphismStyle } from '@/pages/ExperiencePage';

interface ProjectCardProps {
  project: ProjectItem;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [flipped, setFlipped] = useState(false);

  // Toggle flipped state on click
  const handleClick = () => setFlipped(!flipped);

  return (
    <div className="p-4 cursor-pointer w-full centered" style={{ perspective: '1000px' }} onClick={handleClick}>
      <div
        className="relative w-full h-64 md:w-[500px] md:h-[700px] transition-transform duration-500 grid"
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front side with placeholder image */}
        <div
          className="col-start-1 row-start-1 border rounded-md shadow-lg hover:scale-105 transition-all duration-300"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="bg-gray-300 flex items-center justify-center w-full">
            <span className="text-xl font-bold">Placeholder Image</span>
          </div>
        </div>
        {/* Back Side */}
        <div
          className="col-start-1 row-start-1 border rounded-md shadow-lg hover:scale-105 transition-all duration-300 p-4 flex flex-col gap-2"
          style={{
            ...glassmorphismStyle,
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="flex flex-row items-center justify-between">
            <h2 className="mb-2">{project.title}</h2>
            <h6>
              {project.startDate} - {project.endDate}
            </h6>
          </div>
          <p className="text-sm mb-2">{project.description}</p>
          <p className="text-xs mb-1">
            <span className="font-bold">Tech:</span> {project.techStack.join(', ')}
          </p>
        </div>
      </div>
    </div>
  );
}
