'use client';
import Editor from '@monaco-editor/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiX, FiCode } from 'react-icons/fi'; // Icon for the toggle button
import { AiOutlineFilePdf } from 'react-icons/ai';
import { useLatexContext } from '@/context/LatexContext';

export default function EditorPage() {
  const { latex, setLatex, resumeId, setResumeId, compilation, setCompilation } = useLatexContext();
  const [pdfUrl, setPdfUrl] = useState(resumeId ? `/resume/${resumeId}.pdf` : ''); // State for PDF URL
  const [editorVisible, setEditorVisible] = useState(false); // State for editor visibility
  const [random, setRandom] = useState(Date.now());
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isCompiling, setIsCompiling] = useState(false);

  useEffect(() => {
    if (!resumeId?.length && latex?.length) {
      const newId = Date.now().toString();
      window.localStorage.setItem('resumeId', newId);
      setResumeId(newId);
    }
  } , [latex, resumeId, setResumeId]);

  const compileLatex = async () => {
    setIsCompiling(true);
    try {
      const res = await axios.post('/api/compile', { latex, name: resumeId });
      setPdfUrl(res.data.pdfUrl); // API returns the URL of the compiled PDF
    } catch (error) {
      const errMessage = axios.isAxiosError(error) && error.response?.data?.message?.split('LaTeX Error:')[1] || 'Error compiling LaTeX';
      setCompilation({ loading: false, error: true, success: false, latex, errorText: errMessage });
      console.error('Error compiling LaTeX:', error);
    } finally {
      
      setIsCompiling(false);
      setRandom(Date.now()); // Update to refresh iframe key
    }
  };

  useEffect(() => {
    if (latex && resumeId) {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
      setDebounceTimeout(setTimeout(() => {
        compileLatex();
      }, 1000));
    }
  }, [latex, resumeId]);

  const handleEditorChange = (value: string | undefined) => {
    setLatex(value || '');
  };

  if (!resumeId?.length) {
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
                className="gray"
                onClick={() => setEditorVisible(!editorVisible)}
                aria-label="Toggle Editor"
              >
                <FiCode title='Show Code' size={20} />
              </button>
            )}

            <h3 className="w-full  text-center">Resume preview</h3>

            <div></div>
          </div>
          {/* PDF Preview */}
          <div className="w-full h-full flex items-center justify-center">
            {compilation.error && compilation.loading ? (
              <div>Fixing errors in code...</div>
            ) : isCompiling ? (
              <div className="loader">Compiling...</div>
            ) : (
              !!pdfUrl.length && (
                <embed
                  key={random}
                  src={pdfUrl}
                  className="w-full h-full"
                  title="PDF Preview"
                  type='application/pdf'
                />
              )
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
