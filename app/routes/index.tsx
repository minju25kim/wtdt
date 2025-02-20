// import { Google } from '@/components/icons'
// import { Github } from '@/components/icons'
// import { Twitter } from '@/components/icons/Twitter'
// import { Button } from '@/components/ui/button'
import { getSupabaseServerClient } from '@/lib/supabase'
import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/start'
import { WaitlistForm } from '@/components/appComponents/WaitlistForm'


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
    // const { user } = Route.useRouteContext()

    return (
        <div className="flex flex-col gap-4 justify-center items-center">
            <h1 className="text-2xl font-bold">Welcome!</h1>
            <div className="flex flex-col gap-4 items-center">
                <div className="border-1">
                    <img src="/og-image.webp" alt="WTDT" className='max-w-2xl' />
                </div>

                {/* waitlist */}
                <WaitlistForm />

                {/* sign in buttons */}
                {/* <div className="flex flex-col gap-2 h-30">
                    {!user &&
                        <>
                            <Button variant="outline" className='min-w-xs   max-w-xs' onClick={() => handleAuth('github')}>
                                <Github />
                                Github Sign in
                            </Button>
                            <Button variant="outline" className='min-w-xs   max-w-xs' onClick={() => handleAuth('twitter')}>
                                <Twitter />
                                Twitter Sign in
                            </Button>
                            <Button variant="outline" className='min-w-xs   max-w-xs' onClick={() => handleAuth('google')}>
                                <Google />
                                Google Sign in
                            </Button>
                        </>
                    }
                </div> */}
            </div>
        </div>
    )
}