import React, { useState } from "react";
import { Popover, PopoverPanel, PopoverButton } from "@headlessui/react";
import { IoSparklesSharp } from "react-icons/io5";


interface AIHelperProps {
  content: string;
  resumeData: unknown;
  hierarchy: string;
  onApply: (suggestion: string) => void;
}

const AIHelper: React.FC<AIHelperProps> = ({ content, resumeData, hierarchy, onApply }) => {
  const [prompt, setPrompt] = useState("");
  const [suggestion, setSuggestion] = useState("");

  const generateSuggestion = async () => {
    const response = await fetch("/api/completions/suggestions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currentContent: content,
        resumeData,
        userPrompt: prompt,
        hierarchy,
      }),
    });

    const data = await response.json();
    setSuggestion(data.suggestion);
  };

  return (
    <Popover className="relative">
      <PopoverButton
        title="Improve using AI"
        className="ml-2 align-middle flex items-center space-x-1 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white px-2 hover:to-blue-700 hover:from-purple-700 transition duration-300">
        <IoSparklesSharp size={12} title="Improve using AI" className="text-purple" />
        <small>Ai</small>
      </PopoverButton>
      <PopoverPanel
        focus={true}
        anchor={{ to: 'bottom start', gap: '4px' }}
        className="absolute z-10 bg-white border-2 border-purple-300 p-3 rounded-md shadow-xl w-96">
        <div className="flex flex-col space-y-2">
          <textarea
            className="border border-gray-300 p-2 rounded-md h-40"
            value={content}
            readOnly
          />
          <input
            type="text"
            placeholder="Optional prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="border border-gray-300 p-2 rounded-md"
          />
          <button
            onClick={generateSuggestion}
            className="px-8 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition duration-300"
          >
            <IoSparklesSharp size={16} className="inline-block mr-2" />
            Generate
          </button>
          {suggestion && (
            <div className="flex flex-col space-y-2">
              <textarea
                className="border border-gray-300 p-2 rounded-md"
                value={suggestion}
                readOnly
              />
              <div className="flex space-x-2">
                <button
                  onClick={() => onApply(suggestion)}
                  className="bg-green-500 text-white p-2 rounded-md"
                >
                  Apply
                </button>
                <button
                  onClick={() => setSuggestion("")}
                  className="bg-red-500 text-white p-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </PopoverPanel>
    </Popover>
  );
};

export default AIHelper;