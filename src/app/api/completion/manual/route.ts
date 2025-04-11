import { NextResponse } from 'next/server';

export async function POST(req: Request) {

  const { name, role } = await req.json();

  const defaultJson = `
  # Shubham Yadav
  **Frontend Developer**
  📍 Noida, Delhi, NCR
  📧 shubham.relieved@gmail.com
  🔗 [GitHub](https://github.com/shbh) | [LinkedIn](https://www.linkedin.com/in/shbh)
  
  ---
  
  ## 📝 Summary
  
  I am a Software Engineer with 3 years of experience specializing in scalable and well-documented code. I excel in both collaborative team environments and independent project execution.
  
  ---
  
  ## 🧠 Skills
  
  - **Languages**: React.js, Next.js, Redux, JavaScript, REST, ES6, JSON, TypeScript, HTML, CSS, Jest, SCSS
  - **Libraries**: Reactstrap, Material-UI, Core UI, Bootstrap
  - **Tools**: Git, GitLab, Jira, Heroku, VS Code, Linux, macOS
  - **Familiar**: Node.js, Express.js, MongoDB
  
  ---
  
  ## 🎓 Education
  
  **B.Tech CSE**
  SCRIET, Chaudhary Charan Singh University, Meerut, India
  📅 2016 - 2020
  
  ---
  
  ## 💼 Experience
  
  ### **ZoopIndia.com Pvt. Ltd.**
  *Oct 2022 – Present*
  Zoop is a technology company authorized by IRCTC to provide online food ordering services for Indian Railway passengers.
  
  **Responsibilities:**
  - Managed and enhanced the admin panel by creating new designs and adding functionalities using Next.js, Material-UI, and React.js.
  - Migrated admin panel from Angular to Next.js and customer web from React.js to Next.js.
  - Developed dynamic and responsive web applications prioritizing performance and scalability.
  - **Links**: [Customer Website](https://www.zoopindia.com), [Admin Dashboard](https://admin.zoopindia.com)
  
  ---
  
  ### **Digi Clave Pvt. Ltd.**
  *Sep 2021 – Sep 2022*
  Front-End Web Development
  
  **Responsibilities:**
  - Worked on multiple projects as a Front-End Developer, integrating APIs with dynamic functionality.
  - Technologies used: React.js, Material-UI, Redux.
  - **Key Project**: Inspection Support Network (ISN) – A home inspection software simplifying scheduling, billing, reporting, and more.
  
  ---
  
  ## 🧪 Projects
  
  ### **QuizApp**
  *MongoDB, Express.js, React.js, Heroku*
  - A quiz app with time-bound quizzes for college students, including authentication and admin dashboard for quiz tracking.
  
  ---
  
  ### **Blog App**
  *PostgreSQL, Express.js, Bootstrap, Heroku*
  - A blogging platform with post creation and listing capabilities.
  
  ---
  
  ## 📁 Portfolio
  
  - [GitHub](https://github.com/shbh)
  - [LinkedIn](https://www.linkedin.com/in/shbh)
  
  `
  
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
  
    return NextResponse.json({ markdown: resume });
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
  //   const resume = data.choices[0].message.content;
  //   return NextResponse.json({ markdown: resume });
  // } catch (error) {
  //   console.error('Error communicating with AI:', error);
  //   return NextResponse.error();
  // }

  return NextResponse.json({ markdown: defaultJson });
}