import { Github, Google, Twitter } from "@/components/icons";
import { Button } from "@/components/ui/button";

export function SignInGithub() {
    return (
        <Button variant="outline">
            <Github />
            Github Sign in
        </Button>
    )
}

export function SignInGoogle() {
    return (
        <Button variant="outline">
            <Google />
            Github Sign in
        </Button>
    )
}

export function SignInTwitter() {
    return (
        <Button variant="outline">
            <Twitter />
            Twitter Sign in
        </Button>
    )
}

