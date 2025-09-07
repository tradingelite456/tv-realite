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

function fetchPosterFromIMDb(id) {
  return `https://images.metahub.space/poster/small/${id}/img`;
}

// === Catalogue ===
const catalogData = [

    {
    id: "tt5675334",
    type: "series",
    name: "La Villa des coeurs brisés",
    poster: "https://photos.tf1.fr/354/531/poster-card-la-villa-2025-6909e4-db7bd0-0@3x.jpg",
    background: "https://images1.persgroep.net/rcs/-zRbIHTq5GfByBRo528B0boVfxY/diocontent/260937823/_fitwidth/1400?appId=038a353bad43ac27fd436dc5419c256b&quality=0.8&format=webp",
    logo: "https://photos.tf1.fr/220/110/logo-programme-la-villa-2025-0e5a1d-72c6f5-0@3x.png",  
    description: "Ils sont plébiscités par le public pour avoir vécu des histoires d'amour qui se sont mal terminées... Nous allons les aider à reprendre confiance en eux et leur donner toutes les clés pour séduire, afin qu'ils puissent, enfin, trouver le GRAND AMOUR !",
    genres: ["Comedy", "Fantasy"],
    videos: [
      {
        id: "s10e22",
        title: "Épisode 22",
        season: 10,
        episode: 22,
        thumbnail: "https://photos.tf1.fr/330/186/avant-premiere-la-villa-saison-10-episode-18-du-2-septembre-2025-31586572-1756106139-48428a-e6db9f-0@3x.jpg",
        stream: "https://dainty-bienenstitch-92bfd0.netlify.app/Video.m3u8"
      },
      {
        id: "s10e23",
        title: "Épisode 23",
        season: 10,
        episode: 23,
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

  console.log('Request:', pathname, 'Parts:', parts);

  // Manifest
  if (pathname === '/manifest.json') {
    return sendJSON(res, manifest);
  }

  // Catalog
  if (parts[0] === 'catalog') {
    const catalogType = parts[1]; // movie or series
    const metas = catalogData
      .filter(item => item.type === catalogType)
      .map(item => ({
        id: item.id,
        type: item.type,
        name: item.name,
        poster: item.poster,
        posterShape: "regular",
        description: item.description || `${item.name} - Streaming direct`,
        genres: item.genres || ["Drama"]
      }));
    
    return sendJSON(res, { metas });
  }

  // Meta
  if (parts[0] === 'meta') {
    const type = parts[1]; // movie or series
    const id = decodeURIComponent(stripJson(parts[2]));
    
    console.log('Meta request for:', type, id);

    const item = catalogData.find(x => x.id === id && x.type === type);
    
    if (!item) {
      return sendJSON(res, { error: "Not found" }, 404);
    }

    if (item.type === 'movie') {
      const meta = {
        id: item.id,
        type: item.type,
        name: item.name,
        poster: item.poster,
        description: item.description,
        genres: item.genres,
        runtime: "120 min"
      };
      return sendJSON(res, { meta });
    } else if (item.type === 'series') {
      const meta = {
        id: item.id,
        type: item.type,
        name: item.name,
        poster: item.poster,
        description: item.description,
        genres: item.genres,
        videos: item.videos.map(video => ({
          id: `${item.id}:${video.season}:${video.episode}`,
          title: video.title,
          season: video.season,
          episode: video.episode,
          released: new Date().toISOString().split('T')[0]
        }))
      };
      return sendJSON(res, { meta });
    }
  }

  // Stream
  if (parts[0] === 'stream') {
    const type = parts[1]; // movie or series
    const id = decodeURIComponent(stripJson(parts[2]));
    
    console.log('Stream request for:', type, id);

    let streamUrl = null;
    let title = "";

    // Handle movies
    if (type === 'movie') {
      const movie = catalogData.find(x => x.id === id && x.type === 'movie');
      if (movie) {
        streamUrl = movie.stream;
        title = movie.name;
      }
    }
    
    // Handle series episodes (format: tt13443470:1:1)
    if (type === 'series' && id.includes(':')) {
      const [seriesId, season, episode] = id.split(':');
      const series = catalogData.find(x => x.id === seriesId && x.type === 'series');
      
      if (series && series.videos) {
        const video = series.videos.find(v => 
          v.season === parseInt(season) && v.episode === parseInt(episode)
        );
        
        if (video) {
          streamUrl = video.stream;
          title = `${series.name} - S${season}E${episode}`;
        }
      }
    }

    if (streamUrl) {
      const streamResponse = {
        streams: [
          {
            name: "Direct HLS",
            title: title,
            url: streamUrl,
            behaviorHints: {
              notWebReady: false,
              bingeGroup: `directhls-${type}`
            }
          }
        ]
      };
      return sendJSON(res, streamResponse);
    } else {
      console.log('No stream found for:', type, id);
      return sendJSON(res, { streams: [] });
    }
  }

  return sendJSON(res, { error: "Route not found" }, 404);
}
