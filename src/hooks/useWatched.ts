import { useState, useEffect, startTransition } from "react";
import { useAuth } from "@clerk/nextjs";
import type { WatchlistItem } from "./useWatchlist";

export type WatchedItem = WatchlistItem & { rating: number }

export function useWatched() {
    const [watched, setWatched] = useState<WatchedItem[]>([])
    const { userId } = useAuth()
    const storageKey = `watched-${userId}`
    useEffect(() => {
        if (!userId) return
        const stored = JSON.parse(localStorage.getItem(storageKey) ?? "[]")
        startTransition(() => {
            setWatched(stored)
        })
    }, [storageKey, userId])

    function addToWatched(item: WatchlistItem, rating: number) {
        const watchedItem = { ...item, rating }
        const updated = [
            ...watched.filter((w) => w.id !== item.id),
            watchedItem
        ]
        setWatched(updated)
        localStorage.setItem(storageKey, JSON.stringify(updated))
    }

    function removeFromWatched(id: number) {
        const updated = watched.filter((item) => item.id !== id)
        setWatched(updated)
        localStorage.setItem(storageKey, JSON.stringify(updated))
    }

    function isWatched(id: number) {
        return watched.some((item) => item.id === id)
    }

    function getRating(id: number) {
        return watched.find((item) => item.id === id)?.rating
    }

    return { watched, addToWatched, removeFromWatched, isWatched, getRating }
} 