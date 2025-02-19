import { createAPIFileRoute } from '@tanstack/start/api'
import { getSupabaseServerClient } from '@/utils/supabase'

export const APIRoute = createAPIFileRoute('/api/auth/twitter')({
  GET: async ({ request }) => {
    const supabase = await getSupabaseServerClient()

    const { data } = await supabase.auth.signInWithOAuth({
      provider: 'twitter',
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
