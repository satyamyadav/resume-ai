import { NextResponse } from 'next/server';

export async function POST(req: Request) {

  const { name, role } = await req.json();

  const messages = [
    {
      role: 'user', content: `
      Generate resume in markdown with the given details.
      Use sample data for the fields that are not provided.
      For personal informations like email, linkedin and github, don't use real data of any other person, instead 
      use dummy data.
      Return the resume data in markdown format.
      Dont wrap the response in any code or tag.
      Return only markdown.
      keep the following structure in the resume:
      # Name: 
      # Role: 
      ## Contact Information:
      - Address: 
      - Phone: 
      - Email: 
      - GitHub: 
      - LinkedIn: 
      - Website: 
      ## Summary:
      ...
      ## Skills:
      - **Category**: list
      ...
      ## Education:
      - **Degree**: 
        - Institution: 
        - Start Date: 
        - End Date: 
        - Description: 
      ...
      ## Experience:
      - **Title**: 
        - Company: 
        - Start Date: 
        - End Date: 
        - Description: 
        - Responsibilities:
          - ...
      ...
      ## Projects:
      - **Name**: 
        - Technologies: 
        - Details:
          - ...
      ...
      ## Portfolio:
      - GitHub: 
      - LinkedIn: 
      ...
      `
    },
    { role: 'user', content: `Generate a resume for ${name} who is a ${role}.` }
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
    return NextResponse.json({ markdown: resume });
  } catch (error) {
    console.error('Error communicating with AI:', error);
    return NextResponse.error();
  }
}