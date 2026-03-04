import { useState, useEffect, useRef } from "react";

// ─── Song Data with fan notes ───
const ALBUMS = [
  {
    id: "shot-callers",
    title: "SHOT CALLERS",
    type: "Debut EP",
    date: "2026.01.13",
    spotifyAlbumId: "6M05ADW4mz2x07jIpIzCXR",
    color: "#FF6B35",
    desc: "Their official debut!! Billboard Korea named them Rookie of the Month (Feb 2026) and honestly they deserve it so much",
    fanNote: "i literally screamed when this dropped. every single track is a bop and the way they blend hip-hop with smooth r&b??? LNGSHOT pls",
    songs: [
      {
        id: "backseat",
        title: "Backseat",
        duration: "3:02",
        spotifyId: "2xsZMSE32OCHKWe4A8sM0w",
        credits: "Jay Park, Kwon, LNGSHOT",
        vibe: "confident + aspirational",
        fanNote: "the way this track just HITS from the first second... chasing dreams energy fr. instant confidence boost every time",
        mood: "🔥",
        funFact: null,
        featuring: null,
      },
      {
        id: "saucin",
        title: "Saucin'",
        duration: "2:53",
        spotifyId: "7jVr1ZipYJJR4qHxZcQjqa",
        credits: "Eric Minz, RYUL, Jay Park, OHYUL, WOOJIN, LOUIS LIM, DINT, SLO, CuzD",
        vibe: "bold + playful",
        fanNote: "the MV is SO funny omg. jay park as a CEO scolding the boys for their middle-finger photo?? satirical king behavior",
        mood: "😎",
        funFact: "The MV references the actual controversy when LNGSHOT's debut photos got criticized online. Jay Park turned it into comedy gold",
        featuring: null,
      },
      {
        id: "moonwalkin",
        title: "Moonwalkin'",
        duration: "3:28",
        spotifyId: "46V2ciN6F5bxjQWityNhkY",
        credits: "xrface, Marv",
        titleTrack: true,
        vibe: "smooth + iconic",
        fanNote: "THIS IS THE ONE. the michael jackson and beyoncé references?? the smooth grooves?? i will never stop playing this. title track for a reason",
        mood: "🌙",
        funFact: "This was actually the very first song LNGSHOT ever recorded together! It was originally meant to be a Woojin solo track but they decided to make it a group song instead",
        featuring: null,
      },
      {
        id: "facetime",
        title: "FaceTime",
        duration: "2:47",
        spotifyId: "7Ji60z4V0d0IUbuZMkpjJa",
        credits: "DUT2, RYUL, IOAH, Jay Park, Xinsayne",
        vibe: "soft + longing",
        fanNote: "this one hurts in the best way... the feeling of missing someone and just wanting to see their face. late night replay material",
        mood: "📱",
        funFact: null,
        featuring: null,
      },
      {
        id: "neverletgo",
        title: "Never Let Go",
        duration: "3:13",
        spotifyId: "37xebnhvUyM8VyyDDeo65d",
        credits: "LNGSHOT",
        vibe: "dreamy + emotional",
        fanNote: "the way this closes the EP... synth-ballad perfection. nostalgia and heartbreak and raw emotion all in one. i cry every time ngl",
        mood: "💫",
        funFact: "Written entirely by the LNGSHOT members themselves. You can really feel how personal it is",
        featuring: null,
      },
    ],
  },
  {
    id: "4shoboiz",
    title: "4SHOBOIZ MIXTAPE",
    type: "Pre-debut Mixtape",
    date: "2025.11.05",
    spotifyAlbumId: "3XzKcbKfLPWSOG7BJbC98O",
    color: "#9B59B6",
    desc: "Pre-debut mixtape, first dropped on YouTube then officially released. Physical copies were handed out BY THE MEMBERS THEMSELVES on the streets of Seoul!!",
    fanNote: "imagine just walking in seoul and woojin hands you a cd... i would simply pass away. this mixtape is how i discovered them and it's so raw and real",
    songs: [
      {
        id: "areyouready",
        title: "Are You Ready",
        duration: "2:35",
        spotifyId: "0kEplasbmZGhmSvotJRqBM",
        credits: "LNGSHOT",
        vibe: "hype + declaration",
        fanNote: "THE opener. this is lngshot saying 'we're here now' and honestly?? we were NOT ready",
        mood: "⚡",
        funFact: null,
        featuring: null,
      },
      {
        id: "trustmyself",
        title: "Trust Myself",
        duration: "2:19",
        spotifyId: "69zSOInaVnhuqBu99Cua8U",
        credits: "Ryul",
        vibe: "self-belief + raw",
        fanNote: "ryul solo moment!! his flow on this is insane. the self-confidence anthem we all need",
        mood: "💪",
        funFact: null,
        featuring: "Ryul",
      },
      {
        id: "thinking",
        title: "Thinking",
        duration: "1:53",
        spotifyId: "50kTEFEUSOLV3gQD9Y1Kim",
        credits: "Ryul, Louis",
        vibe: "mellow + reflective",
        fanNote: "ryul x louis combo hits different at 2am... the vibes are immaculate. short but it stays with you",
        mood: "🌃",
        funFact: null,
        featuring: "Ryul, Louis",
      },
      {
        id: "allgood",
        title: "All Good (좋은 마음으로)",
        duration: "2:40",
        spotifyId: "1SmH4LvoMHnRZItvXP7y2f",
        credits: "Woojin, Ryul",
        vibe: "warm + positive",
        fanNote: "good vibes only!! this is my comfort song when i'm having a bad day. woojin and ryul's chemistry is everything",
        mood: "☀️",
        funFact: "The Korean subtitle 좋은 마음으로 means 'with a good heart'",
        featuring: "Woojin, Ryul",
      },
      {
        id: "ejeh",
        title: "Ejeh (아닌 걸 알아 이제)",
        duration: "2:15",
        spotifyId: "0SfFCjldRnnbsIL65yqaEd",
        credits: "Woojin",
        vibe: "bittersweet + real",
        fanNote: "woojin solo... and it's so vulnerable? the way he sings about accepting something painful. this man has RANGE (emotionally and vocally)",
        mood: "🍂",
        funFact: "아닌 걸 알아 이제 means 'I know now that it's not right'",
        featuring: "Woojin",
      },
      {
        id: "next2u",
        title: "Next 2 U",
        duration: "2:10",
        spotifyId: "6Qq5N2ZFOSxink8xHHLGbZ",
        credits: "Ohyul, Louis",
        vibe: "sweet + tender",
        fanNote: "ohyul and louis are the vocal duo of my dreams!! this is so sweet and warm. perfect for when you're in your feels about someone",
        mood: "🤍",
        funFact: "This song got 3 versions on the mixtape (original, sped up, and carol remix) — the members clearly loved it as much as we do",
        featuring: "Ohyul, Louis",
      },
      {
        id: "myside",
        title: "My Side",
        duration: "2:36",
        spotifyId: "6yiVxaYx9AkYD54tK5IhSE",
        credits: "Woojin, Louis",
        vibe: "emotional + loyal",
        fanNote: "woojin x louis emotional duet... about always being there for someone. i'm not crying you're crying",
        mood: "🫂",
        funFact: null,
        featuring: "Woojin, Louis",
      },
    ],
  },
];

