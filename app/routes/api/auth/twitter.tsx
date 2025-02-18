import { createAPIFileRoute } from '@tanstack/start/api'
import { getSupabaseServerClient } from '@/utils/supabase'

export const APIRoute = createAPIFileRoute('/api/auth/twitter')({
  GET: async () => {
    const supabase = await getSupabaseServerClient()
    const baseUrl = process.env.NODE_ENV === 'production'
      ? process.env.SITE_URL
      : 'http://localhost:3000'

    const { data } = await supabase.auth.signInWithOAuth({
      provider: 'twitter',
      options: {
        redirectTo: `${baseUrl}/dashboard`,
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
