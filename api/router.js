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
    // Episodes organisés par saison
    episodes: {
      10: [
        {
          id: "ttseries_villa:10:22",
          title: "Épisode 22",
          season: 10,
          episode: 22,
          overview: "Épisode 22 de la saison 10",
          released: "2025-09-07T00:00:00.000Z",
          thumbnail: "https://photos.tf1.fr/330/186/avant-premiere-la-villa-saison-10-episode-18-du-2-septembre-2025-31586572-1756106139-48428a-e6db9f-0@3x.jpg",
          stream: "https://dainty-bienenstitch-92bfd0.netlify.app/Video.m3u8"
        },
        {
          id: "ttseries_villa:10:23",
          title: "Épisode 23",
          season: 10,
          episode: 23,
          overview: "Épisode 23 de la saison 10",
          released: "2025-09-08T00:00:00.000Z",
          thumbnail: "https://photos.tf1.fr/354/531/poster-card-la-villa-2025-6909e4-db7bd0-0@3x.jpg",
          stream: "https://super-creponne-012bcc.netlify.app/S10E23.m3u8"
        }
      ]
    }
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
      name: "Direct HLS Series"
    }
  ],
  resources: [
    "catalog",
    "meta",
    "stream"
  ],
  types: ["series"],
  name: "Direct HLS Addon",
  description: "Streaming direct via HLS pour télé-réalité",
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

  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;
  const parts = pathname.split('/').filter(Boolean);

  console.log('=== REQUEST DEBUG ===');
  console.log('Full URL:', req.url);
  console.log('Pathname:', pathname);
  console.log('Parts:', parts);
  console.log('Method:', req.method);

  // Route: /manifest.json
  if (pathname === '/manifest.json' || (parts.length === 1 && parts[0] === 'manifest.json')) {
    console.log('Serving manifest');
    return sendJSON(res, manifest);
  }

  // Route: /catalog/series/directhls_series.json
  if (parts[0] === 'catalog' && parts.length >= 3) {
    const catalogType = parts[1]; // series
    const catalogId = stripJson(parts[2]); // directhls_series
    
    console.log('Catalog request - Type:', catalogType, 'ID:', catalogId);

    if (catalogType === 'series') {
      const metas = catalogData
        .filter(item => item.type === 'series')
        .map(item => ({
          id: item.id,
          type: item.type,
          name: item.name,
          poster: item.poster,
          posterShape: "regular",
          description: item.description,
          genres: item.genres,
          background: item.background,
          logo: item.logo,
          releaseInfo: item.releaseInfo,
          imdbRating: item.imdbRating
        }));
      
      console.log('Sending catalog with', metas.length, 'items');
      return sendJSON(res, { metas });
    }
  }

  // Route: /meta/series/ttseries_villa.json
  if (parts[0] === 'meta' && parts.length >= 3) {
    const type = parts[1]; // series
    const id = decodeURIComponent(stripJson(parts[2])); // ttseries_villa
    
    console.log('Meta request - Type:', type, 'ID:', id);

    const item = catalogData.find(x => x.id === id && x.type === type);
    
    if (!item) {
      console.log('Item not found for meta request');
      return sendJSON(res, { meta: null }, 404);
    }

    if (item.type === 'series') {
      // Construire la liste des saisons avec leurs épisodes
      const videos = [];
      
      // Parcourir toutes les saisons disponibles
      Object.keys(item.episodes).forEach(seasonNum => {
        const seasonEpisodes = item.episodes[seasonNum];
        seasonEpisodes.forEach(episode => {
          videos.push({
            id: episode.id,
            title: episode.title,
            season: episode.season,
            episode: episode.episode,
            overview: episode.overview,
            released: episode.released,
            thumbnail: episode.thumbnail
          });
        });
      });

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
        posterShape: "regular",
        videos: videos // CRUCIAL: Stremio a besoin de cette liste d'épisodes
      };
      
      console.log('Sending series meta with', videos.length, 'episodes');
      return sendJSON(res, { meta });
    }
  }

  // Route: /stream/series/ttseries_villa:10:22.json
  if (parts[0] === 'stream' && parts.length >= 3) {
    const type = parts[1]; // series
    const id = decodeURIComponent(stripJson(parts[2])); // ttseries_villa:10:22
    
    console.log('Stream request - Type:', type, 'ID:', id);

    let streams = [];

    // Gérer les épisodes de séries (format: ttseries_villa:10:22)
    if (type === 'series' && id.includes(':')) {
      const idParts = id.split(':');
      if (idParts.length >= 3) {
        const [seriesId, seasonNum, episodeNum] = idParts;
        const series = catalogData.find(x => x.id === seriesId && x.type === 'series');
        
        console.log('Looking for series:', seriesId, 'season:', seasonNum, 'episode:', episodeNum);
        
        if (series && series.episodes && series.episodes[seasonNum]) {
          const episode = series.episodes[seasonNum].find(e => e.episode === parseInt(episodeNum));
          
          if (episode && episode.stream) {
            console.log('Found episode stream:', episode.stream);
            streams.push({
              name: "Direct HLS",
              title: `${series.name} - S${seasonNum}E${episodeNum} - ${episode.title}`,
              url: episode.stream,
              behaviorHints: {
                notWebReady: false,
                bingeGroup: `directhls-${seriesId}-s${seasonNum}`
              }
            });
          } else {
            console.log('Episode not found or no stream URL');
          }
        } else {
          console.log('Series not found or no episodes for season');
        }
      }
    }

    console.log('Sending', streams.length, 'streams');
    return sendJSON(res, { streams });
  }

  // Route non trouvée
  console.log('Route not found:', pathname);
  return sendJSON(res, { error: "Route not found", path: pathname }, 404);
}
