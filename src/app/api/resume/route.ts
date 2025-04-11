import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: Request) {
    try {
        const supabase = await createClient();
        const {
            data: { user },
            error: authError
        } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json(
                { error: 'Unable to authenticate user' },
                { status: 401 }
            );
        }

        const user_id = user.id;

        const body = await req.json();
        const { name, role } = body;

        if (!name || !role) {
            return NextResponse.json(
                { error: 'Name and role are required' },
                { status: 400 }
            );
        }

        const { data: resume, error: resumeError } = await supabase
            .from('resumes')
            .insert({
                user_id,
                name,
                role,
                markdown: '',
                html: ''
            })
            .select()
            .single();

        if (resumeError) throw resumeError;

        const messages = [
            { role: 'user', message: `Name: ${name}\nRole: ${role}` },
            { role: 'assistant', message: `What are your key achievements as a ${role}?` },
            { role: 'assistant', message: `What are your primary responsibilities as a ${role}?` },
            { role: 'assistant', message: `What skills make you a great ${role}?` }
        ];

        for (const message of messages) {
            const { error: chatError } = await supabase
                .from('chat_messages')
                .insert({
                    resume_id: resume.id,
                    user_id,
                    role: message.role,
                    message: message.message
                });

            if (chatError) throw chatError as Error;
        }

        return NextResponse.json(resume);

    } catch (error) {
        const message = error instanceof Error && error.message ? error.message : 'Something went wrong';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
