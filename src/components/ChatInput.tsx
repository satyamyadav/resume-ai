import React, { useRef } from 'react';
import { FiSend } from 'react-icons/fi';

interface ChatInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder: string;
    sendMessage: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ value, onChange, placeholder, sendMessage }) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Automatically resize the textarea on input
    const handleInput = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto'; // Reset height to calculate scrollHeight
            textarea.style.height = `${textarea.scrollHeight}px`; // Set to scrollHeight
        }
    };

    const triggerMessage = () => {
        sendMessage();
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto'; // Reset height to calculate scrollHeight

        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            triggerMessage();
        }
    };



    return (
        <div className="flex items-center rounded-xl relative mr-3">
            <textarea
                ref={textareaRef}
                value={value}
                onChange={onChange}
                onKeyDown={handleKeyDown}
                onInput={handleInput}
                placeholder={placeholder}
                rows={1} // Set a default number of rows
                className="bg-transparent pr-10 w-full resize-none overflow-hidden border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ minHeight: '4rem' }} // Set minimum height
            />
            <button
                className="absolute right-0 top-0 p-3 text-gray-400 hover:text-gray-600 h-full items-center flex justify-center"
                onClick={triggerMessage}
                aria-label="Send Message"
            >
                <FiSend size={24} />
            </button>
        </div>

    );
};

export default ChatInput;
