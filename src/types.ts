export interface Experience {
    title: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string;
  }
  
  export interface Education {
    degree: string;
    institution: string;
    startDate: string;
    endDate: string;
    description: string;
  }
  
  export interface ResumeData {
    name: string;
    email: string;
    phone: string;
    linkedin: string;
    github: string;
    summary: string;
    experience: Experience[];
    education: Education[];
    skills: string[];
  }
  
  export interface ResumeFormProps {
    aiData?: ResumeData;
  }