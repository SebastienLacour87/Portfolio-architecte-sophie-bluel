import * as Api from "./callAPI.js";
import { filterWorks } from "./works.js";

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

  //boutons par catégorie
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
function retirerActive() {
  document.querySelectorAll(".filters button").forEach((btn) => {
    btn.classList.remove("active");
  });
}
Api.getCategories().then((categories) => {
  genererFiltres(categories);
});
