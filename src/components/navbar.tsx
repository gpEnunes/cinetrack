"use client"
import Link from "next/link"
import { useState } from "react"
import { useAuth, UserButton, SignInButton } from "@clerk/nextjs"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Logo from "@/components/logo"

export default function Navbar() {
    const { isSignedIn } = useAuth()
    const [open, setOpen] = useState(false)
    return (
        <nav
            className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/80
  backdrop-blur-md"
        >
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
                <Link
                    href="/"
                    className="flex items-center gap-2 font-bold text-white
  text-lg"
                >
                    <Logo size={28} />
                    Cinetrack
                </Link>

                {/* Desktop links */}
                <div className="hidden md:flex items-center gap-6 text-sm text-white">
                    <Link
                        href="/"
                        className="hover:text-neutral-300
  transition-colors"
                    >
                        Home
                    </Link>
                    <Link
                        href="/search"
                        className="hover:text-neutral-300
  transition-colors"
                    >
                        Search
                    </Link>
                    <Link
                        href="/watchlist"
                        className="hover:text-neutral-300
  transition-colors"
                    >
                        Watchlist
                    </Link>
                    {isSignedIn && (
                        <Link
                            href="/watched"
                            className="hover:text-neutral-300
  transition-colors"
                        >
                            Watched
                        </Link>
                    )}
                    {isSignedIn && (
                        <Link
                            href="/profile"
                            className="hover:text-neutral-300
  transition-colors"
                        >
                            Profile
                        </Link>
                    )}
                </div>

                {/* Desktop auth + mobile hamburger */}
                <div className="flex items-center gap-4">
                    <div className="hidden md:block">
                        {isSignedIn ? (
                            <UserButton />
                        ) : (
                            <SignInButton>
                                <Button variant="default">Sign in</Button>
                            </SignInButton>
                        )}
                    </div>
                    <button
                        className="md:hidden text-white"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? (
                            <X className="size-6" />
                        ) : (
                            <Menu className="size-6" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {open && (
                <div
                    className="md:hidden border-t border-white/10 bg-black/95 px-4 py-4 flex
  flex-col gap-4 text-white"
                >
                    <Link href="/" onClick={() => setOpen(false)}>
                        Home
                    </Link>
                    <Link href="/search" onClick={() => setOpen(false)}>
                        Search
                    </Link>
                    <Link href="/watchlist" onClick={() => setOpen(false)}>
                        Watchlist
                    </Link>
                    {isSignedIn && (
                        <Link href="/watched" onClick={() => setOpen(false)}>
                            Watched
                        </Link>
                    )}
                    {isSignedIn && (
                        <Link href="/profile" onClick={() => setOpen(false)}>
                            Profile
                        </Link>
                    )}
                    <div className="pt-2 border-t border-white/10">
                        {isSignedIn ? (
                            <UserButton />
                        ) : (
                            <SignInButton>
                                <Button variant="default">Sign in</Button>
                            </SignInButton>
                        )}
                    </div>
                </div>
            )}
        </nav>
    )
}
