'use client';
import Editor from '@monaco-editor/react';
import React, { useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi'; // Icon for the toggle button
import { AiOutlineFilePdf } from 'react-icons/ai';
import { useLatexContext } from '@/context/LatexContext';
import { compile } from '@/components/Templates';

export default function EditorPage() {
  const { latex, setLatex } = useLatexContext();
  const [editorVisible, setEditorVisible] = useState(true); // State for editor visibility
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
        {editorVisible && (
          <>
            <div className='h-full w-1/2 border-r-4 relative'>
              <div className="p-2 border-b flex justify-between items-center text-gray-500">
                <div>

                </div>
                <h3 className=" text-center">LaTeX Editor</h3>

                <div className='flex items-center'>
                  <button
                    className="gray ml-2"

                    aria-label="Compile Resume"
                    title="Compile Resume"
                  >
                    <AiOutlineFilePdf title='Compile Resume' size={20} />
                  </button>
                  <button
                    className="gray ml-2"
                    onClick={() => setEditorVisible(false)}
                    aria-label="Toggle Editor"
                  >
                    <FiX title='Hide Code' size={20} />
                  </button>

                </div>

              </div>
              <div className="w-full px-2">
                <Editor
                  theme="vs-code"
                  language='json'
                  height="70vh"
                  value={latex}
                  onChange={handleEditorChange}
                />

              </div>
            </div>
          </>
        )}
        <div className="relative flex-grow overflow-hidden h-full border border-l-slate-300 border-l-4">

           
            {/* PDF Preview */}
            <div className="w-full flex items-center justify-center p-3 overflow-auto relative">
              {/* {isCompiling && (
              <div className="rounded-b-lg absolute bottom-0 left-0 right-0 p-4 bg-black/40 backdrop-blur-sm text-white text-center">
              Generating resume in PDF...
              </div>
              )} */}
              {!!resumeHtml.length && (
                <div className="w-full max-w-[800px] mx-auto relative">
                  {/* A4 aspect ratio container */}
                  <div className="w-full pb-[141.4%] relative">
                    {/* Content container */}
                    <div
                      className="absolute top-0 left-0 w-full h-full bg-white shadow-lg"
                      style={{
                        padding: '20mm',
                        overflow: 'auto'
                      }}
                    >
                      <div
                        className="w-full h-full"
                        dangerouslySetInnerHTML={{ __html: resumeHtml }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

            </div>

          
        </div>
      </div>
    
  );
}
