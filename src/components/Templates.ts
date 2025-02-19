import Handlebars from "handlebars"
const template = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{name}} - Resume</title>
</head>
<body style="font-family: Arial, sans-serif; margin: 20px;">

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



