import { render, screen } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import MovieCard from "@/components/movie-card"
import { Movie, TvShow } from "@/lib/api/types"

vi.mock("next/image", () => ({
    default: ({ alt }: { alt: string }) => <img alt={alt} />,
}))

vi.mock("next/link", () => ({
    default: ({ href, children }: { href: string; children: React.ReactNode }) => (
        <a href={href}>{children}</a>
    ),
}))

const mockMovie: Movie = {
    id: 1,
    title: "Test Movie",
    overview: "A test movie",
    poster_path: null,
    backdrop_path: null,
    release_date: "2024-06-15",
    vote_average: 8.5,
    genre_ids: [],
}

const mockTvShow: TvShow = {
    id: 2,
    name: "Test Show",
    overview: "A test show",
    poster_path: null,
    backdrop_path: null,
    first_air_date: "2023-03-20",
    vote_average: 7.2,
    genre_ids: [],
}

describe("MovieCard", () => {
    it("renders movie title and year", () => {
        render(<MovieCard item={mockMovie} />)
        expect(screen.getByText("Test Movie")).toBeInTheDocument()
        expect(screen.getByText("2024")).toBeInTheDocument()
    })

    it("renders movie rating", () => {
        render(<MovieCard item={mockMovie} />)
        expect(screen.getByText("8.5")).toBeInTheDocument()
    })

    it("renders TV show name and year", () => {
        render(<MovieCard item={mockTvShow} />)
        expect(screen.getByText("Test Show")).toBeInTheDocument()
        expect(screen.getByText("2023")).toBeInTheDocument()
    })

    it("links to /movies/[id] for movies", () => {
        render(<MovieCard item={mockMovie} />)
        expect(screen.getByRole("link")).toHaveAttribute("href", "/movies/1")
    })

    it("links to /tv/[id] for TV shows", () => {
        render(<MovieCard item={mockTvShow} />)
        expect(screen.getByRole("link")).toHaveAttribute("href", "/tv/2")
    })

    it("shows No Image fallback when poster_path is null", () => {
        render(<MovieCard item={mockMovie} />)
        expect(screen.getByText("No Image")).toBeInTheDocument()
    })
})
