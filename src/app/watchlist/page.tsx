"use client"
import MovieCard from "@/components/movie-card"
import { useWatchlist } from "@/hooks/useWatchlist"

export default function WatchlistPage() {
    const { watchlist, removeFromWatchlist } = useWatchlist()
    return (
        <main className="w-full max-w-7xl mx-auto px-5 py-8 space-y-12">
            <section className="space-y-4">
                <h2 className="font-bold text-2xl">Watchlist</h2>
                {watchlist.length === 0 ? (
                    <p className="text-neutral-400">Your watchlist is empty.</p>
                ) : (
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                        {watchlist.map((item) => (
                            <MovieCard
                                key={item.id}
                                item={item}
                                onRemove={() => removeFromWatchlist(item.id)}
                            />
                        ))}
                    </div>
                )}
            </section>
        </main>
    )
}
