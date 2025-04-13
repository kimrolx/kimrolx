export type ProjectItem = {
  id: string;
  title: string;
  coverImage: string;
  images?: string[];
  thesisDescription?: string;
  description: string;
  startDate: string;
  endDate: string;
  status: {
    label: ProjectStatus;
    color: string;
  };
  teamMembers?: string[];
  techStack: {
    label: string;
    color: string;
    textColor?: string;
  }[];
  githubUrl?: string;
};
export type ProjectStatus = 'Not Started' | 'In Progress' | 'Completed' | 'On Hold';
