import { TimelineItems } from '@/types/timeline';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import griffinLogo from '@/assets/griffin_logo.png';
import { Badge } from '@/components/badge';

export const glassmorphismStyle = {
  background: 'rgba(255, 255, 255, 0.05)',
  borderRadius: '16px',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  backdropFilter: 'blur(3.3px)',
  WebkitBackdropFilter: 'blur(3.3px)',
  border: '1px solid rgba(255, 255, 255, 0.17)',
};

const items: TimelineItems[] = [
  {
    id: 'griffin',
    companyIcon: griffinLogo,
    jobTitle: 'Fullstack Developer',
    companyName: 'Griffin31',
    date: 'August 2024 - Present',
    employmentType: 'Full-time',
    description: [
      'Developed web applications using ReactJS, Typescript, and Redux for efficient state management.',
      'Improved data integrity and performance by streamlining database operations with Typeorm and PostgreSQL.',
      'Developed scalable RESTful APIs with NestJS and Axios.',
      'Collaborated with cross-functional teams to gather requirements and deliver high-quality software solutions.',
    ],
    techStack: [
      { label: 'TypeScript', color: '#3079C6' },
      { label: 'React', color: '#61DAFB', textColor: '#000000' },
      { label: 'Redux', color: '#7F42C3' },
      { label: 'Axios', color: '#6624E9' },
      { label: 'NestJS', color: '#EA2845' },
      { label: 'PostgreSQL', color: '#2F6792' },
      { label: 'TypeORM', color: '#E83524' },
    ],
  },
];

export default function ExperiencePage() {
  return (
    <div className="px-6">
      <div className="flex flex-col text-center gap-4 mb-15">
        <h1>Professional Experience </h1>
        <h5>
          I'm currently working at Griffin31 as a Fullstack Developer, growing my skillset and teaming up with various
          professionals.
        </h5>
      </div>
      <VerticalTimeline>
        {items.map((item) => (
          <VerticalTimelineElement
            key={item.id}
            contentStyle={glassmorphismStyle}
            contentArrowStyle={{ borderRight: '7px solid inherit' }}
            date={item.date}
            dateClassName="text-white max-sm:mt-2"
            iconStyle={{ background: 'white' }}
            icon={
              <div className="flex items-center justify-center w-full h-full">
                <img src={item.companyIcon} alt={item.companyName} className="w-7 h-7 md:w-10 md:h-10 object-contain" />
              </div>
            }
          >
            <h4 className="vertical-timeline-element-title text-lg font-semibold">{item.jobTitle}</h4>
            <h5 className="vertical-timeline-element-subtitle text-xs">{item.companyName}</h5>
            <h6 className="text-sm text-[#006D5B] mt-2">{item.employmentType}</h6>

            <ul className="list-disc pl-7 mt-1">
              {item.description.map((desc, index) => (
                <li key={index} className="text-sm mt-2">
                  {desc}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2 mt-5">
              <div className="flex flex-wrap gap-2">
                {item.techStack.map((tech) => (
                  <Badge key={tech.label} label={tech.label} color={tech.color} textColor={tech.textColor} />
                ))}
              </div>
            </div>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
}
