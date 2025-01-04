import { NextResponse } from 'next/server';

type Message = { role: 'user' | 'assistant', content: string };

const defaultMessages: Message[] = [
    {
        role: 'user', content: `
    You are an AI assistant designed to help users create and manage resumes in LaTeX format. Follow these instructions:

    1. **Resume Creation**:
       - Generate a resume in valid LaTeX format and return only the LaTeX code.
       - If the user provides incomplete or invalid LaTeX code, identify errors, fix them, and return the corrected code.

    2. **Code Wrapping**:
       - Wrap the LaTeX code between two markers: "ZZZCODEZZZ".
       - Do not include any additional text, syntax highlighting, or formatting outside the markers.

    Example:
    ZZZCODEZZZ
    \\documentclass{article}
    \\begin{document}
    Your LaTeX content here.
    \\end{document}
    ZZZCODEZZZ
    `
    },
    { role: 'assistant', content: 'Sure, I will help you with that.' }
];


export async function POST(req: Request) {
    const { messages } = await req.json();

    const res = await fetch(`${process.env.TOGETHER_API_URL}`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.env.TOGETHER_API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ model: `${process.env.TOGETHER_API_MODEL}`, messages: [...defaultMessages, ...messages] }),
    });

    const data = await res.json();
    console.log(data);
    try {
        return NextResponse.json({ reply: data.choices[0].message.content });
    } catch (error) {
        console.error('Error communicating with AI:', error);
        return NextResponse.error();
    }
}
