import { createAPIFileRoute } from '@tanstack/start/api'
import { getSupabaseServerClient } from '@/utils/supabase'

export const APIRoute = createAPIFileRoute('/api/auth/google')({
  GET: async ({ request }) => {
    const supabase = await getSupabaseServerClient()
    let baseUrl = ''

    if (process.env.NODE_ENV === 'production') {
      baseUrl = new URL(request.url).origin
    } else {
      baseUrl = 'http://localhost:3000'
    }

    console.log(baseUrl)

    const { data } = await supabase.auth.signInWithOAuth({
      provider: 'google',
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
