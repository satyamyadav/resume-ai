export interface Experience {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
  responsibilities: string[];
}

export interface Education {
  degree: string;
  institution: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Skill {
  category: string;
  list: string;
}

export interface Project {
  name: string;
  technologies: string;
  details: string[];
}

export interface Portfolio {
  github: string;
  linkedin: string;
}

export type ResumeData = string

export interface ResumeFormProps {
  aiData?: ResumeData;
  onFormUpdate: (data: ResumeData) => void;
}