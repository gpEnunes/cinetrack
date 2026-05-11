# Cinetrack

A movie and TV show tracking app built with Next.js 16. Browse trending content, search titles, save items to your watchlist, and mark what you've watched with a personal rating.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?logo=tailwindcss)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-v5-ff4154?logo=reactquery)
![Clerk](https://img.shields.io/badge/Auth-Clerk-6c47ff)

---

## Features

- **Home** — Trending movies and popular TV shows pulled from TMDB
- **Search** — Live search across movies and TV shows simultaneously
- **Movie detail** — Backdrop, poster, overview, cast, rating, runtime, genres
- **TV detail** — Same layout with season and episode counts
- **Watchlist** — Save titles to watch later (requires sign-in)
- **Watched** — Mark titles as watched and assign a personal 1–10 rating (requires sign-in)
- **Profile** — Avatar, display name, email, and watchlist/watched counts
- **Auth** — Sign in / sign up via Clerk with protected routes

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 (strict) |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Server state | TanStack Query v5 |
| Auth | Clerk v7 |
| Data | TMDB API |
| Icons | Lucide React |
| Testing | Vitest + React Testing Library |

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx                        # Home — trending + popular TV
│   ├── search/page.tsx                 # Search movies and TV
│   ├── movies/[id]/page.tsx            # Movie detail (Server Component)
│   ├── tv/[id]/page.tsx                # TV detail (Server Component)
│   ├── watchlist/page.tsx              # Saved watchlist (Client Component)
│   ├── watched/page.tsx                # Watched items with ratings
│   ├── profile/page.tsx                # User profile and stats
│   ├── sign-in/[[...sign-in]]/page.tsx # Clerk sign-in (catch-all)
│   ├── sign-up/[[...sign-up]]/page.tsx # Clerk sign-up (catch-all)
│   ├── layout.tsx                      # Root layout with providers
│   └── globals.css                     # Global styles
├── components/
│   ├── home/
│   │   ├── trending-section.tsx        # Trending movies grid
│   │   └── popular-tv-section.tsx      # Popular TV grid
│   ├── ui/
│   │   └── button.tsx                  # shadcn Button
│   ├── movie-card.tsx                  # Reusable card (movies + TV)
│   ├── watchlist-button.tsx            # Add/remove from watchlist
│   ├── watched-button.tsx              # Mark as watched with rating input
│   ├── navbar.tsx                      # Responsive navigation with auth
│   ├── logo.tsx                        # SVG logo
│   └── providers.tsx                   # TanStack Query + Clerk providers
├── hooks/
│   ├── useWatchlist.ts                 # Watchlist state + localStorage
│   └── useWatched.ts                   # Watched state + localStorage
├── lib/
│   └── api/
│       ├── client.ts                   # TMDB fetch wrapper (Bearer auth)
│       ├── tmdb.ts                     # All TMDB API functions
│       └── types.ts                    # TypeScript interfaces for TMDB data
├── middleware.ts                       # Clerk route protection
└── test/
    ├── setup.ts                        # Vitest setup (@testing-library/jest-dom)
    ├── movie-card.test.tsx             # MovieCard unit tests
    ├── useWatchlist.test.ts            # useWatchlist hook tests
    └── useWatched.test.ts              # useWatched hook tests
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- A [TMDB](https://www.themoviedb.org/settings/api) account (free) — you need the **Read Access Token** (JWT), not the API key
- A [Clerk](https://clerk.com) application (free tier is sufficient)

### Installation

```bash
git clone https://github.com/gpEnunes/cinetrack.git
cd cinetrack
npm install
```

### Environment variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_TMDB_ACCESS_TOKEN=your_tmdb_read_access_token
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

> The TMDB token is the long JWT found under **API → Read Access Token**, not the short alphanumeric API key.

### Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |
| `npm run typecheck` | TypeScript type check (no emit) |
| `npm run test` | Vitest in watch mode |
| `npm run test:run` | Vitest single run |

---

## Architecture

### Server vs Client Components

Detail pages (`/movies/[id]`, `/tv/[id]`) are async Server Components — they fetch data directly on the server using `await` and pass it as props. No loading spinners, no client-side fetch.

Interactive pages (`/search`, `/watchlist`, `/watched`, `/profile`) are Client Components because they use `useState`, event handlers, or Clerk's auth hooks.

### Data fetching

All TMDB calls go through `src/lib/api/tmdb.ts`. The `client.ts` wrapper attaches the Bearer token automatically. TanStack Query is used for client-side fetches (search), enabling caching, background refetching, and consistent loading/error states.

### Auth and persistence

Clerk handles authentication. The watchlist and watched list are stored in `localStorage`, keyed by the Clerk `userId` (`watchlist-<userId>`, `watched-<userId>`), so each user's data is isolated. Guest access is not supported — the app redirects unauthenticated users away from protected routes via Clerk middleware.

### Custom hooks

`useWatchlist` and `useWatched` encapsulate all list logic: reading from localStorage on mount, writing on every change, and exposing typed `add`, `remove`, and `isIn` helpers. Components never touch localStorage directly.

---

## Testing

17 tests across three files using Vitest and React Testing Library:

- `movie-card.test.tsx` — renders poster, title, year, rating; shows remove button on hover; fires onRemove callback
- `useWatchlist.test.ts` — add, remove, isInWatchlist, persistence across re-renders
- `useWatched.test.ts` — add with rating, remove, getRating, update rating

```bash
npm run test:run
```

---

## License

MIT
