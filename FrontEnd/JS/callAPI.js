// URL de base de l'API locale, centralisée ici pour éviter la répétition
// et faciliter un éventuel changement d'environnement
const url = "http://localhost:5678/api";

// Récupère tous les travaux depuis l'API
// Utilise un cache localStorage pour éviter des appels API inutiles
// Si le cache existe, retourne directement les données sans appeler l'API
// Le cache est invalidé manuellement lors d'un ajout ou d'une suppression
export function getWorks() {
  const cache = localStorage.getItem("works");
  if (cache) return Promise.resolve(JSON.parse(cache));

  return fetch(`${url}/works`)
    .then((reponse) => {
      if (!reponse.ok) throw new Error(`Erreur HTTP : ${reponse.status}`);
      return reponse.json();
    })
    .then((works) => {
      // Stocke les données en cache pour les prochains appels
      localStorage.setItem("works", JSON.stringify(works));
      return works;
    })
    .catch((err) => console.error("Impossible de récupérer les works :", err));
}
// Récupère toutes les catégories depuis l'API
// Utilisée dans filters.js pour générer les boutons de filtre
// et dans admin.js pour peupler le select du formulaire d'ajout
export function getCategories() {
  return fetch(`${url}/categories`)
    .then((reponse) => {
      if (!reponse.ok) throw new Error(`Erreur HTTP : ${reponse.status}`);
      return reponse.json();
    })
    .catch((err) =>
      console.error("Impossible de récupérer les catégories :", err),
    );
}
// Envoie les identifiants de connexion à l'API
// Retourne le token JWT en cas de succès
// L'erreur est remontée à login.js pour afficher un message à l'utilisateur
export function login(email, password) {
  return fetch(`${url}/users/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((reponse) => {
      if (!reponse.ok) throw new Error("Identifiants incorrects");
      return reponse.json();
    })
    .catch((err) => {
      throw err; // remonte l'erreur pour la gérer dans lgin.js
    });
}

// Supprime un travail depuis l'API via son id
// Nécessite le token JWT stocké en localStorage pour l'authentification
// L'erreur est remontée à admin.js pour gérer la mise à jour du DOM
export function deleteWork(id) {
  return fetch(`${url}/works/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((reponse) => {
      if (!reponse.ok) throw new Error("impossible de supprimer un élément");
      return reponse;
    })
    .catch((err) => {
      throw err;
    });
}

// Ajoute un nouveau travail via l'API
// Utilise FormData pour envoyer les données en multipart/form-data
// (requis par l'API pour l'envoi de fichier image)
// Le Content-Type n'est pas précisé car le navigateur le gère automatiquement
// Retourne le nouvel objet créé avec son id pour mettre à jour le DOM
export function addWork(image, title, category) {
  const formData = new FormData();
  formData.append("image", image);
  formData.append("title", title);
  formData.append("category", parseInt(category)); //converti en entier car l'API atten un integer
  return fetch(`${url}/works`, {
    method: "POST",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    body: formData,
  })
    .then((reponse) => {
      if (!reponse.ok) throw new Error("impossible d'ajouter un élément");
      return reponse.json(); //retounre l'objet créé avec son ID généré par la Base de donné
    })
    .catch((err) => {
      throw err;
    });
}
