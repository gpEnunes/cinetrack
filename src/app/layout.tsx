import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Providers from "@/components/providers"
import Navbar from "@/components/navbar"

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
})

export const metadata: Metadata = {
    title: "Cinetrack",
    description: "Your movie and TV show library",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" className={`${inter.variable} h-full antialiased`}>
            <body className="min-h-full flex flex-col bg-neutral-950 text-white font-sans pt-16">
                <Providers>
                    <Navbar />
                    {children}
                </Providers>
            </body>
        </html>
    )
}
