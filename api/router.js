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
          id: "ttseries_villa:10:1",
          title: "Épisode 1",
          season: 10,
          episode: 1,
          overview: "Épisode 1 de la saison 10",
          released: "2025-08-10T00:00:00.000Z",
          thumbnail: "https://photos.tf1.fr/1200/720/la-villa-des-coeurs-brises-saison-10-episode-01-du-11-aout-2025-90165525-1755069694-b9ffe9-36fe10-0@1x.jpg",
          stream: "https://preeminent-zuccutto-7d84c8.netlify.app/S10E1/S10E1.m3u8"
        },
            {
          id: "ttseries_villa:10:2",
          title: "Épisode 2",
          season: 10,
          episode: 2,
          overview: "Épisode 2 de la saison 10",
          released: "2025-08-11T00:00:00.000Z",
          thumbnail: "https://photos.tf1.fr/1200/720/la-villa-des-coeurs-brises-saison-10-episode-02-du-11-aout-2025-23214497-1755069707-05f308-86b4ce-0@1x.jpg",
          stream: "https://velvety-rugelach-5ae261.netlify.app/S10E2.m3u8"
        },
        {
          id: "ttseries_villa:10:3",
          title: "Épisode 3",
          season: 10,
          episode: 3,
          overview: "Épisode 3 de la saison 10",
          released: "2025-08-12T00:00:00.000Z",
          thumbnail: "https://photos.tf1.fr/354/531/poster-card-la-villa-2025-6909e4-db7bd0-0@3x.jpg",
          stream: "https://super-creponne-012bcc.netlify.app/S10E23.m3u8"
        },

           {
          id: "ttseries_villa:10:4",
          title: "Épisode 4",
          season: 10,
          episode: 4,
          overview: "Épisode 4 de la saison 10",
          released: "2025-08-13T00:00:00.000Z",
          thumbnail: "https://photos.tf1.fr/330/186/avant-premiere-la-villa-saison-10-episode-18-du-2-septembre-2025-31586572-1756106139-48428a-e6db9f-0@3x.jpg",
          stream: "https://dainty-bienenstitch-92bfd0.netlify.app/Video.m3u8"
        },
        {
          id: "ttseries_villa:10:5",
          title: "Épisode 5",
          season: 10,
          episode: 5,
          overview: "Épisode 5 de la saison 10",
          released: "2025-08-14T00:00:00.000Z",
          thumbnail: "https://photos.tf1.fr/354/531/poster-card-la-villa-2025-6909e4-db7bd0-0@3x.jpg",
          stream: "https://super-creponne-012bcc.netlify.app/S10E23.m3u8"
        },

          {
          id: "ttseries_villa:10:6",
          title: "Épisode 6",
          season: 10,
          episode: 6,
          overview: "Épisode 6 de la saison 10",
          released: "2025-08-15T00:00:00.000Z",
          thumbnail: "https://photos.tf1.fr/330/186/avant-premiere-la-villa-saison-10-episode-18-du-2-septembre-2025-31586572-1756106139-48428a-e6db9f-0@3x.jpg",
          stream: "https://dainty-bienenstitch-92bfd0.netlify.app/Video.m3u8"
        },
        {
          id: "ttseries_villa:10:7",
          title: "Épisode 7",
          season: 10,
          episode: 7,
          overview: "Épisode 7 de la saison 10",
          released: "2025-08-18T00:00:00.000Z",
          thumbnail: "https://photos.tf1.fr/354/531/poster-card-la-villa-2025-6909e4-db7bd0-0@3x.jpg",
          stream: "https://super-creponne-012bcc.netlify.app/S10E23.m3u8"
        },
            {
          id: "ttseries_villa:10:8",
          title: "Épisode 8",
          season: 10,
          episode: 8,
          overview: "Épisode 8 de la saison 10",
          released: "2025-08-19T00:00:00.000Z",
          thumbnail: "https://photos.tf1.fr/330/186/avant-premiere-la-villa-saison-10-episode-18-du-2-septembre-2025-31586572-1756106139-48428a-e6db9f-0@3x.jpg",
          stream: "https://dainty-bienenstitch-92bfd0.netlify.app/Video.m3u8"
        },
        {
          id: "ttseries_villa:10:9",
          title: "Épisode 9",
          season: 10,
          episode: 9,
          overview: "Épisode 9 de la saison 10",
          released: "2025-08-20T00:00:00.000Z",
          thumbnail: "https://photos.tf1.fr/354/531/poster-card-la-villa-2025-6909e4-db7bd0-0@3x.jpg",
          stream: "https://super-creponne-012bcc.netlify.app/S10E23.m3u8"
        },

          {
          id: "ttseries_villa:10:10",
          title: "Épisode 10",
          season: 10,
          episode: 10,
          overview: "Épisode 10 de la saison 10",
          released: "2025-08-21T00:00:00.000Z",
          thumbnail: "https://photos.tf1.fr/330/186/avant-premiere-la-villa-saison-10-episode-18-du-2-septembre-2025-31586572-1756106139-48428a-e6db9f-0@3x.jpg",
          stream: "https://dainty-bienenstitch-92bfd0.netlify.app/Video.m3u8"
        },
        {
          id: "ttseries_villa:10:11",
          title: "Épisode 11",
          season: 10,
          episode: 11,
          overview: "Épisode 11 de la saison 10",
          released: "2025-08-22T00:00:00.000Z",
          thumbnail: "https://photos.tf1.fr/354/531/poster-card-la-villa-2025-6909e4-db7bd0-0@3x.jpg",
          stream: "https://super-creponne-012bcc.netlify.app/S10E23.m3u8"
        },

         {
          id: "ttseries_villa:10:12",
          title: "Épisode 12",
          season: 10,
          episode: 12,
          overview: "Épisode 12 de la saison 10",
          released: "2025-08-25T00:00:00.000Z",
          thumbnail: "https://photos.tf1.fr/330/186/avant-premiere-la-villa-saison-10-episode-18-du-2-septembre-2025-31586572-1756106139-48428a-e6db9f-0@3x.jpg",
          stream: "https://dainty-bienenstitch-92bfd0.netlify.app/Video.m3u8"
        },
        {
          id: "ttseries_villa:10:13",
          title: "Épisode 13",
          season: 10,
          episode: 13,
          overview: "Épisode 13 de la saison 10",
          released: "2025-08-26T00:00:00.000Z",
          thumbnail: "https://photos.tf1.fr/354/531/poster-card-la-villa-2025-6909e4-db7bd0-0@3x.jpg",
          stream: "https://super-creponne-012bcc.netlify.app/S10E23.m3u8"
        },
      {
          id: "ttseries_villa:10:14",
          title: "Épisode 14",
          season: 10,
          episode: 14,
          overview: "Épisode 14 de la saison 10",
          released: "2025-08-27T00:00:00.000Z",
          thumbnail: "https://photos.tf1.fr/330/186/avant-premiere-la-villa-saison-10-episode-18-du-2-septembre-2025-31586572-1756106139-48428a-e6db9f-0@3x.jpg",
          stream: "https://dainty-bienenstitch-92bfd0.netlify.app/Video.m3u8"
        },
        {
          id: "ttseries_villa:10:15",
          title: "Épisode 15",
          season: 10,
          episode: 15,
          overview: "Épisode 15 de la saison 10",
          released: "2025-08-28T00:00:00.000Z",
          thumbnail: "https://photos.tf1.fr/354/531/poster-card-la-villa-2025-6909e4-db7bd0-0@3x.jpg",
          stream: "https://super-creponne-012bcc.netlify.app/S10E23.m3u8"
        },

        
       {
          id: "ttseries_villa:10:16",
          title: "Épisode 16",
          season: 10,
          episode: 16,
          overview: "Épisode 16 de la saison 10",
          released: "2025-08-29T00:00:00.000Z",
          thumbnail: "https://photos.tf1.fr/330/186/avant-premiere-la-villa-saison-10-episode-18-du-2-septembre-2025-31586572-1756106139-48428a-e6db9f-0@3x.jpg",
          stream: "https://dainty-bienenstitch-92bfd0.netlify.app/Video.m3u8"
        },
        {
          id: "ttseries_villa:10:17",
          title: "Épisode 17",
          season: 10,
          episode: 17,
          overview: "Épisode 17 de la saison 10",
          released: "2025-09-01T00:00:00.000Z",
          thumbnail: "https://photos.tf1.fr/354/531/poster-card-la-villa-2025-6909e4-db7bd0-0@3x.jpg",
          stream: "https://super-creponne-012bcc.netlify.app/S10E23.m3u8"
        },
        
          {
          id: "ttseries_villa:10:18",
          title: "Épisode 18",
          season: 10,
          episode: 18,
          overview: "Épisode 18 de la saison 10",
          released: "2025-09-02T00:00:00.000Z",
          thumbnail: "https://photos.tf1.fr/330/186/avant-premiere-la-villa-saison-10-episode-18-du-2-septembre-2025-31586572-1756106139-48428a-e6db9f-0@3x.jpg",
          stream: "https://dainty-bienenstitch-92bfd0.netlify.app/Video.m3u8"
        },
        {
          id: "ttseries_villa:10:19",
          title: "Épisode 19",
          season: 10,
          episode: 19,
          overview: "Épisode 19 de la saison 10",
          released: "2025-09-03T00:00:00.000Z",
          thumbnail: "https://photos.tf1.fr/354/531/poster-card-la-villa-2025-6909e4-db7bd0-0@3x.jpg",
          stream: "https://super-creponne-012bcc.netlify.app/S10E23.m3u8"
        },
        
        {
          id: "ttseries_villa:10:20",
          title: "Épisode 20",
          season: 10,
          episode: 20,
          overview: "Épisode 20 de la saison 10",
          released: "2025-09-04T00:00:00.000Z",
          thumbnail: "https://photos.tf1.fr/330/186/avant-premiere-la-villa-saison-10-episode-18-du-2-septembre-2025-31586572-1756106139-48428a-e6db9f-0@3x.jpg",
          stream: "https://dainty-bienenstitch-92bfd0.netlify.app/Video.m3u8"
        },
        {
          id: "ttseries_villa:10:21",
          title: "Épisode 21",
          season: 10,
          episode: 21,
          overview: "Épisode 21 de la saison 10",
          released: "2025-09-05T00:00:00.000Z",
          thumbnail: "https://photos.tf1.fr/354/531/poster-card-la-villa-2025-6909e4-db7bd0-0@3x.jpg",
          stream: "https://super-creponne-012bcc.netlify.app/S10E23.m3u8"
        },
        
        {
          id: "ttseries_villa:10:22",
          title: "Épisode 22",
          season: 10,
          episode: 22,
          overview: "Épisode 22 de la saison 10",
          released: "2025-09-08T00:00:00.000Z",
          thumbnail: "https://photos.tf1.fr/330/186/avant-premiere-la-villa-saison-10-episode-18-du-2-septembre-2025-31586572-1756106139-48428a-e6db9f-0@3x.jpg",
          stream: "https://dainty-bienenstitch-92bfd0.netlify.app/Video.m3u8"
        },
        {
          id: "ttseries_villa:10:23",
          title: "Épisode 23",
          season: 10,
          episode: 23,
          overview: "Épisode 23 de la saison 10",
          released: "2025-09-09T00:00:00.000Z",
          thumbnail: "https://photos.tf1.fr/1200/720/avant-premiere-la-villa-saison-10-episode-23-du-9-septembre-2025-78936117-1756712122-39e62b-3fa70b-0@1x.jpg",
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
