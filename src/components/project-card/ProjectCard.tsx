import { useEffect, useState } from 'react';
import { ProjectItem } from '@/types/project';
import { glassmorphismStyle } from '@/pages/ExperiencePage';
import { Badge } from '../badge';
import { FaGithub } from 'react-icons/fa';
import { AiFillPicture } from 'react-icons/ai';

export function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    setIsDesktop(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return isDesktop;
}

interface ProjectCardProps {
  project: ProjectItem;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [flipped, setFlipped] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(-1);
  const [fade, setFade] = useState(true);
  const isDesktop = useIsDesktop();

  const handleClick = () => setFlipped(!flipped);

  const BackSideContent = (
    <div className="flex flex-col gap-3 p-4 rounded-md shadow-lg" style={glassmorphismStyle}>
      <div className="flex flex-row justify-between items-center">
        <h3 className="mb-2">{project.title}</h3>
        <Badge label={project.status.label} color={project.status.color} />
      </div>
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
    <div className="flex flex-col items-center gap-4" style={{ perspective: '1000px' }}>
      <div className="cursor-pointer relative w-full md:w-[500px]" onClick={handleClick}>
        <div
          className="transition-transform duration-500 min-h-64"
          style={{
            transformStyle: 'preserve-3d',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          <div
            className="absolute inset-0 shadow-lg hover:scale-105 transition-all duration-300"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(0deg)',
            }}
            onMouseEnter={() => {
              if (project.images && project.images.length > 0) {
                // Fade-out and then switch to alternate image with no grayscale.
                setFade(false);
                setTimeout(() => {
                  setCurrentImageIndex(0);
                  setFade(true);
                }, 300);
              }
            }}
            onMouseLeave={() => {
              // Fade-out and then reset to coverImage (with grayscale).
              setFade(false);
              setTimeout(() => {
                setCurrentImageIndex(-1);
                setFade(true);
              }, 300);
            }}
          >
            <img
              src={
                currentImageIndex === -1
                  ? isDesktop
                    ? project.coverImage[1]
                    : project.coverImage[0]
                  : isDesktop
                  ? project.images?.[1]
                  : project.images?.[0]
              }
              alt="cover-image"
              className="object-cover w-full h-full rounded-md"
              style={{
                transition: 'opacity 1500ms ease, transform 1500ms ease, filter 1500ms ease',
                filter: currentImageIndex === -1 ? 'grayscale(100%)' : 'grayscale(0%)',
              }}
            />
          </div>

          <div
            className="rounded-md shadow-lg hover:scale-105 transition-all duration-300"
            style={{
              transform: 'rotateY(180deg)',
              backfaceVisibility: 'hidden',
            }}
          >
            {BackSideContent}
          </div>
        </div>
      </div>
      <a
        href={project.githubUrl ? project.githubUrl : project.images ? project.images[0] : '#'}
        target="_blank"
        rel="noopener noreferrer"
        className="underline transition-all duration-300 hover:cursor-pointer hover:text-blue-500"
      >
        {project.githubUrl ? <FaGithub size={'2rem'} /> : project.images ? <AiFillPicture /> : ''}
      </a>
    </div>
  );
}
