import React from 'react';
import './Preview';

interface ResumePreviewProps {
  template: string;
  resumePreviewRef: React.RefObject<HTMLElement | null>;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ template, resumePreviewRef }) => {
  return (
    // @ts-ignore
    <resume-preview ref={resumePreviewRef} template={template}></resume-preview>
  );
};

export default ResumePreview;