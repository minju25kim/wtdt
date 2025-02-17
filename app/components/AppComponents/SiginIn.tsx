import { Button } from '@/components/ui/button'
import { Github, Google, Twitter } from '@/components/icons'
import { getSupabaseServerClient } from '@/utils/supabase'
import { createServerFn } from '@tanstack/start'


const signInGoogle = createServerFn({ method: 'GET' }).handler(async () => {
    try {
        const supabase = await getSupabaseServerClient()
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: 'http://localhost:3000/dashboard',
                queryParams: {
                    access_type: 'offline',
                    prompt: 'consent',
                },
            },
        })
        if (error) throw error
        console.log(data.url)
        return data.url
    } catch (error) {
        console.error('Google sign-in error:', error)
        throw new Error('Failed to sign in with Google')
    }
})

const signInGithub = createServerFn({ method: 'GET' }).handler(async () => {
    try {
        const supabase = await getSupabaseServerClient()
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: 'http://localhost:3000/dashboard',
                queryParams: {
                    access_type: 'offline',
                    prompt: 'consent',
                },
            },
        })
        if (error) throw error
        console.log(data.url)
        return data.url
    } catch (error) {
        console.error('Github sign-in error:', error)
        throw new Error('Failed to sign in with Github')
    }
})

const signInTwitter = createServerFn({ method: 'GET' }).handler(async () => {
    try {
        const supabase = await getSupabaseServerClient()
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'twitter',
            options: {
                redirectTo: 'http://localhost:3000/dashboard',
                queryParams: {
                    access_type: 'offline',
                    prompt: 'consent',
                },
            },
        })
        if (error) throw error
        console.log(data.url)
        return data.url
    } catch (error) {
        console.error('Twitter sign-in error:', error)
        throw new Error('Failed to sign in with Twitter')
    }
})


export function SiginIn() {
    return (
        <div className="flex flex-col gap-4 justify-center items-center">
            <h1 className="text-2xl font-bold">Welcome to WTDT</h1>
            <div className="flex flex-col gap-2 text-center min-w-xs">
                <Button variant="outline" onClick={async () => {
                    const url = await signInGithub()
                    if (url) window.location.href = url
                }}>
                    <Github />
                    Github Sign in
                </Button>
                <Button variant="outline" onClick={async () => {
                    const url = await signInGoogle()
                    if (url) window.location.href = url
                }}>
                    <Google />
                    Google Sign in
                </Button>
                <Button variant="outline" onClick={async () => {
                    const url = await signInTwitter()
                    if (url) window.location.href = url
                }}>
                    <Twitter />
                    Twitter Sign in
                </Button>
            </div>
        </div>
    )
}

