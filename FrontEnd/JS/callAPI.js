//appel de l'api local via fonction permettant une réutilisation dans différente fonction externe
const url = "http://localhost:5678/api";
// Récupération des pièces depuis l'API
export function getWorks() {
  const cache = localStorage.getItem("works");
  if (cache) return Promise.resolve(JSON.parse(cache));

  return fetch(`${url}/works`)
    .then((reponse) => {
      if (!reponse.ok) throw new Error(`Erreur HTTP : ${reponse.status}`);
      return reponse.json();
    })
    .then((works) => {
      localStorage.setItem("works", JSON.stringify(works));
      return works;
    })
    .catch((err) => console.error("Impossible de récupérer les works :", err));
}
// récupération des catégories depuis l'API
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
// récupération des informations connexion depuis l'API
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
      throw err; //on remonte l'erreur pour la gérer dans lgin.js
    });
}

// fonction de suppression de fichier de l'API
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

//fonction d'ajout de projet a l'api
export function addWork(image, title, category) {
  const formData = new FormData();
  formData.append("image", image);
  formData.append("title", title);
  formData.append("category", parseInt(category));
  return fetch(`${url}/works`, {
    method: "POST",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    body: formData,
  })
    .then((reponse) => {
      if (!reponse.ok) throw new Error("impossible d'ajouter un élément");
      return reponse.json(); //retounre l'objet créé
    })
    .catch((err) => {
      throw err;
    });
}
