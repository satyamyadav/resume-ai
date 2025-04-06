import Handlebars from "handlebars"
import { defaultTemplate, twoColumnTemplate } from "./templateMaps";



const getTemplateContent = (templateName: string) => {
  switch (templateName) {
    case 'twoColumn':
      return twoColumnTemplate;
    case 'base':
    default:
      return defaultTemplate;
  }
};

export const compile = async (markdownData = "", templateName = "base") => {
  const templateContent = getTemplateContent(templateName);

  try {
    const response = await fetch('/api/completion/render', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ markdown: markdownData, template: templateContent }),
    });

    if (!response.ok) {
      throw new Error('Failed to render template');
    }

    const { html } = await response.json();
    return html;
  } catch (error) {
    console.error('Error rendering template:', error);
    return `<div>Error rendering template</div>`;
  }
};
