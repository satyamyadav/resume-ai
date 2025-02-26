import { NextResponse } from 'next/server';

export async function POST(req: Request) {

  const { name, role } = await req.json();

  const messages = [
    {
      role: 'user', content: `
      Generate resume in json with the given details.
      Use sample data for the fields that are not provided.
      For personal informations like email, linkedin and github, don't use real data of any other person, instead 
      use dummy data.
      Return the resume data in json format.
      Dont wrap the response in any code or tag.
      Return only json.
      keep the following fields in the resume:
      {
        "name": "",
        "role": "",
        "address": "",
        "phone": "",
        "email": "",
        "github": "",
        "linkedin": "",
        "site": "",
        "summary": "",
        "skills": [
          {
            "category": "",
            "list": ""
          },
          {
            "category": "",
            "list": ""
          },
          {
            "category": "",
            "list": ""
          },
          {
            "category": "",
            "list": ""
          }
        ],
        "education": [
          {
            "degree": "",
            "startDate": "",
            "endDate": "",
            "institution": "",
            "description": ""
          }
        ],
        "experience": [
          {
            "title": "",
            "company": "",
            "startDate": "",
            "endDate": "",
            "description": "",
            "responsibilities": []
          }
        ],
        "projects": [
          {
            "name": "",
            "technologies": "",
            "details": []
          },
          {
            "name": "",
            "technologies": "",
            "details": []
          }
        ],
        "portfolio": {
          "github": "",
          "linkedin": ""
        }
      }
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
    return NextResponse.json(JSON.parse(resume));
  } catch (error) {
    console.error('Error communicating with AI:', error);
    return NextResponse.error();
  }
}