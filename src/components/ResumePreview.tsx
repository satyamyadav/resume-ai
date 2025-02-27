import React, { RefObject } from 'react';

interface ResumePreviewProps {
  resumeHtml: string;
  resumePreviewRef: RefObject<HTMLIFrameElement | null>;
  handlePrint: () => void;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ resumeHtml, resumePreviewRef, handlePrint }) => {
  return (
    <div className="overflow-hidden h-full shadow-lg border-l border-l-indigo-950 flex flex-col print:border-none">
      <div className="py-2 px-4 2xl:px-8 flex justify-between items-center text-gray-500 print:hidden">
        <button onClick={handlePrint} className="text-white px-4 rounded border border-indigo-300">
          Print
        </button>
        <h2 className="font-bold bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent text-center">Your Resume</h2>
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
  );
};

export default ResumePreview;
