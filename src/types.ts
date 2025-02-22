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

export interface ResumeData {
  name: string;
  role: string;
  address: string;
  phone: string;
  email: string;
  github: string;
  linkedin: string;
  site: string;
  summary: string;
  skills: Skill[];
  education: Education[];
  experience: Experience[];
  projects: Project[];
  portfolio: Portfolio;
}

export interface ResumeFormProps {
  aiData?: ResumeData;
  onFormUpdate: (data: ResumeData) => void;
}