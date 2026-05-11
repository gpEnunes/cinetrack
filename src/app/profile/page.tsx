"use client"
import { useUser } from "@clerk/nextjs"
import { useWatchlist } from "@/hooks/useWatchlist"
import Image from "next/image"
export default function ProfilePage() {
    const { watchlist } = useWatchlist()
    const { user } = useUser()
    if (!user) return null
    return (
        <main className="w-full max-w-7xl mx-auto px-5 py-8 space-y-12">
            <Image
                src={user.imageUrl}
                alt={user.fullName ?? ""}
                width={80}
                height={80}
                className="rounded-full"
            />

            <div className="flex flex-col gap-1">
                <h2 className="text-xl font-bold">{user.fullName}</h2>
                <p className="text-neutral-400 text-sm">
                    {user.primaryEmailAddress?.emailAddress}
                </p>
            </div>
            <div className="flex gap-4">
                <div className="bg-neutral-800 rounded-lg p-6 text-center flex-1">
                    <p className="text-3xl font-bold">{watchlist.length}</p>
                    <p className="text-neutral-400 text-sm">Watchlist</p>
                </div>
                <div className="bg-neutral-800 rounded-lg p-6 text-center flex-1">
                    <p className="text-3xl font-bold">0</p>
                    <p className="text-neutral-400 text-sm">Watched</p>
                </div>
            </div>
        </main>
    )
}
