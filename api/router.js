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
    id: "ttseries_villa",
    type: "series",
    name: "La Villa des coeurs brisés",
    poster: "https://photos.tf1.fr/354/531/poster-card-la-villa-2025-6909e4-db7bd0-0@3x.jpg",
    background: "https://images1.persgroep.net/rcs/-zRbIHTq5GfByBRo528B0boVfxY/diocontent/260937823/_fitwidth/1400?appId=038a353bad43ac27fd436dc5419c256b&quality=0.8&format=webp",
    logo: "https://photos.tf1.fr/220/110/logo-programme-la-villa-2025-0e5a1d-72c6f5-0@3x.png",  
    description: "Ils sont plébiscités par le public pour avoir vécu des histoires d'amour qui se sont mal terminées... Nous allons les aider à reprendre confiance en eux et leur donner toutes les clés pour séduire, afin qu'ils puissent, enfin, trouver le GRAND AMOUR !",
    genres: ["Reality", "Drama"],
    releaseInfo: "2025",
    imdbRating: "6.5",
    // Structure CORRIGÉE pour Stremio
    videos: [
      {
        id: "ttseries_villa:10:22",
        title: "Épisode 22",
        season: 10,
        episode: 22,
        released: "2025-09-07",
        thumbnail: "https://photos.tf1.fr/330/186/avant-premiere-la-villa-saison-10-episode-18-du-2-septembre-2025-31586572-1756106139-48428a-e6db9f-0@3x.jpg"
      },
      {
        id: "ttseries_villa:10:23",
        title: "Épisode 23",
        season: 10,
        episode: 23,
        released: "2025-09-08",
        thumbnail: "https://photos.tf1.fr/354/531/poster-card-la-villa-2025-6909e4-db7bd0-0@3x.jpg"
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
      type: "movie", 
      id: "directhls_movies", 
      name: "Direct HLS Movies",
      extra: [{ name: "search", isRequired: false }]
    },
    { 
      type: "series", 
      id: "directhls_series", 
      name: "Direct HLS Series",
      extra: [{ name: "search", isRequired: false }]
    }
  ],
  resources: [
    "catalog",
    "meta",
    "stream"
  ],
  types: ["movie", "series"],
  name: "Direct HLS Addon",
  description: "Streaming direct via HLS",
  idPrefixes: ["tt"]
};

// === Handler ===
export default function handler(req, res) {
  // CORS headers - ESSENTIEL pour Stremio
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    return res.end();
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;
  const parts = pathname.split('/').filter(Boolean);

  console.log('=== STREMIO REQUEST ===');
  console.log('Method:', req.method);
  console.log('URL:', req.url);
  console.log('Pathname:', pathname);
  console.log('Parts:', parts);
  console.log('Headers:', req.headers);
  console.log('========================');

  // Manifest - TOUJOURS répondre même si vide
  if (pathname === '/manifest.json') {
    console.log('Serving manifest.json');
    return sendJSON(res, manifest);
  }

  // Catalog
  if (parts[0] === 'catalog') {
    const catalogType = parts[1]; // movie or series
    const extraName = parts[2]; // extra parameter like "search"
    
    console.log('Catalog request:', catalogType, 'Extra:', extraName);

    const metas = catalogData
      .filter(item => item.type === catalogType)
      .map(item => ({
        id: item.id,
        type: item.type,
        name: item.name,
        poster: item.poster,
        posterShape: "regular",
        description: item.description,
        genres: item.genres,
        background: item.background,
        logo: item.logo
      }));
    
    console.log('Sending catalog with', metas.length, 'items');
    return sendJSON(res, { metas });
  }

  // Meta
  if (parts[0] === 'meta') {
    const type = parts[1]; // movie or series
    const id = parts[2] ? decodeURIComponent(stripJson(parts[2])) : '';
    
    console.log('Meta request for:', type, id);

    if (!id) {
      console.log('No ID provided for meta request');
      return sendJSON(res, { meta: {} });
    }

    const item = catalogData.find(x => x.id === id && x.type === type);
    
    if (!item) {
      console.log('Item not found:', id);
      return sendJSON(res, { meta: {} });
    }

    // STRUCTURE EXACTE REQUISE PAR STREMIO
    const meta = {
      id: item.id,
      type: item.type,
      name: item.name,
      poster: item.poster,
      background: item.background,
      logo: item.logo,
      description: item.description,
      genres: item.genres,
      releaseInfo: item.releaseInfo,
      imdbRating: item.imdbRating,
      
      // IMPORTANT: Stremio attend les vidéos dans ce format
      videos: item.videos ? item.videos.map(video => ({
        id: video.id,
        title: video.title,
        season: video.season,
        episode: video.episode,
        released: video.released,
        thumbnail: video.thumbnail
      })) : [],
      
      // Champs optionnels mais recommandés
      posterShape: "regular",
      banner: item.background,
      runtime: "60 min",
      year: "2025"
    };
    
    console.log('Sending meta for:', item.name);
    return sendJSON(res, { meta });
  }

  // Stream
  if (parts[0] === 'stream') {
    const type = parts[1]; // movie or series
    const id = parts[2] ? decodeURIComponent(stripJson(parts[2])) : '';
    
    console.log('Stream request for:', type, id);

    let streams = [];

    // Handle series episodes (format: ttseries_villa:10:22)
    if (type === 'series' && id && id.includes(':')) {
      const [seriesId, seasonNum, episodeNum] = id.split(':');
      console.log('Parsed stream ID:', { seriesId, seasonNum, episodeNum });
      
      const series = catalogData.find(x => x.id === seriesId && x.type === 'series');
      
      if (series) {
        // Mapping des streams basé sur l'ID de l'épisode
        const streamMap = {
          "ttseries_villa:10:22": "https://dainty-bienenstitch-92bfd0.netlify.app/Video.m3u8",
          "ttseries_villa:10:23": "https://super-creponne-012bcc.netlify.app/S10E23.m3u8"
        };
        
        if (streamMap[id]) {
          streams.push({
            name: "Direct HLS",
            title: `${series.name} - S${seasonNum}E${episodeNum}`,
            url: streamMap[id],
            behaviorHints: {
              notWebReady: false,
              bingeGroup: `directhls-${seriesId}`
            }
          });
          console.log('Stream found:', streamMap[id]);
        }
      }
    }

    console.log('Sending', streams.length, 'streams');
    return sendJSON(res, { streams });
  }

  // Si aucune route ne correspond, retourner une réponse vide
  console.log('Unknown route:', pathname);
  return sendJSON(res, {});
}
