'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { useLatexContext } from '../context/LatexContext';
import './Shimmer.css';
import ChatInput from './ChatInput';

type Message = { role: 'user' | 'assistant'; content: string; loading?: boolean };

const ChatMessage = ({ role, content, loading }: Message) => {
  if (loading) {
    return (
      <div className="flex flex-row py-2">
        {/* <div className="pr-2 text-gray-50">
          <FiCpu />
        </div> */}

        <div className="w-3/4 p-2 rounded bg-slate-700">
          <div className="rounded shimmer w-full p-1 mb-1"></div>
          <div className="rounded shimmer w-3/4 p-1 mb-1"></div>
          <div className="rounded shimmer w-1/2 p-1"></div>
        </div>
      </div>
    );
  }
  if (role === 'user') {
    return (
      <div className="flex flex-row py-2 justify-end text-gray-50">
        <div className="w-1/4"></div>
        <div className="w-auto px-2 py-1 rounded flex justify-end text-right bg-slate-700 transition-all">
          {content}
        </div>
      </div>
    );
  }
  if (role === 'assistant' && content) {
    const isUpdate = content == 'Resume updated.';
    return (
      <div className="flex flex-row py-2 text-gray-50">
        {/* <div className="pr-1">
          <div className='rounded-full bg-slate-600 p-1'>
            <FiCpu />
          </div>
        </div> */}
        <div className={`w-auto flex ${isUpdate ? 'text-xs' : ''}`}>
          <div className='px-2 py-1 rounded bg-slate-700 transition-all'>
            <ReactMarkdown className="prose prose-invert">{content}</ReactMarkdown>
          </div>
        </div>
        <div className="w-1/4"></div>
      </div>
    );
  }
  return null;
};

export default function Chat() {
  const { setLatex, latex, setResumeId } = useLatexContext();
  const [messages, setMessages] = useState<Message[] >([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const storedMessages = window.localStorage.getItem('chatMessages');
      if (storedMessages) {
        const parsedMessages = JSON.parse(storedMessages);
        if (Array.isArray(parsedMessages)) {
          setMessages(parsedMessages);
        } else {
          throw new Error('Invalid messages format');
        }
      } else {
        setMessages([{
          role: 'assistant',
          content: 'Hello! What is your name ?',
        }]);
      }
    } catch (error) {
      console.error('Error loading messages from localStorage:', error);
      setMessages([{
        role: 'assistant',
        content: 'Hello! What is your name ?',
      }]);
    }
  }, []);

  useEffect(() => {
    if(messages.length > 0) {
      window.localStorage.setItem('chatMessages', JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const updatedMessages: Message[] = [...messages, { role: 'user', content: input }];
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
    setLatex('{}');
    setResumeId('');
    setMessages([{
      role: 'assistant',
      content: 'Hello! What is your name ?',
    }]);
  }

  return (
    <div className="w-full h-full bg-slate-800 text-gray-50">
      <div className="h-full flex flex-col justify-between shadow-md">
        {/* Chat Messages */}
        
        <div className="flex-grow overflow-y-auto pr-3 pb-2">

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
          onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setInput(e.target.value)}
          placeholder="Type your message here..."
        />


      </div>
    </div>
  );
}
