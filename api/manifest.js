module.exports = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.statusCode = 200;
  const manifest = {
    id: "org.directhls",
    version: "1.0.0",
    name: "Télé-Réalité (Replay)",
    description: "Addon Stremio simple pour vos replays",
    catalogs: [
      {
        type: "series",
        id: "direct_hls",
        name: "Télé-Réalité"
      }
    ],
    resources: ["catalog", "meta", "stream"],
    types: ["series"], // uniquement séries
    idPrefixes: ["tt", "directhls_", "series_"]
  };
  res.end(JSON.stringify(manifest));
};
