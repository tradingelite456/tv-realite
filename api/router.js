import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

// === Mapping IMDb → Flux DirectHLS ===
const streamMap = {
  // Films
  "tt33613785": "https://pulse.topstrime.online/movie/1137759/croued/master.m3u8", // Exemple film
  "tt0111161": "https://example.com/shawshank.m3u8", // Shawshank Redemption

  // Séries (par épisode)
  "tt0944947:1:1": "https://example.com/got_s1e1.m3u8", // Game of Thrones S1E1
  "tt0944947:1:2": "https://example.com/got_s1e2.m3u8",
};

// === Manifest ===
app.get("/manifest.json", (req, res) => {
  res.json({
    id: "directhls_imdb",
    version: "1.0.0",
    name: "DirectHLS IMDb Addon",
    description: "Addon Stremio avec métadonnées IMDb et flux DirectHLS",
    resources: ["catalog", "meta", "stream"],
    types: ["movie", "series"],
    catalogs: [
      { type: "movie", id: "directhls_movies", name: "Films DirectHLS" },
      { type: "series", id: "directhls_series", name: "Séries DirectHLS" }
    ]
  });
});

// === Catalogue Films ===
app.get("/catalog/movie/:catalogId.json", (req, res) => {
  if (req.params.catalogId !== "directhls_movies") return res.json({ metas: [] });

  res.json({
    metas: [
      { id: "tt20969586", type: "movie", name: "Creed III" },
      { id: "tt0111161", type: "movie", name: "The Shawshank Redemption" }
    ]
  });
});

// === Catalogue Séries ===
app.get("/catalog/series/:catalogId.json", (req, res) => {
  if (req.params.catalogId !== "directhls_series") return res.json({ metas: [] });

  res.json({
    metas: [
      { id: "tt0944947", type: "series", name: "Game of Thrones" }
    ]
  });
});

// === Meta (IMDb ID → laissé vide car Stremio va fetch depuis IMDb automatiquement) ===
app.get("/meta/:type/:id.json", (req, res) => {
  res.json({ meta: { id: req.params.id, type: req.params.type } });
});

// === Streams (IMDb → DirectHLS) ===
app.get("/stream/:type/:id.json", (req, res) => {
  const { id } = req.params;
  const streamUrl = streamMap[id];

  if (streamUrl) {
    res.json({
      streams: [{
        title: "DirectHLS",
        url: streamUrl
      }]
    });
  } else {
    res.json({ streams: [] });
  }
});

// === Start server ===
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("✅ DirectHLS IMDb Addon lancé sur port " + PORT));
