"use client"
import { WatchlistItem, useWatchlist } from "@/hooks/useWatchlist"
import { Button } from "@/components/ui/button"
type Props = {
    item: WatchlistItem
}

export function WatchlistButton({ item }: Props) {
    const { isInWatchlist, addToWatchlist, removeFromWatchlist } =
        useWatchlist()
    const inList = isInWatchlist(item.id)

    return (
        <Button
            variant={inList ? "secondary" : "default"}
            onClick={() =>
                inList ? removeFromWatchlist(item.id) : addToWatchlist(item)
            }
        >
            {inList ? "Remove from Watchlist" : "Add to Watchlist"}
        </Button>
    )
}
