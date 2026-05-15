# LNGSHOT — Music & Vibes 🎵

A fan-made music hub for LNGSHOT (롱샷) — Ohyul, Ryul, Woojin & Louis.

Built with React + Vite. Deployed on Vercel.

## Features

- **Member Profiles** — Photocard collection with chibi art, favorite songs & playlists
- **Discography** — Full discography with Spotify embeds (4SHOVILLE, Training Day, SHOT CALLERS, 4SHOBOIZ MIXTAPE). Smart prerelease handling: unreleased albums show a pre-save link instead of a broken embed.
- **Comeback Mode** — Temporary 4SHOVILLE promotional takeover with hero banner and dark red theme (toggle `COMEBACK_MODE` in App.jsx)
- **Hot Content** — Most viewed LNGSHOT videos fetched dynamically from YouTube API
- **Live Corner** — Floating live performance playlist widget
- **Did You Know?** — Rotating fun facts about the group and members
- **Next Event** — Countdown timer to the next LNGSHOT event (fetched from Google Calendar via `/api/schedule`, with hardcoded fallback)
- **Upcoming Schedule** — Full event list with dates, venues, ticket links & days-until counters (auto-filters past events). Data sourced from a community-maintained Google Calendar (`lngshotsched4sho@gmail.com`)
- **Latest Buzz** — Latest content from official YouTube channels

## Dev

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## API Endpoints

- `/api/youtube` — Fetches latest LNGSHOT content from official channels
- `/api/youtube-hot` — Fetches most viewed LNGSHOT videos sorted by view count (filtered to LNGSHOT content only)
- `/api/schedule` — Fetches upcoming events from a community Google Calendar (cached 1 hour)

Requires `YOUTUBE_API_KEY` environment variable on Vercel. Schedule endpoint uses `GOOGLE_API_KEY` (or falls back to `YOUTUBE_API_KEY`). The Google Calendar must be set to public.

---

*This is a fan-made page by a proud SHOTTIE, not affiliated with MORE VISION or LNGSHOT.*
*All music streamed via Spotify.*
