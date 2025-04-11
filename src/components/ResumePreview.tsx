import React, { useEffect, useState, useRef } from 'react';
import { compile } from '@/components/Templates';
import axios from 'axios';
import { useResumeStore } from '@/store/useResumeStore';

const ResumePreview: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const resumePreviewRef = useRef<HTMLIFrameElement>(null);
    const { resume, updateMarkdown, updateHtml } = useResumeStore();

    const handlePrint = () => {
        if (resumePreviewRef.current) {
            (resumePreviewRef.current as HTMLIFrameElement).contentWindow?.print();
        }
    };





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
        <div className="overflow-hidden h-screen md:h-full shadow-lg border-l border-l-indigo-950 flex flex-col print:border-none">

            {/* Preview */}
            <div className="flex items-center justify-center relative overflow-auto h-full p-4 2xl:p-8 pt-2 2xl:pt-2">
                {isLoading ? (
                    <div className="w-[793px] h-full border-none print:block flex justify-center items-center">
                        <div className="text-gray-500">Compiling...</div>

                    </div>
                ) : (
                    resume?.renderedHtml && !!resume?.renderedHtml.length && (
                        <iframe
                            ref={resumePreviewRef}
                            srcDoc={resume?.renderedHtml}
                            className="w-[793px] h-full border-none print:block"
                        />
                    )
                )}
            </div>
        </div>
    );
};

export default ResumePreview;
