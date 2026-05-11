import { tmdbFetch } from "./client"
import { Movie, MovieDetails, Credits, TvShow, PaginatedResponse, TvShowDetails } from "./types"

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

export function getMovieDetails(id: string): Promise<MovieDetails> {
    return tmdbFetch(`/movie/${id}`)
}

export function getMovieCredits(id: string): Promise<Credits> {
    return tmdbFetch(`/movie/${id}/credits`)
}

export function getTvDetails(id: string): Promise<TvShowDetails> {
    return tmdbFetch(`/tv/${id}`)
}

export function getTvCredits(id: string): Promise<Credits> {
    return tmdbFetch(`/tv/${id}/credits`)
}   