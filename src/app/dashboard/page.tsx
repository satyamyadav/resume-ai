
import { createClient } from '@/utils/supabase/server';

import { redirect } from 'next/navigation';
import Link from 'next/link';


export default async function Dashboard() {
    const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

    const { data: resumes, error } = await supabase
    .from('resumes')
    .select('*')
    .eq('user_id', user?.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching resumes:', error);
    return [];
  }
    return (
        <div>
            <h1>Dashboard</h1>
            {resumes?.map((resume) => (
                <Link key={resume.id} href={`/resume/${resume.id}`}>
                    <h2>{resume.name}</h2>
                </Link>
            ))}
        </div>
    )
}