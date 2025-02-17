import { createFileRoute } from '@tanstack/react-router'
import { SignInGithub, SignInGoogle, SignInTwitter } from '@/components/AppComponents/SignInButton'

export const Route = createFileRoute('/')({
    component: Home,
})

function Home() {
    return (
        <div className="flex flex-col gap-4 justify-center items-center">
            <h1 className="text-2xl font-bold">Welcome to WTDT</h1>
            <div className="flex flex-col gap-4 items-center">
                <div className="border-1">
                    <img src="/og-image.webp" alt="WTDT" width={1200} height={630} />
                </div>
                <div className="flex flex-col gap-2">
                    <SignInGithub />
                    <SignInGoogle />
                    <SignInTwitter />
                </div>
            </div>
        </div>
    )
}