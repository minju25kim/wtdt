import { createFileRoute } from '@tanstack/react-router'
import { SiginIn } from '@/components/AppComponents/SiginIn'
export const Route = createFileRoute('/')({
    component: Home,
})


function Home() {

    return (
        <div className="flex flex-col gap-4 justify-center items-center">
            <div className="flex flex-col gap-4 text-center min-w-xs">
                <div className="border-1">
                    <img src="/og-image.webp" alt="WTDT" width={1200} height={630} />
                </div>
            </div>
            
            <SiginIn />
        </div>
    )
}