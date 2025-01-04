'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiSend, FiCpu, FiPlus } from 'react-icons/fi';
import ReactMarkdown from 'react-markdown';
import { useLatexContext } from '../context/LatexContext';
import './Shimmer.css';
import ChatInput from './ChatInput';

type Message = { role: 'user' | 'assistant'; content: string; loading?: boolean };

const mockMessages: Message[] = [
  { role: 'assistant', content: 'Hello! How can I help you?' },
  { role: 'user', content: 'I need help with my resume.' },
  { role: 'assistant', content: 'Sure! Please paste your resume code here.' },
  { role: 'user', content: 'Here is my resume code: \n\\documentclass{resume}\n\\begin{document}\n\\section*{Education}\n\\end{document}' },
  { role: 'assistant', content: 'Resume updated.' },
  { role: 'assistant', content: 'Here is your resume code\n\\documentclass{resume}\n\\begin{document}\n\\section*{Education}\n\\end{document}\nEnd of resume code' },
];


const ChatMessage = ({ role, content, loading }: Message) => {
  if (loading) {
    return (
      <div className="flex flex-row py-2">
        <div className="pr-2">
          <FiCpu />
        </div>
        <div className="w-3/4 p-2 rounded-lg bg-gray-100">
          <div className="rounded shimmer w-full p-1 mb-1"></div>
          <div className="rounded shimmer w-3/4 p-1 mb-1"></div>
          <div className="rounded shimmer w-1/2 p-1"></div>
        </div>
      </div>
    );
  }
  if (role === 'user') {
    return (
      <div className="flex flex-row py-2 justify-end text-gray-700">
        <div className="w-3/4 p-2 rounded-lg flex justify-end text-right transition-all">
          {content}
        </div>
      </div>
    );
  }
  if (role === 'assistant' && content) {
    const isUpdate = content == 'Resume updated.';
    return (
      <div className="flex flex-row py-2 text-gray-700">
        <div className="pr-1">
          <div className='rounded-full bg-gray-200 p-1'>
            <FiCpu />
          </div>
        </div>
        <div className={`w-3/4 flex  ${isUpdate ? 'text-xs' : ''}`}>
          <div className='p-2 rounded-lg bg-gray-100 transition-all'>
            <ReactMarkdown className="prose">{content}</ReactMarkdown>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default function Chat() {
  const { setLatex, latex, setResumeId } = useLatexContext();
  const [messages, setMessages] = useState<Message[]>([{
    role: 'assistant',
    content: 'Hello! What is your name ?',
  }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    if (messages.length === 0) {
      const storedMessages = window.localStorage.getItem('chatMessages');
      if (storedMessages) {
        setMessages(JSON.parse(storedMessages));
      }
    } else {
      window.localStorage.setItem('chatMessages', JSON.stringify(messages));
    }

  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const updatedMessages = [...messages, { role: 'user', content: input }];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await axios.post('/api/chat', { messages: updatedMessages, latex });
      const reply = res.data.reply;

      const latexMatch = reply.match(/ZZZCODEZZZ([\s\S]*?)ZZZCODEZZZ/);
      if (latexMatch) {
        setLatex(latexMatch[1].trim());
        setMessages([...updatedMessages, { role: 'assistant', content: 'Resume updated.' }]);
      } else {
        setMessages([...updatedMessages, { role: 'assistant', content: reply }]);
      }
    } catch (error) {
      console.error('Error communicating with AI:', error);
    } finally {
      setLoading(false);
    }
  };


  const startFresh = () => {
    localStorage.removeItem('chatMessages');
    localStorage.removeItem('resumeId');
    setLatex('');
    setResumeId('');
    setMessages([{
      role: 'assistant',
      content: 'Hello! What is your name ?',
    }]);
  }

  return (
    <div className="w-full max-w-lg mx-auto p-4 h-full">
      <div className="h-full flex flex-col justify-between bg-white rounded-xl shadow-md">
        {/* Chat Messages */}
        <div className="p-2 border-b flex justify-between items-center text-gray-500">
          <div></div>
          <h3 className=" text-center">Chat with AI</h3>
          <button
            className="gray ml-2"
            onClick={startFresh}
            aria-label="Compile Resume"
            title="Compile Resume"
          >
            <FiPlus title='Compile Resume' size={20} />
          </button>
        </div>
        <div className="flex-grow overflow-y-auto px-4">

          {messages.map((msg, idx) => (
            <ChatMessage key={idx} role={msg.role} content={msg.content} />
          ))}
          {loading && <ChatMessage content="" role="assistant" loading={true} />}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}


        <ChatInput
          value={input}
          sendMessage={sendMessage}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message here..."
        />


      </div>
    </div>
  );
}
