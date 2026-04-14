import * as Api from "./callAPI.js";

export let allWorks = [];

function genererWorks(works) {
  const galery = document.querySelector(".gallery");
  galery.innerHTML = ""; //vide la galerie
  return works.forEach((items) => {
    galery.innerHTML += `<figure> 
                            <img src="${items.imageUrl}" alt="${items.title}">
                            <figcaption>${items.title}</figcaption>
                          </figure>`;
  });
}

export function filterWorks(categoryId) {
  const filtered = categoryId
    ? allWorks.filter((w) => w.category.id === categoryId)
    : allWorks;
  genererWorks(filtered);
}
function showImages() {
  Api.getWorks().then((works) => {
    allWorks = works;
    genererWorks(works);
  });
}
showImages();
