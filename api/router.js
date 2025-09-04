// === Catalogue d'exemple (à personnaliser) ===
const catalogData = [
  
  {
    id: "directhls_f1",
    type: "movie",
    name: "F1 (Le Film)",
    poster: "https://fr.web.img3.acsta.net/r_1920_1080/img/b1/78/b178318cb7be01b706863ca6c40a5d89.jpg",
    description: "Sonny Hayes était le prodige de la F1 des années 90 jusqu'à son terrible accident. Trente ans plus tard, devenu un pilote indépendant, il est contacté par Ruben Cervantes, patron d'une écurie en faillite qui le convainc de revenir pour sauver l'équipe et prouver qu'il est toujours le meilleur. Aux côtés de Joshua Pearce, diamant brut prêt à devenir le numéro 1, Sonny réalise vite qu'en F1, son coéquipier est aussi son plus grand rival, que le danger est partout et qu'il risque de tout perdre.",
    stream: "https://pulse.topstrime.online/movie/911430/xjycgu/master.m3u8"
  },

   {
    id: "directhls_nobody",
    type: "movie",
    name: "Nobody2",
    poster: "https://fr.web.img5.acsta.net/c_310_420/img/76/36/763625198f65137a7feb27001ca50278.jpg",
    description: "Après avoir décidé d'emmener sa famille dans une ville touristique pour s'amuser au soleil, une rencontre sans gravité avec des brutes locales précipite la famille dans la ligne de mire d'un chef du crime dérangé et assoiffé de sang, déterminé à perturber sa détente.",
    stream: "https://pulse.topstrime.online/movie/1007734/m7ae63/master.m3u8"
  },
  {
    id: "directhls_yufpsm",
    type: "movie",
    name: "Y a-t-il un flic pour sauver le monde ?",
    poster: "https://fr.web.img6.acsta.net/c_310_420/img/fb/58/fb582203041242b6b13cf2a05660ffb6.jpg",
    description: "Un seul homme possède des compétences… disons uniques… pour diriger la prestigieuse Brigade Spéciale et… sauver le monde, tout simplement ! Cet homme, c'est le lieutenant Frank Drebin Jr. — oui, vous avez bien lu — qui suit les traces de son illustre père, l'inspecteur Frank Drebin, qui s'était déjà illustré par le passé pour sauver la Reine, le Président et Hollywood !",
    stream: "https://pulse.topstrime.online/movie/1035259/bf8xpe/master.m3u8"
  },

  {
    id: "directhls_murder",
    type: "movie",
    name: "Le Murder Club du jeudi",
    poster: "https://fr.web.img4.acsta.net/c_310_420/img/71/cf/71cfda9b6e17b1b060ca232f1a038ea1.jpg",
    description: "Quatre retraités irrésistibles qui passent leur temps libre à enquêter sur des affaires de meurtre non résolues juste pour le plaisir. Mais quand une mort inexpliquée survient dans le voisinage, les fins limiers aux méthodes originales ont une intrigue criminelle toute fraîche à résoudre, et l'enquête prend une tournure palpitante.",
    stream: "https://pulse.topstrime.online/movie/744653/m96tzk/master.m3u8"
  },
  {
    id: "directhls_ira",
    type: "movie",
    name: "On ira",
    poster: "https://fr.web.img5.acsta.net/r_1920_1080/img/4e/64/4e644edc4b90cae39ea31727a29cdb09.jpg",
    description: "Marie, 80 ans, en a ras le bol de sa maladie. Elle a un plan : partir en Suisse pour mettre fin à ses jours. Mais au moment de l'annoncer à Bruno, son fils irresponsable, et Anna sa petite-fille en crise d'ado, elle panique et invente un énorme mensonge. Prétextant un mystérieux héritage à aller chercher dans une banque suisse, elle leur propose de faire un voyage tous ensemble. Complice involontaire de cette mascarade, Rudy, un aide-soignant tout juste rencontré la veille, va prendre le volant du vieux camping car familial, et conduire cette famille dans un voyage inattendu.",
    stream: "https://pulse.topstrime.online/movie/1003504/i09w9p/master.m3u8"
  },

  // === SÉRIES ===
 {
    id: "series_squid",
    type: "series",
    name: "Squid Game",
    poster: "https://fr.web.img6.acsta.net/r_1920_1080/img/2a/95/2a957aa348ff7469cc49c2f92952067f.jpg",
    background: "https://fr.web.img6.acsta.net/r_1920_1080/img/2a/95/2a957aa348ff7469cc49c2f92952067f.jpg",
    description: "Tentés par un prix alléchant en cas de victoire, des centaines de joueurs désargentés acceptent de s'affronter lors de jeux pour enfants aux enjeux mortels.",
    videos: [
      { season: 1, episode: 1, title: "Red Light, Green Light", released: "2021-09-17", url: "https://pulse.topstrime.online/tv/93405/t93qr2/S1/E1/master.m3u8" },
      { season: 1, episode: 2, title: "Hell", released: "2021-09-17", url: "https://pulse.topstrime.online/tv/93405/yvrujh/S1/E2/master.m3u8" },
      { season: 2, episode: 1, title: "Bread and Lottery", released: "2024-12-26", url: "https://pulse.topstrime.online/tv/93405/r6pkqv/S2/E1/master.m3u8" }
    ]
  },
  
  {
    id: "series_got",
    type: "series",
    name: "Game of Thrones",
    poster: "https://fr.web.img2.acsta.net/c_310_420/pictures/19/03/27/10/37/3471175.jpg",
    background: "https://fr.web.img2.acsta.net/r_1920_1080/pictures/19/03/27/10/37/3471175.jpg",
    description: "Il y a très longtemps, à une époque oubliée, une force a détruit l'équilibre des saisons. Dans un pays où l'été peut durer plusieurs années et l'hiver toute une vie, des forces sinistres et surnaturelles se pressent aux portes du Royaume des Sept Couronnes.",
    videos: [
      { season: 1, episode: 1, title: "Winter Is Coming", released: "2011-04-17", url: "https://pulse.topstrime.online/tv/1399/abc123/S1/E1/master.m3u8" },
      { season: 1, episode: 2, title: "The Kingsroad", released: "2011-04-24", url: "https://pulse.topstrime.online/tv/1399/def456/S1/E2/master.m3u8" },
      { season: 2, episode: 1, title: "The North Remembers", released: "2012-04-01", url: "https://pulse.topstrime.online/tv/1399/ghi789/S2/E1/master.m3u8" }
    ]
  }
];

