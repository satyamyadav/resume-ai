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

export const LatexProvider = ({ children }: { children: ReactNode }) => {
  const [latex, setLatex] = useState('');
  const [resumeId, setResumeId] = useState('');
  const [compilation, setCompilation] = useState({
    loading: false,
    error: false,
    success: false,
    latex: '',
    errorText: '',
  });

  useEffect(() => {
    const storedLatex = window.localStorage.getItem('latex');
    if(storedLatex && storedLatex.length) {
      setLatex(JSON.parse(storedLatex));
    }
  }, [])


  // useEffect(() => {
  //   if (compilation.error) {
  //     try {
  //       setCompilation({ ...props, loading: true });

  //       const res = await axios.post('/api/review', {
  //         messages: [{
  //           role: 'user', content: `
  //       Fix the error in the following LaTeX code:
  //       ${latex}
  //       Error: ${props.errorText}
  //       `}]
  //       });
  //       const reply = res.data.reply;

  //       const latexMatch = reply.match(/ZZZCODEZZZ([\s\S]*?)ZZZCODEZZZ/);
  //       if (latexMatch) {
  //         const newLatex = latexMatch[1].trim();
  //         setLatex(newLatex);
  //         setCompilation({ loading: false, error: false, success: true, latex: newLatex, errorText: '' });
  //       } else {

  //         setCompilation({ loading: false, error: false, success: true, latex, errorText: '' });
  //       }
  //     } catch (error) {
  //       console.error('Error communicating with AI:', error);
  //       setCompilation({ loading: false, error: false, success: false, latex, errorText: '' });
  //     }
  //   }
  // }, [compilation.error, latex]);

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