'use client';
import React, { useEffect, useState, useRef } from 'react';
import { useLatexContext } from '@/context/LatexContext';
import { compile } from '@/components/Templates';
import ResumeForm from './ResumeForm';
import { ResumeData } from "../types";
import ResumePreview from './ResumePreview';

export default function EditorPage() {
  const { latex, setLatex } = useLatexContext();
  const [resumeHtml, setResumeHtml] = useState('');
  const resumePreviewRef = useRef<HTMLIFrameElement>(null);

  const handlePrint = () => {
    if (resumePreviewRef.current) {
      (resumePreviewRef.current as HTMLIFrameElement).contentWindow?.print();
    }
  };

  useEffect(() => {
    if (!latex.length) {
      return;
    }
    const data = JSON.parse(latex);
    const result = compile(data);
    setResumeHtml(result);
  }, [latex])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'p') {
        event.preventDefault();
        handlePrint();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleFormUpdate = (data: ResumeData) => {
    setLatex(JSON.stringify(data, null, 2));
  }

  if (!latex.length) {
    return <div>Loading...</div>
  }

  return (
    <div className="h-full flex flex-row w-full">
      {/* Editor Section */}
      <div className='h-full flex-1 relative flex flex-col print:hidden'>
        <div className="p-2 flex justify-center items-center text-gray-500 shadow-lg border-b border-b-indigo-950">
          <h2 className=" font-bold bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent text-center">Resume Builder</h2>
        </div>
        <div className="w-full px-2 overflow-auto flex-grow">
          <ResumeForm aiData={JSON.parse(latex)} onFormUpdate={handleFormUpdate} />
        </div>
      </div>

      <ResumePreview resumeHtml={resumeHtml} resumePreviewRef={resumePreviewRef} handlePrint={handlePrint} />
    </div>
  );
}
