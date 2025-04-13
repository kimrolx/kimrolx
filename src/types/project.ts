export type ProjectItem = {
  id: string;
  title: string;
  images?: string[];
  thesisDescription?: string;
  description: string;
  startDate: string;
  endDate: string;
  status: ProjectStatus;
  teamMembers?: string[];
  techStack: string[];
  githubUrl?: string;
};

export type ProjectStatus = 'Not Started' | 'In Progress' | 'Completed' | 'On Hold';
