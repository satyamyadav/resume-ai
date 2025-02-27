import Handlebars from "handlebars"
import { defaultTemplate, twoColumnTemplate } from "./templateMaps";

const printStyles = `
<style>
  @page {
    size: A4;
    margin: 20mm 20mm 20mm 20mm;
  }

  @media print {
    
    /* Prevent breaking inside elements */
    h1, h2, h3, p, ul, li, table {
        break-inside: avoid;
    }

    body {
        margin: 0 !important;
        padding: 0 !important;
        width: 100%;
    }
    
  }

  body {
    font-family: 'Arial', sans-serif;
    font-size: 12pt;
    line-height: 1.5;
    min-height: 1122px;
    background: white;
    color: #333;
    box-sizing: border-box;
    padding: 20mm 20mm 20mm 20mm; /* Ensures margins on all pages */
    margin: 0; /* Prevents extra padding affecting layout */
    width: 100%;
  }

  /* Hide Scrollbars in Print Preview */
  ::-webkit-scrollbar {
    display: none;
  }
</style>
`;

const getTemplate = (templateName: string) => {
  switch (templateName) {
    case 'twoColumn':
      return twoColumnTemplate;
    case 'base':
    default:
      return defaultTemplate;
  }
}

export const compile = (data = {}, templateName = 'base') => {
  const template = getTemplate(templateName);
  const render = Handlebars.compile(template);
  return render({...data, printStyles});
}