const MEMBERS = [
  {
    name: "OHYUL",
    role: "Leader · Lead Vocal",
    color: "#FF6B35",
    emoji: "🎤",
    photocardImage: "/images/photocards/chibi-ohyul.png",
    note: "our leader!! his voice is so warm",
    musicTaste: "070 Shake fan, alternative R&B with experimental edges. former KOZ trainee, plays guitar, can beatbox. co-wrote Jay Park's \"Remedy\" with Louis",
    playlistUrl: "https://open.spotify.com/playlist/7ftHLy68TXH83Eb0Okiu7o",
    playlistName: "ohyul's sonic universe",
    favoriteSongs: [
      { title: "Dunno", artist: "Mac Miller", spotifyId: "3YnwIp2b99p3e5dsFTXIIx", note: "mac miller appreciation!! the chill vibes are so ohyul", vibe: "chill · introspective" },
      { title: "Pluto Projector", artist: "Rex Orange County", spotifyId: "4EWBhKf1fOFnyMtUzACXEc", note: "indie boy hours... this song is a whole journey", vibe: "indie · emotional" },
      { title: "Baby", artist: "Justin Bieber ft. Ludacris", spotifyId: "6epn3r7S14KUqlReYr77hA", note: "a classic!! bieber influence runs deep in LNGSHOT", vibe: "pop · throwback" },
      { title: "Maps", artist: "Maroon 5", spotifyId: "4gbVRS8gloEluzf0GzDOFc", note: "pop-rock vibes, ohyul's range of taste is impressive", vibe: "pop-rock · catchy" },
      { title: "Nonstop", artist: "Drake", spotifyId: "0TlLq3lA83rQOYtrqBqSct", note: "drake on the playlist!! the energy is unmatched", vibe: "hip-hop · hype" },
      { title: "You Know What", artist: "N.E.R.D", spotifyId: "40YQDJrYZFIP24QVfUi9Ar", note: "n.e.r.d pick shows his love for the experimental side of hip-hop", vibe: "alt hip-hop · funky" },
      { title: "WUSYANAME", artist: "Tyler, The Creator ft. YoungBoy NBA & Ty Dolla $ign", spotifyId: "5B0kgjHULYJhAQkK5XsMoC", note: "tyler track!! the smooth summer vibes are chef's kiss", vibe: "hip-hop · smooth" },
      { title: "No Brainer", artist: "DJ Khaled ft. Justin Bieber & Quavo", spotifyId: "5WvAo7DNuPRmk4APhdPzi8", note: "another bieber collab pick — ohyul knows what's good", vibe: "pop · hype" },
      { title: "พี่ชอบหนูที่สุดเลย (I Like You)", artist: "PONCHET & VARINZ", spotifyId: "7mVobUmGP12Y5SQJgBice3", note: "a thai song on the list!! ohyul's taste is truly international", vibe: "thai pop · sweet" },
      { title: "435", artist: "Tyler, The Creator", spotifyId: "5xJeZ6tLPOXNIrrphEIuay", note: "another tyler pick — ohyul is a real one for this", vibe: "hip-hop · alternative" },
      { title: "Self Love", artist: "Metro Boomin & Coi Leray", spotifyId: "0AAMnNeIc6CdnfNU85GwCH", note: "spider-verse soundtrack taste!! metro boomin collab", vibe: "hip-hop · empowering" },
      { title: "Angel Numbers / Ten Toes", artist: "Chris Brown", spotifyId: "3XqM8hLCEYlbnFjoWwqtFv", note: "chris brown's smooth side — fits ohyul's vocal style", vibe: "R&B · smooth" },
    ],
  },
  {
    name: "RYUL",
    role: "Main Rapper",
    color: "#E74C3C",
    emoji: "🔥",
    photocardImage: "/images/photocards/chibi-ryul.png",
    note: "flow king. trust the process",
    musicTaste: "hip-hop focused, appeared on RAP:PUBLIC survival show. Jay Park said he was \"already a strong rapper at a young age.\" from Busan",
    playlistUrl: "https://open.spotify.com/playlist/7hz3pZ6KFqt4WEDF6QaLny",
    playlistName: "trust the process \u{1F525}",
    favoriteSongs: [
      { title: "History", artist: "88rising & Rich Brian", spotifyId: "4TwVtW7hS5LyLoDtJGpUOg", note: "88rising represent!! rich brian's flow is clean", vibe: "hip-hop · storytelling" },
      { title: "Rain", artist: "Aitch & AJ Tracey ft. Tay Keith", spotifyId: "7h2ozcUpSL7ulXjRPPQcDy", note: "UK rap on the list!! ryul appreciates flows from everywhere", vibe: "UK rap · hard" },
      { title: "Said Sum", artist: "Moneybagg Yo", spotifyId: "3NmjIYgsqzUgew8gkKUcs9", note: "that viral flow... ryul knows what hits", vibe: "hip-hop · catchy" },
      { title: "Figure It Out", artist: "ian", spotifyId: "2JzFbgbD6cc6E0YSBAAGeY", note: "relatable vibes, figuring it out just like the rest of us", vibe: "hip-hop · reflective" },
      { title: "SUNDOWN", artist: "Jack Harlow", spotifyId: "0ipgd8PPFza3NNmN3Rn2uF", note: "another harlow pick!! ryul is a real jack harlow fan", vibe: "hip-hop · chill" },
      { title: "HEY BIG HEAD", artist: "Jack Harlow", spotifyId: "3FWIAl04a9ySFhk4HH15ov", note: "three jack harlow songs?? ryul has a type lol", vibe: "hip-hop · playful" },
      { title: "Goodums", artist: "Unknown T & Sammy Virji", spotifyId: "0SLedTMdKihqLsR6CGPAfD", note: "UK scene appreciation!! the remix goes crazy", vibe: "UK rap · bouncy" },
      { title: "Praise God", artist: "Kanye West", spotifyId: "0WSEq9Ko4kFPt8yo3ICd6T", note: "donda era kanye!! the build-up on this track is insane", vibe: "hip-hop · epic" },
      { title: "Off The Grid", artist: "Kanye West", spotifyId: "6LNoArVBBVZzUTUiAX2aKO", note: "THE rap track of donda. fivio foreign went OFF and ryul knows it", vibe: "hip-hop · aggressive" },
      { title: "LEMONHEAD", artist: "Tyler, The Creator ft. 42 Dugg", spotifyId: "5fbHRCsGpFIOLRtlhCRFDR", note: "tyler's hard-hitting side — the beat switch is everything", vibe: "hip-hop · hard" },
      { title: "Self Love", artist: "Metro Boomin & Coi Leray", spotifyId: "0AAMnNeIc6CdnfNU85GwCH", note: "shares this pick with ohyul!! spider-verse stays winning", vibe: "hip-hop · empowering" },
      { title: "Angel Numbers / Ten Toes", artist: "Chris Brown", spotifyId: "3XqM8hLCEYlbnFjoWwqtFv", note: "the smooth R&B side of ryul's taste — versatile king", vibe: "R&B · smooth" },
    ],
  },
  {
    name: "WOOJIN",
    role: "Dancer · Composer",
    color: "#9B59B6",
    emoji: "💫",
    photocardImage: "/images/photocards/chibi-woojin.png",
    note: "writes, dances, sings... is there anything he can't do??",
    musicTaste: "deep R&B and hip-hop appreciation. former BigHit trainee (6 years). his daily routine includes searching for new songs. attends Hanlim Arts High School for Practical Dance",
    playlistUrl: "https://open.spotify.com/playlist/4mAxiG2sThW5gzIh2lWhgA",
    playlistName: "donda to dropout",
    favoriteSongs: [
      { title: "Jail", artist: "Kanye West", spotifyId: "6d8HN8MqqbqrEUI2bvx0aG", note: "woojin is a HUGE kanye fan and it shows!! donda opener energy", vibe: "hip-hop · anthemic" },
      { title: "Come to Life", artist: "Kanye West", spotifyId: "5xvXeuxISyXJDRbZZf4uzd", note: "the most beautiful song on donda... woojin has such deep taste", vibe: "hip-hop · cinematic" },
      { title: "Ghost Town", artist: "Kanye West ft. PARTYNEXTDOOR", spotifyId: "7vgTNTaEz3CsBZ1N4YQalM", note: "ye era classic!! the 'i feel freeeee' hits different every time", vibe: "alternative · emotional" },
      { title: "All Falls Down", artist: "Kanye West ft. Syleena Johnson", spotifyId: "5SkRLpaGtvYPhw02vZhQQ9", note: "throwback kanye!! woojin appreciates the classics", vibe: "hip-hop · conscious" },
      { title: "Addiction", artist: "Kanye West", spotifyId: "5VzeI5JM2y9t21JwrWAnkH", note: "late registration deep cut — woojin is a real kanye connoisseur", vibe: "hip-hop · soulful" },
      { title: "Magnolia", artist: "Playboi Carti", spotifyId: "1e1JKLEDKP7hEQzJfNAgPl", note: "carti energy!! the beat is iconic and woojin knows it", vibe: "hip-hop · trap" },
      { title: "The Color Violet", artist: "Tory Lanez", spotifyId: "3azJifCSqg9fRij2yKIbWz", note: "tory's vocal performance on this... woojin's R&B taste showing", vibe: "R&B · romantic" },
      { title: "HIGHEST IN THE ROOM", artist: "Travis Scott", spotifyId: "3eekarcy7kvN4yt5ZFzltW", note: "travis scott vibes!! the psychedelic sound fits woojin's artistic side", vibe: "hip-hop · psychedelic" },
    ],
  },
  {
    name: "LOUIS",
    role: "Main Vocal · Maknae",
    color: "#3498DB",
    emoji: "🌟",
    photocardImage: "/images/photocards/chibi-louis.png",
    note: "baby of the group but his vocals are NO joke",
    musicTaste: "huge Justin Bieber fan (nicknamed \"Baby Justin Bieber\"). French-Korean, speaks 4 languages. featured on JD McCrary's \"Lullaby Remix\" with Jay Park. co-wrote Jay Park's \"Remedy\" with Ohyul",
    playlistUrl: "https://open.spotify.com/playlist/63ji7lqnqa70JtTOddnCUC",
    playlistName: "louis after midnight",
    favoriteSongs: [
      { title: "Soft Spot", artist: "keshi", spotifyId: "2aL4lMGhWdPpyPL6COPou7", note: "keshi's soft vocals match louis's own vocal style so well", vibe: "indie R&B · tender" },
      { title: "Here We Go... Again", artist: "The Weeknd ft. Tyler, The Creator", spotifyId: "0khQeEwEv6GndVypzpGOG5", note: "weeknd x tyler collab!! louis has elite taste in collabs", vibe: "R&B · atmospheric" },
      { title: "Intentions", artist: "Justin Bieber ft. Quavo", spotifyId: "4umIPjkehX1r7uhmGvXiSV", note: "bieber fan louis strikes again!! the sweet vibes are so him", vibe: "pop · sweet" },
      { title: "Wavy", artist: "Ty Dolla $ign ft. Joe Moses", spotifyId: "6oECOh5nAYmxz4EiYhjsPi", note: "ty dolla $ign influence showing!! the smooth waviness fits", vibe: "R&B · wavy" },
      { title: "Guilty Conscience", artist: "070 Shake", spotifyId: "50aTwBKhPD3D3BW04UtjmA", note: "shares with ohyul — 070 shake is truly an LNGSHOT group fav", vibe: "dark · introspective" },
      { title: "How Deep Is Your Love", artist: "Calvin Harris & Disciples", spotifyId: "22mek4IiqubGD9ctzxc69s", note: "house music on the list!! louis's taste has range", vibe: "house · groovy" },
      { title: "STAY", artist: "The Kid LAROI & Justin Bieber", spotifyId: "5HCyWlXZPP0y6Gqq8TgA20", note: "bieber collab AND kid laroi?? louis WOULD pick this", vibe: "pop · catchy" },
      { title: "Ransom", artist: "Lil Tecca", spotifyId: "2MQojywJbqOaWjuIbRG0d8", note: "viral hit energy — louis knows what's trending", vibe: "hip-hop · catchy" },
      { title: "Don't", artist: "Bryson Tiller", spotifyId: "6T7AoQDVwLKZ04sfIca4Kl", note: "trapsoul classic!! bryson tiller's R&B influence on louis is real", vibe: "trapsoul · smooth" },
    ],
  },
];

