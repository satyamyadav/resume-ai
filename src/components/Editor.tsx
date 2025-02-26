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
    console.log('Compiled result:', result);
    setResumeHtml(result);
  }, [latex])

  const handleFormUpdate = (data: ResumeData) => {
    setLatex(JSON.stringify(data, null, 2));
  }

  if (!latex.length) {
    return <div>Loading...</div>
  }

  return (

    <div className="h-full flex flex-row w-full">
      {/* Editor Section */}
      <div className='h-full w-1/2 relative flex flex-col'>
        <div className="p-2 flex justify-center items-center text-gray-500 shadow-lg border-b border-b-indigo-950">
          <h2 className=" font-bold bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent text-center">Resume Builder</h2>
        </div>
        <div className="w-full px-2 overflow-auto flex-grow">
          <ResumeForm aiData={JSON.parse(latex)} onFormUpdate={handleFormUpdate} />
        </div>
      </div>

      <div className="relative flex-grow overflow-hidden h-full shadow-lg border-l border-l-indigo-950">
        <div className="p-2 flex justify-between items-center text-gray-500">
          <button onClick={handlePrint}
            className="text-white px-4 rounded border border-indigo-300 ">
            Print
          </button>
          <h2 className=" font-bold bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent text-center">Your Resume</h2>
          <div></div>
        </div>
        {/* Preview */}
        <div className=" flex items-center justify-center overflow-auto relative p-4">
          {!!resumeHtml.length && (
            <div className="relative flex flex-col items-center">
              <iframe
                ref={resumePreviewRef}
                srcDoc={resumeHtml}
                className="w-[793px] h-[1122px] border-none"

              />
            </div>
          )}
        </div>
      </div>
    </div>

  );
}
