"use client"
import Link from "next/link"
import { useAuth, UserButton, SignInButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import Logo from "@/components/logo"

export default function Navbar() {
    const { isSignedIn } = useAuth()
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/80 backgrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
                {/* LOGO */}
                <Link
                    href="/"
                    className="flex items-center gap-2 font-bold text-white text-lg"
                >
                    <Logo size={28} />
                    Cinetrack
                </Link>
                {/* Nav links */}
                <div className="flex items-center gap-6 text-white text-lg">
                    <Link href="/">Home</Link>
                    <Link href="/search">Search</Link>
                    <Link href="/watchlist">Watchlist</Link>
                </div>
                {/*/ Auth */}
                <div>
                    {isSignedIn ? (
                        <UserButton />
                    ) : (
                        <SignInButton>
                            <Button className="" variant="default">
                                Sign in
                            </Button>
                        </SignInButton>
                    )}
                </div>
            </div>
        </nav>
    )
}
