'use client';
// store/useResumeStore.ts
import { create } from 'zustand';
import { createClient } from '@/utils/supabase/client';

interface Resume {
  id: string;
  markdown: string;
  renderedHtml: string;
  userId: string;
  createdAt: string;
  name: string;
  role: string;
}

interface ResumeStore {
  loading: boolean;
  resume: Resume | null;
  fetchResume: (resumeId: string) => Promise<void>;
  updateMarkdown: (md: string) => void;
  updateHtml: (html: string) => void;
  saveResume: () => Promise<void>;
}

export const useResumeStore = create<ResumeStore>((set, get) => ({
  loading: false,
  resume: null,

  fetchResume: async (resumeId: string) => {
    set({ loading: true });
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .eq('id', resumeId)
        .single();

      if (error) {
        console.error('Fetch error:', error);
      } else {
        set({ resume: data });
      }
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      set({ loading: false });
    }
  },

  updateMarkdown: (md) => {
    const resume = get().resume;
    if (resume) {
      set({ resume: { ...resume, markdown: md } });
    }
  },

  updateHtml: (html) => {
    const resume = get().resume;
    if (resume) {
      set({ resume: { ...resume, renderedHtml: html } });
    }
  },

  saveResume: async () => {
    const resume = get().resume;
    if (!resume) return;

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('resumes')
        .update({
          markdown: resume.markdown,
          renderedHtml: resume.renderedHtml,
        })
        .eq('id', resume.id);

      if (error) console.error('Save error:', error);
    } catch (err) {
      console.error('Save error:', err);
    }
  },
}));