// === Helpers ===
function sendJSON(res, obj, status = 200) {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.statusCode = status;
  res.end(JSON.stringify(obj));
}

function stripJson(s) {
  return s.replace(/\.json$/, "");
}

// === Router principal ===
module.exports = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.end();

  const url = new URL(req.url, "http://localhost");
  const path = url.pathname.replace(/^\/api/, "");
  const parts = path.split("/").filter(Boolean);

  if (!parts.length) return sendJSON(res, { err: "No route" }, 404);

  const [resource] = parts;

  // === CATALOG ===
  if (resource === "catalog") {
    const type = parts[1];
    const catalogId = stripJson(parts[2] || "");

    let metas = [];

    if (type === "series" && catalogId === "direct_hls") {
      metas = catalogData
        .filter(x => x.type === "series")
        .map(({ id, name, poster, background, description }) => ({
          id,
          type: "series",
          name,
          poster,
          background,
          description
        }));
    }

    if (type === "movie" && catalogId === "direct_hls") {
      metas = catalogData
        .filter(x => x.type === "movie")
        .map(({ id, name, poster, description }) => ({
          id,
          type: "movie",
          name,
          poster,
          description
        }));
    }

    return sendJSON(res, { metas });
  }

  // === META ===
  if (resource === "meta") {
    const type = parts[1];
    const id = stripJson(parts[2] || "");
    const item = catalogData.find(x => x.id === id);
    if (!item) return sendJSON(res, { err: "Not found" }, 404);

    const meta = {
      id: item.id,
      type: item.type,
      name: item.name,
      poster: item.poster,
      background: item.background,
      description: item.description
    };

    // Construction spécifique pour les séries avec le format demandé
    if (item.type === "series") {
      meta.videos = item.videos.map(ep => ({
        id: `${item.id}:${ep.season}:${ep.episode}`, // format unique requis
        season: ep.season,
        episode: ep.episode,
        title: ep.title,
        released: ep.released
      }));
    }

    return sendJSON(res, { meta });
  }

  // === STREAM ===
  if (resource === "stream") {
    const type = parts[1];
    const id = stripJson(parts[2] || "");
    
    // Pour les films
    if (type === "movie") {
      const item = catalogData.find(x => x.id === id && x.type === "movie");
      if (!item) return sendJSON(res, { streams: [] });
      
      return sendJSON(res, { 
        streams: [{ 
          title: item.name, 
          url: item.stream 
        }] 
      });
    }
    
    // Pour les séries - gestion des épisodes individuels
    if (type === "series") {
      // Format: series_id:season:episode
      const [seriesId, season, episode] = id.split(":");
      const item = catalogData.find(x => x.id === seriesId && x.type === "series");
      
      if (!item) return sendJSON(res, { streams: [] });
      
      if (season && episode) {
        // Stream pour un épisode spécifique
        const episodeData = item.videos.find(ep => 
          ep.season === parseInt(season) && ep.episode === parseInt(episode)
        );
        
        if (episodeData) {
          return sendJSON(res, { 
            streams: [{ 
              title: episodeData.title, 
              url: episodeData.url 
            }] 
          });
        }
      } else {
        // Stream pour toute la série (tous les épisodes)
        const streams = item.videos.map(ep => ({
          title: `S${ep.season}E${ep.episode} - ${ep.title}`,
          url: ep.url,
          season: ep.season,
          episode: ep.episode
        }));
        
        return sendJSON(res, { streams });
      }
    }

    return sendJSON(res, { streams: [] });
  }

  return sendJSON(res, { err: "Unknown route" }, 404);
};
