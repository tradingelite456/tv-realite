// api/router.js

// === Ton catalogue ===
const catalogData = [
  {
    id: "tt20969586",
    type: "movie",
    stream: "https://pulse.topstrime.online/movie/911430/xjycgu/master.m3u8"
  }
  // ajoute tes films/séries ici
];

// === Manifest ===
const manifest = {
  id: "community.directhls",
  version: "1.0.0",
  catalogs: [
    { type: "movie", id: "directhls_movies", name: "Direct HLS Movies" },
    { type: "series", id: "directhls_series", name: "Direct HLS Series" }
  ],
  resources: [
    { name: "catalog", types: ["movie", "series"], idPrefixes: ["tt", "series_"] },
    { name: "meta", types: ["movie", "series"], idPrefixes: ["tt", "series_"] },
    { name: "stream", types: ["movie", "series"], idPrefixes: ["tt", "series_"] }
  ],
  types: ["movie", "series"],
  name: "Direct HLS Addon",
  description: "Streaming direct via HLS"
};

// === Helpers ===
function sendJSON(res, obj, status = 200) {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.statusCode = status;
  res.end(JSON.stringify(obj));
}

function stripJson(s) {
  return s.replace(/\.json$/, "");
}

// === Export Vercel Handler ===
export default function handler(req, res) {
  const url = new URL(req.url, "http://localhost");
  const parts = url.pathname.split("/").filter(Boolean);

  if (!parts.length) return sendJSON(res, { err: "No route" }, 404);

  const [resource, type, id] = parts;

  // Manifest
  if (url.pathname === "/manifest.json" || url.pathname === "/manifest") {
    return sendJSON(res, manifest);
  }

  // Catalog
  if (resource === "catalog") {
    const metas = catalogData
      .filter(x => x.type === type)
      .map(item => ({
        id: item.id,
        type: item.type,
        name: item.name,
        poster: item.poster,
        description: item.description,
        background: item.background || item.poster
      }));
    return sendJSON(res, { metas });
  }

  // Meta
  if (resource === "meta") {
    const item = catalogData.find(x => x.id === stripJson(id));
    if (!item) return sendJSON(res, { err: "Not found" }, 404);
    return sendJSON(res, { meta: item });
  }

  // Stream
  if (resource === "stream") {
    const item = catalogData.find(x => x.id === stripJson(id));
    if (!item) return sendJSON(res, { streams: [] });
    return sendJSON(res, {
      streams: [{ name: "Direct HLS", title: item.name, url: item.stream }]
    });
  }

  return sendJSON(res, { err: "Unknown route" }, 404);
}
