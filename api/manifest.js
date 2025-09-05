module.exports = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.statusCode = 200;
  const manifest = {
    id: "org.directhls",
    version: "1.0.0",
    name: "Direct HLS (Perso)",
    description: "Addon Stremio simple pour lire vos liens HLS/m3u8 légaux",
    catalogs: [], // aucun catalogue
    resources: ["meta", "stream"], // on enlève "catalog"
    types: ["movie", "series"],
    idPrefixes: ["tt", "directhls_", "series_"]
  };
  res.end(JSON.stringify(manifest));
};
