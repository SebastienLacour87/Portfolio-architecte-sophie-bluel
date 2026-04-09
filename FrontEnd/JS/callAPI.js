const url = "http://localhost:5678/api";
// Récupération des pièces depuis l'API
export function getWorks() {
  return fetch(`${url}/works`).then((reponse) => {
    return reponse.json();
  });
}
