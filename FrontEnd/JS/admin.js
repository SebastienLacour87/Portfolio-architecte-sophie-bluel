import * as Api from "./callAPI.js";
let allWorks = [];
const token = localStorage.getItem("token");

if (token) {
  // bandeau
  document.getElementById("edit-banner").style.display = "block";
  //login - > logout
  const loginLink = document.querySelector("nav a[href='./login.html']");
  loginLink.textContent = "logout";
  //cacher les filtres
  document.querySelector(".filters").style.display = "none";
  // afficher bouton modifier
  document.getElementById("btn-modifier").style.display = "inline";

  //deconnexion au clic sur logout
  loginLink.addEventListener("click", (e) => {
    e.preventDefault(); // empêche la redirection vers login.html
    localStorage.clear(); // supprime le token
    window.location.reload(); // recharge la page en mode normal
  });
}

// ouverture de la modale
document.getElementById("btn-modifier").addEventListener("click", () => {
  document.getElementById("modal-overlay").classList.add("active");
  showImages(chargerGalerie);
});

// fermeture via la croix
document.getElementById("modal-close").addEventListener("click", () => {
  document.getElementById("modal-overlay").classList.remove("active");
});

// fermeture via clic sur l'overlay
document.getElementById("modal-overlay").addEventListener("click", (e) => {
  if (e.target === document.getElementById("modal-overlay")) {
    document.getElementById("modal-overlay").classList.remove("active");
  }
});
// chargement des images dans la galerie de la modale
function chargerGalerie(allWorks) {
  const modalWorks = document.getElementById("modal-works");
  modalWorks.innerHTML = "";
  return allWorks.forEach((work) => {
    modalWorks.innerHTML += `
      <figure>
        <button class="btn-delete" data-id="${work.id}"><svg width="9" height="11" viewBox="0 0 9 11" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.71607 0.35558C2.82455 0.136607 3.04754 0 3.29063 0H5.70938C5.95246 0 6.17545 0.136607 6.28393 0.35558L6.42857 0.642857H8.35714C8.71272 0.642857 9 0.930134 9 1.28571C9 1.64129 8.71272 1.92857 8.35714 1.92857H0.642857C0.287277 1.92857 0 1.64129 0 1.28571C0 0.930134 0.287277 0.642857 0.642857 0.642857H2.57143L2.71607 0.35558ZM0.642857 2.57143H8.35714V9C8.35714 9.70915 7.78058 10.2857 7.07143 10.2857H1.92857C1.21942 10.2857 0.642857 9.70915 0.642857 9V2.57143ZM2.57143 3.85714C2.39464 3.85714 2.25 4.00179 2.25 4.17857V8.67857C2.25 8.85536 2.39464 9 2.57143 9C2.74821 9 2.89286 8.85536 2.89286 8.67857V4.17857C2.89286 4.00179 2.74821 3.85714 2.57143 3.85714ZM4.5 3.85714C4.32321 3.85714 4.17857 4.00179 4.17857 4.17857V8.67857C4.17857 8.85536 4.32321 9 4.5 9C4.67679 9 4.82143 8.85536 4.82143 8.67857V4.17857C4.82143 4.00179 4.67679 3.85714 4.5 3.85714ZM6.42857 3.85714C6.25179 3.85714 6.10714 4.00179 6.10714 4.17857V8.67857C6.10714 8.85536 6.25179 9 6.42857 9C6.60536 9 6.75 8.85536 6.75 8.67857V4.17857C6.75 4.00179 6.60536 3.85714 6.42857 3.85714Z" fill="white"/>
</svg>

        </button>
        <img src="${work.imageUrl}" alt="${work.title}">
        </figure>
        `;
  });
}
//affichage des images de la galerie depuis l'api
function showImages(gallery) {
  Api.getWorks().then((works) => {
    allWorks = works;
    gallery(works);
  });
}

// ouverture du formulaire
document.getElementById("btn-add-picture").addEventListener("click", () => {
  document.getElementById("modal-gallery").style.display = "none";
  document.getElementById("modal-form").style.display = "block";
});
// retour à la galerie via la flèche
document.getElementById("modal-back").addEventListener("click", () => {
  document.getElementById("modal-form").style.display = "none";
  document.getElementById("modal-gallery").style.display = "block";
});
// fermeture du formulaire via la croix
document.getElementById("modal-close-form").addEventListener("click", () => {
  document.getElementById("modal-overlay").classList.remove("active");
  document.getElementById("modal-form").style.display = "none";
  document.getElementById("modal-gallery").style.display = "block";
});

document.getElementById("file-input").addEventListener("change", (event) => {
  document.getElementById("picture-upload-content").style.display = "none";
  const previewFile = event.target.files[0];
  const image = document.getElementById("preview");
  image.setAttribute("src", URL.createObjectURL(previewFile));
  image.style.display = "block";
});
function formCategories() {
  const c = document.getElementById("category");
  return Api.getCategories().then((cat) => {
    cat.forEach((categories) => {
      c.innerHTML += `<option value="${categories.id}">${categories.name}
      </option>`;
    });
  });
}
formCategories();
