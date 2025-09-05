// api/router.js

// === Helpers ===
function sendJSON(res, obj, status = 200) {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.statusCode = status;
  res.end(JSON.stringify(obj));
}

function stripJson(s) {
  return s.replace(/\.json$/, "");
}

// === Fonction pour récupérer le poster automatiquement depuis IMDb ===
function fetchPosterFromIMDb(id) {
  return `https://images.metahub.space/poster/small/${id}/img`;
}

// === Ton catalogue dynamique ===
const catalogData = [
  {
    id: "tt20969586",
    type: "movie",
    name: "Thunderbolt",
    stream: "https://pulse.topstrime.online/movie/986056/82nb0j/master.m3u8"
  },
  {
    id: "tt16311594",
    type: "movie",
    name: "F1 (Le Film)",
    stream: "https://pulse.topstrime.online/movie/911430/1o9d0a/master.m3u8"
  },
  {
    id: "tt33613785",
    name: "God Save the Tuche",
    type: "movie",
    stream: "https://pulse.topstrime.online/movie/1137759/croued/master.m3u8"
  },
  {
    id: "tt13443470",
    type: "series",
    name: "Mercredi",
    poster: fetchPosterFromIMDb("tt13443470"),
    description: "Série Netflix suivant les aventures de Mercredi Addams à l’Académie Nevermore.",
    videos: [
      {
        id: "tt13443470:1:1",
        title: "Saison 1 Épisode 1",
        season: 1,
        episode: 1,
        stream: "https://pulse.topstrime.online/series/mercredi/s1e1/master.m3u8"
      },
      {
        id: "tt13443470:1:2",
        title: "Saison 1 Épisode 2",
        season: 1,
        episode: 2,
        stream: "https://pulse.topstrime.online/series/mercredi/s1e2/master.m3u8"
      }
      // ajoute les autres épisodes ici...
    ]
  }
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

// === Export Vercel Handler ===
export default function handler(req, res) {
  // === CORS pour toutes les routes ===
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

  // Réponse aux requêtes OPTIONS (préflight)
  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    return res.end();
  }

  const url = new URL(req.url, "http://localhost");
  const parts = url.pathname.split("/").filter(Boolean);

  console.log("URL demandée:", url.pathname);
  console.log("Parts:", parts);

  if (!parts.length) return sendJSON(res, { err: "No route" }, 404);

  const [resource, type, id] = parts;

  // Manifest
  if (url.pathname === "/manifest.json" || url.pathname === "/manifest") {
    console.log("Serving manifest");
    return sendJSON(res, manifest);
  }

  // Catalog
  if (resource === "catalog") {
    console.log(`Serving catalog for type: ${type}`);
    const metas = catalogData
      .filter(x => x.type === type)
      .map(item => ({
        id: item.id,
        type: item.type,
        name: item.name,
        poster: item.poster,
        posterShape: "regular",
        description: item.description,
        background: item.background || item.poster
      }));
    return sendJSON(res, { metas });
  }

  // Meta
  if (resource === "meta") {
    const cleanId = stripJson(id);
    let item = catalogData.find(x => x.id === cleanId);

    // Si pas trouvé et type series, chercher épisode
    if (!item && type === "series") {
      for (const series of catalogData.filter(x => x.type === "series")) {
        const episode = series.videos?.find(v => v.id === cleanId);
        if (episode) {
          item = { ...episode, name: series.name };
          break;
        }
      }
    }

    if (!item) {
      console.log(`Meta not found for id: ${cleanId}`);
      return sendJSON(res, { err: "Not found" }, 404);
    }

    return sendJSON(res, { meta: item });
  }

  // Stream
  if (resource === "stream") {
    let cleanId = stripJson(id).replace(/\./g, ":"); // <-- conversion si nécessaire
    let item = null;

    if (type === "movie") {
      item = catalogData.find(x => x.id === cleanId && x.type === "movie");
    } else if (type === "series") {
      for (const series of catalogData.filter(x => x.type === "series")) {
        const episode = series.videos?.find(v => v.id === cleanId);
        if (episode) {
          item = { ...episode, name: series.name };
          break;
        }
      }
    }

    if (!item) {
      console.log(`Stream not found for type: ${type}, id: ${cleanId}`);
      return sendJSON(res, { streams: [] });
    }

    const streamResponse = {
      streams: [
        {
          name: "Direct HLS",
          title: `${item.name} - Direct Stream`,
          url: item.stream,
          quality: "HD",
          behaviorHints: { countryWhitelist: ["FR", "US", "CA", "GB"], notWebReady: false }
        }
      ]
    };

    return sendJSON(res, streamResponse);
  }

  console.log(`Unknown route: ${url.pathname}`);
  return sendJSON(res, { err: "Unknown route" }, 404);
}
