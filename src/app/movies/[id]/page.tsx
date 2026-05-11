import { getMovieDetails, getMovieCredits } from "@/lib/api/tmdb"
import Image from "next/image"
import { WatchlistButton } from "@/components/watchlist-button"
import { WatchedButton } from "@/components/watched-button"
type Props = {
    params: Promise<{ id: string }>
}

export default async function MoviePage({ params }: Props) {
    const { id } = await params
    const [movie, credits] = await Promise.all([
        getMovieDetails(id),
        getMovieCredits(id),
    ])

    const backdrop = movie.backdrop_path
        ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
        : null
    const watchlistItem = { ...movie, mediaType: "movie" as const }

    return (
        <main className="w-full">
            {backdrop && (
                <div className="relative w-full h-72 md:h-96">
                    <Image
                        src={backdrop}
                        alt={movie.title}
                        fill
                        className="object-cover"
                        sizes="100vw"
                    />
                    <div
                        className="absolute inset-0 bg-linear-to-t from-neutral-950
  to-transparent"
                    />
                </div>
            )}

            <div className="max-w-7xl mx-auto px-5 py-8 space-y-12">
                <section className="flex gap-8">
                    {movie.poster_path && (
                        <div
                            className="relative w-48 shrink-0 aspect-2/3 rounded-lg
  overflow-hidden"
                        >
                            <Image
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                fill
                                className="object-cover"
                                sizes="192px"
                            />
                        </div>
                    )}
                    <div className="space-y-4">
                        <h1 className="text-3xl font-bold">{movie.title}</h1>
                        {movie.tagline && (
                            <p className="text-neutral-400 italic">
                                {movie.tagline}
                            </p>
                        )}
                        <div className="flex gap-4 text-sm text-neutral-400">
                            <span>⭐ {movie.vote_average.toFixed(1)}</span>
                            <span>
                                {Math.floor(movie.runtime / 60)}h{" "}
                                {movie.runtime % 60}m
                            </span>
                            <span>
                                {new Date(movie.release_date).getFullYear()}
                            </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {movie.genres.map((genre) => (
                                <span
                                    key={genre.id}
                                    className="px-3 py-1 rounded-full
  bg-neutral-800 text-sm"
                                >
                                    {genre.name}
                                </span>
                            ))}
                        </div>
                        <WatchlistButton item={watchlistItem} />
                        <WatchedButton item={watchlistItem} />
                        <p
                            className="text-neutral-300 leading-relaxed
  max-w-2xl"
                        >
                            {movie.overview}
                        </p>
                    </div>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">Cast</h2>
                    <div
                        className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4
  lg:grid-cols-5"
                    >
                        {credits.cast.slice(0, 10).map((cast) => (
                            <div key={cast.id} className="space-y-2">
                                <div
                                    className="relative aspect-2/3 rounded-lg overflow-hidden
  bg-neutral-800"
                                >
                                    {cast.profile_path ? (
                                        <Image
                                            src={`https://image.tmdb.org/t/p/w185${cast.profile_path}`}
                                            alt={cast.name}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 640px) 50vw, 20vw"
                                        />
                                    ) : (
                                        <div
                                            className="flex h-full items-center justify-center
  text-neutral-600 text-xs"
                                        >
                                            No photo
                                        </div>
                                    )}
                                </div>
                                <p className="text-sm font-medium truncate">
                                    {cast.name}
                                </p>
                                <p
                                    className="text-xs text-neutral-400
  truncate"
                                >
                                    {cast.character}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    )
}
