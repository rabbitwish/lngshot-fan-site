# Feature: Member Favorite Songs & Spotify Playlists

## What
Each member gets a "Songs I Love" / playlist section on their profile card or detail page, showing their favorite songs, recommended tracks, and musical influences — embedded as Spotify players or links. Fans can discover the music that inspires LNGSHOT.

## Placement
Inside each member's section (currently the "THE BOYS" grid). Clicking a member card could expand or navigate to a detail view that includes their playlist alongside their existing info.

---

## Research: Members' Favorite Songs & Music Taste

Data collected from kprofiles, kpopsingers, Wikipedia, Billboard interviews, allkpop, and fan sources (as of March 2026).

### OHYUL (Leader · Lead Vocal)
| Song | Artist | Spotify ID | Notes |
|------|--------|------------|-------|
| Neo Surf | Gener8ion & 070 Shake | `3Kkucw94v1e6yYKIRtnQMN` | Listed as favorite on kprofiles |
| Guilty Conscience | 070 Shake | `1wMeFMxPOr2vJo8FUJy5ow` | Listed as favorite on kprofiles |
| Boyfriend | Justin Bieber | `1qDrWA6lyx8cLECdZE7TV7` | Covered this with Ryul — went viral on TikTok (334K+ likes) |

**Music taste**: 070 Shake fan, appreciates alternative R&B/hip-hop with experimental edges. Also influenced by Justin Bieber's early work. Former KOZ trainee, plays guitar, can beatbox.

**Additional context**: Co-wrote Jay Park's "Remedy" with Louis.

---

### RYUL (Main Rapper)
| Song | Artist | Spotify ID | Notes |
|------|--------|------------|-------|
| Ghost | Jack Harlow | `6I3mqTwhRpn34SLVafSH7G` | Listed as favorite on multiple profile sites |

**Music taste**: Hip-hop focused, appeared on RAP:PUBLIC survival show. Jay Park noted he was "already a strong rapper at a young age" and advised him to "study timeless and classic styles." Likely influenced by American hip-hop artists. From Busan.

**TODO**: More songs needed! Check Weverse posts, V-lives, or future interviews for additional recommendations.

---

### WOOJIN (Dancer · Composer)
| Song | Artist | Spotify ID | Notes |
|------|--------|------------|-------|
| Show Me Love (feat. Tory Lanez) | Ty Dolla $ign | `7w5RTF0vnOi4xZ5oo724id` | Listed as favorite on kprofiles |
| Neo Surf | Gener8ion & 070 Shake | `3Kkucw94v1e6yYKIRtnQMN` | Listed as favorite on kprofiles |

**Music taste**: Deep appreciation for R&B and hip-hop. Former BigHit trainee with 6 years of training. His daily routine includes "searching for new songs." Enjoys watching animations. Attends Hanlim Arts High School majoring in Practical Dance. Appeared in Jay Park's "Gimme A Minute" MV.

**Note**: Woojin's admiration for Tory Lanez as a musical role model (Harper's Bazaar interview) caused some controversy. For the fan site, we may want to focus on the songs themselves rather than the artist controversy.

---

### LOUIS (Main Vocal · Maknae)
| Song | Artist | Spotify ID | Notes |
|------|--------|------------|-------|
| Feels Like Summer | Childish Gambino | `7DfFc7a3mCRbEZkwVSmCsR` | Mentioned as a song he really enjoys |
| Love | Keyshia Cole | `1Ib6HkndasBLnFCpQDuaKi` | Chose this for his MORE VISION audition |

**Music taste**: Huge Justin Bieber fan (wears his SKYLRK merch daily, nicknamed "Baby Justin Bieber" for his vocal similarity). French-Korean, speaks 4 languages (Korean, French, English, some Spanish). Featured on JD McCrary's "Lullaby Remix" with Jay Park. Co-wrote Jay Park's "Remedy" with Ohyul. Only 15 years old but already composing and arranging.

**TODO**: More songs needed! Check Weverse posts for additional favorites.

---

## Plan

### 1. Data Structure
Add a `favoriteSongs` array to each member in the `MEMBERS` constant:

```js
const MEMBERS = [
  {
    name: "OHYUL",
    role: "Leader · Lead Vocal",
    color: "#FF6B35",
    emoji: "🎤",
    note: "our leader!! his voice is so warm",
    favoriteSongs: [
      {
        title: "Neo Surf",
        artist: "Gener8ion & 070 Shake",
        spotifyId: "3Kkucw94v1e6yYKIRtnQMN",
        note: "listed as his fav — the experimental vibes match his style so well",
        vibe: "experimental · dreamy",
      },
      {
        title: "Guilty Conscience",
        artist: "070 Shake",
        spotifyId: "1wMeFMxPOr2vJo8FUJy5ow",
        note: "another 070 Shake pick! ohyul has taste fr",
        vibe: "dark · introspective",
      },
      {
        title: "Boyfriend",
        artist: "Justin Bieber",
        spotifyId: "1qDrWA6lyx8cLECdZE7TV7",
        note: "he covered this with ryul and it went VIRAL on tiktok!!",
        vibe: "pop · smooth",
      },
    ],
    // Optional: a curated Spotify playlist ID if we create one
    spotifyPlaylistId: null,
  },
  // ... same structure for RYUL, WOOJIN, LOUIS
];
```

