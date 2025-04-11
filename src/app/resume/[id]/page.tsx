'use client';

import { useState, useEffect } from 'react';
import { use } from 'react';
import Editor from '@/components/Editor';
import ResumePreview from '@/components/ResumePreview';
import { LatexProvider } from '@/context/LatexContext';
import { FiMessageSquare } from 'react-icons/fi';
import { FiCode } from 'react-icons/fi';
import { FaPrint } from 'react-icons/fa';
import { Switch } from '@headlessui/react';
import TemplateSelector from '@/components/TemplateSelector';
import Chat from '@/components/Chat';
import { Menu } from '@headlessui/react';
import { FaUserCircle } from 'react-icons/fa';
import { createClient } from '@/utils/supabase/client';
import { useResumeStore } from '@/store/useResumeStore';
import {compile } from '@/components/Templates';
import axios from 'axios';

export default function Home({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [activeView, setActiveView] = useState<boolean>(false);
  const { resume, fetchResume, updateMarkdown, updateHtml, loading } = useResumeStore();
  const [supabase, setSupabase] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // Initialize Supabase client only on the client side
    setSupabase(createClient());
  }, []);

  useEffect(() => {
    let isMounted = true;
    
    const loadResume = async () => {
      if (!resolvedParams.id) return;
      
      try {
        await fetchResume(resolvedParams.id);
        if (!isMounted) return;
      } catch (err) {
        if (!isMounted) return;
        console.error('Error fetching resume:', err);
        setError('Failed to load resume data');
      }
    };
    
    loadResume();
    
    return () => {
      isMounted = false;
    };
  }, [resolvedParams.id, fetchResume]);

  useEffect(() => {
    if (!resume) return;
    if (resume?.markdown?.length > 0) return;
    const fetchData = async () => {
      if (resume?.name?.length > 0 && resume?.role?.length > 0) {
        try {
          setIsLoading(true);
          const comRes = await axios.post('/api/completion/manual', { name: resume.name, role: resume.role });
          const markdown = comRes.data.markdown;
          const html = await compile(markdown, 'base');
          
          // Batch state updates
          updateMarkdown(markdown);
          updateHtml(html);
        } catch (error) {
          console.error('Error communicating with AI:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [resume]);

  const handlePrint = () => {
    const iframe = document.querySelector('iframe');
    iframe?.contentWindow?.print();
  };

  const handleLogout = async () => {
    if (!supabase) return;
    
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error logging out:', error.message);
    } else {
      window.location.href = '/login';
    }
  };

  if (error) {
    return <div className="flex h-screen items-center justify-center bg-slate-800 text-white">Error: {error}</div>;
  }

  if (loading || !resume) {
    return <div className="flex h-screen items-center justify-center bg-slate-800 text-white">Loading...</div>;
  }
  

  return (
    <LatexProvider>
      <main className="flex h-screen overflow-hidden bg-slate-800">
        {/* Left Sidebar - Chat */}
        <div className="w-[30%]  text-white flex flex-col">
          {/* Header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-800">
            <FiMessageSquare />
            <span className="text-sm">Resume AI</span>
          </div>

          {/* Chat Content */}
          <div className="flex-1 overflow-auto p-3 pt-0 text-sm">
            <Chat />
          </div>
        </div>

        {/* Right Panel - Editor / Preview */}
        <div className="flex-1 flex flex-col">
          {/* Top Bar with Toggle */}
          <div className="flex justify-between items-center px-4 py-2 ">
            <span className="text-gray-50"></span>
            <div className='flex justify-between items-center gap-2'>
              <button
                onClick={handlePrint}
                className="text-white p-1 rounded border border-indigo-300 hover:bg-indigo-500"
                title="Print"
              >
                <FaPrint />
              </button>
              <TemplateSelector />
              <Switch
                checked={activeView}
                onChange={setActiveView}
                className="group relative flex h-7 w-11 cursor-pointer rounded bg-white/30 p-[2px] transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-white/20"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none flex size-6 translate-x-0 rounded bg-slate-800 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-4 text-white justify-center items-center"
                >
                  <FiCode />
                </span>
              </Switch>
              <Menu as="div" className="relative">
                <Menu.Button className="text-white focus:outline-none">
                  <FaUserCircle size={24} />
                </Menu.Button>
                <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? 'bg-gray-100' : ''
                        } w-full text-left px-4 py-2 text-sm text-gray-700`}
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            </div>
          </div>

          {/* View */}
          <div className="flex-1 overflow-auto bg-gray-100 rounded-xl mb-3 mr-3">
            {isLoading ? <div className="flex h-full items-center justify-center bg-slate-200 text-white">Loading...</div> : activeView ? <Editor /> : <ResumePreview />}
          </div>
        </div>
      </main>
    </LatexProvider>
  );
}
