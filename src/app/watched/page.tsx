"use client"
import MovieCard from "@/components/movie-card"
import { useWatched } from "@/hooks/useWatched"

export default function WatchedPage() {
    const { watched, removeFromWatched } = useWatched()
    return (
        <main className="w-full max-w-7xl mx-auto px-5 py-8 space-y-12">
            <section className="space-y-4">
                <h2 className="font-bold text-2xl">Watched</h2>
                {watched.length === 0 ? (
                    <p className="text-neutral-400">
                        No movies/tv shows marked as watched.
                    </p>
                ) : (
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                        {watched.map((item) => (
                            <div key={item.id} className="space-y-1">
                                <MovieCard
                                    item={item}
                                    onRemove={() => removeFromWatched(item.id)}
                                />
                                <p className="text-center text-sm text-yellow-400">
                                    ★ {item.rating}/10
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </main>
    )
}
