// === Ton catalogue dynamique ===
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
      },
      {
        id: "tt13443470:1:3",
        title: "Saison 1 Épisode 3",
        season: 1,
        episode: 3,
        stream: "https://pulse.topstrime.online/series/mercredi/s1e3/master.m3u8"
      }
    ]
  }
];

// === Export Vercel Handler ===
export default function handler(req, res) {
  // === CORS pour toutes les routes ===
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    return res.end();
  }

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
        poster: item.poster || fetchPosterFromIMDb(item.id),
        posterShape: "regular",
        description: item.description || `${item.name} - Streaming direct`,
        genres: item.genres || ["Action", "Drama"]
      }));
    return sendJSON(res, { metas });
  }

  // Meta (pour les séries et films)
  if (resource === "meta") {
    const cleanId = decodeURIComponent(stripJson(id));
    
    // Recherche dans les films
    let item = catalogData.find(x => x.id === cleanId);
    
    // Si c'est une série, retourner les métadonnées de la série avec les épisodes
    if (item && item.type === "series") {
      const metaResponse = {
        meta: {
          id: item.id,
          type: item.type,
          name: item.name,
          poster: item.poster,
          description: item.description,
          genres: item.genres || ["Drama", "Fantasy"],
          videos: item.videos.map(video => ({
            id: video.id,
            title: video.title,
            season: video.season,
            episode: video.episode,
            released: new Date().toISOString().split('T')[0]
          }))
        }
      };
      return sendJSON(res, metaResponse);
    }
    
    // Si c'est un film
    if (item && item.type === "movie") {
      const metaResponse = {
        meta: {
          id: item.id,
          type: item.type,
          name: item.name,
          poster: item.poster,
          description: item.description || `${item.name} - Film complet`,
          genres: item.genres || ["Action", "Adventure"]
        }
      };
      return sendJSON(res, metaResponse);
    }

    return sendJSON(res, { err: "Not found" }, 404);
  }

  // Stream (pour les films et épisodes de séries)
  if (resource === "stream") {
    const cleanId = decodeURIComponent(stripJson(id));
    let streamUrl = null;
    let title = "";

    // Recherche dans les films
    const movie = catalogData.find(x => x.id === cleanId && x.type === "movie");
    if (movie) {
      streamUrl = movie.stream;
      title = movie.name;
    }

    // Recherche dans les épisodes de séries
    if (!streamUrl) {
      for (const series of catalogData.filter(x => x.type === "series")) {
        const episode = series.videos.find(v => v.id === cleanId);
        if (episode) {
          streamUrl = episode.stream;
          title = `${series.name} - S${episode.season}E${episode.episode}`;
          break;
        }
      }
    }

    if (!streamUrl) {
      return sendJSON(res, { streams: [] });
    }

    const streamResponse = {
      streams: [
        {
          name: "Direct HLS",
          title: title,
          url: streamUrl,
          quality: "HD",
          behaviorHints: {
            countryWhitelist: ["FR", "US", "CA", "GB"],
            notWebReady: false
          }
        }
      ]
    };

    return sendJSON(res, streamResponse);
  }

  return sendJSON(res, { err: "Unknown route" }, 404);
}