const FUN_FACTS = [
  "LNGSHOT was Jay Park's first boy group under MORE VISION",
  "They performed at the 2025 Melon Music Awards alongside Jay Park and H1ghr Music artists",
  "The 4SHOBOIZ MIXTAPE physical CDs were handed out for FREE on the streets of Seoul",
  "Moonwalkin' references both Michael Jackson and Beyoncé",
  "Billboard Korea named them Rookie of the Month for February 2026",
  "The group name is stylized as LNGSHOT (no vowels!) — longshot without the O",
];

// ─── Icons ───
const BackIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const SpotifyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#1DB954">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
  </svg>
);

const ExternalIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const PlayIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

const MusicIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
  </svg>
);

const HeartIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

// ─── Spotify Cards ───
function SpotifyTrackCard({ title, subtitle, spotifyId, color, mood }) {
  const [hover, setHover] = useState(false);
  return (
    <a href={`https://open.spotify.com/track/${spotifyId}`} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: "flex", alignItems: "center", gap: 14,
        padding: "14px 18px", borderRadius: 14,
        background: hover ? "linear-gradient(135deg, #1DB95433, #1DB95418)" : "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))",
        border: "1px solid rgba(29, 185, 84, 0.2)",
        textDecoration: "none", color: "#fff", transition: "all 0.3s ease",
        transform: hover ? "scale(1.01)" : "none", cursor: "pointer", marginTop: 12,
      }}>
      <div style={{ width: 48, height: 48, borderRadius: 10, background: `linear-gradient(135deg, ${color || "#1DB954"}, ${color || "#1DB954"}88)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{mood || "🎵"}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: "#fff", fontFamily: "'Space Grotesk', sans-serif" }}>{title}</div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{subtitle}</div>
      </div>
      <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#1DB954", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "transform 0.2s", transform: hover ? "scale(1.1)" : "none" }}><PlayIcon /></div>
    </a>
  );
}

function SpotifyAlbumCard({ title, type, date, trackCount, spotifyAlbumId, color }) {
  const [hover, setHover] = useState(false);
  return (
    <a href={`https://open.spotify.com/album/${spotifyAlbumId}`} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: "flex", alignItems: "center", gap: 14,
        padding: "16px 18px", borderRadius: 14,
        background: hover ? `linear-gradient(135deg, ${color}30, ${color}15)` : "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
        border: `1px solid ${color}33`, textDecoration: "none", color: "#fff",
        transition: "all 0.3s ease", transform: hover ? "scale(1.01)" : "none", cursor: "pointer", marginBottom: 14,
      }}>
      <div style={{ width: 52, height: 52, borderRadius: 10, background: `linear-gradient(135deg, ${color}, ${color}66)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><MusicIcon /></div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 17, fontWeight: 700, color: "#fff", fontFamily: "'Space Grotesk', sans-serif" }}>{title}</div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 3 }}>{type} · {date} · {trackCount} tracks</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 20, background: hover ? "rgba(29, 185, 84, 0.25)" : "rgba(29, 185, 84, 0.15)", fontSize: 11, fontWeight: 600, color: "#1DB954", fontFamily: "'Space Grotesk', sans-serif", flexShrink: 0, transition: "background 0.2s" }}><SpotifyIcon /> Play</div>
    </a>
  );
}

// ─── Floating Notes ───
function FloatingNotes() {
  const notes = ["♪", "♫", "♬", "♩", "🎵", "🎶", "🤍", "✨"];
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} style={{ position: "absolute", left: `${5 + Math.random() * 90}%`, bottom: "-30px", fontSize: `${14 + Math.random() * 16}px`, opacity: 0.07, animation: `floatUp ${8 + Math.random() * 14}s linear infinite`, animationDelay: `${Math.random() * 12}s` }}>{notes[i % notes.length]}</div>
      ))}
    </div>
  );
}

// ─── Fan Note Bubble ───
function FanNote({ text, small = false }) {
  return (
    <div style={{
      background: "rgba(255, 182, 193, 0.08)", border: "1px solid rgba(255, 182, 193, 0.18)",
      borderRadius: 14, padding: small ? "10px 14px" : "14px 18px",
      fontSize: small ? 14 : 15, color: "rgba(255,255,255,0.65)", lineHeight: 1.7,
      fontStyle: "italic", position: "relative",
      fontFamily: "'Space Grotesk', sans-serif",
    }}>
      <span style={{ color: "rgba(255, 182, 193, 0.6)", fontSize: small ? 14 : 16, marginRight: 6 }}>💭</span>
      {text}
    </div>
  );
}

// ─── Fun Fact Box ───
function FunFact({ text }) {
  if (!text) return null;
  return (
    <div style={{
      background: "rgba(255, 215, 0, 0.06)", border: "1px solid rgba(255, 215, 0, 0.15)",
      borderRadius: 12, padding: "10px 14px", marginTop: 10,
      fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.6,
      fontFamily: "'Space Grotesk', sans-serif",
    }}>
      <span style={{ marginRight: 6 }}>✨</span>
      <strong style={{ color: "rgba(255, 215, 0, 0.7)" }}>fun fact:</strong> {text}
    </div>
  );
}

// ─── Song Card ───
function SongCard({ song, album, onClick, index }) {
  const [hover, setHover] = useState(false);
  return (
    <div onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        background: hover ? "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.08) 100%)" : "rgba(255,255,255,0.08)",
        borderRadius: 16, padding: "16px 20px", cursor: "pointer", transition: "all 0.3s ease",
        transform: hover ? "translateY(-2px) scale(1.01)" : "none",
        boxShadow: hover ? "0 8px 25px rgba(0,0,0,0.15)" : "none",
        border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", gap: 14,
        animation: `slideIn 0.4s ease forwards`, animationDelay: `${index * 0.05}s`, opacity: 0,
      }}>
      <div style={{ width: 40, height: 40, borderRadius: 12, background: `linear-gradient(135deg, ${album.color}88, ${album.color}44)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{song.mood}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 17, fontWeight: 600, color: "#fff", display: "flex", alignItems: "center", gap: 8, fontFamily: "'Space Grotesk', sans-serif" }}>
          {song.title}
          {song.titleTrack && <span style={{ fontSize: 10, background: album.color, color: "#fff", padding: "2px 8px", borderRadius: 20, fontWeight: 700, letterSpacing: 0.5 }}>TITLE</span>}
        </div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", marginTop: 3, fontStyle: "italic" }}>{song.vibe}</div>
      </div>
      <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 18, transition: "all 0.2s", transform: hover ? "translateX(3px)" : "none" }}>→</div>
    </div>
  );
}

