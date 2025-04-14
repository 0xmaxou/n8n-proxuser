export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Gérer la pré-requête OPTIONS
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).send("Method not allowed");
  }

  const webhookURL = "https://maxsurf34.app.n8n.cloud/webhook-test/a963e223-ec8f-4a82-801b-3748e5b7d458"; // remplace ici !

  try {
    const response = await fetch(webhookURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.text();
    res.status(200).send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Proxy error");
  }
}
