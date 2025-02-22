import React, { useState } from "react";
import { Popover, PopoverPanel, PopoverButton } from "@headlessui/react";
import { AiOutlineRobot } from "react-icons/ai";

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
      <PopoverButton className="ml-2 text-gray-500 hover:text-gray-700 align-middle">
        <AiOutlineRobot title="Improve using AI" />
      </PopoverButton>
      <PopoverPanel className="absolute z-10 bg-white border border-gray-300 p-3 rounded-md shadow-lg">
        <div className="flex flex-col space-y-2">
          <textarea
            className="border border-gray-300 p-2 rounded-md"
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
                      className="px-8 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition duration-300"
          >
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