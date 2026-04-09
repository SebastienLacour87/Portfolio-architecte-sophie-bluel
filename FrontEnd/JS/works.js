import * as Api from "./callAPI.js";

function genererWorks(works) {
  const galery = document.querySelector(".gallery");

  return works.forEach((items) => {
    galery.innerHTML += `<figure> 
                            <img src="${items.imageUrl}" alt="${items.title}">
                            <figcaption>${items.title}</figcaption>
                          </figure>`;
  });
}
function showImages() {
  Api.getWorks().then((works) => {
    genererWorks(works);
  });
}
showImages();
