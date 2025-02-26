export const defaultTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{name}} - Resume</title>
    {{{printStyles}}}
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.4; }
        h1, h2, h3 { color: #004080; margin: 0; }
        h1 { font-size: 24px; }
        h2 { font-size: 18px; }
        h3 { font-size: 16px; }
        a { color: #004080; text-decoration: none; }
        .header { text-align: center; margin-bottom: 10px; }
        .contact-info { display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 10px; }
        .section { margin-bottom: 10px; }
        .section-title { font-size: 16px; font-weight: bold; border-bottom: 2px solid #004080; padding-bottom: 3px; margin-bottom: 5px; }
        ul { padding-left: 15px; margin: 5px 0; }
        p { margin: 3px 0; }
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
                {{#each skills}}<li><strong>{{category}}:</strong> {{list}}</li>{{/each}}
            </ul>
        </div>
    {{/if}}

    {{#if education}}
        <div class="section">
            <div class="section-title">Education</div>
            {{#each education}}<p><strong>{{degree}}</strong> ({{year}})<br>{{institution}}</p>{{/each}}
        </div>
    {{/if}}

    {{#if experience}}
        <div class="section">
            <div class="section-title">Work Experience</div>
            {{#each experience}}
                <h3>{{company}} ({{duration}})</h3>
                <p><em>{{description}}</em></p>
                <ul>{{#each responsibilities}}<li>{{this}}</li>{{/each}}</ul>
            {{/each}}
        </div>
    {{/if}}

    {{#if projects}}
        <div class="section">
            <div class="section-title">Personal Projects</div>
            {{#each projects}}
                <h3>{{name}}</h3>
                <p><em>Technologies: {{technologies}}</em></p>
                <ul>{{#each details}}<li>{{this}}</li>{{/each}}</ul>
            {{/each}}
        </div>
    {{/if}}

    
</body>
</html>
`;

export const twoColumnTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{name}} - Resume</title>
    {{{printStyles}}}
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.4; margin: 0; padding: 0; display: flex; }
        h1, h2, h3 { color: #004080; margin: 0; }
        h1 { font-size: 24px; }
        h2 { font-size: 18px; }
        h3 { font-size: 16px; }
        a { color: #004080; text-decoration: none; }
        .left-column { width: 35%; background: #f4f4f4; padding: 20px; }
        .right-column { width: 65%; padding: 20px; }
        .header { text-align: center; margin-bottom: 10px; }
        .contact-info { font-size: 12px; margin-bottom: 15px; }
        .contact-info p { margin: 3px 0; }
        .section { margin-bottom: 10px; }
        .section-title { font-size: 16px; font-weight: bold; border-bottom: 2px solid #004080; padding-bottom: 3px; margin-bottom: 5px; }
        ul { padding-left: 15px; margin: 5px 0; }
        p { margin: 3px 0; }
        .skills ul { list-style: none; padding-left: 0; }
        .skills li { margin-bottom: 5px; }
    </style>
</head>
<body>
    <!-- Left Column -->
    <div class="left-column">
        <div class="header">
            <h1>{{name}}</h1>
            {{#if role}}<h2>{{role}}</h2>{{/if}}
        </div>

        <div class="contact-info">
            {{#if address}}<p><strong>Address:</strong> {{address}}</p>{{/if}}
            {{#if phone}}<p><strong>Phone:</strong> {{phone}}</p>{{/if}}
            {{#if email}}<p><strong>Email:</strong> <a target="__blank" href="mailto:{{email}}">{{email}}</a></p>{{/if}}
            {{#if github}}<p><strong>GitHub:</strong> <a target="__blank" href="{{github}}">{{github}}</a></p>{{/if}}
            {{#if linkedin}}<p><strong>LinkedIn:</strong> <a target="__blank" href="{{linkedin}}">{{linkedin}}</a></p>{{/if}}
            {{#if site}}<p><strong>Website:</strong> <a target="__blank" href="{{site}}">{{site}}</a></p>{{/if}}
        </div>

        {{#if skills}}
            <div class="section skills">
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
                    <p><strong>{{degree}}</strong> ({{startDate}} - {{endDate}})<br>{{institution}}</p>
                    {{#if description}}<p><em>{{description}}</em></p>{{/if}}
                {{/each}}
            </div>
        {{/if}}
    </div>

    <!-- Right Column -->
    <div class="right-column">
        {{#if summary}}
            <div class="section">
                <div class="section-title">Summary</div>
                <p>{{summary}}</p>
            </div>
        {{/if}}

        {{#if experience}}
            <div class="section">
                <div class="section-title">Work Experience</div>
                {{#each experience}}
                    <h3>{{title}} - {{company}}</h3>
                    <p><em>{{startDate}} - {{endDate}}</em></p>
                    <p>{{description}}</p>
                    <ul>
                        {{#each responsibilities}}<li>{{this}}</li>{{/each}}
                    </ul>
                {{/each}}
            </div>
        {{/if}}

        {{#if projects}}
            <div class="section">
                <div class="section-title">Projects</div>
                {{#each projects}}
                    <h3>{{name}}</h3>
                    <p><em>Technologies: {{technologies}}</em></p>
                    <ul>
                        {{#each details}}<li>{{this}}</li>{{/each}}
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
    </div>
</body>
</html>
`;