// api/router.js
// === Ton catalogue ===
const catalogData = [
  {
    id: "tt20969586",
    type: "movie",
    name: "Thunderbolt",
    poster: "https://fr.web.img6.acsta.net/r_1920_1080/img/72/b7/72b74175dd05a704ebed57975b0f6487.jpg",
    description: "Sonny Hayes était le prodige de la F1 des années 90...",
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
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.statusCode = status;
  res.end(JSON.stringify(obj));
}

function stripJson(s) {
  return s.replace(/\.json$/, "");
}

// === Export Vercel Handler ===
export default function handler(req, res) {
  // Gestion des requêtes OPTIONS pour CORS
  if (req.method === 'OPTIONS') {
    return sendJSON(res, {}, 200);
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
        description: item.description,
        background: item.background || item.poster
      }));
    return sendJSON(res, { metas });
  }
  
  // Meta
  if (resource === "meta") {
    const cleanId = stripJson(id);
    console.log(`Serving meta for id: ${cleanId}`);
    const item = catalogData.find(x => x.id === cleanId);
    if (!item) {
      console.log(`Meta not found for id: ${cleanId}`);
      return sendJSON(res, { err: "Not found" }, 404);
    }
    return sendJSON(res, { meta: item });
  }
  
  // Stream - C'est ici le point critique !
  if (resource === "stream") {
    const cleanId = stripJson(id);
    console.log(`Serving stream for type: ${type}, id: ${cleanId}`);
    
    const item = catalogData.find(x => x.id === cleanId && x.type === type);
    
    if (!item) {
      console.log(`Stream not found for type: ${type}, id: ${cleanId}`);
      return sendJSON(res, { streams: [] });
    }
    
    console.log(`Stream found: ${item.stream}`);
    
    // Réponse stream avec plus d'informations
    const streamResponse = {
      streams: [
        {
          name: "Direct HLS",
          title: `${item.name} - Direct Stream`,
          url: item.stream,
          quality: "HD",
          // Ajout optionnel de headers si nécessaire
          behaviorHints: {
            countryWhitelist: ["FR", "US", "CA", "GB"],
            notWebReady: false
          }
        }
      ]
    };
    
    return sendJSON(res, streamResponse);
  }
  
  console.log(`Unknown route: ${url.pathname}`);
  return sendJSON(res, { err: "Unknown route" }, 404);
}
