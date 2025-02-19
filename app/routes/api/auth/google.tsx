import { createAPIFileRoute } from '@tanstack/start/api'
import { getSupabaseServerClient } from '@/utils/supabase'

export const APIRoute = createAPIFileRoute('/api/auth/google')({
  GET: async ({ request }) => {
    const supabase = await getSupabaseServerClient()

    const { data } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: new URL('/api/auth/callback', process.env.SITE_URL).toString(),
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
