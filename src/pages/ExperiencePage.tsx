import { TimelineItems } from '@/types/timeline';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

export default function ExperiencePage() {
  const items: TimelineItems[] = [
    {
      id: 'griffin',
      companyIcon: 'src/assets/griffin_logo.png',
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
      techStack: ['TypeScript', 'React', 'Redux', 'Axios', 'NestJS', 'PostgreSQL'],
    },
  ];

  return (
    <>
      <p className="text-5xl text-center p-12 font-bold">Professional Experience </p>
      <VerticalTimeline>
        {items.map((item) => (
          <VerticalTimelineElement
            key={item.id}
            contentStyle={{ background: 'white', color: '#0A0A0A' }}
            contentArrowStyle={{ borderRight: '7px solid inherit' }}
            date={item.date}
            dateClassName="text-white"
            iconStyle={{ background: 'white' }}
            icon={
              <div className="flex items-center justify-center w-full h-full">
                <img src={item.companyIcon} alt={item.companyName} className="w-10 h-10 object-contain" />
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
              {item.techStack?.map((tech, index) => (
                <span
                  key={index}
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full 
                transition transform duration-200 hover:scale-105 hover:shadow-md"
                >
                  {tech}
                </span>
              ))}
            </div>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </>
  );
}
