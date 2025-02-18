import { createAPIFileRoute } from '@tanstack/start/api'
import { getSupabaseServerClient } from '@/utils/supabase'

export const APIRoute = createAPIFileRoute('/api/auth/twitter')({
  GET: async ({ request }) => {
    const supabase = await getSupabaseServerClient()
    const url = new URL(request.url)
    const baseUrl = `${url.protocol}//${url.host}`

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
