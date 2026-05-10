export interface Movie {
    id: number
    title: string
    overview: string
    poster_path: string | null
    backdrop_path: string | null
    release_date: string
    vote_average: number
    genre_ids: number[]
}

export interface TvShow {
    id: number
    name: string
    overview: string
    poster_path: string | null
    backdrop_path: string | null
    first_air_date: string
    vote_average: number
    genre_ids: number[]
}

export interface PaginatedResponse<T> {
    page: number
    results: T[]
    total_pages: number
    total_results: number
}

export interface MovieDetails extends Movie {
    runtime: number
    genres: { id: number; name: string }[]
    tagline: string
}

export interface Cast {
    id: number
    name: string
    character: string
    profile_path: string | null
}

export interface Credits {
    cast: Cast[]
}