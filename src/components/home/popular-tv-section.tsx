"use client"

import { useQuery } from "@tanstack/react-query"
import { getPopularTvShows } from "@/lib/api/tmdb"
import MovieCard from "@/components/movie-card"

export default function PopularTvShows() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["popular-tv"],
        queryFn: getPopularTvShows,
    })
    if (isLoading) {
        return (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {Array.from({ length: 10 }).map((_, i) => (
                    <div
                        key={i}
                        className="animate-pulse bg-neutral-800 rounded-lg aspect-2/3"
                    />
                ))}
            </div>
        )
    }
    if (isError) {
        return <p className="text-red-400">Failed to load popular tv shows.</p>
    }
    return (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {data?.results.map((item) => (
                <MovieCard key={item.id} item={item} />
            ))}
        </div>
    )
}
