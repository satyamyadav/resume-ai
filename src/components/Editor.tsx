'use client';
import Editor from '@monaco-editor/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiX, FiCode } from 'react-icons/fi'; // Icon for the toggle button
import { AiOutlineFilePdf } from 'react-icons/ai';
import { useLatexContext } from '@/context/LatexContext';
import { PdfTeXEngine } from '@/components/PdfLatex';

const engine = new PdfTeXEngine();
engine.loadEngine().then(() => {
  console.log('Engine loaded');
  // engine.writeMemFSFile('main.tex', `\\documentclass{article}
  // \\begin{document}
  // Hello, world!
  // \\end{document}`);
  // engine.compileLaTeX().then(({ pdf }) => {
  //   // const pdfBlob = new Blob([pdf], {type: 'application/pdf'});
  //   // const pdfUrl = URL.createObjectURL(pdfBlob);
  //   // window.open(pdfUrl);
  // });

}).catch((err) => {
  console.error('Engine failed to load', err);
});


export default function EditorPage() {
  const { latex, setLatex, resumeId, setResumeId, compilation, setCompilation } = useLatexContext();
  const [pdfUrl, setPdfUrl] = useState(resumeId ? `/resume/${resumeId}.pdf` : ''); // State for PDF URL
  const [editorVisible, setEditorVisible] = useState(false); // State for editor visibility
  const [random, setRandom] = useState(Date.now());
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isCompiling, setIsCompiling] = useState(false);


  useEffect(() => {
    if (latex.length) {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
      setDebounceTimeout(setTimeout(() => {
        window.localStorage.setItem('latex', JSON.stringify(latex));
        compileLatex();
      }, 1000));
    }
  }, [latex]);

  const compileLatex = async () => {
    setIsCompiling(true);
    if (engine.isReady()) {
      engine.writeMemFSFile('main.tex', latex);
      engine.compileLaTeX().then((res) => {
        if (res.status !== 0) {
          console.error('Compilation failed:', res);
          return;
        }
        console.log('Compilation result:', res);
        const pdfBlob = new Blob([res.pdf], { type: 'application/pdf' });
        const pdfUrl = URL.createObjectURL(pdfBlob);
        setPdfUrl(pdfUrl);
      })
        .catch((err) => {
          console.error('Error compiling LaTeX:', err);
          // const errMessage = axios.isAxiosError(error) && error.response?.data?.message?.split('LaTeX Error:')[1] || null;
          // if (errMessage) {
          //   setCompilation({ loading: false, error: true, success: false, latex, errorText: errMessage });
          // }
          // console.error('Error compiling LaTeX:', error);
        })
        .finally(() => {
          setIsCompiling(false);
        });

    }
  };



  const handleEditorChange = (value: string | undefined) => {
    setLatex(value || '');
  };

  if (!latex?.length) {
    return null;
  }

  return (
    <div className='w-[70%] p-4 h-full'>
      <div className="h-full flex flex-row w-full flex-wrap bg-white rounded-xl">
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
                    onClick={compileLatex}
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
                  language='latex'
                  height="70vh"
                  value={latex}
                  onChange={handleEditorChange}
                />

              </div>
            </div>
          </>
        )}
        <div className="relative flex-grow overflow-hidden h-full">
          <div className="p-2 border-b flex justify-between items-center text-gray-500">
            {!editorVisible && (
              <button
                className="gray flex items-center gap-2 whitespace-nowrap"
                onClick={() => setEditorVisible(!editorVisible)}
                aria-label="Toggle Editor"
              >
                <FiCode title='Show Code' size={20} /> 
                <span>
                View Code

                </span>
              </button>
            )}

            <h3 className="w-full  text-center">Resume preview</h3>

            <div></div>
          </div>
          {/* PDF Preview */}
          <div className="w-full h-full flex items-center justify-center p-3">
            {isCompiling && (
              <div className="rounded-b-lg absolute bottom-0 left-0 right-0 p-4 bg-black/40 backdrop-blur-sm text-white text-center">
                Generating resume in PDF...
              </div>
            )}
            {!!pdfUrl.length && (
              <embed
                key={random}
                src={pdfUrl}
                className="w-full h-full overflow-auto"
                title="PDF Preview"
                type='application/pdf'
              />
            )}

          </div>

        </div>
      </div>
    </div>
  );
}
