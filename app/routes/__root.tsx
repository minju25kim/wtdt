import { Outlet, createRootRoute, HeadContent, Scripts } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/start'
import type { ReactNode } from 'react'
import { getSupabaseServerClient } from '@/lib/supabase'
import { headObject } from '@/lib/headObject'
import { Footer } from '@/components/appComponents/Footer'
import { NavBar } from '@/components/appComponents/NavBar'
import { useUserStore } from '@/store/userStore'
import { useEffect } from 'react'

const fetchUser = createServerFn({ method: 'GET' }).handler(async () => {
    const supabase = await getSupabaseServerClient()
    const { data, error: _error } = await supabase.auth.getUser()

    if (!data.user) {
        return null
    }

    return {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata.name,
        avatar_url: data.user.user_metadata.avatar_url
    }
})

export const Route = createRootRoute({
    head: () => (headObject),
    component: RootComponent,
    beforeLoad: async () => {
        const user = await fetchUser()
        return { user }
    },
})

function RootComponent() {
    const { user } = Route.useRouteContext()
    const setUser = useUserStore(state => state.setUser);

    useEffect(() => {
        if (user) {
            setUser({
                id: user.id ?? '',
                email: user.email ?? '',
                name: user.name ?? '',
                avatar_url: user.avatar_url ?? ''
            })
        }
    }, [user])

    return (
        <RootDocument>
            <div className='h-[100dvh] grid grid-rows-[auto_1fr_auto]'>
                <NavBar />
                <main className='py-2 px-4'>
                    <Outlet />
                </main>
                <Footer />
            </div>
        </RootDocument>
    )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <html>
            <head>
                <HeadContent />
            </head>
            <body>
                {children}
                <Scripts />
            </body>
        </html>
    )
}