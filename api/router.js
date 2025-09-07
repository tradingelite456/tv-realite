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

// === Catalogue ===
const catalogData = [
  {
    id: "ttvilla2025",
    type: "series",
    name: "La Villa des coeurs brisés",
    poster: "https://photos.tf1.fr/354/531/poster-card-la-villa-2025-6909e4-db7bd0-0@3x.jpg",
    background: "https://images1.persgroep.net/rcs/-zRbIHTq5GfByBRo528B0boVfxY/diocontent/260937823/_fitwidth/1400?appId=038a353bad43ac27fd436dc5419c256b&quality=0.8&format=webp",
    description: "Ils sont plébiscités par le public pour avoir vécu des histoires d'amour qui se sont mal terminées... Nous allons les aider à reprendre confiance en eux et leur donner toutes les clés pour séduire, afin qu'ils puissent, enfin, trouver le GRAND AMOUR !",
    genres: ["Reality", "Drama"],
    releaseInfo: "2025",
    imdbRating: "6.5",
    year: "2025",
    
    // STRUCTURE EXACTE POUR STREMIO
    episodes: [
      {
        id: "ttvilla2025:10:22",
        title: "Épisode 22",
        season: 10,
        episode: 22,
        released: new Date().toISOString(),
        thumbnail: "https://photos.tf1.fr/330/186/avant-premiere-la-villa-saison-10-episode-18-du-2-septembre-2025-31586572-1756106139-48428a-e6db9f-0@3x.jpg",
        stream: "https://dainty-bienenstitch-92bfd0.netlify.app/Video.m3u8"
      },
      {
        id: "ttvilla2025:10:23",
        title: "Épisode 23",
        season: 10,
        episode: 23,
        released: new Date().toISOString(),
        thumbnail: "https://photos.tf1.fr/354/531/poster-card-la-villa-2025-6909e4-db7bd0-0@3x.jpg",
        stream: "https://super-creponne-012bcc.netlify.app/S10E23.m3u8"
      }
    ]
  }
];

// === Manifest ===
const manifest = {
  id: "community.directhls",
  version: "1.0.0",
  catalogs: [
    { 
      type: "series", 
      id: "directhls_series", 
      name: "Direct HLS Series",
      extra: [{ name: "search", isRequired: false }]
    }
  ],
  resources: ["catalog", "meta", "stream"],
  types: ["series"],
  name: "Direct HLS Addon",
  description: "Streaming direct via HLS",
  idPrefixes: ["tt"]
};

// === Handler ===
export default function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    return res.end();
  }

  const url = new URL(req.url, "http://localhost");
  const pathname = url.pathname;
  const parts = pathname.split('/').filter(Boolean);

  console.log('📨 Request:', req.method, pathname);

  // Manifest
  if (pathname === '/manifest.json') {
    console.log('📋 Sending manifest');
    return sendJSON(res, manifest);
  }

  // Catalog
  if (parts[0] === 'catalog' && parts[1] === 'series' && parts[2] === 'directhls_series.json') {
    console.log('📚 Sending catalog');
    const metas = catalogData.map(item => ({
      id: item.id,
      type: item.type,
      name: item.name,
      poster: item.poster,
      posterShape: "regular",
      description: item.description,
      genres: item.genres,
      background: item.background,
      year: item.year
    }));
    
    return sendJSON(res, { metas });
  }

  // Meta
  if (parts[0] === 'meta' && parts[1] === 'series') {
    const id = decodeURIComponent(stripJson(parts[2]));
    console.log('🔍 Meta request for series:', id);

    const item = catalogData.find(x => x.id === id);
    
    if (!item) {
      console.log('❌ Series not found:', id);
      return sendJSON(res, { meta: {} });
    }

    // STRUCTURE EXACTE QUE STREMIO ATTEND POUR LES SÉRIES
    const meta = {
      id: item.id,
      type: item.type,
      name: item.name,
      poster: item.poster,
      background: item.background,
      description: item.description,
      genres: item.genres,
      releaseInfo: item.releaseInfo,
      imdbRating: item.imdbRating,
      year: item.year,
      
      // CHAMPS OBLIGATOIRES POUR STREMIO
      posterShape: "regular",
      runtime: "60 min",
      
      // INFO DES ÉPISODES (Stremio récupère ça via le endpoint stream)
      videos: item.episodes.map(ep => ({
        id: ep.id,
        title: ep.title,
        season: ep.season,
        episode: ep.episode,
        released: ep.released,
        thumbnail: ep.thumbnail
      }))
    };

    console.log('✅ Sending meta for:', item.name);
    return sendJSON(res, { meta });
  }

  // Stream
  if (parts[0] === 'stream' && parts[1] === 'series') {
    const id = decodeURIComponent(stripJson(parts[2]));
    console.log('🎬 Stream request for:', id);

    let streamUrl = null;
    let title = "";

    if (id.includes(':')) {
      const [seriesId, seasonNum, episodeNum] = id.split(':');
      const series = catalogData.find(x => x.id === seriesId);
      
      if (series && series.episodes) {
        const episode = series.episodes.find(ep => 
          ep.season === parseInt(seasonNum) && ep.episode === parseInt(episodeNum)
        );
        
        if (episode && episode.stream) {
          streamUrl = episode.stream;
          title = episode.title;
          console.log('✅ Found stream:', streamUrl);
        }
      }
    }

    if (streamUrl) {
      const response = {
        streams: [{
          name: "Direct HLS",
          title: title,
          url: streamUrl,
          behaviorHints: {
            notWebReady: false,
            bingeGroup: "directhls-series"
          }
        }]
      };
      return sendJSON(res, response);
    } else {
      console.log('❌ No stream found for:', id);
      return sendJSON(res, { streams: [] });
    }
  }

  console.log('❌ Route not found:', pathname);
  return sendJSON(res, { error: "Route not found" }, 404);
}
