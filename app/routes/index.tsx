import { Google } from '@/components/icons'
import { Github } from '@/components/icons'
import { Twitter } from '@/components/icons/Twitter'
import { Button } from '@/components/ui/button'
import { getSupabaseServerClient } from '@/lib/supabase'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/start'
import { handleAuth } from '@/lib/auth'
// import { WaitlistForm } from '@/components/appComponents/WaitlistForm'

export const Route = createFileRoute('/')({
    component: Home,
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
    const router = useRouter()
    const { user } = Route.useRouteContext()

    return (
        <div className="h-full grid grid-rows-[2fr_1fr] gap-4">
            <div className="flex flex-col justify-end items-center gap-4">
                {user && (
                    <div>Welcome back {user.name}</div>
                )}
                <img src="/og-image.webp" alt="WTDT" className='md:max-w-3xl border-1' />
            </div>

            {/* waitlist */}
            {/* <WaitlistForm /> */}

            {/* sign in buttons */}
            <div className="flex flex-col justify-start items-center gap-2">
                {!user &&
                    <>
                        <Button variant="outline" onClick={() => handleAuth('github')}>
                            <Github />
                            Github Sign in
                        </Button>
                        <Button variant="outline" onClick={() => handleAuth('twitter')}>
                            <Twitter />
                            Twitter Sign in
                        </Button>
                        <Button variant="outline" onClick={() => handleAuth('google')}>
                            <Google />
                            Google Sign in
                        </Button>
                    </>
                }
            </div>
        </div>
    )
}