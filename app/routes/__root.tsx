// app/routes/__root.tsx
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { createServerFn, Meta, Scripts } from '@tanstack/start'
import type { ReactNode } from 'react'

import appCss from "@/styles/app.css?url"
import { getSupabaseServerClient } from '@/utils/supabase'

const fetchUser = createServerFn({ method: 'GET' }).handler(async () => {
    const supabase = await getSupabaseServerClient()
    const { data, error: _error } = await supabase.auth.getUser()

    if (!data.user?.email) {
        return null
    }

    return { id: data.user.id }
})

export const Route = createRootRoute({
    head: () => ({
        meta: [
            {
                charSet: 'utf-8',
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            {
                title: 'WTDT',
                description: 'What to do today?',
            },
            {
                property: 'og:title',
                content: 'WTDT',
            },
            {
                property: 'og:description',
                content: 'What to do today?',
            },
            {
                property: 'og:type',
                content: 'website',
            },
            {
                property: 'og:image',
                content: '/og-image.webp',
            },
            {
                name: 'twitter:card',
                content: 'summary_large_image',
            },
            {
                name: 'twitter:title',
                content: 'WTDT',
            },
            {
                name: 'twitter:description',
                content: 'What to do today?',
            },
            {
                name: 'twitter:image',
                content: '/og-image.webp',
            },
        ],
        links: [
            {
                rel: "stylesheet",
                href: appCss,
            },
            {
                rel: 'manifest',
                href: '/site.webmanifest',
            },
            {
                rel: 'icon',
                type: 'image/png',
                sizes: '32x32',
                href: '/favicon-32x32.png',
            },
            {
                rel: 'icon',
                type: 'image/png',
                sizes: '16x16',
                href: '/favicon-16x16.png',
            },
            {
                rel: 'apple-touch-icon',
                sizes: '180x180',
                href: '/apple-touch-icon.png',
            },
        ],
    }),
    component: RootComponent,
    beforeLoad: async () => {
        const user = await fetchUser()

        return {
            user,
        }
    },
})

function RootComponent() {
    return (
        <RootDocument>
            <div className='max-w-3xl mx-auto h-[100dvh] grid grid-rows-[1fr_auto] justify-center'>
                <Outlet />
                <footer className="text-xs text-foreground/50 flex justify-center flex-row gap-2 pb-1">
                    <span>
                        &copy; {new Date().getFullYear()} WTDT
                    </span>
                    <span>
                        <a href="mailto:hello.wtdt@gmail.com">
                            hello.wtdt@gmail.com
                        </a>
                    </span>
                </footer>
            </div>
        </RootDocument>
    )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <html>
            <head>
                <Meta />
            </head>
            <body>
                {children}
                <Scripts />
            </body>
        </html>
    )
}