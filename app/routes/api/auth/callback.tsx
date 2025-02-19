import { createAPIFileRoute } from '@tanstack/start/api'
import { getSupabaseServerClient } from '@/utils/supabase'

export const APIRoute = createAPIFileRoute('/api/auth/callback')({
    GET: async ({ request }) => {
        const supabase = await getSupabaseServerClient()
        // Get the code from the URL using request.url
        const url = new URL(request.url)
        const code = url.searchParams.get('code')
        
        if (!code) {
            return Response.redirect('/?error=No+code+provided', 302)
        }
        
        const { data: { session }, error } = await supabase.auth.exchangeCodeForSession(code)
        console.log('__api/auth/callback__\n')

        if (error) {
            console.error('Auth error:', error)
            return Response.redirect(`/?error=${encodeURIComponent(error.message)}`, 302)
        }

        if (!session) {
            console.error('No session created')
            return Response.redirect('/?error=No+session+created', 302)
        }

        return new Response(null, {
            status: 302,
            headers: {
                'Location': '/dashboard'
            }
        })
    }
})

