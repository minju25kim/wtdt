import { Google } from '@/components/icons'
import { Github } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/signup')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <div className="flex flex-col gap-4 justify-center items-center">
            <h1 className="text-2xl font-bold">Welcome to WTDT</h1>
            <div className="flex flex-col gap-4 text-center min-w-xs">
                <Button variant="outline">
                    <Github />
                    Github Sign up
                </Button>
                <Button variant="outline">
                    <Google />
                    Google Sign up
                </Button>
                <Link to="/signin" className="text-sm text-foreground/50 hover:underline">
                    Already have an account? Sign in
                </Link>
            </div>
        </div>
    )
}
