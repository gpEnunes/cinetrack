import { useState, useEffect, startTransition } from "react";
import { useAuth } from "@clerk/nextjs";
import { Movie, TvShow } from "@/lib/api/types";

export type WatchlistItem = (Movie | TvShow) & { mediaType: "movie" | "tv" }

export function useWatchlist() {
    const [watchlist, setWatchlist] = useState<WatchlistItem[]>([])
    const { userId } = useAuth()
    const storageKey = `watchlist-${userId}`
    useEffect(() => {
        if (!userId) return
        const stored = JSON.parse(localStorage.getItem(storageKey) ?? "[]")
        startTransition(() => {
            setWatchlist(stored)
        })
    }, [storageKey, userId])

    function addToWatchlist(item: WatchlistItem) {
        const updated = [...watchlist, item]
        setWatchlist(updated)
        localStorage.setItem(storageKey, JSON.stringify(updated))
    }

    function removeFromWatchlist(id: number) {
        const updated = watchlist.filter((item) => item.id !== id)
        setWatchlist(updated)
        localStorage.setItem(storageKey, JSON.stringify(updated))
    }

    function isInWatchlist(id: number) {
        return watchlist.some((item) => item.id === id)
    }

    return { watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }
} 