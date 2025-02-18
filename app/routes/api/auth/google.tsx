import { createAPIFileRoute } from '@tanstack/start/api'
import { getSupabaseServerClient } from '@/utils/supabase'

export const APIRoute = createAPIFileRoute('/api/auth/google')({
  GET: async ({ request }) => {
    const supabase = await getSupabaseServerClient()

    console.log('1. SITE URL',process.env.SITE_URL)

    console.log('2. Request',request.headers.get('host'))

    console.log('3. NODE_ENV',process.env.NODE_ENV)

    const { data } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${request.headers.get('host')}/dashboard`,
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
