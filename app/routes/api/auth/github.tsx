import { createAPIFileRoute } from '@tanstack/start/api'
import { getSupabaseServerClient } from '@/utils/supabase'

export const APIRoute = createAPIFileRoute('/api/auth/github')({
  GET: async ({ request }) => {
    const supabase = await getSupabaseServerClient()

    let baseUrl = ''

    if (process.env.NODE_ENV === 'production') {
      baseUrl = process.env.SITE_URL || ''
    }
    if (process.env.NODE_ENV === 'development') {
      baseUrl = 'http://localhost:3000'
    }

    console.log(baseUrl)
    const { data } = await supabase.auth.signInWithOAuth({
      provider: 'github',
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
