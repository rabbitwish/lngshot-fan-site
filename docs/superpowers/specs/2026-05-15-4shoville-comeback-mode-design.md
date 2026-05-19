# 4SHOVILLE Comeback Mode — Design Spec

Temporary site takeover promoting LNGSHOT's new album **4SHOVILLE** (4SHOBOIZ VOL. 2) with Jay Park. Controlled by a single flag for easy revert after the comeback period.

## 1. Comeback Mode Flag

A date-driven constant at the top of `App.jsx`:

```js
const COMEBACK_MODE = new Date() < new Date("2026-06-18T23:59:59");
```

Controls: banner visibility, theme color shift. Auto-expires June 18, 2026 (one month after album drop). The album entry in discography is permanent regardless of this flag.

## 2. Hero Image Banner

- Position: top of page, above header, in the same slot as the Woojin birthday banner
- Shows only when `COMEBACK_MODE === true`
- Uses the actual album cover image (`/4shoville-banner.jpg` copied from `weverse_2-303095326.jpeg`)
- Full-width with rounded bottom corners (16px)
- Dark gradient overlay (bottom-heavy) for text legibility
- Overlay content:
  - "OUT NOW · JAY PARK & LNGSHOT" label (small, red, letter-spaced)
  - "4SHOVILLE" title (large, bold, #CC0000, serif/gothic feel)
  - "4SHOBOIZ VOL. 2 · 8 TRACKS" subtitle
  - "LISTEN NOW" button (#CC0000 background, links to `http://ffm.to/4shoville`)
  - "ORDER" button (outline, links to Weverse notice)

## 3. Theme Color Shift

When `COMEBACK_MODE === true`:

| Element | Normal | Comeback |
|---|---|---|
| Body/main background | `#1a1a2e` navy | `#0a0a0a` pure black |
| Main gradient | `linear-gradient(160deg, #1a1a2e, #16213e, #0f3460)` | `linear-gradient(160deg, #0a0a0a, #1a0a0a, #0d0d0d)` |
| Header "LNGSHOT" gradient | Rainbow (`#FF6B35, #E74C3C, #9B59B6, #3498DB`) | Red (`#ff1a1a, #cc0000, #8B0000`) |
| Selection highlight | `#FF6B3566` | `#cc000066` |
| Header subtitle "MUSIC & VIBES" | `rgba(255,255,255,0.35)` | `rgba(255,60,60,0.35)` |
| Accent bar below header | `linear-gradient(90deg, #FF6B35, #9B59B6)` | `linear-gradient(90deg, #cc0000, #8B0000)` |
| Floating notes color | Current pink tones | Red tones |

Album-specific colors (per-album `color` field in ALBUMS) remain unchanged — only the global site chrome shifts.

## 4. Album in Discography

Add **4SHOVILLE** as the first entry in the `ALBUMS` array:

- `id`: `"4shoville"`
- `title`: `"4SHOVILLE"`
- `type`: `"Album"`
- `date`: `"2026.05.18"`
- `spotifyAlbumId`: `"2fttug0AvQ63gdpXgMpJsS"`
- `color`: `"#CC0000"`
- `desc`: Fan-style description referencing Jay Park collab and the gritty vibe
- `fanNote`: Excited fan commentary

### Tracks

| # | Title | Credits | Vibe | Featuring | Spotify ID |
|---|---|---|---|---|---|
| 1 | 4SHO 4SHO | Jay Park, LNGSHOT | hype · anthem | Ohyul, Ryul, Woojin, Louis | `3GK3htTIyOEq8gz3sPj6L0` |
| 2 | YEAH! YEAH! | Jay Park, LNGSHOT | energetic · party | Ohyul, Ryul, Woojin, Louis | `7vmq3Ukd8csLDpCvoOM9Do` |
| 3 | NO HI, NO HEY | Jay Park, LNGSHOT | bold · confident | Ohyul, Ryul, Woojin, Louis | `2RRxEwOgyeyiGyXuFMunSs` |
| 4 | RUN IT UP | Jay Park, LNGSHOT | hard · motivational | Ohyul, Ryul, Woojin, Louis | `0YzpDSBP2htDtGqv8NBO41` |
| 5 | GUKBBONG | Jay Park, LNGSHOT | patriotic · powerful | Ohyul, Ryul, Woojin, Louis | `0pL85aHxxulv9XtoB0S68m` |
| 6 | MOYA | Jay Park, LNGSHOT | romantic · confused | Ohyul, Ryul, Woojin, Louis | `1ACzcLe7HPprJQng3lu6qQ` |
| 7 | THE PURGE 4SHOMIX | Jay Park, LNGSHOT | dark · intense | Ohyul, Ryul, Woojin, Louis | `4oqHHJgfjye9n4ZIJhf8lo` |
| 8 | PUBLIC ENEMY 4SHOMIX | Jay Park, LNGSHOT, DJ Wegun | heavy · bass | Ohyul, Ryul, Woojin, Louis, DJ Wegun | `3XDcumdbMgD411MNqqS77F` |

- Spotify album ID: `2PmrRGuWioIjWlJGvftkRl`
- All track Spotify IDs populated (album released May 18, 2026)
- Fan notes and fun facts written in the same casual excited tone as existing albums
- Mood emojis per track

## 5. Implementation Notes

- Copy album art image to `public/4shoville-banner.jpg`
- All comeback-mode changes are conditional on `COMEBACK_MODE` constant
- No new files needed — all changes in `App.jsx` plus one image in `public/`
- Revert process: set `COMEBACK_MODE = false`, optionally delete the banner image

## 6. Status

**Implemented and deployed** (2026-05-15, updated 2026-05-19). All features live at https://4shoboiz.work/. Post-release updates:
- Album released May 18 — all Spotify track IDs and album ID populated
- Banner updated from PRE-SAVE/PRE-ORDER to LISTEN NOW/ORDER
- COMEBACK_MODE changed from manual toggle to date-based auto-expiry (June 18, 2026)
- All tracks credited with member featuring (Ohyul, Ryul, Woojin, Louis)
- MOYA vibe corrected: romantic/confused love song, not aggressive
