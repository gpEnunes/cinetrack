import { renderHook, act } from "@testing-library/react"
import { describe, it, expect, beforeEach, vi } from "vitest"
import { useWatched } from "@/hooks/useWatched"
import { WatchlistItem } from "@/hooks/useWatchlist"

vi.mock("@clerk/nextjs", () => ({
    useAuth: () => ({ userId: "test-user" }),
}))

const mockItem: WatchlistItem = {
    id: 1,
    title: "Test Movie",
    overview: "",
    poster_path: null,
    backdrop_path: null,
    release_date: "2024-01-01",
    vote_average: 8.0,
    genre_ids: [],
    mediaType: "movie",
}

describe("useWatched", () => {
    beforeEach(() => {
        localStorage.clear()
    })

    it("starts with an empty watched list", () => {
        const { result } = renderHook(() => useWatched())
        expect(result.current.watched).toHaveLength(0)
    })

    it("adds an item with a rating", () => {
        const { result } = renderHook(() => useWatched())
        act(() => { result.current.addToWatched(mockItem, 9) })
        expect(result.current.watched).toHaveLength(1)
        expect(result.current.watched[0].rating).toBe(9)
    })

    it("updates rating when adding the same item again", () => {
        const { result } = renderHook(() => useWatched())
        act(() => { result.current.addToWatched(mockItem, 7) })
        act(() => { result.current.addToWatched(mockItem, 9) })
        expect(result.current.watched).toHaveLength(1)
        expect(result.current.watched[0].rating).toBe(9)
    })

    it("removes an item", () => {
        const { result } = renderHook(() => useWatched())
        act(() => { result.current.addToWatched(mockItem, 8) })
        act(() => { result.current.removeFromWatched(1) })
        expect(result.current.watched).toHaveLength(0)
    })

    it("correctly identifies watched items", () => {
        const { result } = renderHook(() => useWatched())
        expect(result.current.isWatched(1)).toBe(false)
        act(() => { result.current.addToWatched(mockItem, 8) })
        expect(result.current.isWatched(1)).toBe(true)
    })

    it("retrieves the correct rating for a watched item", () => {
        const { result } = renderHook(() => useWatched())
        act(() => { result.current.addToWatched(mockItem, 8) })
        expect(result.current.getRating(1)).toBe(8)
    })
})
