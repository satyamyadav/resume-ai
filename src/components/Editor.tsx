'use client';

import { useLatexContext } from '@/context/LatexContext';
import React, { useEffect, useRef } from "react";
import { ResumeFormProps } from "../types";
import { Editor as ToastEditor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

const ResumeForm: React.FC<ResumeFormProps> = () => {
  const editorRef = useRef<ToastEditor>(null);
  const { latex, setLatex } = useLatexContext();

  useEffect(() => {
    if (latex && editorRef.current) {
      editorRef.current.getInstance().setMarkdown(latex);
    }
  }, [latex]);

  const handleMarkdownChange = () => {
    const value = editorRef.current?.getInstance().getMarkdown() || "";
    // onFormUpdate(value);
  };

  const handleRunClick = () => {
    const value = editorRef.current?.getInstance().getMarkdown() || "";
    setLatex(value);
  };

  return (
    <div className="w-full p-4 h-full bg-gray-50">
      <ToastEditor
        ref={editorRef}
        initialValue={latex || ""}
        previewStyle="vertical"
        height="100%"
        initialEditType="wysiwyg"
        useCommandShortcut={true}
        onChange={handleMarkdownChange}
        toolbarItems={[
          ["heading", "bold", "italic", "strike"], // Text formatting
          ["ul", "ol", "task"], // Lists
          ["table"], // Tables
          ["link"] // Links
        ]}
      />
      <button
        onClick={handleRunClick}
        className="px-4 py-2 bg-slate-800 text-white rounded hover:bg-slate-900 absolute top-16 right-10 z-50"
      >
        Update
      </button>
    </div>
  );
};

export default ResumeForm;