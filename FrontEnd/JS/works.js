import * as Api from "./callAPI.js";

export let allWorks = [];

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

export function filterWorks(categoryId) {
  const filtered = categoryId
    ? allWorks.filter((w) => w.category.id === categoryId)
    : allWorks;
  genererWorks(filtered);
}
export function showImages(gallery) {
  Api.getWorks().then((works) => {
    allWorks = works;
    gallery(works);
  });
}
showImages(genererWorks);

export function showNewWork(work) {
  const gallery = document.querySelector(".gallery");

  gallery.innerHTML += `<figure data-id="${work.id}"> 
                            <img src="${work.imageUrl}" alt="${work.title}">
                            <figcaption>${work.title}</figcaption>
                          </figure>`;
}
