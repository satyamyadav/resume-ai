import { NextResponse } from 'next/server';

  
export async function POST(req: Request) {

    const { linkedinData } = await req.json();
  
    const res = await fetch(`${process.env.TOGETHER_API_URL}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.TOGETHER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ model: `${process.env.TOGETHER_API_MODEL}`, messages: [{ role: 'user', content: `Generate a resume based on the following LinkedIn data: ${JSON.stringify(linkedinData)}` }] }),
    });
  
    const data = await res.json();
    try {
      return NextResponse.json(data);
    } catch (error) {
      console.error('Error communicating with AI:', error);
      return NextResponse.error();
    }
  }
  