'use client';
// app/page.tsx
import Editor from "@/components/Editor";
import Chat from '@/components/Chat';
import { FiAlertTriangle } from 'react-icons/fi';
import { LatexProvider } from '../context/LatexContext';

export default function Home() {
  return (
    <LatexProvider>
      <main className="flex flex-col h-screen p-3 bg-gray-200">
        <h1 className="text-xl font-bold mb-4 text-center">Open Source AI Resume Builder</h1>
        <div className="flex h-[90%] justify-center items-center">
          <Chat />
          <Editor />
        </div>
        <div>
          <h3 className="text-center">
            <FiAlertTriangle className="inline-block" />
            This is an open source project. Your data is not secured and can be accessed by anyone.
          </h3>
        </div>
      </main>
    </LatexProvider>
  );
}
