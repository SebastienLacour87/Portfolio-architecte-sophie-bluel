// Importe toutes les fonctions de callAPI.js pour les appels API
import * as Api from "./callAPI.js";
// Importe filterWorks pour filtrer la galerie au clic sur un bouton
import { filterWorks } from "./works.js";

// Génère dynamiquement les boutons de filtre depuis les catégories de l'API
// Crée d'abord le bouton "Tous" puis un bouton par catégorie
function genererFiltres(categories) {
  const filtersContainer = document.querySelector(".filters");

  //bouton "Tous" en premier
  const btnTous = document.createElement("button");
  btnTous.textContent = "Tous";
  btnTous.classList.add("active");
  btnTous.addEventListener("click", () => {
    retirerActive();
    btnTous.classList.add("active");
    filterWorks(null); //null = afficher tout
  });
  filtersContainer.appendChild(btnTous);

  // Crée un bouton pour chaque catégorie retournée par l'API
  categories.forEach((cat) => {
    const btn = document.createElement("button");
    btn.textContent = cat.name;
    btn.addEventListener("click", () => {
      retirerActive();
      btn.classList.add("active");
      filterWorks(cat.id);
    });
    filtersContainer.appendChild(btn);
  });
}
// Retire la classe "active" de tous les boutons de filtre
// Appelée avant d'en activer un nouveau pour éviter plusieurs boutons actifs
function retirerActive() {
  document.querySelectorAll(".filters button").forEach((btn) => {
    btn.classList.remove("active");
  });
}
// Récupère les catégories depuis l'API au chargement de la page
// puis génère les boutons de filtre correspondants
Api.getCategories().then((categories) => {
  genererFiltres(categories);
});
