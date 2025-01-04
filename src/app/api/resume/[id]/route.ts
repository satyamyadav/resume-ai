import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const texFilePath = path.join(process.cwd(), 'temp', `${id}.tex`);
    // read LaTeX content to .tex file
    try {
        const data = fs.readFileSync(texFilePath, 'utf-8');
        return NextResponse.json({ latex: data });
        
    } catch (error) {
        console.error('Error reading latex content:', error);
        return NextResponse.json({ error: 'Error reading latex content' }, { status: 500 });
    }
};
