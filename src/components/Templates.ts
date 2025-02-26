import Handlebars from "handlebars"
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

const template = `
<!DOCTYPE html>
<html lang="en">
<head>
    ${printStyles}
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{name}} - Resume</title>
</head>
<body style="font-family: Arial, sans-serif;">

    <h1 style="text-align: center; color: #0066cc;">{{name}}</h1>
    {{#if role}}
        <h3 style="text-align: center; color: #0066cc;">{{role}}</h3>
    {{/if}}

    <div style="display: flex; justify-content: space-between;">
        <div>
            {{#if address}}<p><strong>Address:</strong> {{address}}</p>{{/if}}
            {{#if email}}<p><strong>Email:</strong> <a href="mailto:{{email}}">{{email}}</a></p>{{/if}}
        </div>
        <div style="text-align: right;">
            {{#if github}}<p><strong>GitHub:</strong> <a href="{{github}}">{{github}}</a></p>{{/if}}
            {{#if linkedin}}<p><strong>LinkedIn:</strong> <a href="{{linkedin}}">{{linkedin}}</a></p>{{/if}}
        </div>
    </div>

    {{#if summary}}
        <h2 style="color: #0066cc;">Summary</h2>
        <p>{{summary}}</p>
    {{/if}}

    {{#if skills}}
        <h2 style="color: #0066cc;">Skills</h2>
        <ul>
            {{#each skills}}
                <li><strong>{{category}}:</strong> {{list}}</li>
            {{/each}}
        </ul>
    {{/if}}

    {{#if education}}
        <h2 style="color: #0066cc;">Education</h2>
        {{#each education}}
            <p><strong>{{degree}}</strong> ({{year}})<br>{{institution}}</p>
        {{/each}}
    {{/if}}

    {{#if experience}}
        <h2 style="color: #0066cc;">Work Experience</h2>
        {{#each experience}}
            <h3>{{company}} ({{duration}})</h3>
            <p><em>{{description}}</em></p>
            <ul>
                {{#each responsibilities}}
                    <li>{{this}}</li>
                {{/each}}
            </ul>
        {{/each}}
    {{/if}}

    {{#if projects}}
        <h2 style="color: #0066cc;">Personal Projects</h2>
        {{#each projects}}
            <h3>{{name}}</h3>
            <p><em>Technologies: {{technologies}}</em></p>
            <ul>
                {{#each details}}
                    <li>{{this}}</li>
                {{/each}}
            </ul>
        {{/each}}
    {{/if}}

    {{#if portfolio}}
        <h2 style="color: #0066cc;">Portfolio</h2>
        <p><strong>GitHub:</strong> <a href="{{portfolio.github}}">{{portfolio.github}}</a></p>
        <p><strong>LinkedIn:</strong> <a href="{{portfolio.linkedin}}">{{portfolio.linkedin}}</a></p>
    {{/if}}

</body>
</html>

`

const render = Handlebars.compile(template);

export const compile = (data = {}) => {
    return render(data);
}



