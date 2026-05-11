"use client"
import { useState } from "react"
import { useWatched } from "@/hooks/useWatched"
import { WatchlistItem } from "@/hooks/useWatchlist"
import { Button } from "@/components/ui/button"
type Props = {
    item: WatchlistItem
}

export function WatchedButton({ item }: Props) {
    const { isWatched, addToWatched, removeFromWatched, getRating } =
        useWatched()
    const [showInput, setShowInput] = useState(false)
    const [rating, setRating] = useState(getRating(item.id) ?? 5)

    const watched = isWatched(item.id)

    if (showInput) {
        return (
            <div className="flex items-center gap-2">
                <input
                    type="number"
                    min={1}
                    max={10}
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-16 rounded bg-neutral-800 px-2 py-1 text-center text-white"
                />
                <Button
                    onClick={() => {
                        addToWatched(item, rating)
                        setShowInput(false)
                    }}
                >
                    Confirm
                </Button>
                <Button variant="ghost" onClick={() => setShowInput(false)}>
                    Cancel
                </Button>
            </div>
        )
    }
    return (
        <div className="flex items-center gap-2">
            <Button
                variant={watched ? "secondary" : "default"}
                onClick={() => setShowInput(true)}
            >
                {watched
                    ? `Watched ★ ${getRating(item.id)}`
                    : "Mark as Watched"}
            </Button>
            {watched && (
                <Button
                    variant="ghost"
                    onClick={() => removeFromWatched(item.id)}
                >
                    Remove
                </Button>
            )}
        </div>
    )
}
