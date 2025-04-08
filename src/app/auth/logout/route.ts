import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function GET() {
  const supabase = await createClient()

  // Check if the user is authenticated
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    // Redirect to the login page if not authenticated
    redirect('/login')
    return
  }

  // Sign out the user
  await supabase.auth.signOut()

  // Redirect to the login page
  redirect('/login')
}
