'use client';
// app/page.tsx
import Editor from "@/components/Editor";
import { LatexProvider } from '@/context/LatexContext';
import ResumePreview from '@/components/ResumePreview';

export default function Home() {
  return (
    <LatexProvider>
      <main className="flex flex-col md:h-screen bg-gradient-to-r from-blue-900 to-purple-900 bg-opacity-20">
        <div className="flex w-full h-full justify-center items-center">
          <div className="h-full flex flex-col md:flex-row w-full">
            <Editor />
            <ResumePreview />
          </div>
        </div>
      </main>
    </LatexProvider>
  );
}
