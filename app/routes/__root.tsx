// app/routes/__root.tsx
import { HeadContent, Scripts, Outlet, createRootRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/start'
import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { getSupabaseServerClient } from '@/lib/supabase'
import { Footer } from '@/components/appComponents/Footer'
import { headObject } from '@/lib/headObject'
import { NavBar } from '@/components/appComponents/NavBar'
import { useUserStore } from '@/store/storeUser'

const fetchUser = createServerFn({ method: 'GET' }).handler(async () => {
    const supabase = await getSupabaseServerClient()
    const { data, error: _error } = await supabase.auth.getUser()

    if (!data.user?.email) {
        return null
    }

    return {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata.name,
        avatar: data.user.user_metadata.avatar_url,
    }
})


export const Route = createRootRoute({
    component: RootComponent,
    head: () => (headObject),
    beforeLoad: async () => {
        const user = await fetchUser()
        return { user }
    },
})

function RootComponent() {
    const { user } = Route.useRouteContext()
    const { setUser } = useUserStore()

    useEffect(() => {
        if (user) {
            setUser(user)
        }
    }, [user])

    return (
        <RootDocument>
            <div className='mx-auto h-[100dvh] grid grid-rows-[auto_1fr_auto] border-1'>
                <NavBar />
                <Outlet />
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