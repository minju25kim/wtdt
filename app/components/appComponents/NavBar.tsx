import { Link  } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { handleAuth } from "@/lib/auth";
import { useUserStore } from "@/store/userStore";

export function NavBar() {
  const user = useUserStore(state => state.user);


  return (
    <header className="w-full py-2 px-4">
      <div className="flex justify-between items-center">
        <Link to="/" className="hover:opacity-80 transition-opacity">
          <span className="font-bold text-xl">WTDT</span>
        </Link>
        {user.avatar_url && (
          <div className="flex items-center gap-4">
            <img src={user.avatar_url} alt="avatar" className="w-8 h-8 rounded-full" />
            <Link
              to="/dashboard"
              className="hover:opacity-80 transition-opacity"
            >
              <Button variant="ghost" size="sm">
                Dashboard
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleAuth('signout')}
            >
              Sign out
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
