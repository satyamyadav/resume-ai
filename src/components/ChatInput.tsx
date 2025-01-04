import React, { useRef } from 'react';
import { FiSend } from 'react-icons/fi';

const ChatInput = ({ value, onChange, placeholder, sendMessage }) => {
    const textareaRef = useRef(null);

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
        <div className="flex items-center border-t p-3">
            {/* <textarea
            className="flex-grow p-3 rounded-xl outline-none border resize-y h-auto max-h-[200px] overflow-y-auto"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message here..."
            
          /> */}
            <textarea
                ref={textareaRef}
                value={value}
                onChange={onChange}
                onKeyDown={handleKeyDown}
                onInput={handleInput}
                placeholder={placeholder}
                rows={1} // Set a default number of rows
                className="w-full resize-none overflow-hidden border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ minHeight: '2.5rem' }} // Set minimum height
            />
            <button
                className="ml-3 text-gray-400 hover:text-gray-600"
                onClick={triggerMessage}
                aria-label="Send Message"
            >
                <FiSend size={24} />
            </button>
        </div>

    );
};

export default ChatInput;
