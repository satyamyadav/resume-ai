import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { latex, name='resume' } = await req.json();
  const texFilePath = path.join(process.cwd(), 'temp', `${name}.tex`);
  const pdfOutputDir = path.join(process.cwd(), 'public/resume');
  const tectonicPath = path.join(process.cwd(), '.bin', 'tectonic');
  const tectonicCommand = `${tectonicPath} ${texFilePath} --outdir ${pdfOutputDir}`;

  const pdfUrl = `/resume/${name}.pdf`;
  // Write LaTeX content to .tex file
  fs.writeFileSync(texFilePath, latex);

  try {
    await new Promise((resolve, reject) => {
      exec(tectonicCommand, (error, stdout, stderr) => {
        if (error) {
          console.error(stderr);
          reject(error);
        }
        resolve(stdout);
      });
    });

    return NextResponse.json({ pdfUrl });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Error compiling LaTeX', message: error }, 
      { status: 500 }
    );
  }
}