import React, { useEffect, useState, useRef } from 'react';
import { useLatexContext } from '@/context/LatexContext';
import { compile } from '@/components/Templates';
import { FaPrint } from 'react-icons/fa';

const ResumePreview: React.FC = () => {
    const { latex, templateName, renderedHtml, setRenderedHtml } = useLatexContext();
    const [resumeHtml, setResumeHtml] = useState(renderedHtml || '');
    const [isLoading, setIsLoading] = useState(false);
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

        const fetchRenderedTemplate = async () => {
            setIsLoading(true); // Start loader
            const storedLatex = window.localStorage.getItem('latex');
            const storedTemplateName = window.localStorage.getItem('templateName');
            const storedHtml = window.localStorage.getItem('renderedHtml');

            // Check if stored values match current values
            if (storedLatex === latex && storedTemplateName === templateName && storedHtml) {
                setResumeHtml(storedHtml); // Use stored HTML
                setIsLoading(false); // Stop loader
                return;
            }

            // Call render API if values don't match
            const result = await compile(latex, templateName);
            setResumeHtml(result);
            setRenderedHtml(result);
            setIsLoading(false); // Stop loader
        };

        fetchRenderedTemplate();
    }, [latex, templateName]);

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
                    !!resumeHtml.length && (
                        <iframe
                            ref={resumePreviewRef}
                            srcDoc={resumeHtml}
                            className="w-[793px] h-full border-none print:block"
                        />
                    )
                )}
            </div>
        </div>
    );
};

export default ResumePreview;
