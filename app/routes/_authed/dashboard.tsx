import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/_authed/dashboard')({
    component: RouteComponent,
})

function RouteComponent() {

    return (
        <div className='max-w-2xl mx-auto border-1 h-full flex flex-col gap-2 justify-center items-center'>
            <Button>
                Create Project
            </Button>
        </div>
    )
}
