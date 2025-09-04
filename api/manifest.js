module.exports = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.statusCode = 200;

  const manifest = {
    id: "org.directhls",
    version: "1.0.0",
    name: "Direct HLS (Perso)",
    description: "Addon Stremio simple pour lire vos liens HLS/m3u8 légaux",
    catalogs: [
      {
        type: "movie",
        id: "direct_hls",
        name: "Direct HLS Movies"
      },
      {
        type: "series",
        id: "direct_hls",
        name: "Direct HLS Series"
      }
    ],
    resources: ["catalog", "meta", "stream"],
    types: ["movie", "series"],
    idPrefixes: ["directhls_", "series_"] // important pour reconnaître tes séries
  };

  res.end(JSON.stringify(manifest));
};
