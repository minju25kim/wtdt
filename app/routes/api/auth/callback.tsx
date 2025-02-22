import { createAPIFileRoute } from '@tanstack/start/api'
import { getSupabaseServerClient } from '@/lib/supabase'

export const APIRoute = createAPIFileRoute('/api/auth/callback')({
    GET: async ({ request }) => {
        try {
            const supabase = await getSupabaseServerClient()
            const url = new URL(request.url)
            const code = url.searchParams.get('code')
            
            if (!code) {
                return new Response(null, {
                    status: 302,
                    headers: {
                        'Location': '/?error=No+code+provided'
                    }
                })
            }
            
            const { data: { session }, error } = await supabase.auth.exchangeCodeForSession(code)

            if (error) {
                console.error('Auth error:', error)
                return new Response(null, {
                    status: 302,
                    headers: {
                        'Location': `/?error=${encodeURIComponent(error.message)}`
                    }
                })
            }

            if (!session) {
                console.error('No session created')
                return new Response(null, {
                    status: 302,
                    headers: {
                        'Location': '/?error=No+session+created'
                    }
                })
            }
            
            return new Response(null, {
                status: 302,
                headers: {
                    'Location': '/dashboard'
                }
            })
        } catch (error) {
            console.error('Callback error:', error)
            return new Response(null, {
                status: 302,
                headers: {
                    'Location': '/?error=Internal+server+error'
                }
            })
        }
    }
})

