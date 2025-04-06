import React, { useState, useEffect, useRef } from "react";
import { ResumeFormProps } from "../types";
import { Editor as ToastEditor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

const ResumeForm: React.FC<ResumeFormProps> = ({ aiData, onFormUpdate }) => {
  const editorRef = useRef<ToastEditor>(null);

  useEffect(() => {
    if (aiData && editorRef.current) {
      editorRef.current.getInstance().setMarkdown(aiData);
    }
  }, [aiData]);

  const handleMarkdownChange = () => {
    const value = editorRef.current?.getInstance().getMarkdown() || "";
    // onFormUpdate(value);
  };

  const handleRunClick = () => {
    const value = editorRef.current?.getInstance().getMarkdown() || "";
    onFormUpdate(value);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-4 pb-4 h-full bg-gray-50">
      <ToastEditor
        ref={editorRef}
        initialValue={aiData || ""}
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
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 absolute bottom-10 right-10 z-50"
      >
        Run
      </button>
    </div>
  );
};

export default ResumeForm;