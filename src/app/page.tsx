import PopularTvShows from "@/components/home/popular-tv-section"
import TrendingSection from "@/components/home/trending-section"

export default function Home() {
    return (
        <main className="w-full max-w-7xl mx-auto px-5 py-8 space-y-12">
            <section className="space-y-4">
                <h2 className="font-bold text-2xl">Trending</h2>
                <TrendingSection />
            </section>
            <section className="space-y-4">
                <h2 className="font-bold text-2xl">Popular TV Shows</h2>
                <PopularTvShows />
            </section>
        </main>
    )
}
