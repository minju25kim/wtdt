import { createAPIFileRoute } from '@tanstack/start/api'
import { getSupabaseServerClient } from '@/lib/supabase'
import { useUserStore } from '@/store/storeUser'

export const APIRoute = createAPIFileRoute('/api/auth/callback')({
    GET: async ({ request }) => {
        const supabase = await getSupabaseServerClient()

        const url = new URL(request.url)
        const code = url.searchParams.get('code')

        if (!code) {
            return Response.redirect('/?error=No+code+provided', 302)
        }

        const { data: { session }, error } = await supabase.auth.exchangeCodeForSession(code)

        if (error) {
            console.error('Auth error:', error)
            return Response.redirect(`/?error=${encodeURIComponent(error.message)}`, 302)
        }

        if (!session) {
            console.error('No session created')
            return Response.redirect('/?error=No+session+created', 302)
        }

        console.log('__api/auth/callback__\n')

        return new Response(null, {
            status: 302,
            headers: {
                'Location': '/dashboard'
            }
        })
    }
})

