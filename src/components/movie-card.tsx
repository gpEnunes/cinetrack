import { Movie, TvShow } from "@/lib/api/types"
import Image from "next/image"
import { Star } from "lucide-react"
import Link from "next/link"
type Props = {
    item: Movie | TvShow
}

export default function MovieCard({ item }: Props) {
    const title = "title" in item ? item.title : item.name
    const date =
        "release_date" in item ? item.release_date : item.first_air_date
    const year = date ? new Date(date).getFullYear() : "N/A"
    const posterUrl = item.poster_path
        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
        : null
    const href = "title" in item ? `/movies/${item.id}` : `/tv/${item.id}`
    return (
        <Link href={href}>
            <div
                className="group relative aspect-2/3 overflow-hidden rounded-lg bg-neutral-900
        transition-transform hover:scale-105"
            >
                {posterUrl ? (
                    <Image
                        src={posterUrl}
                        alt={title}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                        className="object-cover"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center bg-neutral-800 text-neutral-600">
                        No Image
                    </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-3">
                    <p className="truncate text-sm font-medium text-white">
                        {title}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-neutral-400">{year}</span>
                        <span className="flex items-center gap-1 text-xs text-yellow-400">
                            <Star className="size-3 fill-yellow-400" />
                            {item.vote_average.toFixed(1)}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    )
}