// ─── Link Button ───
function LinkButton({ href, icon, label, color = "rgba(255,255,255,0.1)" }) {
  const [hover, setHover] = useState(false);
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 20, border: "none", background: hover ? "rgba(255,255,255,0.18)" : color, color: "#fff", fontSize: 14, cursor: "pointer", textDecoration: "none", transition: "all 0.2s", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}>
      {icon}{label}
    </a>
  );
}

// ─── Random Fun Fact Widget ───
function RandomFunFact() {
  const [idx, setIdx] = useState(Math.floor(Math.random() * FUN_FACTS.length));
  return (
    <div style={{
      background: "rgba(255, 215, 0, 0.05)", border: "1px dashed rgba(255, 215, 0, 0.2)",
      borderRadius: 14, padding: "14px 18px", marginBottom: 24,
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(255, 215, 0, 0.6)", letterSpacing: 1, fontFamily: "'Space Grotesk', sans-serif" }}>
          ✨ DID YOU KNOW?
        </div>
        <button onClick={() => setIdx((idx + 1) % FUN_FACTS.length)} style={{
          background: "rgba(255, 215, 0, 0.1)", border: "none", color: "rgba(255, 215, 0, 0.6)",
          padding: "4px 10px", borderRadius: 12, cursor: "pointer", fontSize: 12,
          fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, transition: "background 0.2s",
        }}>another one →</button>
      </div>
      <div style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.6, fontFamily: "'Space Grotesk', sans-serif" }}>
        {FUN_FACTS[idx]}
      </div>
    </div>
  );
}

// ─── Song Detail View ───
function SongDetail({ song, album, onBack }) {
  return (
    <div style={{ animation: "fadeIn 0.3s ease" }}>
      <button onClick={onBack} style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", padding: "8px 16px", borderRadius: 20, cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontSize: 13, marginBottom: 20, fontFamily: "'Space Grotesk', sans-serif", transition: "background 0.2s" }}
        onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
        onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}>
        <BackIcon /> Back
      </button>

      {/* Song Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 6 }}>
        <div style={{ width: 56, height: 56, borderRadius: 16, background: `linear-gradient(135deg, ${album.color}, ${album.color}88)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>{song.mood}</div>
        <div>
          <h2 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: "#fff", fontFamily: "'Space Grotesk', sans-serif", letterSpacing: -0.5, lineHeight: 1.2 }}>{song.title}</h2>
          <div style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", marginTop: 3 }}>
            {album.title} · {song.duration}
            {song.titleTrack && <span style={{ fontSize: 10, background: album.color, color: "#fff", padding: "2px 8px", borderRadius: 20, fontWeight: 700, marginLeft: 8, letterSpacing: 0.5, verticalAlign: "middle" }}>TITLE TRACK</span>}
          </div>
          {song.featuring && <div style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", marginTop: 4 }}>feat. {song.featuring}</div>}
        </div>
      </div>

      {/* Vibe tag */}
      <div style={{ display: "inline-block", padding: "5px 14px", borderRadius: 20, background: `${album.color}20`, border: `1px solid ${album.color}40`, fontSize: 14, color: album.color, fontWeight: 600, marginTop: 12, fontFamily: "'Space Grotesk', sans-serif" }}>
        {song.vibe}
      </div>

      {/* Fan note */}
      <div style={{ marginTop: 14 }}>
        <FanNote text={song.fanNote} />
      </div>

      {/* Fun fact */}
      <FunFact text={song.funFact} />

      {/* Credits */}
      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.25)", marginTop: 12, marginBottom: 16, paddingLeft: 2 }}>
        credits: {song.credits}
      </div>

      {/* Spotify Player */}
      <SpotifyTrackCard title={song.title} subtitle={`LNGSHOT · ${album.title}`} spotifyId={song.spotifyId} color={album.color} mood={song.mood} />

      {/* Lyrics hint */}
      <div style={{ marginTop: 14, padding: "12px 16px", background: "rgba(29, 185, 84, 0.08)", border: "1px solid rgba(29, 185, 84, 0.2)", borderRadius: 12, display: "flex", alignItems: "center", gap: 10, fontSize: 15, color: "rgba(255,255,255,0.55)", lineHeight: 1.5, fontFamily: "'Space Grotesk', sans-serif" }}>
        <SpotifyIcon />
        <span>open in spotify and tap the lyrics button to see synced lyrics while listening!</span>
      </div>

      {/* Links */}
      <div style={{ marginTop: 20, display: "flex", flexWrap: "wrap", gap: 8 }}>
        <LinkButton href={`https://open.spotify.com/track/${song.spotifyId}`} icon={<SpotifyIcon />} label="Open in Spotify" color="rgba(29, 185, 84, 0.2)" />
        <LinkButton href={`https://genius.com/search?q=LNGSHOT ${encodeURIComponent(song.title)}`} icon={<ExternalIcon />} label="Genius" />
        <LinkButton href="https://lyricstranslate.com/en/collection/lngshot-discography" icon={<ExternalIcon />} label="LyricsTranslate" />
      </div>

      {/* Share */}
      <div style={{ marginTop: 24, padding: "16px 18px", background: "rgba(255,255,255,0.04)", borderRadius: 14, border: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.5)", marginBottom: 10, fontFamily: "'Space Grotesk', sans-serif" }}>
          share the love ~
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <LinkButton href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`🎵 listening to "${song.title}" by LNGSHOT\n${album.title}\n\nhttps://open.spotify.com/track/${song.spotifyId}\n\n#LNGSHOT #4SHOBOIZ`)}`} icon={<span style={{ fontSize: 14 }}>𝕏</span>} label="Post on X" />
          <LinkButton href={`https://open.spotify.com/track/${song.spotifyId}`} icon={<span style={{ fontSize: 14 }}>🔗</span>} label="Spotify Link" />
        </div>
      </div>
    </div>
  );
}

// ─── Hot Content (YouTube MVs) ───
const HOT_VIDEOS = [
  { id: "8w6M-RVj1z0", title: "Backseat", tag: "LATEST MV", color: "#FF6B6B" },
  { id: "HJgdT15UT4k", title: "Moonwalkin'", tag: "DEBUT MV", color: "#C084FC" },
  { id: "V5tRwughjgU", title: "FaceTime", tag: "FAN FAVORITE", color: "#60A5FA" },
  { id: "GFRu5ea_klk", title: "Saucin'", tag: "PRE-DEBUT", color: "#34D399" },
];

function HotContent() {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <div style={{
          width: 5, height: 28, borderRadius: 3,
          background: "linear-gradient(180deg, #FF0000, #FF000044)",
        }} />
        <div>
          <div style={{
            fontSize: 14, fontWeight: 700, color: "rgba(255, 60, 60, 0.7)",
            letterSpacing: 2, fontFamily: "'Space Grotesk', sans-serif",
          }}>
            🔥 HOT CONTENT
          </div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.25)", marginTop: 2 }}>
            official MVs · tap to watch
          </div>
        </div>
      </div>

      {/* Featured video player */}
      {activeVideo && (
        <div style={{
          borderRadius: 16, overflow: "hidden", marginBottom: 12,
          border: "1px solid rgba(255,255,255,0.08)",
          aspectRatio: "16/9",
        }}>
          <iframe
            src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0`}
            style={{ width: "100%", height: "100%", border: "none" }}
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
      )}

      {/* Video grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {HOT_VIDEOS.map((v) => (
          <div
            key={v.id}
            onClick={() => setActiveVideo(v.id)}
            style={{
              position: "relative", borderRadius: 14, overflow: "hidden",
              cursor: "pointer", transition: "all 0.25s ease",
              border: activeVideo === v.id
                ? `1.5px solid ${v.color}66`
                : "1.5px solid rgba(255,255,255,0.06)",
              background: activeVideo === v.id
                ? `${v.color}11`
                : "rgba(255,255,255,0.03)",
            }}
          >
            <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden" }}>
              <img
                src={`https://img.youtube.com/vi/${v.id}/mqdefault.jpg`}
                alt={v.title}
                style={{
                  width: "100%", height: "100%", objectFit: "cover",
                  display: "block", opacity: 0.85, transition: "opacity 0.2s",
                }}
              />
              {/* Play overlay */}
              <div style={{
                position: "absolute", inset: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "rgba(0,0,0,0.25)",
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: "50%",
                  background: "rgba(255,255,255,0.9)", display: "flex",
                  alignItems: "center", justifyContent: "center",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                }}>
                  <span style={{ fontSize: 14, marginLeft: 2, color: "#111" }}>▶</span>
                </div>
              </div>
              {/* Tag badge */}
              <div style={{
                position: "absolute", top: 8, left: 8,
                fontSize: 10, fontWeight: 700, letterSpacing: 1,
                color: "#fff", background: `${v.color}CC`,
                padding: "2px 7px", borderRadius: 6,
                fontFamily: "'Space Grotesk', sans-serif",
              }}>
                {v.tag}
              </div>
            </div>
            <div style={{
              padding: "9px 12px",
              fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.75)",
              fontFamily: "'Space Grotesk', sans-serif",
            }}>
              {v.title}
            </div>
          </div>
        ))}
      </div>

      <a
        href="https://www.youtube.com/@LNGSHOT4SHO"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: 6, marginTop: 12, padding: "8px 0",
          fontSize: 14, color: "rgba(255, 60, 60, 0.5)",
          textDecoration: "none", fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 500, transition: "color 0.2s",
        }}
      >
        <span style={{ fontSize: 14 }}>▶</span> more videos on YouTube →
      </a>
    </div>
  );
}

