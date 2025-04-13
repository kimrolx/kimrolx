export type TimelineItems = {
  id: string;
  companyIcon: string;
  companyName: string;
  jobTitle: string;
  description: string[];
  date: string;
  employmentType: string;
  techStack: {
    label: string;
    color: string;
    textColor?: string;
  }[];
};
