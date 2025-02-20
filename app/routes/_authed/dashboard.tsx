import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/_authed/dashboard')({
    component: RouteComponent,
})

function RouteComponent() {

    return (
        <div>
            <Button variant="outline" onClick={() => {
                window.location.href = '/api/project/new'
            }}>Create a new project</Button>
        </div>
    )
}
