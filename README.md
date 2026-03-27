# LNGSHOT — Music & Vibes 🎵

A fan-made music hub for LNGSHOT (롱샷) — Ohyul, Ryul, Woojin & Louis.

Built with React + Vite. Deployed on Vercel.

## Features

- **Member Profiles** — Photocard collection with chibi art, favorite songs & playlists
- **Discography** — Full discography with Spotify embeds (Training Day, SHOT CALLERS, 4SHOBOIZ MIXTAPE)
- **Hot Content** — Most viewed LNGSHOT videos fetched dynamically from YouTube API
- **Live Corner** — Floating live performance playlist widget
- **Did You Know?** — Rotating fun facts about the group and members
- **Next Event** — Upcoming schedule with Google Calendar integration
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
- `/api/youtube-hot` — Fetches most viewed LNGSHOT videos sorted by view count

Requires `YOUTUBE_API_KEY` environment variable on Vercel.

---

*This is a fan-made page, not affiliated with MORE VISION or LNGSHOT.*
*All music streamed via Spotify.*
