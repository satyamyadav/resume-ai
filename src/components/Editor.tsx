'use client';
import React from 'react';
import { useLatexContext } from '@/context/LatexContext';
import ResumeForm from './ResumeForm';
import { ResumeData } from "../types";

export default function EditorPage() {
  const { latex, setLatex } = useLatexContext();

  const handleFormUpdate = (data: ResumeData) => {
    setLatex(JSON.stringify(data, null, 2));
  }

  if (!latex.length) {
    return <div>Loading...</div>
  }

  return (
    <div className='h-full flex-1 relative flex flex-col print:hidden'>
      <div className="p-2 flex justify-center items-center text-gray-500">
        <h2 className=" font-bold bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent text-center">Resume Builder</h2>
      </div>
      <div className="w-full px-2 overflow-auto flex-grow">
        <ResumeForm aiData={JSON.parse(latex)} onFormUpdate={handleFormUpdate} />
      </div>
    </div>
  )


}
