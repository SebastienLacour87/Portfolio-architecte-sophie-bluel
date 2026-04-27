// Importe toutes les fonctions de callAPI.js pour les appels API
import * as Api from "./callAPI.js";
// Tableau global qui stocke tous les travaux récupérés depuis l'API
// exporté pour être utilisé dans filters.js
export let allWorks = [];

// Génère le HTML de la galerie à partir d'un tableau de travaux
// Vide d'abord la galerie puis recrée toutes les figures
// Utilisée à l'initialisation et lors du filtrage

function genererWorks(works) {
  const galery = document.querySelector(".gallery");
  galery.innerHTML = ""; //vide la galerie
  return works.forEach((items) => {
    galery.innerHTML += `<figure data-id="${items.id}"> 
                            <img src="${items.imageUrl}" alt="${items.title}">
                            <figcaption>${items.title}</figcaption>
                          </figure>`;
  });
}

// Filtre les travaux selon une catégorie
// Si categoryId est null (bouton "Tous"), affiche tous les travaux
// Sinon filtre allWorks par l'id de catégorie correspondant

export function filterWorks(categoryId) {
  const filtered = categoryId
    ? allWorks.filter((w) => w.category.id === categoryId)
    : allWorks;
  genererWorks(filtered);
}

// Récupère les travaux depuis l'API et les stocke dans allWorks
// Prend une fonction "gallery" en paramètre pour rester flexible
// (utilisée avec genererWorks au démarrage, et chargerGalerie dans admin.js)
export function showImages(gallery) {
  Api.getWorks().then((works) => {
    allWorks = works;
    gallery(works);
  });
}
// Appel initial au chargement de la page
showImages(genererWorks);

// Ajoute un seul travail dans la galerie sans la vider
// Utilisée après un ajout via le formulaire pour mettre à jour le DOM
// sans recharger la page ni rappeler l'API
export function showNewWork(work) {
  const gallery = document.querySelector(".gallery");

  gallery.innerHTML += `<figure data-id="${work.id}"> 
                            <img src="${work.imageUrl}" alt="${work.title}">
                            <figcaption>${work.title}</figcaption>
                          </figure>`;
}
