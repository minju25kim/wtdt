import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/_authed/dashboard')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <div className="grid grid-cols-2 gap-2 h-full">
            <div className="border p-2">
                <h2 className="text-lg font-semibold mb-4">Chat</h2>
            </div>
            <div className="grid grid-rows-2 gap-2 h-full">
                <div className="border">
                    <h2 className="text-lg font-semibold mb-4">user</h2>
                </div>
                <div className="border">
                    <h2 className="text-lg font-semibold mb-4">Project</h2>
                    <Button variant="outline" onClick={() => {
                        window.location.href = '/api/project/new'
                    }}>Create a new project</Button>
                </div>
            </div>
        </div>
    )
}
