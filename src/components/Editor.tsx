'use client';
import React, { useEffect, useState, useRef } from 'react';
import { useLatexContext } from '@/context/LatexContext';
import { compile } from '@/components/Templates';
import ResumeForm from './ResumeForm';
import { ResumeData } from "../types";

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

      <div className="overflow-hidden h-full shadow-lg border-l border-l-indigo-950 flex flex-col print:border-none">
        <div className="py-2 px-4 2xl:px-8 flex justify-between items-center text-gray-500 print:hidden">
          <button onClick={handlePrint}
            className="text-white px-4 rounded border border-indigo-300 ">
            Print
          </button>
          <h2 className=" font-bold bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent text-center">Your Resume</h2>
          <div></div>
        </div>
        {/* Preview */}
        <div className="flex items-center justify-center relative overflow-auto h-full p-4 2xl:p-8 pt-0">
          {!!resumeHtml.length && (
              <iframe
                ref={resumePreviewRef}
                srcDoc={resumeHtml}
                className="w-[793px] h-full border-none print:block"
              />
          )}
        </div>
      </div>
    </div>
  );
}
