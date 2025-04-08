$w.onReady(function () {
  $w('#button1').onClick((event) => {
    const username = $w('#twitterInput').value;

    console.log("✅ Bouton cliqué avec :", username);

    fetch("https://maxsurf.app.n8n.cloud/webhook-test/1989a0a5-ded5-46cd-bd98-afac3e7bb4e1", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username // <-- la valeur que tu veux envoyer
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log("Réponse de n8n (brut) :", data);
      $w('#malaga').text = data?.content || "⚠️ Aucune sortie détectée.";
    })
    .catch(error => {
      console.error("Erreur :", error);
      $w('#malaga').text = "❌ Erreur lors de la génération.";
    });
  });
});
