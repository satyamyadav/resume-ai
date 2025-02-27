import React, { useEffect, useState, useRef } from 'react';
import { useLatexContext } from '@/context/LatexContext';
import { compile } from '@/components/Templates';
import { FaPrint, FaExchangeAlt } from 'react-icons/fa';
import TemplateSelector from './TemplateSelector';

const ResumePreview: React.FC = () => {
    const { latex, templateName } = useLatexContext();
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
        const result = compile(data, templateName);
        setResumeHtml(result);
    }, [latex, templateName])

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

    return (
        <div className="overflow-hidden h-full shadow-lg border-l border-l-indigo-950 flex flex-col print:border-none">
            <div className="py-2 px-4 2xl:px-8 flex justify-between items-center text-gray-500 print:hidden">
                <div className='space-x-2 flex items-center'>
                    <TemplateSelector />
                    <button onClick={handlePrint} className="text-white p-1 rounded border border-indigo-300 hover:bg-indigo-500" title="Print">
                        <FaPrint />
                    </button>
                </div>
                <h2 className="font-bold bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent text-center">Your Resume</h2>
                <div></div>
            </div>
            {/* Preview */}
            <div className="flex items-center justify-center relative overflow-auto h-full p-4 2xl:p-8 pt-2 2xl:pt-2">
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
