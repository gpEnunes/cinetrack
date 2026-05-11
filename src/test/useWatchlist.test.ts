import { renderHook, act } from "@testing-library/react"
import { describe, it, expect, beforeEach, vi } from "vitest"
import { useWatchlist, WatchlistItem } from "@/hooks/useWatchlist"

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

describe("useWatchlist", () => {
    beforeEach(() => {
        localStorage.clear()
    })

    it("starts with an empty watchlist", () => {
        const { result } = renderHook(() => useWatchlist())
        expect(result.current.watchlist).toHaveLength(0)
    })

    it("adds an item to the watchlist", () => {
        const { result } = renderHook(() => useWatchlist())
        act(() => { result.current.addToWatchlist(mockItem) })
        expect(result.current.watchlist).toHaveLength(1)
        expect(result.current.watchlist[0].id).toBe(1)
    })

    it("removes an item from the watchlist", () => {
        const { result } = renderHook(() => useWatchlist())
        act(() => { result.current.addToWatchlist(mockItem) })
        act(() => { result.current.removeFromWatchlist(1) })
        expect(result.current.watchlist).toHaveLength(0)
    })

    it("correctly identifies items in the watchlist", () => {
        const { result } = renderHook(() => useWatchlist())
        expect(result.current.isInWatchlist(1)).toBe(false)
        act(() => { result.current.addToWatchlist(mockItem) })
        expect(result.current.isInWatchlist(1)).toBe(true)
    })

    it("persists items to localStorage", () => {
        const { result } = renderHook(() => useWatchlist())
        act(() => { result.current.addToWatchlist(mockItem) })
        const stored = JSON.parse(localStorage.getItem("watchlist-test-user") ?? "[]")
        expect(stored).toHaveLength(1)
    })
})
