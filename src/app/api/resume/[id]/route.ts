// implement the api for the resume page

import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';


export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const supabase = await createClient();
    const { data, error } = await supabase.from('resumes').select('*').eq('id', id).single();
    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data);
}