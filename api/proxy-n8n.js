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

  const webhookURL = "https://maxsurf.app.n8n.cloud/webhook-test/aeaac274-b8cd-4915-afe1-2f8c4716cb3a"; // remplace ici !

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
