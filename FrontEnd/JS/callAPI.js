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
