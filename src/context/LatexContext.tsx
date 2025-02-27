'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type TCompilation = {
  loading: boolean;
  error: boolean;
  success: boolean;
  latex: string;
  errorText: string;
};

interface LatexContextProps {
  latex: string;
  setLatex: (latex: string) => void;
  resumeId: string;
  setResumeId: (id: string) => void;
  compilation: TCompilation;
  setCompilation: (compilation: TCompilation) => void;
}

const LatexContext = createContext<LatexContextProps | undefined>(undefined);

const defaultJson = {
  "name": "Shubham Yadav",
  "role": "Frontend Developer",
  "address": "Noida, Delhi, NCR",
  "email": "shubham.relieved@gmail.com",
  "github": "https://github.com/shbh",
  "linkedin": "https://www.linkedin.com/in/shbh",
  "summary": "I am a Software Engineer with 3 years of experience specializing in scalable and well-documented code. I excel in both collaborative team environments and independent project execution.",
  "skills": [
    { "category": "Languages", "list": "React.js, Next.js, Redux, JavaScript, REST, ES6, JSON, TypeScript, HTML, CSS, Jest, SCSS" },
    { "category": "Libraries", "list": "Reactstrap, Material-UI, Core UI, Bootstrap" },
    { "category": "Tools", "list": "Git, GitLab, Jira, Heroku, VS Code, Linux, macOS" },
    { "category": "Familiar", "list": "Node.js, Express.js, MongoDB" }
  ],
  "education": [
    { "degree": "B.Tech CSE", "year": "2016 - 2020", "institution": "SCRIET, Chaudhary Charan Singh University, Meerut, India" }
  ],
  "experience": [
    {
      "company": "ZoopIndia.com Pvt. Ltd.",
      "duration": "Oct 2022 - Present",
      "description": "Zoop is a technology company authorized by IRCTC to provide online food ordering services for Indian Railway passengers.",
      "responsibilities": [
        "Managed and enhanced the admin panel by creating new designs and adding functionalities using Next.js, Material-UI, and React.js.",
        "Migrated admin panel from Angular to Next.js and customer web from React.js to Next.js.",
        "Developed dynamic and responsive web applications prioritizing performance and scalability.",
        "Links: Customer Website: https://www.zoopindia.com, Admin Dashboard: https://admin.zoopindia.com"
      ]
    },
    {
      "company": "Digi Clave Pvt. Ltd.",
      "duration": "Sep 2021 - Sep 2022",
      "description": "Front-End Web Development",
      "responsibilities": [
        "Worked on multiple projects as a Front-End Developer, integrating APIs with dynamic functionality.",
        "Technologies used: React.js, Material-UI, Redux.",
        "Key Project: Inspection Support Network (ISN) - A home inspection software simplifying scheduling, billing, reporting, and more."
      ]
    }
  ],
  "projects": [
    {
      "name": "QuizApp",
      "technologies": "MongoDB, Express.js, React.js, Heroku",
      "details": [
        "A quiz app with time-bound quizzes for college students, including authentication and admin dashboard for quiz tracking."
      ]
    },
    {
      "name": "Blog App",
      "technologies": "PostgreSQL, Express.js, Bootstrap, Heroku",
      "details": [
        "A blogging platform with post creation and listing capabilities."
      ]
    }
  ],
  "portfolio": {
    "github": "https://github.com/shbh",
    "linkedin": "https://www.linkedin.com/in/shbh"
  }
}


export const LatexProvider = ({ children }: { children: ReactNode }) => {
  const [latex, setLatex] = useState('');
  const [resumeId, setResumeId] = useState('');
  const [compilation, setCompilation] = useState({
    loading: false,
    error: false,
    success: false,
    latex: '{}',
    errorText: '',
  });

  useEffect(() => {
    const storedLatex = window.localStorage.getItem('latex');
    let isValid = false;
    // check if storedLatex is valid JSON
    try {
      JSON.parse(storedLatex || '');
      isValid = true;
    } catch (error) {
      console.error('Invalid JSON stored in localStorage:', error);
      isValid = false;
      window.localStorage.removeItem('latex');
    }
    if(storedLatex && storedLatex.length && isValid) {
      setLatex(storedLatex);
    } else {
      setLatex(JSON.stringify(defaultJson, null, 2));
    }
  }, [])

  useEffect(() => {
    if (latex.length) {
      window.localStorage.setItem('latex', latex);
    }
  } , [latex]);

  return (
    <LatexContext.Provider value={{ latex, setLatex, resumeId, setResumeId, compilation, setCompilation }}>
      {children}
    </LatexContext.Provider>
  );
};

export const useLatexContext = () => {
  const context = useContext(LatexContext);
  if (!context) {
    throw new Error('useLatexContext must be used within a LatexProvider');
  }
  return context;
};