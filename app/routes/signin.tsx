import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Github, Google } from '@/components/icons'

export const Route = createFileRoute('/signin')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <h1 className="text-2xl font-bold">Welcome to WTDT</h1>
      <div className="flex flex-col gap-4 text-center min-w-xs">
        <Button variant="outline">
          <Github />
          Github Sign in
        </Button>
        <Button variant="outline">
          <Google />
          Google Sign in
        </Button>
        <Link className="text-sm text-foreground/50 hover:underline" to="/signup">
          Create an account? Sign up
        </Link>
      </div>
    </div>
  )
}
