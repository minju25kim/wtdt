import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
    component: Home,
})

function Home() {
    return (
        <>
            <h1>Hello World</h1>
            <Button>Click me</Button>
        </>
    )
}