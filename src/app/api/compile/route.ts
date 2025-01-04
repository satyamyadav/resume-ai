import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  const { latex, name='resume' } = await req.json();
  const texFilePath = path.join(process.cwd(), 'temp', `${name}.tex`);
  const pdfOutputDir = path.join(process.cwd(), 'public/resume');
  const tectonicPath = path.join(process.cwd(), '.bin', 'tectonic');
  const tectonicCommand = `${tectonicPath} ${texFilePath} --outdir ${pdfOutputDir}`;

  const pdfUrl = `/resume/${name}.pdf`;
  // Write LaTeX content to .tex file
  fs.writeFileSync(texFilePath, latex);

  return new Promise((resolve, reject) => {
    // Convert .tex file to PDF
    exec(tectonicCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(stderr);
        resolve(NextResponse.json({ error: 'Error compiling LaTeX', message: stderr }, { status: 500 }));
        return;
      }

      // Return the response with the PDF URL
      resolve(NextResponse.json({ pdfUrl }));
    });
  });

};
