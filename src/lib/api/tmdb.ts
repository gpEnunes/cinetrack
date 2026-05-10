import { tmdbFetch } from "./client"
import { Movie, TvShow, PaginatedResponse } from "./types"

export function getTrending(): Promise<PaginatedResponse<Movie>> {
    return tmdbFetch("/trending/movie/day")
}

export function getPopularTvShows(): Promise<PaginatedResponse<TvShow>> {
    return tmdbFetch("/tv/popular")
}

export function searchMovies(query: string): Promise<PaginatedResponse<Movie>> {
    return tmdbFetch(`/search/movie?query=${encodeURIComponent(query)}`)
}

export function searchTvShows(
    query: string
): Promise<PaginatedResponse<TvShow>> {
    return tmdbFetch(`/search/tv?query=${encodeURIComponent(query)}`)
}
