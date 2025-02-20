'use client';
import Editor from '@monaco-editor/react';
import React, { useEffect, useState } from 'react';
import { useLatexContext } from '@/context/LatexContext';
import { compile } from '@/components/Templates';
import ResumeForm from './ResumeForm';

export default function EditorPage() {
  const { latex, setLatex } = useLatexContext();
  const [resumeHtml, setResumeHtml] = useState('');

  useEffect(() => {
    if (!latex.length) {
      return;
    }
    const data = JSON.parse(latex);
    const result = compile(data);
    console.log('Compiled result:', result);
    setResumeHtml(result);
  }, [latex])

  useEffect(() => {
    if (latex.length) {
      // compileLatex();
      window.localStorage.setItem('latex', latex);
    }
  }, [latex]);

  const handleEditorChange = (value: string | undefined) => {
    setLatex(value || '{}');
  };


  return (

    <div className="h-full flex flex-row w-full bg-gray-200">
      {/* Editor Section */}


      <div className='h-full w-1/2 border-r-4 relative flex flex-col'>
        <div className="p-2 border-b flex justify-center items-center text-gray-500">
          <h3 className=" text-center">Resume Builder</h3>
        </div>
        <div className="w-full px-4 overflow-auto flex-grow">
          <ResumeForm aiData={JSON.parse(latex)} />
        </div>
      </div>


      <div className="relative flex-grow overflow-hidden h-full border border-l-slate-300 border-l-4">


        {/* PDF Preview */}
        <div className="w-full flex items-center justify-center  overflow-auto relative">
          {/* {isCompiling && (
              <div className="rounded-b-lg absolute bottom-0 left-0 right-0 p-4 bg-black/40 backdrop-blur-sm text-white text-center">
              Generating resume in PDF...
              </div>
              )} */}
          {!!resumeHtml.length && (
            <div className="w-full max-w-[800px] mx-auto relative p-3"
              style={{

                maxHeight: '100vh',
                overflowY: 'auto',
              }}>
              {/* A4 aspect ratio container */}

              {/* Content container */}
              <div
                className="w-full h-full bg-white shadow-lg"
                style={{
                  padding: '20mm',
                }}
              >
                <div
                  className="w-full h-full"
                  dangerouslySetInnerHTML={{ __html: resumeHtml }}
                ></div>
              </div>

            </div>
          )}

        </div>


      </div>
    </div>

  );
}
