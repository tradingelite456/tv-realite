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
    id: "tt20969586",
    type: "movie",
    name: "Thunderbolt",
    poster: fetchPosterFromIMDb("tt20969586"),
    stream: "https://pulse.topstrime.online/movie/986056/82nb0j/master.m3u8"
  },
  {
    id: "tt16311594",
    type: "movie",
    name: "F1 (Le Film)",
    poster: fetchPosterFromIMDb("tt16311594"),
    stream: "https://pulse.topstrime.online/movie/911430/1o9d0a/master.m3u8"
  },
  {
    id: "tt33613785",
    type: "movie",
    name: "God Save the Tuche",
    poster: fetchPosterFromIMDb("tt33613785"),
    stream: "https://pulse.topstrime.online/movie/1137759/croued/master.m3u8"
  },
  {
    id: "tt13443470",
    type: "series",
    name: "Mercredi",
    poster: fetchPosterFromIMDb("tt13443470"),
    description: "Série Netflix suivant les aventures de Mercredi Addams à l'Académie Nevermore.",
    genres: ["Comedy", "Fantasy"],
    videos: [
      {
        id: "s1e1",
        title: "Épisode 1",
        season: 1,
        episode: 1,
        stream: "https://pulse.topstrime.online/tv/119051/rdxfvx/S1/E1/master.m3u8"
      },
      {
        id: "s1e2",
        title: "Épisode 2",
        season: 1,
        episode: 2,
        stream: "https://pulse.topstrime.online/tv/119051/rblyo2/S1/E2/master.m3u8"
      },
      {
        id: "s1e3",
        title: "Épisode 3",
        season: 1,
        episode: 3,
        stream: "https://pulse.topstrime.online/tv/119051/v3vqw4/S1/E3/master.m3u8"
      },
        {
        id: "s1e4",
        title: "Épisode 4",
        season: 1,
        episode: 4,
        stream: "https://pulse.topstrime.online/tv/119051/y080h1/S1/E4/master.m3u8"
      },
      {
        id: "s1e5",
        title: "Épisode 5",
        season: 1,
        episode: 5,
        stream: "https://pulse.topstrime.online/tv/119051/feqros/S1/E5/master.m3u8"
      },
      {
        id: "s1e6",
        title: "Épisode 6",
        season: 1,
        episode: 6,
        stream: "https://pulse.topstrime.online/tv/119051/4f0xlr/S1/E6/master.m3u8"
      },
       {
        id: "s1e7",
        title: "Épisode 7",
        season: 1,
        episode: 7,
        stream: "https://pulse.topstrime.online/tv/119051/lt5pvl/S1/E7/master.m3u8"
      },
      {
        id: "s1e8",
        title: "Épisode 8",
        season: 1,
        episode: 8,
        stream: "https://pulse.topstrime.online/tv/119051/cya5bi/S1/E8/master.m3u8"
      },
        {
        id: "s2e1",
        title: "Épisode 1",
        season: 2,
        episode: 1,
        stream: "https://pulse.topstrime.online/tv/119051/zfm5xe/S2/E1/master.m3u8"
      },
      {
        id: "s2e2",
        title: "Épisode 2",
        season: 2,
        episode: 2,
        stream: "https://pulse.topstrime.online/tv/119051/musbbc/S2/E2/master.m3u8"
      },
      {
        id: "s2e3",
        title: "Épisode 3",
        season: 2,
        episode: 3,
        stream: "https://pulse.topstrime.online/tv/119051/fihpzg/S2/E3/master.m3u8"
      },
        {
        id: "s2e4",
        title: "Épisode 4",
        season: 2,
        episode: 4,
        stream: "https://pulse.topstrime.online/tv/119051/zh7ine/S2/E4/master.m3u8"
      },
      {
        id: "s2e5",
        title: "Épisode 5",
        season: 2,
        episode: 5,
        stream: "https://pulse.topstrime.online/tv/119051/g0bs80/S2/E5/master.m3u8"
      },
      {
        id: "s2e6",
        title: "Épisode 6",
        season: 2,
        episode: 6,
        stream: "https://pulse.topstrime.online/tv/119051/d6g8kc/S2/E6/master.m3u8"
      },
       {
        id: "s2e7",
        title: "Épisode 7",
        season: 2,
        episode: 7,
        stream: "https://pulse.topstrime.online/tv/119051/p7tzot/S2/E7/master.m3u8"
      },
      {
        id: "s2e8",
        title: "Épisode 8",
        season: 2,
        episode: 8,
        stream: "https://pulse.topstrime.online/tv/119051/m15l7h/S2/E8/master.m3u8"
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
