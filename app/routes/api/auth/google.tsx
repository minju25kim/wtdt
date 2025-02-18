import { createAPIFileRoute } from '@tanstack/start/api'
import { getSupabaseServerClient } from '@/utils/supabase'

export const APIRoute = createAPIFileRoute('/api/auth/google')({
  GET: async ({ request }) => {
    const supabase = await getSupabaseServerClient()

    console.log('1. NODE_ENV', process.env.NODE_ENV)

    console.log('2. SITE URL', process.env.SITE_URL)

    console.log('3. redirectTo', new URL('/dashboard', process.env.SITE_URL).toString())
    
    const { data } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: new URL('/dashboard', process.env.SITE_URL).toString(),
      },
    })
    return new Response(null, {
      status: 302,
      headers: {
        Location: data.url || '/',
      },
    })
  },
})
