// Vercel Serverless Function — YouTube search for LNGSHOT content
// Caches results for 6 hours to save API quota

let cache = { data: null, timestamp: 0 };
const CACHE_DURATION = 6 * 60 * 60 * 1000; // 6 hours

export default async function handler(req, res) {
  // CORS headers
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
    // Search for LNGSHOT content across all of YouTube, sorted by date
    const searchUrl = new URL("https://www.googleapis.com/youtube/v3/search");
    searchUrl.searchParams.set("part", "snippet");
    searchUrl.searchParams.set("q", "LNGSHOT 롱샷");
    searchUrl.searchParams.set("type", "video");
    searchUrl.searchParams.set("order", "date");
    searchUrl.searchParams.set("maxResults", "8");
    searchUrl.searchParams.set("relevanceLanguage", "en");
    searchUrl.searchParams.set("key", API_KEY);

    const response = await fetch(searchUrl.toString());
    if (!response.ok) {
      const err = await response.json();
      return res.status(response.status).json({ error: err.error?.message || "YouTube API error" });
    }

    const data = await response.json();

    const videos = data.items.map((item) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      channel: item.snippet.channelTitle,
      channelId: item.snippet.channelId,
      thumbnail: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
      publishedAt: item.snippet.publishedAt,
      description: item.snippet.description?.slice(0, 120),
    }));

    const result = { videos, updatedAt: new Date().toISOString() };
    cache = { data: result, timestamp: now };

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch YouTube data" });
  }
}
