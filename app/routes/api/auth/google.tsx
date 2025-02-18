import { createAPIFileRoute } from '@tanstack/start/api'
import { getSupabaseServerClient } from '@/utils/supabase'

export const APIRoute = createAPIFileRoute('/api/auth/google')({
  GET: async ({ request }) => {
    const supabase = await getSupabaseServerClient()
    
    console.log('request',request.headers.get('host'))

    console.log(process.env.NODE_ENV)

    const { data } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${process.env.SITE_URL}/dashboard`,
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
