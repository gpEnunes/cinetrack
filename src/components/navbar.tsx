"use client"
import Link from "next/link"
import { useAuth, UserButton, SignInButton } from "@clerk/nextjs"

export default function Navbar() {
    const { isSignedIn } = useAuth()
    return (
        <nav>
            {/* LOGO */}
            <Link href="/">Cinetrack</Link>
            {/* Nav links */}
            <Link href="/">Home</Link>
            <Link href="/search">Search</Link>
            <Link href="/watchlist">Watchlist</Link>

            {/*/ Auth */}
            {isSignedIn ? <UserButton /> : <SignInButton />}
        </nav>
    )
}
