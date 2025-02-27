'use client';
import React from 'react';
import { useLatexContext } from '@/context/LatexContext';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { TbTemplate } from "react-icons/tb";
import { IoCloseSharp } from "react-icons/io5";
import Image from 'next/image';

const templates = [
    { name: 'oneColumn', title: 'One Column', screenshot: '/templates/base.png' },
    { name: 'twoColumn', title: 'Two Column', screenshot: '/templates/two-columns.png' },
    // Add more templates as needed
];


const TemplateSelector: React.FC = () => {
    const { setTemplateName, templateName } = useLatexContext();

    const handleTemplateSelect = (templateName: string) => {
        setTemplateName(templateName);

    };

    return (
        <Popover className="relative">
            <PopoverButton
                className="text-white p-1 rounded border border-indigo-300 hover:bg-indigo-500">
                <TbTemplate />
            </PopoverButton>
            <PopoverPanel
                anchor={{ to: 'left', gap: '10px' }}
                className="absolute left-0 w-96 mt-2 bg-white shadow-lg p-3 z-10 rounded-md shadow-xl">
                <div className='flex justify-between items-center pb-4'>
                    <h2 className="text-xl font-bold">Select a Template</h2>
                    <PopoverButton className="text-gray-500 hover:text-gray-700">
                        <IoCloseSharp size={20} />
                    </PopoverButton>
                </div>
                <div className="space-x-2 flex">
                    {templates.map(template => (
                        <div key={template.name} className={`border p-2 rounded hover:bg-gray-300 cursor-pointer ${template.name == templateName ? 'border-indigo-400 ' : ''} w-76 h-76 flex flex-col items-center bg-gray-200`} onClick={() => handleTemplateSelect(template.name)}>
                            <div className="flex-grow flex items-center justify-center w-full h-full">
                                <Image src={template.screenshot} alt={template.title} className="object-contain mb-2 max-h-full max-w-full" />
                            </div>
                            <h2 className="absolute bottom-2">{template.title}</h2>
                        </div>
                    ))}
                </div>
            </PopoverPanel>
        </Popover>
    );
};

export default TemplateSelector;
