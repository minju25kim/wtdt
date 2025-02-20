import { Button } from "../ui/button";
import { handleAuth } from "@/lib/auth";
import { Route } from "@/routes/__root";

export function NavBar() {
    const { user } = Route.useRouteContext()
    
    return (
        <div className='flex gap-2 justify-center items-center h-10'>
            {user && (
                <>
                    <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 rounded-full border-1"
                    />
                    <Button variant="outline" onClick={() => window.location.href = '/dashboard'}>
                        Dashboard
                    </Button>
                    <Button variant="outline" onClick={() => handleAuth('signout')}>
                        Sign out
                    </Button>
                </>
            )}
        </div>


    )
}
