"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { searchMovies, searchTvShows } from "@/lib/api/tmdb"
import MovieCard from "@/components/movie-card"
import { Search } from "lucide-react"

export default function SearchPage() {
    const [query, setQuery] = useState("")
    const {
        data: movieData,
        isLoading: movieLoading,
        isError: movieError,
    } = useQuery({
        queryKey: ["search-movies", query],
        queryFn: () => searchMovies(query),
        enabled: query.length > 0,
    })
    const {
        data: tvData,
        isLoading: tvLoading,
        isError: tvError,
    } = useQuery({
        queryKey: ["search-tv", query],
        queryFn: () => searchTvShows(query),
        enabled: query.length > 0,
    })

    return (
        <main className="w-full max-w-7xl mx-auto px-5 py-8 space-y-12">
            <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search movies and TV shows..."
                className="w-full rounded-lg bg-neutral-800 px-4 py-3 text-white placeholder-neutral-500
  outline-none focus:ring-2 focus:ring-rose-500"
            />
            {!query && (
                <div className="flex flex-col items-center justify-center py-24 gap-4 text-neutral-500">
                    <Search className="size-12" />
                    <p className="text-lg">Search for movies and TV shows</p>
                </div>
            )}
            {query && (
                <>
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">Movies</h2>
                        {movieLoading ? (
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                                {Array.from({ length: 10 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className="animate-pulse bg-neutral-800 rounded-lg aspect-2/3"
                                    />
                                ))}
                            </div>
                        ) : movieError ? (
                            <p>There was an error fetching the movie.</p>
                        ) : (
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                                {movieData?.results.map((item) => (
                                    <MovieCard key={item.id} item={item} />
                                ))}
                            </div>
                        )}
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">TV Shows</h2>
                        {tvLoading ? (
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                                {Array.from({ length: 10 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className="animate-pulse bg-neutral-800 rounded-lg aspect-2/3"
                                    />
                                ))}
                            </div>
                        ) : tvError ? (
                            <p>There was an error fetching the TV Show.</p>
                        ) : (
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                                {tvData?.results.map((item) => (
                                    <MovieCard key={item.id} item={item} />
                                ))}
                            </div>
                        )}
                    </section>
                </>
            )}
        </main>
    )
}
