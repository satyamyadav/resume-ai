import React, { useState } from "react";
import { MdExpandMore, MdExpandLess } from "react-icons/md";

interface SectionContainerProps {
    title: string;
    children: React.ReactNode;
    className?: string;
}

const SectionContainer: React.FC<SectionContainerProps> = ({ title, children, className }) => {
    const [isExpanded, setIsExpanded] = useState(true);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={`p-2 md:p-6 md:pt-4 space-y-1 border-t-2 border-gray-400 ${className}`}>
            <div className="flex justify-between items-center" onClick={toggleExpand}>
                <h3 className="font-semibold text-gray-800">{title}</h3>
                <button type="button" 
                onClick={toggleExpand}
                className="focus:outline-none text-gray-800 hover:text-gray-600 transition-colors hover:bg-gray-200 rounded-full p-1">
                    {isExpanded ? (
                        <MdExpandMore />
                    ) : (
                        <MdExpandLess />
                    )}
                </button>
            </div>
            {isExpanded && children}
        </div>
    );
};

export default SectionContainer;
