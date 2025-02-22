'use client';
// app/page.tsx
import Editor from "@/components/Editor";
import { LatexProvider } from '@/context/LatexContext';

export default function Home() {
  return (
    <LatexProvider>
      <main className="flex flex-col h-screen bg-gray-100">
        <div className="flex w-full h-full justify-center items-center">
          <Editor />
        </div>
      </main>
    </LatexProvider>
  );
}
