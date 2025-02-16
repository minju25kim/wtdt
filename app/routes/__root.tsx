// app/routes/__root.tsx
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { Meta, Scripts } from '@tanstack/start'
import type { ReactNode } from 'react'

import appCss from "@/styles/app.css?url"

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
                content: 'summary',
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
})

function RootComponent() {
    return (
        <RootDocument>
            <Outlet />
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