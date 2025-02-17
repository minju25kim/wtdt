import { parseCookies, setCookie } from '@tanstack/start/server'
import { createServerClient } from '@supabase/ssr'

export async function getSupabaseServerClient() {
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
        throw new Error('Missing Supabase environment variables')
    }

    try {
        return createServerClient(
            process.env.SUPABASE_URL,
            process.env.SUPABASE_ANON_KEY,
            {
                cookies: {
                    getAll() {
                        return Object.entries(parseCookies()).map(([name, value]) => ({
                            name,
                            value,
                        }))
                    },
                    setAll(cookies) {
                        cookies.forEach((cookie) => {
                            setCookie(cookie.name, cookie.value)
                        })
                    },
                },
            },
        )
    } catch (error) {
        console.error('Error creating Supabase client:', error)
        throw new Error('Failed to initialize Supabase client')
    }
}
