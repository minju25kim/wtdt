import { createAPIFileRoute } from '@tanstack/start/api'
import { getSupabaseServerClient } from '@/utils/supabase'

export const APIRoute = createAPIFileRoute('/api/auth/signout')({
    GET: async ({ request }) => {
        const supabase = await getSupabaseServerClient()

        const { error } = await supabase.auth.signOut()

        if (error) {
            return new Response(JSON.stringify({ error: error.message }), {
                status: 500,
            })
        }

        return new Response(null, {
            status: 302,
            headers: {
                Location: '/',
            },
        })
    },
})
