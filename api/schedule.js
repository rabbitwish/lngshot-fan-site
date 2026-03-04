// Vercel Serverless Function — LNGSHOT Schedule from Google Calendar
// Fetches upcoming events from a public LNGSHOT calendar
// Caches results for 1 hour

let cache = { data: null, timestamp: 0 };
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

// Public LNGSHOT Events calendar
const LNGSHOT_CALENDAR_ID = "218b7375b31e6218c39a60873e26d2da7599eb3c4c7119ebceeeb362ea954137@group.calendar.google.com";

function parseDescription(desc) {
  if (!desc) return { note: "", ticketUrl: "", tags: [] };
  const lines = desc.split("\n");
  let note = "";
  let ticketUrl = "";
  let tags = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("Tickets:")) {
      ticketUrl = trimmed.replace("Tickets:", "").trim();
    } else if (trimmed.startsWith("Tags:")) {
      tags = trimmed.replace("Tags:", "").trim().split(",").map(t => t.trim()).filter(Boolean);
    } else if (!trimmed.startsWith("Venue:") && note === "" && trimmed.length > 0) {
      note = trimmed;
    }
  }

  return { note, ticketUrl, tags };
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=1800");

  const now = Date.now();
  if (cache.data && now - cache.timestamp < CACHE_DURATION) {
    return res.status(200).json(cache.data);
  }

  // Use GOOGLE_API_KEY if set, otherwise try YOUTUBE_API_KEY (same Google Cloud project)
  const API_KEY = process.env.GOOGLE_API_KEY || process.env.YOUTUBE_API_KEY;
  const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID || LNGSHOT_CALENDAR_ID;

  if (!API_KEY) {
    return res.status(500).json({ error: "Google API key not configured. Set GOOGLE_API_KEY or YOUTUBE_API_KEY env var." });
  }

  try {
    const timeMin = new Date().toISOString();
    const url = new URL(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events`);
    url.searchParams.set("key", API_KEY);
    url.searchParams.set("timeMin", timeMin);
    url.searchParams.set("maxResults", "5");
    url.searchParams.set("singleEvents", "true");
    url.searchParams.set("orderBy", "startTime");

    const resp = await fetch(url.toString());
    if (!resp.ok) {
      const errText = await resp.text();
      console.error("Google Calendar API error:", resp.status, errText);
      return res.status(502).json({ error: "Failed to fetch calendar data", status: resp.status });
    }

    const data = await resp.json();
    const events = (data.items || []).map(item => {
      const { note, ticketUrl, tags } = parseDescription(item.description);
      return {
        id: item.id,
        title: (item.summary || "").replace(/^\[LNGSHOT\]\s*/i, "").trim(),
        date: item.start.dateTime || item.start.date,
        endDate: item.end.dateTime || item.end.date,
        venue: item.location || "",
        note,
        ticketUrl,
        tags,
        color: "#FF3CAC",
      };
    });

    const result = {
      events,
      nextEvent: events[0] || null,
      updatedAt: new Date().toISOString(),
    };

    cache = { data: result, timestamp: now };
    return res.status(200).json(result);
  } catch (err) {
    console.error("Schedule API error:", err);
    return res.status(500).json({ error: "Failed to fetch schedule" });
  }
}
