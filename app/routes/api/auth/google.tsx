import { createAPIFileRoute } from '@tanstack/start/api'
import { getSupabaseServerClient } from '@/lib/supabase'

export const APIRoute = createAPIFileRoute('/api/auth/google')({
  GET: async () => {
    const supabase = await getSupabaseServerClient()

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${process.env.SITE_URL}/api/auth/callback`,
      },
    })

    console.log('__api/auth/github__\n', data?.url)

    if (error) {
      console.error('GitHub OAuth error:', error)
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
      })
    }

    if (!data.url) {
      return new Response(
        JSON.stringify({ error: 'No redirect URL provided' }),
        {
          status: 400,
        },
      )
    }

    return new Response(null, {
      status: 302,
      headers: {
        Location: data.url,
      },
    })
  },
})
