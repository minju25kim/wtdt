import { createFileRoute } from '@tanstack/react-router'
import { getSupabaseServerClient } from '@/utils/supabase'
import { createServerFn } from '@tanstack/start'
import { Button } from '@/components/ui/button'

const fetchUser = createServerFn({ method: 'GET' }).handler(async () => {
    const supabase = await getSupabaseServerClient()
    const { data, error: _error } = await supabase.auth.getUser()

    if (!data.user?.email) {
        return null
    }

    return { id: data.user.id }
})


export const Route = createFileRoute('/_authed/dashboard')({
    component: RouteComponent,
    loader: async () => {
        const user = await fetchUser()
        return { user }
    }
})

function RouteComponent() {
    const { user } = Route.useLoaderData()
    const handleAuth = (provider: 'signout') => {
        window.location.href = `/api/auth/${provider}`
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome {user?.id}</p>
            <Button variant="outline" onClick={() => handleAuth('signout')}>Signout</Button>
        </div>
    )
}
