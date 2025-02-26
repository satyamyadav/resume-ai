import { NextResponse } from 'next/server';

export async function POST(req: Request) {

    const { currentContent,
        resumeData,
        userPrompt,
        hierarchy
    } = await req.json();

    const messages = [
        {
            role: 'user', content: `
            I am updating my Resume. 
            I will share the specific parts and the complete resume data.
            Keep the tone professional and concise.
            Use words that are easy to understand.
            Content should be more human-like.
            Return only the updated content.
            Use text only.
            Don't wrap the response in any code or tag.
            Don't include any personal information.
            Don't include any specific company names.
            Don't include any instrcutons or comments.
            Don't include hirirechy or prompt.
      `
        },
        { role: 'system', content: `OK, I will update the resume based on the provided data.` },
        {
            role: 'user', content: `
            Here is my current resume data:
            ${JSON.stringify(resumeData)}
            Here is the specific part I want to update:
            ${currentContent}
            Here is the hierarchy of the part I want to update:
            ${hierarchy}
            ${userPrompt ? `Here is the prompt I want to provide: ${userPrompt}` : ''}
            ` }
    ]

    try {
        const res = await fetch(`${process.env.TOGETHER_API_URL}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.TOGETHER_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ model: `${process.env.TOGETHER_API_MODEL}`, messages }),
        });

        const data = await res.json();
        const resume = data.choices[0].message.content;
        return NextResponse.json({ suggestion: resume });
    } catch (error) {
        console.error('Error communicating with AI:', error);
        return NextResponse.error();
    }
}