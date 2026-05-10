const BASE_URL = "https://api.themoviedb.org/3"

export async function tmdbFetch<T>(endpoint: string): Promise<T> {
    const key = process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
            Authorization: "Bearer " + key,
            "Content-Type": "application/json",
        },
    })

    if (!response.ok) {
        throw new Error(`TMDB error: ${response.status}`)
    }

    return response.json() as Promise<T>
}
