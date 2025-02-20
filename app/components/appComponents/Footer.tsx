export function Footer() {
    return (
        <footer className="text-xs text-foreground/50 flex justify-center flex-row gap-2 p-1">
            <span>
                &copy; {new Date().getFullYear()} WTDT
            </span>
            <span>
                <a href="mailto:hello.wtdt@gmail.com">
                    hello.wtdt@gmail.com
                </a>
            </span>
        </footer>
    )
}

