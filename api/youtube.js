// Vercel Serverless Function — Latest LNGSHOT content from official channels
// Searches multiple official/trusted channels, returns the single latest video
// Caches results for 6 hours to save API quota

// Decode HTML entities from YouTube API (e.g. &#39; → ')
function decodeHtml(str) {
  if (!str) return str;
  const entities = { "&#39;": "'", "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#x27;": "'", "&#x2F;": "/" };
  return str.replace(/&#?\w+;/g, (match) => entities[match] || match);
}

let cache = { data: null, timestamp: 0 };
const CACHE_DURATION = 6 * 60 * 60 * 1000; // 6 hours

// Official & trusted channels that cover LNGSHOT
const OFFICIAL_CHANNELS = [
  { id: "UC8PPjyqCQJtNfEwHBcq_uxw", name: "LNGSHOT", badge: "OFFICIAL" },
  { id: "UCkR_4hIKdUTWz9wMPB-du8Q", name: "MORE VISION", badge: "LABEL" },
  { id: "UCweOkPb1wVVH0Q0Tlj4a5Pw", name: "1theK", badge: "MEDIA" },
];

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Cache-Control", "s-maxage=21600, stale-while-revalidate=3600");

  const now = Date.now();
  if (cache.data && now - cache.timestamp < CACHE_DURATION) {
    return res.status(200).json(cache.data);
  }

  const API_KEY = process.env.YOUTUBE_API_KEY;
  if (!API_KEY) {
    return res.status(500).json({ error: "YouTube API key not configured" });
  }

  try {
    // Search each official channel for LNGSHOT content in parallel
    const searches = OFFICIAL_CHANNELS.map(async (ch) => {
      const url = new URL("https://www.googleapis.com/youtube/v3/search");
      url.searchParams.set("part", "snippet");
      url.searchParams.set("channelId", ch.id);
      url.searchParams.set("q", "LNGSHOT");
      url.searchParams.set("type", "video");
      url.searchParams.set("order", "date");
      url.searchParams.set("maxResults", "3");
      url.searchParams.set("key", API_KEY);

      const resp = await fetch(url.toString());
      if (!resp.ok) return [];

      const data = await resp.json();
      return (data.items || []).map((item) => ({
        id: item.id.videoId,
        title: decodeHtml(item.snippet.title),
        channel: decodeHtml(item.snippet.channelTitle),
        channelId: item.snippet.channelId,
        badge: ch.badge,
        thumbnail:
          item.snippet.thumbnails.high?.url ||
          item.snippet.thumbnails.medium?.url ||
          item.snippet.thumbnails.default?.url,
        publishedAt: item.snippet.publishedAt,
        description: item.snippet.description?.slice(0, 150),
      }));
    });

    const results = await Promise.all(searches);
    const allVideos = results.flat();

    // Sort by publish date (newest first) and pick the latest one
    allVideos.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    const latest = allVideos[0] || null;

    const result = { video: latest, updatedAt: new Date().toISOString() };
    cache = { data: result, timestamp: now };

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch YouTube data" });
  }
}
