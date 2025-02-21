import { Google } from '@/components/icons'
import { Github } from '@/components/icons'
import { Twitter } from '@/components/icons/Twitter'
import { Button } from '@/components/ui/button'
import { getSupabaseServerClient } from '@/lib/supabase'
import type { Provider } from '@supabase/supabase-js'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/start'
// import { handleAuth } from '@/lib/auth'
// import { WaitlistForm } from '@/components/appComponents/WaitlistForm'
import { useUserStore } from '@/store/userStore'
import { fetchUser } from './__root'

export const Route = createFileRoute('/')({
    component: Home,
    beforeLoad: async ({ context }) => context.user
})

export const handleAuth = createServerFn({ method: 'GET' })
    .validator((data: { provider: string }) => data)
    .handler(async ({ data }) => {
        const supabase = await getSupabaseServerClient()
        const provider = data.provider

        const { data: callback, error } = await supabase.auth.signInWithOAuth({
            provider: provider as Provider,
            options: {
                redirectTo: `${process.env.SITE_URL}/api/auth/callback`,
            },
        })

        if (error) {
            console.error('GitHub OAuth error:', error)
            return new Response(JSON.stringify({ error: error.message }), {
                status: 400,
            })
        }

        if (!callback?.url) {
            return new Response(JSON.stringify({ error: 'No redirect URL provided' }), {
                status: 400,
            })
        }

        return { redirectUrl: callback.url }
    })

export const joinWaitlist = createServerFn({ method: 'POST' })
    .validator((data: { email: string }) => data)
    .handler(async ({ data }) => {

        const supabase = await getSupabaseServerClient()

        const { error } = await supabase
            .from('waitlist')
            .insert({ email: data.email })

        if (error) {
            console.error('Error inserting supabase:', error)
            if (error.code === '23505') {
                throw new Error('You are already on the waitlist')
            }
            throw new Error('Failed to join waitlist')
        }
        return { success: true }
    })

function Home() {
    const { user } = Route.useRouteContext()
    // const user = useUserStore(state => state.user);
    // console.log(user)

    return (
        <div className="h-full grid grid-rows-[2fr_1fr] gap-4">
            <div className="flex flex-col justify-end items-center">
                <img src="/og-image.webp" alt="WTDT" className='md:max-w-3xl border-1' />
            </div>

            {/* waitlist */}
            {/* <WaitlistForm /> */}

            {/* sign in buttons */}
            <div>
                <div className='flex flex-col justify-start items-center gap-2'>
                    <Button variant="outline" onClick={async () => {
                        await handleAuth({ data: { provider: 'github' } }).then((result) => {
                            if ('redirectUrl' in result) {
                                window.location.href = result.redirectUrl
                            }
                        })
                    }}>
                        <Github />
                        Github Sign in
                    </Button>
                    <Button variant="outline" onClick={async () => {
                        await handleAuth({ data: { provider: 'twitter' } }).then((result) => {
                            if ('redirectUrl' in result) {
                                window.location.href = result.redirectUrl
                            }
                        })
                    }}>
                        <Twitter />
                        Twitter Sign in
                    </Button>
                    <Button variant="outline" onClick={async () => {
                        await handleAuth({ data: { provider: 'google' } }).then((result) => {
                            if ('redirectUrl' in result) {
                                window.location.href = result.redirectUrl
                            }
                        })
                    }}>
                        <Google />
                        Google Sign in
                    </Button>
                </div>

            </div>
        </div>
    )
}