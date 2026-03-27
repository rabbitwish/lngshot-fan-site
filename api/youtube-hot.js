// Vercel Serverless Function — Most viewed LNGSHOT content from official channels
// Fetches videos sorted by view count, returns top 4
// Caches results for 6 hours to save API quota

function decodeHtml(str) {
  if (!str) return str;
  const entities = { "&#39;": "'", "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#x27;": "'", "&#x2F;": "/" };
  return str.replace(/&#?\w+;/g, (match) => entities[match] || match);
}

function formatViewCount(count) {
  const n = parseInt(count, 10);
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return n.toString();
}

let cache = { data: null, timestamp: 0 };
const CACHE_DURATION = 6 * 60 * 60 * 1000; // 6 hours

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
    // Search each official channel for LNGSHOT content sorted by view count
    const searches = OFFICIAL_CHANNELS.map(async (ch) => {
      const url = new URL("https://www.googleapis.com/youtube/v3/search");
      url.searchParams.set("part", "snippet");
      url.searchParams.set("channelId", ch.id);
      url.searchParams.set("q", "LNGSHOT");
      url.searchParams.set("type", "video");
      url.searchParams.set("order", "viewCount");
      url.searchParams.set("maxResults", "5");
      url.searchParams.set("key", API_KEY);

      const resp = await fetch(url.toString());
      if (!resp.ok) return [];

      const data = await resp.json();
      return (data.items || []).map((item) => ({
        id: item.id.videoId,
        title: decodeHtml(item.snippet.title),
        channel: decodeHtml(item.snippet.channelTitle),
        badge: ch.badge,
        thumbnail:
          item.snippet.thumbnails.high?.url ||
          item.snippet.thumbnails.medium?.url ||
          item.snippet.thumbnails.default?.url,
        publishedAt: item.snippet.publishedAt,
      }));
    });

    const results = await Promise.all(searches);
    const allVideos = results.flat();

    // Deduplicate by video ID
    const seen = new Set();
    const unique = allVideos.filter((v) => {
      if (seen.has(v.id)) return false;
      seen.add(v.id);
      return true;
    });

    // Fetch actual view counts from the videos endpoint
    const videoIds = unique.map((v) => v.id).join(",");
    if (!videoIds) {
      const result = { videos: [], updatedAt: new Date().toISOString() };
      cache = { data: result, timestamp: now };
      return res.status(200).json(result);
    }

    const statsUrl = new URL("https://www.googleapis.com/youtube/v3/videos");
    statsUrl.searchParams.set("part", "statistics");
    statsUrl.searchParams.set("id", videoIds);
    statsUrl.searchParams.set("key", API_KEY);

    const statsResp = await fetch(statsUrl.toString());
    const statsData = statsResp.ok ? await statsResp.json() : { items: [] };

    // Map view counts back to videos
    const viewMap = {};
    for (const item of statsData.items || []) {
      viewMap[item.id] = parseInt(item.statistics.viewCount || "0", 10);
    }

    const videosWithViews = unique.map((v) => ({
      ...v,
      viewCount: viewMap[v.id] || 0,
      viewCountFormatted: formatViewCount(viewMap[v.id] || 0),
    }));

    // Sort by view count (highest first) and take top 4
    videosWithViews.sort((a, b) => b.viewCount - a.viewCount);
    const top4 = videosWithViews.slice(0, 4);

    const result = { videos: top4, updatedAt: new Date().toISOString() };
    cache = { data: result, timestamp: now };

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch YouTube data" });
  }
}
