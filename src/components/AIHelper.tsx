import React, { useState } from "react";
import { Popover, PopoverPanel, PopoverButton } from "@headlessui/react";
import { IoSparklesSharp, IoCheckmarkSharp, IoCloseSharp } from "react-icons/io5";


interface AIHelperProps {
  content: string;
  resumeData: unknown;
  hierarchy: string;
  onApply: (suggestion: string) => void;
}

const AIHelper: React.FC<AIHelperProps> = ({ content, resumeData, hierarchy, onApply }) => {
  const [prompt, setPrompt] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const generateSuggestion = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/completion/suggestions", {
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
      setLoading(false);

    } catch (error) {

      setError("Error generating suggestion");
      console.error("Error generating suggestion:", error);
      setLoading(false);

    }
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
          <div className="flex justify-end">
            <PopoverButton className="text-gray-500 hover:text-gray-700">
              <IoCloseSharp size={20} />
            </PopoverButton>
          </div>
          <textarea
            className="border border-gray-200 p-2 rounded-md h-40 bg-gray-200 focus:outline-none"
            value={content}
            readOnly
          />
          {!suggestion && loading && 
          (
            <div className="flex flex-col items-start space-y-2">
              <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-2/3 h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-1/2 h-4 bg-gray-200 rounded animate-pulse"></div>
              
            </div>
            

          )
          }
          {error && <p className="text-sm text-red-500">{error}</p>}
          {suggestion && (
            <div className="flex flex-col space-y-2">
              <textarea
                className="border border-gray-300 p-2 rounded-md h-40"
                value={suggestion}
                onChange={(e) => setSuggestion(e.target.value)}
                disabled={loading}
              />

            </div>
          )}
          <input
            type="text"
            placeholder="Optional prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="border border-gray-300 p-2 rounded-md"
          />
          <div className="flex space-x-2 justify-end">

            <button
              onClick={generateSuggestion}
              className="px-8 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition duration-300 disabled:opacity-50"
              disabled={loading}
            >
              <IoSparklesSharp size={16} className="inline-block mr-2" />
              {suggestion ? "Regenerate" : "Generate"}
            </button>

            <button
              onClick={() => onApply(suggestion)}
              className="bg-green-600 text-white rounded-md text-sm px-3 py-1 hover:bg-green-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!suggestion || loading}
            >
              <IoCheckmarkSharp size={16} className="inline-block mr-1" />
              Apply
            </button>

          </div>

        </div>
      </PopoverPanel>
    </Popover>
  );
};

export default AIHelper;