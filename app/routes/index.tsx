import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
    component: Home,
})

function Home() {
    return (
        <div className="flex flex-col gap-4 justify-center items-center">
            <h1 className="text-2xl font-bold">Welcome to WTDT</h1>
            <div className="flex flex-col gap-4 text-center min-w-xs">
                <div className="border-1">
                    <img src="/og-image.webp" alt="WTDT" width={1200} height={630} />
                </div>
                <Link to="/signin" className="text-sm text-foreground/50 hover:underline">
                    Already have an account? Sign in
                </Link>
                <Link to="/signup" className="text-sm text-foreground/50 hover:underline">
                    Create an account? Sign up
                </Link>
            </div>
        </div>
    )
}