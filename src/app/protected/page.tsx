'use client';

import { useSession, useSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';

export default function ProtectedPage() {
  const session = useSession();
  const supabase = useSupabaseClient();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (session) {
      supabase.auth.getUser().then(({ data }) => setUser(data.user));
    }
  }, [session, supabase]);

  if (!session) {
    return <p>You must be signed in to view this page.</p>;
  }

  return (
    <div>
      <h1>Protected Page</h1>
      <p>Welcome, {user?.email}</p>
    </div>
  );
}
