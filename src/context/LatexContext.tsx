'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LatexContextProps {
  latex: string;
  setLatex: (latex: string) => void;
  renderedHtml: string;
  setRenderedHtml: (html: string) => void;
  resumeId: string;
  setResumeId: (id: string) => void;
  templateName: string;
  setTemplateName: (name: string) => void;
  isTemplateSelectorOpen: boolean;
  setTemplateSelectorOpen: (isOpen: boolean) => void;
  userData?: { name: string; role: string; isNew: boolean; isManual: boolean };
  setUserData: (userData: { name: string; role: string; isNew: boolean; isManual: boolean } | undefined) => void;
}

const LatexContext = createContext<LatexContextProps | undefined>(undefined);

const defaultJson = `
# Shubham Yadav
**Frontend Developer**
📍 Noida, Delhi, NCR
📧 shubham.relieved@gmail.com
🔗 [GitHub](https://github.com/shbh) | [LinkedIn](https://www.linkedin.com/in/shbh)

---

## 📝 Summary

I am a Software Engineer with 3 years of experience specializing in scalable and well-documented code. I excel in both collaborative team environments and independent project execution.

---

## 🧠 Skills

- **Languages**: React.js, Next.js, Redux, JavaScript, REST, ES6, JSON, TypeScript, HTML, CSS, Jest, SCSS
- **Libraries**: Reactstrap, Material-UI, Core UI, Bootstrap
- **Tools**: Git, GitLab, Jira, Heroku, VS Code, Linux, macOS
- **Familiar**: Node.js, Express.js, MongoDB

---

## 🎓 Education

**B.Tech CSE**
SCRIET, Chaudhary Charan Singh University, Meerut, India
📅 2016 - 2020

---

## 💼 Experience

### **ZoopIndia.com Pvt. Ltd.**
*Oct 2022 – Present*
Zoop is a technology company authorized by IRCTC to provide online food ordering services for Indian Railway passengers.

**Responsibilities:**
- Managed and enhanced the admin panel by creating new designs and adding functionalities using Next.js, Material-UI, and React.js.
- Migrated admin panel from Angular to Next.js and customer web from React.js to Next.js.
- Developed dynamic and responsive web applications prioritizing performance and scalability.
- **Links**: [Customer Website](https://www.zoopindia.com), [Admin Dashboard](https://admin.zoopindia.com)

---

### **Digi Clave Pvt. Ltd.**
*Sep 2021 – Sep 2022*
Front-End Web Development

**Responsibilities:**
- Worked on multiple projects as a Front-End Developer, integrating APIs with dynamic functionality.
- Technologies used: React.js, Material-UI, Redux.
- **Key Project**: Inspection Support Network (ISN) – A home inspection software simplifying scheduling, billing, reporting, and more.

---

## 🧪 Projects

### **QuizApp**
*MongoDB, Express.js, React.js, Heroku*
- A quiz app with time-bound quizzes for college students, including authentication and admin dashboard for quiz tracking.

---

### **Blog App**
*PostgreSQL, Express.js, Bootstrap, Heroku*
- A blogging platform with post creation and listing capabilities.

---

## 📁 Portfolio

- [GitHub](https://github.com/shbh)
- [LinkedIn](https://www.linkedin.com/in/shbh)

`

export const LatexProvider = ({ children }: { children: ReactNode }) => {
  const [latex, setLatex] = useState('');
  const [renderedHtml, setRenderedHtml] = useState('');
  const [resumeId, setResumeId] = useState('');
  const [templateName, setTemplateName] = useState('base');
  const [isTemplateSelectorOpen, setTemplateSelectorOpen] = useState(false);
  const [userData, setUserData] = useState<{ name: string; role: string; isNew: boolean; isManual: boolean } | undefined>(undefined);

  useEffect(() => {
    const storedLatex = window.localStorage.getItem('latex');
    const storedHtml = window.localStorage.getItem('renderedHtml');
    const storedUserData = window.localStorage.getItem('userData');
    let isValid = false;
    // check if storedLatex is valid JSON
    try {
      isValid = true;
    } catch (error) {
      console.error('Invalid JSON stored in localStorage:', error);
      isValid = false;
      window.localStorage.removeItem('latex');
    }
    if (storedLatex && storedLatex.length && isValid) {
      setLatex(storedLatex);
      if (storedHtml) {
        setRenderedHtml(storedHtml);
      }
    } else {
      setLatex(defaultJson);
    }

    const storedTemplateName = window.localStorage.getItem('templateName');
    if (storedTemplateName && storedTemplateName.length) {
      setTemplateName(storedTemplateName);
    }
    if (storedUserData && storedUserData.length) {
      try {
        const parsedUserData = JSON.parse(storedUserData);
        setUserData(parsedUserData);
      } catch (error) {
        console.error('Invalid JSON stored in localStorage:', error);
        window.localStorage.removeItem('userData');
      }
    } else {
      setUserData({ name: '', role: '', isNew: false, isManual: false });
    }
  }, []);

  useEffect(() => {
    if (latex.length) {
      window.localStorage.setItem('latex', latex);
    }
    if (renderedHtml.length) {
      window.localStorage.setItem('renderedHtml', renderedHtml);
    }
    if (templateName.length) {
      window.localStorage.setItem('templateName', templateName);
    }
    if(userData && userData.name && userData.role) {
      window.localStorage.setItem('userData', JSON.stringify(userData));
    }
  }, [latex, renderedHtml, templateName, userData]);

  return (
    <LatexContext.Provider value={{ 
      latex, setLatex, renderedHtml, setRenderedHtml, resumeId, setResumeId, templateName, setTemplateName, isTemplateSelectorOpen, 
      setTemplateSelectorOpen,
      userData, setUserData
       }}>
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