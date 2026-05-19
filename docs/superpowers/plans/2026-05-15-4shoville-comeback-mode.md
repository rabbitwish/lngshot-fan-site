# 4SHOVILLE Comeback Mode Implementation Plan

> **Status: COMPLETED** (2026-05-15, updated 2026-05-19). All tasks implemented and deployed to https://4shoboiz.work/. Post-release updates: Spotify IDs populated, banner changed to OUT NOW/LISTEN NOW, COMEBACK_MODE now date-based (auto-expires June 18, 2026), member featuring added to all tracks, MOYA vibe corrected to love song.

**Goal:** Add a temporary "comeback mode" to the LNGSHOT fan site that promotes the 4SHOVILLE album with a hero banner, site-wide dark red theme, and full album in discography — all controlled by a single flag.

**Architecture:** Single-file changes to `src/App.jsx` plus one image asset. A date-driven `COMEBACK_MODE` constant (`new Date() < new Date("2026-06-18T23:59:59")`) gates the banner and theme shift — auto-expires one month after release. The album entry in `ALBUMS` is permanent.

**Tech Stack:** React (Vite), inline styles, no CSS framework

---

### Task 1: Copy Album Art Image

**Files:**
- Create: `public/4shoville-banner.jpg`

- [x] **Step 1: Copy the album art to public/**

```bash
cp /Users/kookkai/Downloads/weverse_2-303095326.jpeg /Users/kookkai/Downloads/project-lng/lngshot-site/public/4shoville-banner.jpg
```

- [x] **Step 2: Verify the image exists**

```bash
ls -la /Users/kookkai/Downloads/project-lng/lngshot-site/public/4shoville-banner.jpg
```

Expected: File exists, non-zero size.

---

### Task 2: Add COMEBACK_MODE Flag and 4SHOVILLE Album Data

**Files:**
- Modify: `src/App.jsx:1-4` (add flag before ALBUMS)
- Modify: `src/App.jsx:4` (prepend new album to ALBUMS array)

- [x] **Step 1: Add the COMEBACK_MODE flag**

Insert at line 3 of `src/App.jsx`, between the import and `const ALBUMS`:

```jsx
const COMEBACK_MODE = true;
```

- [x] **Step 2: Add 4SHOVILLE as the first album in ALBUMS**

Insert the following album object as the first element of the `ALBUMS` array (before `training-day`):

```jsx
  {
    id: "4shoville",
    title: "4SHOVILLE",
    type: "Album",
    date: "2026.05.18",
    spotifyAlbumId: "2fttug0AvQ63gdpXgMpJsS",
    color: "#CC0000",
    desc: "JAY PARK x LNGSHOT full collab album!! 4SHOBOIZ VOL. 2 is here and it's the hardest thing they've ever dropped. 8 tracks of pure hip-hop energy with jay park mentoring AND performing alongside the boys",
    fanNote: "jay park AND lngshot on every single track together?? this is literally what we've been waiting for since debut. the 4shoville era is going to be LEGENDARY i can already feel it. that gothic album art with the tracksuits?? they ATE",
    songs: [
      {
        id: "4sho-4sho",
        title: "4SHO 4SHO",
        duration: "",
        spotifyId: "",
        credits: "Jay Park, LNGSHOT",
        vibe: "hype · anthem",
        fanNote: "THE opener and it goes SO hard. jay park and the boys saying 'for sure for sure' — this is their statement track. instant concert energy",
        mood: "🔥",
        funFact: null,
        featuring: null,
      },
      {
        id: "yeah-yeah",
        title: "YEAH! YEAH!",
        duration: "",
        spotifyId: "",
        credits: "Jay Park, LNGSHOT",
        vibe: "energetic · party",
        fanNote: "pure party energy!! the kind of track that makes you want to jump around. jay park's adlibs are everything",
        mood: "🎉",
        funFact: null,
        featuring: null,
      },
      {
        id: "no-hi-no-hey",
        title: "NO HI, NO HEY",
        duration: "",
        spotifyId: "",
        credits: "Jay Park, LNGSHOT",
        vibe: "bold · confident",
        fanNote: "cold and confident. no greetings no small talk just straight bars. the attitude on this track is UNREAL",
        mood: "🖤",
        funFact: null,
        featuring: null,
      },
      {
        id: "run-it-up",
        title: "RUN IT UP",
        duration: "",
        spotifyId: "",
        credits: "Jay Park, LNGSHOT",
        vibe: "hard · motivational",
        fanNote: "grind anthem!! this one hits different when you're working late. jay park really bringing that boss energy alongside the boys",
        mood: "💪",
        funFact: null,
        featuring: null,
      },
      {
        id: "gukbbong",
        title: "GUKBBONG",
        duration: "",
        spotifyId: "",
        credits: "Jay Park, LNGSHOT",
        vibe: "patriotic · powerful",
        fanNote: "korean pride anthem!! gukbbong (국뽕) literally means national pride and they DELIVERED. this is going to go viral in korea mark my words",
        mood: "🇰🇷",
        funFact: "Gukbbong (국뽕) is Korean slang for intense national pride — Jay Park and LNGSHOT made it into a whole anthem",
        featuring: null,
      },
      {
        id: "moya",
        title: "MOYA",
        duration: "",
        spotifyId: "",
        credits: "Jay Park, LNGSHOT",
        vibe: "aggressive · raw",
        fanNote: "MOYA (뭐야) = 'what?!' and that's literally what i said when this track hit. the most aggressive thing lngshot has ever done. rap line going OFF",
        mood: "😤",
        funFact: null,
        featuring: null,
      },
      {
        id: "the-purge-4shomix",
        title: "THE PURGE 4SHOMIX",
        duration: "",
        spotifyId: "",
        credits: "Jay Park, LNGSHOT",
        vibe: "dark · intense",
        fanNote: "4SHOMIX remix and it's DARK. the production on this is insane — heavy bass, eerie synths, and jay park going absolutely feral",
        mood: "🌑",
        funFact: null,
        featuring: null,
      },
      {
        id: "public-enemy-4shomix",
        title: "PUBLIC ENEMY 4SHOMIX",
        duration: "",
        spotifyId: "",
        credits: "Jay Park, LNGSHOT, DJ Wegun",
        vibe: "heavy · bass",
        fanNote: "DJ WEGUN FEATURE!! the bass on this could literally shake walls. perfect closer — they saved the heaviest track for last and i am FLOORED",
        mood: "💀",
        funFact: "Features DJ Wegun, legendary Korean DJ and H1ghr Music affiliate — his bass production is on another level",
        featuring: "DJ Wegun",
      },
    ],
  },
```

- [x] **Step 3: Add 4SHOVILLE fun facts to FUN_FACTS array**

Append these to the `FUN_FACTS` array (around line 378, before the closing `]`):

```jsx
  "4SHOVILLE (4SHOBOIZ VOL. 2) is Jay Park and LNGSHOT's first full collab album — Jay Park performs on every track",
  "The 4SHOVILLE album art features the group in matching black Adidas tracksuits with red stripes, shot in a warehouse",
  "GUKBBONG (국뽕) means 'national pride' in Korean slang — Jay Park and LNGSHOT turned it into a hip-hop anthem",
  "PUBLIC ENEMY 4SHOMIX features DJ Wegun, legendary Korean DJ affiliated with H1ghr Music",
```

- [x] **Step 4: Verify the site still loads**

```bash
cd /Users/kookkai/Downloads/project-lng/lngshot-site && npx vite --host --port 5173 &
```

Open http://localhost:5173 and verify the new album appears in the discography section. Kill the server after.

- [x] **Step 5: Commit**

```bash
git add src/App.jsx public/4shoville-banner.jpg
git commit -m "feat: add 4SHOVILLE album data and comeback mode flag"
```

---

### Task 3: Add Hero Image Banner Component

**Files:**
- Modify: `src/App.jsx` — add `ComebackBanner` component after `FloatingNotes` (around line 476), and render it in `App` (around line 2203)

- [x] **Step 1: Add ComebackBanner component**

Insert after the `FloatingNotes` component definition (after line 476):

```jsx
function ComebackBanner() {
  if (!COMEBACK_MODE) return null;
  return (
    <div style={{
      width: "100%", maxWidth: 860, margin: "0 auto",
      padding: "18px 16px 0", position: "relative", zIndex: 2,
      animation: "fadeIn 0.8s ease",
    }}>
      <div style={{
        position: "relative", borderRadius: 16, overflow: "hidden",
        boxShadow: "0 4px 30px rgba(200, 0, 0, 0.3)",
      }}>
        <img
          src="/4shoville-banner.jpg"
          alt="4SHOVILLE — Jay Park & LNGSHOT"
          style={{ width: "100%", display: "block", borderRadius: 16 }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0.9) 100%)",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "flex-end",
          padding: "20px 16px 24px", gap: 6,
        }}>
          <div style={{
            fontSize: 11, color: "rgba(255, 0, 0, 0.7)",
            letterSpacing: 3, fontWeight: 700,
            fontFamily: "'Space Grotesk', sans-serif",
            textTransform: "uppercase",
          }}>
            New Album · Jay Park & LNGSHOT
          </div>
          <div style={{
            fontSize: 36, fontWeight: 900, color: "#CC0000",
            letterSpacing: 3, lineHeight: 1,
            fontFamily: "Georgia, 'Times New Roman', serif",
            textShadow: "0 0 30px rgba(200, 0, 0, 0.5)",
            textTransform: "uppercase",
          }}>
            4SHOVILLE
          </div>
          <div style={{
            fontSize: 12, color: "rgba(255,255,255,0.4)",
            letterSpacing: 2, fontFamily: "'Space Grotesk', sans-serif",
          }}>
            4SHOBOIZ VOL. 2 · 8 TRACKS
          </div>
          <a
            href="https://open.spotify.com/prerelease/2fttug0AvQ63gdpXgMpJsS"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              marginTop: 8, padding: "10px 28px", borderRadius: 24,
              background: "#CC0000", color: "#fff",
              fontSize: 13, fontWeight: 700, letterSpacing: 1.5,
              textDecoration: "none", border: "none",
              fontFamily: "'Space Grotesk', sans-serif",
              boxShadow: "0 4px 16px rgba(200, 0, 0, 0.4)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
          >
            PRE-SAVE NOW
          </a>
        </div>
      </div>
    </div>
  );
}
```

- [x] **Step 2: Render ComebackBanner in App**

In the `App` component's return, insert `<ComebackBanner />` right after `<LivePlaylistWidget />` and before the Woojin birthday banner block (around line 2202):

```jsx
      <FloatingNotes />
      <LivePlaylistWidget />
      <ComebackBanner />
```

- [x] **Step 3: Verify banner renders**

Open http://localhost:5173 and confirm:
- Album art image loads as the banner background
- Dark gradient overlay makes text readable
- "4SHOVILLE" title, subtitle, and "PRE-SAVE NOW" button are visible
- PRE-SAVE button links to the Spotify prerelease page

- [x] **Step 4: Commit**

```bash
git add src/App.jsx
git commit -m "feat: add 4SHOVILLE hero image banner component"
```

---

### Task 4: Apply Comeback Theme Color Shift

**Files:**
- Modify: `src/App.jsx` — conditional styles in `App` component (around lines 2179-2248)

- [x] **Step 1: Update the main container gradient**

Change the root `<div>` style in `App()` (line 2179) from hardcoded to conditional:

Old:
```jsx
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)", color: "#fff", fontFamily: "'Space Grotesk', 'Noto Sans KR', sans-serif", position: "relative" }}>
```

New:
```jsx
    <div style={{ minHeight: "100vh", background: COMEBACK_MODE ? "linear-gradient(160deg, #0a0a0a 0%, #1a0a0a 40%, #0d0d0d 100%)" : "linear-gradient(160deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)", color: "#fff", fontFamily: "'Space Grotesk', 'Noto Sans KR', sans-serif", position: "relative" }}>
```

- [x] **Step 2: Update body background and selection highlight**

Change the `<style>` block (line 2183-2184) from:

```jsx
        body { margin: 0; background: #1a1a2e; }
        ::selection { background: #FF6B3566; color: #fff; }
```

To:

```jsx
        body { margin: 0; background: ${COMEBACK_MODE ? "#0a0a0a" : "#1a1a2e"}; }
        ::selection { background: ${COMEBACK_MODE ? "#cc000066" : "#FF6B3566"}; color: #fff; }
```

Note: The `<style>` tag uses template literals — change `{``}` to `{``}` if it's already a template literal, or convert it. The existing code uses:
```jsx
<style>{`...`}</style>
```
This is already a template literal inside JSX, so use `${...}` interpolation.

- [x] **Step 3: Update the header LNGSHOT gradient**

Change the header title gradient (line 2242) from:

```jsx
background: "linear-gradient(135deg, #FF6B35, #E74C3C, #9B59B6, #3498DB)"
```

To:

```jsx
background: COMEBACK_MODE ? "linear-gradient(135deg, #ff1a1a, #cc0000, #8B0000)" : "linear-gradient(135deg, #FF6B35, #E74C3C, #9B59B6, #3498DB)"
```

- [x] **Step 4: Update "MUSIC & VIBES" subtitle color**

Change line 2245 from:

```jsx
color: "rgba(255,255,255,0.35)"
```

To:

```jsx
color: COMEBACK_MODE ? "rgba(255,60,60,0.35)" : "rgba(255,255,255,0.35)"
```

- [x] **Step 5: Update accent bar below header**

Change line 2247 from:

```jsx
background: "linear-gradient(90deg, #FF6B35, #9B59B6)"
```

To:

```jsx
background: COMEBACK_MODE ? "linear-gradient(90deg, #cc0000, #8B0000)" : "linear-gradient(90deg, #FF6B35, #9B59B6)"
```

- [x] **Step 6: Verify the full theme**

Open http://localhost:5173 and confirm:
- Background is pure black (not navy blue)
- Header "LNGSHOT" text is red gradient (not rainbow)
- "MUSIC & VIBES" has a red tint
- Accent bar is red
- Text selection highlight is red
- Album-specific colors (green for Training Day, etc.) are unchanged

- [x] **Step 7: Test the revert**

Temporarily change `COMEBACK_MODE` to `false` and verify:
- Banner disappears
- Background reverts to navy blue gradient
- Header reverts to rainbow gradient
- 4SHOVILLE album still shows in discography

Change it back to `true`.

- [x] **Step 8: Commit**

```bash
git add src/App.jsx
git commit -m "feat: apply 4SHOVILLE comeback theme color shift"
```

---

### Task 5: Final Verification and Deploy

**Files:**
- No file changes — verification only

- [x] **Step 1: Full visual check**

Open http://localhost:5173 and verify all four pieces together:
1. Hero banner loads with album art, text overlay, and PRE-SAVE button
2. Site background is pure black with dark red hints
3. Header "LNGSHOT" is red gradient
4. 4SHOVILLE appears first in discography with all 8 tracks
5. Clicking a track shows its detail page with fan notes
6. Fun facts carousel includes 4SHOVILLE facts
7. Other albums (Training Day, SHOT CALLERS, 4SHOBOIZ MIXTAPE) still display correctly
8. Search works for 4SHOVILLE songs

- [x] **Step 2: Commit any final tweaks and push**

```bash
git push origin main
```

Vercel auto-deploys from main. Verify at https://4shoboiz.work/ after deploy.
