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
  { name: "OHYUL", role: "Leader · Lead Vocal", color: "#FF6B35", emoji: "🎤", note: "our leader!! his voice is so warm" },
  { name: "RYUL", role: "Main Rapper", color: "#E74C3C", emoji: "🔥", note: "flow king. trust the process" },
  { name: "WOOJIN", role: "Dancer · Composer", color: "#9B59B6", emoji: "💫", note: "writes, dances, sings... is there anything he can't do??" },
  { name: "LOUIS", role: "Main Vocal · Maknae", color: "#3498DB", emoji: "🌟", note: "baby of the group but his vocals are NO joke" },
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

// ─── Latest Buzz (YouTube search across all channels) ───
function LatestBuzz() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const [updatedAt, setUpdatedAt] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch("/api/youtube");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setVideos(data.videos || []);
        setUpdatedAt(data.updatedAt);
      } catch (e) {
        setError("couldn't load latest buzz right now");
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
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
    return `${weeks}w ago`;
  };

  if (error) return null; // silently hide if API fails

  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <div style={{
          width: 5, height: 28, borderRadius: 3,
          background: "linear-gradient(180deg, #FBBF24, #FBBF2444)",
        }} />
        <div style={{ flex: 1 }}>
          <div style={{
            fontSize: 14, fontWeight: 700, color: "rgba(251, 191, 36, 0.7)",
            letterSpacing: 2, fontFamily: "'Space Grotesk', sans-serif",
          }}>
            📡 LATEST BUZZ
          </div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.25)", marginTop: 2 }}>
            fresh LNGSHOT content from across YouTube
          </div>
        </div>
        {updatedAt && (
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.15)", fontFamily: "'Space Grotesk', sans-serif" }}>
            updated {timeAgo(updatedAt)}
          </div>
        )}
      </div>

      {loading ? (
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center",
          padding: "30px 0", gap: 10,
        }}>
          <div style={{
            width: 24, height: 24, border: "3px solid rgba(251, 191, 36, 0.15)",
            borderTopColor: "#FBBF24", borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }} />
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.25)", fontFamily: "'Space Grotesk', sans-serif" }}>
            scanning YouTube...
          </div>
        </div>
      ) : (
        <>
          {/* Inline player */}
          {activeVideo && (
            <div style={{
              borderRadius: 14, overflow: "hidden", marginBottom: 12,
              border: "1px solid rgba(251, 191, 36, 0.15)",
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

          {/* Video list */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {videos.map((v) => (
              <div
                key={v.id}
                onClick={() => setActiveVideo(v.id)}
                style={{
                  display: "flex", gap: 12, padding: "10px 12px",
                  borderRadius: 12, cursor: "pointer",
                  background: activeVideo === v.id
                    ? "rgba(251, 191, 36, 0.08)"
                    : "rgba(255,255,255,0.03)",
                  border: activeVideo === v.id
                    ? "1px solid rgba(251, 191, 36, 0.2)"
                    : "1px solid rgba(255,255,255,0.05)",
                  transition: "all 0.2s ease",
                  alignItems: "center",
                }}
              >
                {/* Thumbnail */}
                <div style={{
                  position: "relative", flexShrink: 0,
                  width: 110, borderRadius: 8, overflow: "hidden",
                  aspectRatio: "16/9",
                }}>
                  <img
                    src={v.thumbnail}
                    alt={v.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                  <div style={{
                    position: "absolute", inset: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: "rgba(0,0,0,0.2)",
                  }}>
                    <div style={{
                      width: 26, height: 26, borderRadius: "50%",
                      background: "rgba(255,255,255,0.85)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <span style={{ fontSize: 10, marginLeft: 1, color: "#111" }}>▶</span>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.8)",
                    fontFamily: "'Space Grotesk', sans-serif",
                    overflow: "hidden", textOverflow: "ellipsis",
                    display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
                    lineHeight: 1.4,
                  }}>
                    {v.title}
                  </div>
                  <div style={{
                    fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 4,
                    fontFamily: "'Space Grotesk', sans-serif",
                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                  }}>
                    {v.channel}
                  </div>
                  <div style={{
                    fontSize: 11, color: "rgba(251, 191, 36, 0.4)", marginTop: 2,
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}>
                    {timeAgo(v.publishedAt)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ─── Main App ───
export default function App() {
  const [view, setView] = useState("home");
  const [selectedSong, setSelectedSong] = useState(null);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const allSongs = ALBUMS.flatMap(album => album.songs.map(song => ({ ...song, album })));
  const filteredSongs = searchQuery
    ? allSongs.filter(s => s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.album.title.toLowerCase().includes(searchQuery.toLowerCase()) || (s.featuring && s.featuring.toLowerCase().includes(searchQuery.toLowerCase())) || s.vibe.toLowerCase().includes(searchQuery.toLowerCase()))
    : null;

  const openSong = (song, album) => { setSelectedSong(song); setSelectedAlbum(album); setView("song"); window.scrollTo({ top: 0, behavior: "smooth" }); };

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

            {/* Members */}
            {!searchQuery && (
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "rgba(255, 182, 193, 0.5)", letterSpacing: 2, marginBottom: 12, fontFamily: "'Space Grotesk', sans-serif" }}>THE BOYS</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {MEMBERS.map(m => (
                    <div key={m.name} onClick={() => setSearchQuery(m.name.charAt(0) + m.name.slice(1).toLowerCase())} style={{ background: `${m.color}18`, border: `1px solid ${m.color}33`, borderRadius: 14, padding: "16px 14px", textAlign: "center", cursor: "pointer", transition: "all 0.2s" }}>
                      <div style={{ fontSize: 26, marginBottom: 6 }}>{m.emoji}</div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: m.color, fontFamily: "'Space Grotesk', sans-serif" }}>{m.name}</div>
                      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 3, lineHeight: 1.3 }}>{m.role}</div>
                      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", marginTop: 6, fontStyle: "italic", lineHeight: 1.4 }}>{m.note}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

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

                <SpotifyAlbumCard title={album.title} type={album.type} date={album.date} trackCount={album.songs.length} spotifyAlbumId={album.spotifyAlbumId} color={album.color} />

                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {album.songs.map((song, i) => <SongCard key={song.id} song={song} album={album} index={i} onClick={() => openSong(song, album)} />)}
                </div>
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
