// api/manifest.js - Manifest unifié
export default function handler(req, res) {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  
  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    return res.end();
  }

  const manifest = {
    id: "community.directhls",
    version: "1.0.0",
    name: "Télé-Réalité",
    description: "Streaming direct pour télé-réalité",
    catalogs: [
      {
        type: "series",
        id: "directhls_series",
        name: "Télé-Réalité"
      }
    ],
    resources: ["catalog", "meta", "stream"],
    types: ["series"],
    idPrefixes: ["tt"]
  };

  res.statusCode = 200;
  res.end(JSON.stringify(manifest));
}