### 2. UI Component — `MemberPlaylist`
For each member's detail/expanded view:
- Section header: "🎧 [MEMBER]'S PLAYLIST" (matching site style)
- List of songs as Spotify mini-cards (reuse existing `SpotifyTrackCard` style)
- Each card shows:
  - Song title + artist
  - A short fan note about why they like it or context
  - "vibe" tag
  - Click to open in Spotify
- Optional: Embed a full Spotify playlist widget if we create actual playlists

### 3. Member Detail View (New)
Currently clicking a member card triggers a search filter. Instead:
- **Option A**: Expand the member card inline to show playlist + extra info
- **Option B**: Navigate to a full member detail page (like SongDetail) with:
  - Member photo/avatar area
  - Bio + role
  - "Songs I Love" playlist section
  - Their LNGSHOT song contributions (filter from existing data)
  - Fun facts specific to that member
  - Social media links

**Recommended: Option B** — gives more room and follows the same pattern as the existing SongDetail view.

### 4. Spotify Playlist Creation
For each member, create an actual Spotify playlist that fans can follow:
- `OHYUL's Picks — songs that inspire our leader`
- `RYUL's Picks — flow king's favorites`
- `WOOJIN's Picks — the all-rounder's playlist`
- `LOUIS's Picks — maknae's vibes`

**Note**: These would need to be created manually on a Spotify account and linked. Alternatively, just link individual tracks.

### 5. Spotify Embed Options
Two approaches for displaying:

**A. Individual Track Links** (current approach, simpler)
- Use existing `SpotifyTrackCard` component
- Each song links to Spotify

**B. Embedded Spotify Playlist** (richer experience)
```html
<iframe
  src="https://open.spotify.com/embed/playlist/{PLAYLIST_ID}"
  width="100%"
  height="380"
  frameBorder="0"
  allow="encrypted-media"
/>
```
- Shows album art, play buttons, full playlist
- Requires creating actual Spotify playlists first

**Recommended: Start with A, add B later when playlists are created.**

### 6. Visual Design Notes
- Keep the same dark theme with member accent colors
- Song cards should have a subtle "headphones" or music note icon
- Add a small "why they love it" fan note under each song
- Include a "know more songs they like? tell us!" call-to-action for fans
- Mobile-friendly: stack cards vertically

### 7. Data Collection — Ongoing
This feature will grow over time as members share more recommendations:
- Monitor Weverse posts where members share music
- Check V-live/YouTube live streams for song mentions
- Watch interviews for music taste questions
- Fan-sourced: add a way for fans to submit verified recommendations

---

## Spotify Track IDs Reference
(Verify these before implementation — search on Spotify to confirm)

| Song | Artist | Spotify ID |
|------|--------|------------|
| Neo Surf | Gener8ion & 070 Shake | `3Kkucw94v1e6yYKIRtnQMN` |
| Guilty Conscience | 070 Shake | `1wMeFMxPOr2vJo8FUJy5ow` |
| Boyfriend | Justin Bieber | `1qDrWA6lyx8cLECdZE7TV7` |
| Ghost | Jack Harlow | `6I3mqTwhRpn34SLVafSH7G` |
| Show Me Love (ft. Tory Lanez) | Ty Dolla $ign | `7w5RTF0vnOi4xZ5oo724id` |
| Feels Like Summer | Childish Gambino | `7DfFc7a3mCRbEZkwVSmCsR` |
| Love | Keyshia Cole | `1Ib6HkndasBLnFCpQDuaKi` |

---

## Priority: Medium-High
## Status: Planned — research done, not yet implemented
## Created: 2026-03-02

## Sources
- [Kpop Profiles — LNGSHOT Members Profile](https://kprofiles.com/more-vision-boys-members-profile/)
- [Kpopsingers — LNGSHOT Members Profile](https://kpopsingers.com/lngshot-members-group-profile/)
- [Wikipedia — LNGSHOT](https://en.wikipedia.org/wiki/Lngshot)
- [Billboard — LNGSHOT Rookie of the Month](https://www.billboard.com/photos/lngshot-k-pop-rookie-month-february-photos-1236171581/)
- [allkpop — Who Is LNGSHOT?](https://www.allkpop.com/article/2026/01/who-is-lngshot-meet-the-rookie-boy-group-behind-the-track-moonwalkin)
- [LNGSHOT on Spotify](https://open.spotify.com/artist/2F4oTJOWkcD1JaTeKEa9h6)
