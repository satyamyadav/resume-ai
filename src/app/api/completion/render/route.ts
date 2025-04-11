import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { markdown, template } = await req.json();

  const messages = [
    {
      role: 'user',
      content: `
        Render the following markdown data into HTML using the provided template. Ensure the following:
1. The HTML output should strictly follow the structure and styling defined in the provided template.
2. Preserve all formatting and content from the markdown data without adding, removing, or modifying any information.
3. The output should be a complete, ready-to-use HTML document, including the <html>, <head>, and <body> tags.
4. Use section sequences from markdown data to create sections in the HTML output.
5. Use section titles from markdown data to create section titles in the HTML output. Use the text from the markdown data as the section title.
5. Do not include any implementation details, code snippets, or explanations in the response. Only return the rendered HTML.

Template:
${template}

Markdown:
${markdown}
      `,
    },
  ];

  

  try {
    
    // Update the fetch call to use the "completions" endpoint
    const res = await fetch("http://localhost:11434/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "mistral",
        messages:  messages,
        stream: false
      })
    });
  
    const data = await res.json();
    const resume = data.message.content;
  
    return NextResponse.json({ html: resume });
  } catch (error) {
      console.error('Error communicating with AI:', error);
    return NextResponse.error();
  }



  // try {
  //   const res = await fetch(`${process.env.TOGETHER_API_URL}`, {
  //     method: 'POST',
  //     headers: {
  //       Authorization: `Bearer ${process.env.TOGETHER_API_KEY}`,
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ model: `${process.env.TOGETHER_API_MODEL}`, messages }),
  //   });

  //   const data = await res.json();
  //   const html = data.choices[0].message.content;
  //   return NextResponse.json({ html });
  // } catch (error) {
  //   console.error('Error communicating with AI:', error);
  //   return NextResponse.error();
  // }
}