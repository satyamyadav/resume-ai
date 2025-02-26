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
    ${printStyles}
    <style>
        

        h1, h2, h3 {
            color: #004080;
        }
        a {
            color: #004080;
            text-decoration: none;
            target-new: tab;
        }

        .header {
            text-align: center;
            margin-bottom: 20px;
            margin-top: -20px;
        }

        .contact-info {
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            margin-bottom: 20px;
        }

        .section {
            margin-bottom: 15px;
        }

        .section-title {
            font-size: 18px;
            font-weight: bold;
            border-bottom: 2px solid #004080;
            padding-bottom: 5px;
            margin-bottom: 10px;
        }

        ul {
            padding-left: 20px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>{{name}}</h1>
        {{#if role}}<h2>{{role}}</h2>{{/if}}
    </div>

    <div class="contact-info">
        <div>
            {{#if address}}<p><strong>Address:</strong> {{address}}</p>{{/if}}
            {{#if email}}<p><strong>Email:</strong> <a target="__blank" href="mailto:{{email}}">{{email}}</a></p>{{/if}}
        </div>
        <div>
            {{#if github}}<p><strong>GitHub:</strong> <a target="__blank" href="{{github}}">{{github}}</a></p>{{/if}}
            {{#if linkedin}}<p><strong>LinkedIn:</strong> <a target="__blank" href="{{linkedin}}">{{linkedin}}</a></p>{{/if}}
        </div>
    </div>

    {{#if summary}}
        <div class="section">
            <div class="section-title">Summary</div>
            <p>{{summary}}</p>
        </div>
    {{/if}}

    {{#if skills}}
        <div class="section">
            <div class="section-title">Skills</div>
            <ul>
                {{#each skills}}
                    <li><strong>{{category}}:</strong> {{list}}</li>
                {{/each}}
            </ul>
        </div>
    {{/if}}

    {{#if education}}
        <div class="section">
            <div class="section-title">Education</div>
            {{#each education}}
                <p><strong>{{degree}}</strong> ({{year}})<br>{{institution}}</p>
            {{/each}}
        </div>
    {{/if}}

    {{#if experience}}
        <div class="section">
            <div class="section-title">Work Experience</div>
            {{#each experience}}
                <h3>{{company}} ({{duration}})</h3>
                <p><em>{{description}}</em></p>
                <ul>
                    {{#each responsibilities}}
                        <li>{{this}}</li>
                    {{/each}}
                </ul>
            {{/each}}
        </div>
    {{/if}}

    {{#if projects}}
        <div class="section">
            <div class="section-title">Personal Projects</div>
            {{#each projects}}
                <h3>{{name}}</h3>
                <p><em>Technologies: {{technologies}}</em></p>
                <ul>
                    {{#each details}}
                        <li>{{this}}</li>
                    {{/each}}
                </ul>
            {{/each}}
        </div>
    {{/if}}

    {{#if portfolio}}
        <div class="section">
            <div class="section-title">Portfolio</div>
            <p><strong>GitHub:</strong> <a target="__blank" href="{{portfolio.github}}">{{portfolio.github}}</a></p>
            <p><strong>LinkedIn:</strong> <a target="__blank" href="{{portfolio.linkedin}}">{{portfolio.linkedin}}</a></p>
        </div>
    {{/if}}
</body>
</html>


`

const render = Handlebars.compile(template);

export const compile = (data = {}) => {
    return render(data);
}