// ─── Latest Buzz (single latest from official channels) ───
function LatestBuzz() {
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await fetch("/api/youtube");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setVideo(data.video || null);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchVideo();
  }, []);

  const timeAgo = (dateStr) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    if (days < 7) return `${days}d ago`;
    const weeks = Math.floor(days / 7);
    if (weeks < 4) return `${weeks}w ago`;
    return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const badgeColors = {
    OFFICIAL: { bg: "rgba(255, 107, 107, 0.15)", text: "#FF6B6B", border: "rgba(255, 107, 107, 0.25)" },
    LABEL: { bg: "rgba(192, 132, 252, 0.15)", text: "#C084FC", border: "rgba(192, 132, 252, 0.25)" },
    MEDIA: { bg: "rgba(96, 165, 250, 0.15)", text: "#60A5FA", border: "rgba(96, 165, 250, 0.25)" },
  };

  if (error || (!loading && !video)) return null;

  return (
    <div style={{ marginBottom: 28 }}>
      {/* Section header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <div style={{
          width: 5, height: 28, borderRadius: 3,
          background: "linear-gradient(180deg, #F9A8D4, #F9A8D444)",
        }} />
        <div>
          <div style={{
            fontSize: 14, fontWeight: 700, color: "rgba(249, 168, 212, 0.7)",
            letterSpacing: 2, fontFamily: "'Space Grotesk', sans-serif",
          }}>
            ✨ LATEST BUZZ
          </div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.25)", marginTop: 2 }}>
            freshest drop from the official fam~
          </div>
        </div>
      </div>

      {loading ? (
        <div style={{
          background: "rgba(249, 168, 212, 0.04)",
          border: "1px solid rgba(249, 168, 212, 0.1)",
          borderRadius: 18, padding: "32px 20px",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
        }}>
          <div style={{
            width: 22, height: 22, border: "2.5px solid rgba(249, 168, 212, 0.15)",
            borderTopColor: "#F9A8D4", borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }} />
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.25)", fontFamily: "'Space Grotesk', sans-serif" }}>
            checking for new content~ ♡
          </div>
        </div>
      ) : (
        <div style={{
          background: "linear-gradient(135deg, rgba(249, 168, 212, 0.06), rgba(192, 132, 252, 0.04))",
          border: "1px solid rgba(249, 168, 212, 0.12)",
          borderRadius: 18, overflow: "hidden",
          transition: "all 0.3s ease",
        }}>
          {/* Video area */}
          <div
            style={{ position: "relative", aspectRatio: "16/9", cursor: "pointer", overflow: "hidden" }}
            onClick={() => setPlaying(true)}
          >
            {playing ? (
              <iframe
                src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`}
                style={{ width: "100%", height: "100%", border: "none" }}
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            ) : (
              <>
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                {/* Gradient overlay */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(0deg, rgba(0,0,0,0.5) 0%, transparent 50%, transparent 100%)",
                }} />
                {/* Play button */}
                <div style={{
                  position: "absolute", inset: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: "50%",
                    background: "rgba(255,255,255,0.92)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                    transition: "transform 0.2s",
                  }}>
                    <span style={{ fontSize: 20, marginLeft: 3, color: "#111" }}>▶</span>
                  </div>
                </div>
                {/* NEW badge */}
                <div style={{
                  position: "absolute", top: 12, left: 12,
                  background: "linear-gradient(135deg, #FF6B6B, #F9A8D4)",
                  color: "#fff", fontSize: 10, fontWeight: 800,
                  padding: "3px 10px", borderRadius: 20, letterSpacing: 1.5,
                  fontFamily: "'Space Grotesk', sans-serif",
                  boxShadow: "0 2px 8px rgba(255, 107, 107, 0.3)",
                }}>
                  NEW ♡
                </div>
                {/* Time badge */}
                <div style={{
                  position: "absolute", top: 12, right: 12,
                  background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)",
                  color: "rgba(255,255,255,0.8)", fontSize: 11, fontWeight: 600,
                  padding: "3px 8px", borderRadius: 8,
                  fontFamily: "'Space Grotesk', sans-serif",
                }}>
                  {timeAgo(video.publishedAt)}
                </div>
              </>
            )}
          </div>

          {/* Info section */}
          <div style={{ padding: "14px 16px 16px" }}>
            {/* Channel badge + name */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              {video.badge && (() => {
                const colors = badgeColors[video.badge] || badgeColors.OFFICIAL;
                return (
                  <span style={{
                    fontSize: 9, fontWeight: 700, letterSpacing: 1,
                    color: colors.text, background: colors.bg,
                    border: `1px solid ${colors.border}`,
                    padding: "2px 7px", borderRadius: 6,
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}>
                    {video.badge}
                  </span>
                );
              })()}
              <span style={{
                fontSize: 12, color: "rgba(255,255,255,0.4)",
                fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500,
              }}>
                {video.channel}
              </span>
            </div>

            {/* Title */}
            <div style={{
              fontSize: 15, fontWeight: 700, color: "rgba(255,255,255,0.85)",
              fontFamily: "'Space Grotesk', sans-serif",
              lineHeight: 1.4, marginBottom: 10,
              overflow: "hidden", textOverflow: "ellipsis",
              display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
            }}>
              {video.title}
            </div>

            {/* Fan reaction bar */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "8px 12px", borderRadius: 10,
              background: "rgba(249, 168, 212, 0.06)",
              border: "1px solid rgba(249, 168, 212, 0.08)",
            }}>
              <div style={{
                fontSize: 12, color: "rgba(249, 168, 212, 0.6)",
                fontFamily: "'Space Grotesk', sans-serif", fontStyle: "italic",
              }}>
                omg new content!! go watch 4shoboiz~ 💗
              </div>
              <a
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{
                  fontSize: 11, fontWeight: 600, color: "#F9A8D4",
                  textDecoration: "none", fontFamily: "'Space Grotesk', sans-serif",
                  padding: "4px 10px", borderRadius: 8,
                  background: "rgba(249, 168, 212, 0.1)",
                  border: "1px solid rgba(249, 168, 212, 0.15)",
                  whiteSpace: "nowrap",
                  transition: "all 0.2s",
                }}
              >
                watch on YT →
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Headphones Icon ───
const HeadphonesIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
  </svg>
);

// ─── Member Favorite Song Card ───
function FavSongCard({ song, color, index }) {
  const [hover, setHover] = useState(false);
  return (
    <a
      href={`https://open.spotify.com/track/${song.spotifyId}`}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex", alignItems: "center", gap: 14,
        padding: "14px 16px", borderRadius: 14,
        background: hover
          ? `linear-gradient(135deg, ${color}28, ${color}12)`
          : "linear-gradient(135deg, rgba(255,255,255,0.07), rgba(255,255,255,0.03))",
        border: `1px solid ${hover ? `${color}44` : "rgba(255,255,255,0.08)"}`,
        textDecoration: "none", color: "#fff", transition: "all 0.3s ease",
        transform: hover ? "translateY(-1px)" : "none", cursor: "pointer",
        animation: `slideIn 0.4s ease forwards`, animationDelay: `${index * 0.08}s`, opacity: 0,
      }}
    >
      {/* Spotify green dot */}
      <div style={{
        width: 42, height: 42, borderRadius: 10,
        background: `linear-gradient(135deg, #1DB95444, #1DB95422)`,
        border: "1px solid #1DB95433",
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}>
        <SpotifyIcon />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 15, fontWeight: 700, color: "#fff",
          fontFamily: "'Space Grotesk', sans-serif",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>
          {song.title}
        </div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>
          {song.artist}
        </div>
        {song.vibe && (
          <div style={{
            display: "inline-block", marginTop: 4,
            fontSize: 11, color: `${color}CC`, fontWeight: 500,
            fontFamily: "'Space Grotesk', sans-serif",
          }}>
            {song.vibe}
          </div>
        )}
      </div>
      <div style={{
        width: 32, height: 32, borderRadius: "50%", background: "#1DB954",
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        transition: "transform 0.2s", transform: hover ? "scale(1.1)" : "none",
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><polygon points="5 3 19 12 5 21 5 3" /></svg>
      </div>
    </a>
  );
}

// ─── Playlist Section with Spotify Embed ───
function PlaylistSection({ member }) {
  const songs = member.favoriteSongs;
  const playlistId = member.playlistUrl ? member.playlistUrl.split("/playlist/")[1] : null;

  return (
    <div style={{ marginBottom: 28 }}>
      {/* Section header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <div style={{
          width: 5, height: 28, borderRadius: 3,
          background: `linear-gradient(180deg, #1DB954, #1DB95444)`,
        }} />
        <div>
          <div style={{
            fontSize: 14, fontWeight: 700, color: "rgba(29, 185, 84, 0.7)",
            letterSpacing: 2, fontFamily: "'Space Grotesk', sans-serif",
            display: "flex", alignItems: "center", gap: 6,
          }}>
            <HeadphonesIcon /> {member.name}'S PLAYLIST
          </div>
          {member.playlistName && (
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>
              "{member.playlistName}" — {songs.length} songs
            </div>
          )}
        </div>
      </div>

      {/* Spotify Playlist Embed */}
      {playlistId && (
        <div style={{
          borderRadius: 14, overflow: "hidden", marginBottom: 16,
          border: "1px solid rgba(29, 185, 84, 0.15)",
        }}>
          <iframe
            style={{ borderRadius: 14, border: "none" }}
            src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`}
            width="100%"
            height="352"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </div>
      )}

      {/* Open in Spotify CTA */}
      {member.playlistUrl && (
        <a
          href={member.playlistUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            width: "100%", padding: "12px 16px", borderRadius: 12,
            background: "rgba(29, 185, 84, 0.1)", border: "1px solid rgba(29, 185, 84, 0.25)",
            color: "#1DB954", fontSize: 13, fontWeight: 600,
            fontFamily: "'Space Grotesk', sans-serif", cursor: "pointer",
            textDecoration: "none", transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(29, 185, 84, 0.2)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(29, 185, 84, 0.1)"; }}
        >
          <SpotifyIcon />
          open "{member.playlistName}" on Spotify
        </a>
      )}
    </div>
  );
}

// ─── Detail Photocard (flippable) ───
function DetailPhotoCard({ member }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div style={{ textAlign: "center", marginBottom: 24 }}>
      <div
        onClick={() => setFlipped(!flipped)}
        style={{
          width: 200, height: 310, margin: "0 auto 12px",
          perspective: "1000px", WebkitPerspective: "1000px", cursor: "pointer",
        }}
      >
        <div style={{
          width: "100%", height: "100%", position: "relative",
          transformStyle: "preserve-3d", WebkitTransformStyle: "preserve-3d",
          transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}>
          {/* ── Front ── */}
          <div style={{
            position: "absolute", width: "100%", height: "100%",
            backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(0deg) translateZ(1px)", WebkitTransform: "rotateY(0deg) translateZ(1px)",
            borderRadius: 18,
            background: `linear-gradient(170deg, ${member.color}30 0%, rgba(10,10,25,0.95) 45%, ${member.color}20 100%)`,
            border: `2px solid ${member.color}44`,
            boxShadow: `0 12px 40px ${member.color}22, inset 0 1px 0 ${member.color}33`,
            overflow: "hidden",
            padding: "22px 16px 18px",
            display: "flex", flexDirection: "column", alignItems: "center",
          }}>
            {/* Shimmer sweep */}
            <div style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              background: `linear-gradient(135deg, transparent 25%, ${member.color}12 42%, rgba(255,255,255,0.1) 50%, ${member.color}12 58%, transparent 75%)`,
              backgroundSize: "200% 200%",
              animation: "shimmer 4s ease-in-out infinite",
              zIndex: 1,
            }} />
            {/* Corner sparkles */}
            <div style={{ position: "absolute", top: 10, left: 10, width: 4, height: 4, borderRadius: "50%", background: member.color, opacity: 0.35, animation: "sparkle 3s ease-in-out infinite" }} />
            <div style={{ position: "absolute", top: 10, right: 10, width: 4, height: 4, borderRadius: "50%", background: member.color, opacity: 0.35, animation: "sparkle 3s ease-in-out infinite 1s" }} />
            <div style={{ position: "absolute", bottom: 14, left: 14, width: 3, height: 3, borderRadius: "50%", background: "#fff", opacity: 0.15, animation: "sparkle 3.5s ease-in-out infinite 0.5s" }} />
            {/* Top accent line */}
            <div style={{ width: "60%", height: 1.5, borderRadius: 1, background: `linear-gradient(90deg, transparent, ${member.color}55, transparent)`, marginBottom: 16, position: "relative", zIndex: 2 }} />
            {/* Member image */}
            <div style={{
              width: 110, height: 110, borderRadius: 20,
              border: `2.5px solid ${member.color}55`,
              overflow: "hidden", marginBottom: 14,
              boxShadow: `0 6px 24px ${member.color}33`,
              position: "relative", zIndex: 2,
            }}>
              <img src={member.photocardImage} alt={member.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
            {/* Name */}
            <div style={{ fontSize: 20, fontWeight: 800, color: member.color, fontFamily: "'Space Grotesk', sans-serif", letterSpacing: 1.5, position: "relative", zIndex: 2 }}>
              {member.name}
            </div>
            {/* Role */}
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontFamily: "'Space Grotesk', sans-serif", marginTop: 4, letterSpacing: 0.5, position: "relative", zIndex: 2 }}>
              {member.role}
            </div>
            {/* Emoji */}
            <div style={{ fontSize: 16, marginTop: 8, position: "relative", zIndex: 2 }}>
              {member.emoji}
            </div>
            {/* Branding */}
            <div style={{ marginTop: "auto", fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.15)", letterSpacing: 4, fontFamily: "'Space Grotesk', sans-serif", position: "relative", zIndex: 2 }}>
              LNGSHOT
            </div>
            <div style={{ width: "40%", height: 1, borderRadius: 1, background: `linear-gradient(90deg, transparent, ${member.color}33, transparent)`, marginTop: 8 }} />
          </div>

          {/* ── Back ── */}
          <div style={{
            position: "absolute", width: "100%", height: "100%",
            backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg) translateZ(0px)", WebkitTransform: "rotateY(180deg) translateZ(0px)",
            borderRadius: 18,
            background: `linear-gradient(170deg, ${member.color}35 0%, ${member.color}10 40%, rgba(10,10,25,0.98) 100%)`,
            border: `2px solid ${member.color}44`,
            boxShadow: `0 12px 40px ${member.color}22`,
            overflow: "hidden",
            padding: "28px 20px 20px",
            display: "flex", flexDirection: "column", alignItems: "center",
            justifyContent: "center",
          }}>
            {/* Pattern bg */}
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.04, fontSize: 18, lineHeight: 1.6, overflow: "hidden", color: member.color, padding: 8, wordBreak: "break-all" }}>
              {"♡ ★ ♪ ✦ ".repeat(40)}
            </div>
            {/* Emoji */}
            <div style={{ fontSize: 32, marginBottom: 12, filter: `drop-shadow(0 0 10px ${member.color}44)`, position: "relative", zIndex: 1 }}>
              {member.emoji}
            </div>
            {/* Fan quote */}
            <div style={{
              fontSize: 15, color: "rgba(255,255,255,0.6)",
              textAlign: "center", lineHeight: 1.8, fontStyle: "italic",
              fontFamily: "'Noto Sans KR', sans-serif",
              position: "relative", zIndex: 1,
            }}>
              "{member.note}"
            </div>
            {/* Music taste snippet */}
            {member.musicTaste && (
              <div style={{
                fontSize: 12, color: "rgba(255,255,255,0.3)",
                textAlign: "center", lineHeight: 1.6, marginTop: 14,
                fontFamily: "'Space Grotesk', sans-serif",
                position: "relative", zIndex: 1,
              }}>
                {member.musicTaste.split(".")[0]}
              </div>
            )}
            {/* Divider */}
            <div style={{ width: 40, height: 2, borderRadius: 1, background: `${member.color}55`, marginTop: 18, marginBottom: 12 }} />
            {/* Branding */}
            <div style={{ fontSize: 12, fontWeight: 800, color: `${member.color}77`, letterSpacing: 5, fontFamily: "'Space Grotesk', sans-serif" }}>
              LNGSHOT
            </div>
            {/* Hint */}
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.15)", marginTop: 10, fontFamily: "'Space Grotesk', sans-serif" }}>
              tap to flip back
            </div>
          </div>
        </div>
      </div>
      {/* Tap hint below card */}
      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.18)", fontFamily: "'Space Grotesk', sans-serif" }}>
        tap card to flip
      </div>
    </div>
  );
}

// ─── Member Detail View ───
function MemberDetail({ member, allSongs, onBack, onSongClick }) {
  // Find songs this member is featured on or contributed to
  const memberSongs = allSongs.filter(s => {
    const name = member.name.charAt(0) + member.name.slice(1).toLowerCase();
    return (s.featuring && s.featuring.toLowerCase().includes(name.toLowerCase()))
      || (s.credits && s.credits.toLowerCase().includes(name.toLowerCase()));
  });

  return (
    <div style={{ animation: "fadeIn 0.3s ease" }}>
      {/* Back button */}
      <button
        onClick={onBack}
        style={{
          background: "rgba(255,255,255,0.1)", border: "none", color: "#fff",
          padding: "8px 16px", borderRadius: 20, cursor: "pointer",
          display: "flex", alignItems: "center", gap: 4, fontSize: 13, marginBottom: 20,
          fontFamily: "'Space Grotesk', sans-serif", transition: "background 0.2s",
        }}
        onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
        onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
      >
        <BackIcon /> Back
      </button>

      {/* Member Header — Flippable Detail Photocard */}
      <DetailPhotoCard member={member} />

      {/* Music Taste */}
      {member.musicTaste && (
        <div style={{
          background: `${member.color}0A`, border: `1px solid ${member.color}22`,
          borderRadius: 14, padding: "14px 18px", marginBottom: 24,
        }}>
          <div style={{
            fontSize: 12, fontWeight: 700, color: `${member.color}99`,
            letterSpacing: 1.5, marginBottom: 8,
            fontFamily: "'Space Grotesk', sans-serif",
          }}>
            MUSIC TASTE
          </div>
          <div style={{
            fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.7,
            fontFamily: "'Space Grotesk', sans-serif",
          }}>
            {member.musicTaste}
          </div>
        </div>
      )}

      {/* Favorite Songs / Playlist Section */}
      {member.favoriteSongs && member.favoriteSongs.length > 0 && (
        <PlaylistSection member={member} />
      )}

      {/* Their LNGSHOT Contributions */}
      {memberSongs.length > 0 && (
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div style={{
              width: 5, height: 28, borderRadius: 3,
              background: `linear-gradient(180deg, ${member.color}, ${member.color}44)`,
            }} />
            <div>
              <div style={{
                fontSize: 14, fontWeight: 700, color: `${member.color}BB`,
                letterSpacing: 2, fontFamily: "'Space Grotesk', sans-serif",
              }}>
                LNGSHOT SONGS
              </div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.25)", marginTop: 2 }}>
                tracks featuring or written by {member.name.toLowerCase()}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {memberSongs.map((s, i) => (
              <SongCard key={s.id} song={s} album={s.album} index={i} onClick={() => onSongClick(s, s.album)} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── PhotoCard Components ───
function PhotoCard({ member, onClick }) {
  const [hover, setHover] = useState(false);
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [shimmerPos, setShimmerPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (y - 0.5) * 10, y: (x - 0.5) * -10 });
    setShimmerPos({ x: x * 100, y: y * 100 });
  };

  const handleMouseLeave = () => {
    setHover(false);
    setTilt({ x: 0, y: 0 });
    setShimmerPos({ x: 50, y: 50 });
  };

  const decorations = member.name === "OHYUL" ? "☀ ♪ ✦"
    : member.name === "RYUL" ? "♫ ★ ♪"
    : member.name === "WOOJIN" ? "✦ ♬ ♪"
    : "☁ ♪ ✧";

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHover(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick && onClick(member)}
      style={{
        perspective: "800px", WebkitPerspective: "800px",
        cursor: "pointer",
      }}
    >
      <div style={{
        position: "relative",
        borderRadius: 14,
        background: `linear-gradient(160deg, ${member.color}22 0%, rgba(15,15,30,0.95) 50%, ${member.color}15 100%)`,
        border: `1.5px solid ${member.color}${hover ? "77" : "44"}`,
        boxShadow: hover
          ? `0 12px 40px ${member.color}30, 0 0 20px ${member.color}18`
          : `0 4px 15px rgba(0,0,0,0.25)`,
        overflow: "hidden",
        transition: "all 0.3s ease",
        transform: hover
          ? `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.03)`
          : "none",
        padding: "16px 12px 14px",
        display: "flex", flexDirection: "column", alignItems: "center",
        textAlign: "center",
      }}>
        {/* Holographic shimmer overlay */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: hover
            ? `radial-gradient(circle at ${shimmerPos.x}% ${shimmerPos.y}%, rgba(255,255,255,0.12) 0%, transparent 50%)`
            : "none",
          zIndex: 2,
        }} />
        {/* Animated shimmer sweep */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: `linear-gradient(135deg, transparent 30%, ${member.color}15 45%, rgba(255,255,255,0.08) 50%, ${member.color}15 55%, transparent 70%)`,
          backgroundSize: "200% 200%",
          animation: "shimmer 3s ease-in-out infinite",
          zIndex: 1,
        }} />

        {/* Sparkle dots */}
        <div style={{
          position: "absolute", top: 10, right: 10,
          width: 4, height: 4, borderRadius: "50%",
          background: member.color, opacity: 0.4,
          animation: "sparkle 2s ease-in-out infinite",
          zIndex: 3,
        }} />
        <div style={{
          position: "absolute", top: 28, left: 12,
          width: 3, height: 3, borderRadius: "50%",
          background: member.color, opacity: 0.3,
          animation: "sparkle 2.5s ease-in-out infinite 0.5s",
          zIndex: 3,
        }} />

        {/* Member image */}
        <div style={{
          width: 80, height: 80, borderRadius: "50%",
          border: `2.5px solid ${member.color}55`,
          overflow: "hidden", marginBottom: 10,
          boxShadow: `0 4px 16px ${member.color}28`,
          position: "relative", zIndex: 3,
        }}>
          <img
            src={member.photocardImage}
            alt={member.name}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>

        {/* Member name */}
        <div style={{
          fontSize: 16, fontWeight: 800, color: member.color,
          fontFamily: "'Space Grotesk', sans-serif",
          letterSpacing: 0.5, position: "relative", zIndex: 3,
        }}>
          {member.name}
        </div>

        {/* Role */}
        <div style={{
          fontSize: 11, color: "rgba(255,255,255,0.4)",
          fontFamily: "'Space Grotesk', sans-serif",
          marginTop: 3, lineHeight: 1.3,
          position: "relative", zIndex: 3,
        }}>
          {member.role}
        </div>

        {/* Decorations */}
        <div style={{
          fontSize: 11, color: `${member.color}66`, marginTop: 8,
          letterSpacing: 4, position: "relative", zIndex: 3,
        }}>
          {decorations}
        </div>

        {/* Fan note */}
        <div style={{
          fontSize: 11, color: "rgba(255,255,255,0.25)", marginTop: 6,
          fontStyle: "italic", lineHeight: 1.4,
          position: "relative", zIndex: 3,
          overflow: "hidden",
          display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
        }}>
          {member.note}
        </div>
      </div>
    </div>
  );
}

function PhotoCardSection({ members, onMemberClick }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: "rgba(255, 182, 193, 0.5)", letterSpacing: 2, marginBottom: 12, fontFamily: "'Space Grotesk', sans-serif" }}>THE BOYS</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {members.map((m) => (
          <PhotoCard key={m.name} member={m} onClick={onMemberClick} />
        ))}
      </div>
    </div>
  );
}

// ─── Main App ───
export default function App() {
  const [view, setView] = useState("home");
  const [selectedSong, setSelectedSong] = useState(null);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const allSongs = ALBUMS.flatMap(album => album.songs.map(song => ({ ...song, album })));
  const filteredSongs = searchQuery
    ? allSongs.filter(s => s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.album.title.toLowerCase().includes(searchQuery.toLowerCase()) || (s.featuring && s.featuring.toLowerCase().includes(searchQuery.toLowerCase())) || s.vibe.toLowerCase().includes(searchQuery.toLowerCase()))
    : null;

  const openSong = (song, album) => { setSelectedSong(song); setSelectedAlbum(album); setView("song"); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const openMember = (member) => { setSelectedMember(member); setView("member"); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)", color: "#fff", fontFamily: "'Space Grotesk', 'Noto Sans KR', sans-serif", position: "relative" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700;800&family=Noto+Sans+KR:wght@300;400;500;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { margin: 0; background: #1a1a2e; }
        ::selection { background: #FF6B3566; color: #fff; }
        @keyframes floatUp { 0% { transform: translateY(0) rotate(0deg); opacity: 0.07; } 50% { opacity: 0.1; } 100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideIn { from { opacity: 0; transform: translateX(-10px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes gradientShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes shimmer { 0% { background-position: 200% 200%; } 50% { background-position: 0% 0%; } 100% { background-position: 200% 200%; } }
        @keyframes sparkle { 0%, 100% { opacity: 0.2; transform: scale(1); } 50% { opacity: 0.8; transform: scale(1.5); } }
        @keyframes cardFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        input::placeholder { color: rgba(255,255,255,0.3); }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 3px; }
      `}</style>

      <FloatingNotes />

      <div style={{ maxWidth: 580, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1, paddingBottom: 40 }}>
        {/* Header */}
        <header style={{ textAlign: "center", paddingTop: 40, paddingBottom: 10, animation: "fadeIn 0.5s ease" }}>
          <div style={{ fontSize: 16, color: "rgba(255, 182, 193, 0.5)", marginBottom: 8, fontStyle: "italic", letterSpacing: 0.5 }}>~ a fan page by a 4shoboiz ~</div>
          <div style={{ display: "inline-block", marginBottom: 6, background: "linear-gradient(135deg, #FF6B35, #E74C3C, #9B59B6, #3498DB)", backgroundSize: "300% 300%", animation: "gradientShift 4s ease infinite", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontSize: 48, fontWeight: 800, letterSpacing: -2, lineHeight: 1.1, fontFamily: "'Space Grotesk', sans-serif" }}>
            LNGSHOT
          </div>
          <div style={{ fontSize: 15, color: "rgba(255,255,255,0.35)", letterSpacing: 2, fontWeight: 500, marginTop: 2 }}>MUSIC & VIBES</div>
          <div style={{ fontSize: 14, color: "rgba(255,255,255,0.2)", marginTop: 10, letterSpacing: 1 }}>OHYUL · RYUL · WOOJIN · LOUIS</div>
          <div style={{ width: 40, height: 3, borderRadius: 2, background: "linear-gradient(90deg, #FF6B35, #9B59B6)", margin: "12px auto 0" }} />
        </header>

        {/* Welcome message */}
        {view === "home" && !searchQuery && (
          <div style={{ textAlign: "center", padding: "12px 0 20px", animation: "fadeIn 0.6s ease" }}>
            <div style={{ fontSize: 16, color: "rgba(255,255,255,0.4)", lineHeight: 1.8, fontFamily: "'Space Grotesk', sans-serif" }}>
              hi! welcome to my little corner of the internet dedicated to lngshot 🤍
              <br />
              <span style={{ fontSize: 14, color: "rgba(255,255,255,0.25)" }}>listen to their music, read my thoughts, and fall in love with them like i did</span>
            </div>
          </div>
        )}

        {view === "song" && selectedSong ? (
          <SongDetail song={selectedSong} album={selectedAlbum} onBack={() => { setView("home"); setSelectedSong(null); }} />
        ) : view === "member" && selectedMember ? (
          <MemberDetail
            member={selectedMember}
            allSongs={allSongs}
            onBack={() => { setView("home"); setSelectedMember(null); }}
            onSongClick={(song, album) => openSong(song, album)}
          />
        ) : (
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            {/* Search */}
            <div style={{ position: "relative", marginBottom: 20 }}>
              <input type="text" placeholder="search songs, members, vibes..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                style={{ width: "100%", padding: "15px 20px 15px 46px", borderRadius: 14, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.06)", color: "#fff", fontSize: 15, outline: "none", fontFamily: "'Space Grotesk', sans-serif", transition: "border-color 0.2s" }}
                onFocus={e => e.target.style.borderColor = "rgba(255,255,255,0.25)"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
              <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", fontSize: 16, opacity: 0.4 }}>🔍</span>
              {searchQuery && <button onClick={() => setSearchQuery("")} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.15)", border: "none", color: "#fff", width: 22, height: 22, borderRadius: "50%", cursor: "pointer", fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>}
            </div>

            {/* Search Results */}
            {filteredSongs && (
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", marginBottom: 12 }}>{filteredSongs.length} result{filteredSongs.length !== 1 ? "s" : ""} {filteredSongs.length === 0 && "😢"}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {filteredSongs.map((s, i) => <SongCard key={s.id} song={s} album={s.album} index={i} onClick={() => openSong(s, s.album)} />)}
                </div>
              </div>
            )}

            {/* Members — Photocard Collection */}
            {!searchQuery && <PhotoCardSection members={MEMBERS} onMemberClick={openMember} />}

            {/* Fun Fact */}
            {!searchQuery && <RandomFunFact />}

            {/* Hot Content + Latest Buzz */}
            {!searchQuery && <HotContent />}
            {!searchQuery && <LatestBuzz />}

            {/* Albums */}
            {!searchQuery && ALBUMS.map(album => (
              <div key={album.id} style={{ marginBottom: 36 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                  <div style={{ width: 5, height: 28, borderRadius: 3, background: `linear-gradient(180deg, ${album.color}, ${album.color}44)` }} />
                  <div>
                    <h3 style={{ fontSize: 20, fontWeight: 800, color: "#fff", fontFamily: "'Space Grotesk', sans-serif", letterSpacing: -0.3, margin: 0 }}>{album.title}</h3>
                    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>{album.type} · {album.date} · {album.songs.length} tracks</div>
                  </div>
                </div>

                {/* Album desc */}
                <div style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", lineHeight: 1.6, marginBottom: 8, paddingLeft: 17 }}>{album.desc}</div>

                {/* Album fan note */}
                <div style={{ marginBottom: 12, paddingLeft: 17 }}>
                  <FanNote text={album.fanNote} small />
                </div>

                {/* Spotify Album Embed */}
                {album.spotifyAlbumId && (
                  <div style={{ borderRadius: 14, overflow: "hidden", marginBottom: 16, border: `1px solid ${album.color}25` }}>
                    <iframe
                      style={{ borderRadius: 14, border: "none" }}
                      src={`https://open.spotify.com/embed/album/${album.spotifyAlbumId}?utm_source=generator&theme=0`}
                      width="100%" height="352" allowFullScreen
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                    />
                  </div>
                )}

                {/* Open on Spotify CTA */}
                {album.spotifyAlbumId && (
                  <a
                    href={`https://open.spotify.com/album/${album.spotifyAlbumId}`}
                    target="_blank" rel="noopener noreferrer"
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                      width: "100%", padding: "12px 16px", borderRadius: 12,
                      background: `${album.color}15`, border: `1px solid ${album.color}35`,
                      color: album.color, fontSize: 13, fontWeight: 600,
                      fontFamily: "'Space Grotesk', sans-serif", cursor: "pointer",
                      textDecoration: "none", transition: "all 0.2s ease"
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = `${album.color}30`; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = `${album.color}15`; }}
                  >
                    <SpotifyIcon />
                    open {album.title.toLowerCase()} on Spotify
                  </a>
                )}
              </div>
            ))}

            {/* Follow */}
            {!searchQuery && (
              <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 16, padding: "24px", border: "1px solid rgba(255,255,255,0.06)", marginBottom: 24, textAlign: "center" }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: "rgba(255,255,255,0.5)", marginBottom: 8, fontFamily: "'Space Grotesk', sans-serif" }}>go follow them!! seriously!!</div>
                <div style={{ fontSize: 14, color: "rgba(255,255,255,0.25)", marginBottom: 16, fontStyle: "italic" }}>they deserve the world and also your spotify streams</div>
                <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                  <LinkButton href="https://open.spotify.com/artist/2F4oTJOWkcD1JaTeKEa9h6?si=lHyAu2thR_C47o5uBJnk2Q" icon={<SpotifyIcon />} label="Spotify" color="rgba(29, 185, 84, 0.2)" />
                  <LinkButton href="https://www.youtube.com/@LNGSHOT4SHO" icon={<span style={{ fontSize: 13 }}>▶</span>} label="YouTube" color="rgba(255, 0, 0, 0.15)" />
                  <LinkButton href="https://www.instagram.com/lngshot4sho/" icon={<span style={{ fontSize: 13 }}>📸</span>} label="Instagram" color="rgba(225, 48, 108, 0.15)" />
                  <LinkButton href="https://www.tiktok.com/@lngshot4sho" icon={<span style={{ fontSize: 13 }}>🎵</span>} label="TikTok" color="rgba(255, 255, 255, 0.1)" />
                  <LinkButton href="https://x.com/lngshot4sho" icon={<span style={{ fontSize: 13 }}>𝕏</span>} label="Twitter" color="rgba(255, 255, 255, 0.1)" />
                </div>
              </div>
            )}

            {/* Footer */}
            <footer style={{ textAlign: "center", padding: "24px 0", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ fontSize: 14, color: "rgba(255,255,255,0.2)", lineHeight: 2 }}>
                made with so much 🤍 by a proud 4shoboiz
                <br />
                LNGSHOT · MORE VISION · Est. 2025
                <br />
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.12)" }}>
                  this is a fan-made page, not affiliated with MORE VISION or LNGSHOT
                  <br />
                  all music streamed via Spotify · lyrics available through Spotify's built-in feature
                </span>
              </div>
            </footer>
          </div>
        )}
      </div>
    </div>
  );
}
