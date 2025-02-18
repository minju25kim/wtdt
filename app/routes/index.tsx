import { Google } from '@/components/icons'
import { Github } from '@/components/icons'
import { Twitter } from '@/components/icons/Twitter'
import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'

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
                    <Button variant="outline" onClick={() => {
                        console.log('Github Sign in')
                    }}>
                        <Github />
                        Github Sign in
                    </Button>
                    <Button variant="outline" onClick={() => {
                        console.log('Twitter Sign in')
                    }}>
                        <Twitter />
                        Twitter Sign in
                    </Button>
                    <Button variant="outline" onClick={() => {
                        console.log('Google Sign in')
                    }}>
                        <Google />
                        Google Sign in
                    </Button>
                </div>
            </div>
        </div>
    )
}