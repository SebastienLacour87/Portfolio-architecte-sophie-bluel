// Importe toutes les fonctions de callAPI.js pour les appels API
import * as Api from "./callAPI.js";
// Importe showNewWork pour ajouter un nouveau travail dans la galerie principale
import { showNewWork } from "./works.js";
// Stocke tous les travaux en mémoire pour la gestion des suppressions
let allWorks = [];
// Récupère le token JWT stocké lors de la connexion
const token = localStorage.getItem("token");

// Si un token existe, l'utilisateur est connecté : on active le mode édition
if (token) {
  // Affiche le bandeau noir "Mode édition" en haut de page
  document.getElementById("edit-banner").style.display = "block";
  // Remplace "login" par "logout" dans la navigation
  const loginLink = document.querySelector("nav a[href='./login.html']");
  loginLink.textContent = "logout";

  // Cache les boutons de filtre (inutiles en mode admin)
  document.querySelector(".filters").style.display = "none";
  // Affiche le bouton "modifier" pour ouvrir la modale
  document.getElementById("btn-modifier").style.display = "inline";

  // Au clic sur "logout", supprime le token et recharge la page en mode visiteur
  loginLink.addEventListener("click", (e) => {
    e.preventDefault(); // empêche la redirection vers login.html
    localStorage.clear(); // supprime le token
    window.location.reload(); // recharge la page en mode normal
  });
}

// Ouvre la modale et charge la galerie des travaux au clic sur "modifier"
document.getElementById("btn-modifier").addEventListener("click", () => {
  document.getElementById("modal-overlay").classList.add("active");
  showImages(chargerGalerie);
});

// Ferme la modale via la croix de la vue galerie
document.getElementById("modal-close").addEventListener("click", () => {
  document.getElementById("modal-overlay").classList.remove("active");
});

// Ferme la modale en cliquant sur le fond sombre (hors de la modale)
document.getElementById("modal-overlay").addEventListener("click", (e) => {
  if (e.target === document.getElementById("modal-overlay")) {
    document.getElementById("modal-overlay").classList.remove("active");
  }
});

// Génère la galerie de la modale avec les travaux existants
// Chaque figure contient un bouton de suppression avec le data-id du travail
function chargerGalerie(allWorks) {
  const modalWorks = document.getElementById("modal-works");
  modalWorks.innerHTML = ""; //vide la galeire avant de la reconstruire
  return allWorks.forEach((work) => {
    modalWorks.innerHTML += `
      <figure data-id="${work.id}">
        <button class="btn-delete" data-id="${work.id}">
        
        <svg width="9" height="11" viewBox="0 0 9 11" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.71607 0.35558C2.82455 0.136607 3.04754 0 3.29063 0H5.70938C5.95246 0 6.17545 0.136607 6.28393 0.35558L6.42857 0.642857H8.35714C8.71272 0.642857 9 0.930134 9 1.28571C9 1.64129 8.71272 1.92857 8.35714 1.92857H0.642857C0.287277 1.92857 0 1.64129 0 1.28571C0 0.930134 0.287277 0.642857 0.642857 0.642857H2.57143L2.71607 0.35558ZM0.642857 2.57143H8.35714V9C8.35714 9.70915 7.78058 10.2857 7.07143 10.2857H1.92857C1.21942 10.2857 0.642857 9.70915 0.642857 9V2.57143ZM2.57143 3.85714C2.39464 3.85714 2.25 4.00179 2.25 4.17857V8.67857C2.25 8.85536 2.39464 9 2.57143 9C2.74821 9 2.89286 8.85536 2.89286 8.67857V4.17857C2.89286 4.00179 2.74821 3.85714 2.57143 3.85714ZM4.5 3.85714C4.32321 3.85714 4.17857 4.00179 4.17857 4.17857V8.67857C4.17857 8.85536 4.32321 9 4.5 9C4.67679 9 4.82143 8.85536 4.82143 8.67857V4.17857C4.82143 4.00179 4.67679 3.85714 4.5 3.85714ZM6.42857 3.85714C6.25179 3.85714 6.10714 4.00179 6.10714 4.17857V8.67857C6.10714 8.85536 6.25179 9 6.42857 9C6.60536 9 6.75 8.85536 6.75 8.67857V4.17857C6.75 4.00179 6.60536 3.85714 6.42857 3.85714Z" fill="white"/>
</svg>

        </button>
        <img src="${work.imageUrl}" alt="${work.title}">
        </figure>
        `;
  });
}

// Récupère les travaux depuis l'API et les stocke dans allWorks
// Prend une fonction en paramètre pour rester flexible
// (utilisée avec chargerGalerie pour la modale)
function showImages(gallery) {
  Api.getWorks().then((works) => {
    allWorks = works;
    gallery(works);
  });
}

// Bascule vers la vue formulaire au clic sur "Ajouter une photo"
document.getElementById("btn-add-picture").addEventListener("click", () => {
  document.getElementById("modal-gallery").style.display = "none";
  document.getElementById("modal-form").style.display = "block";
});
// Retourne à la vue galerie via la flèche de retour
document.getElementById("modal-back").addEventListener("click", () => {
  document.getElementById("modal-form").style.display = "none";
  document.getElementById("modal-gallery").style.display = "block";
});
// Ferme la modale via la croix du formulaire et revient à la vue galerie
document.getElementById("modal-close-form").addEventListener("click", () => {
  document.getElementById("modal-overlay").classList.remove("active");
  document.getElementById("modal-form").style.display = "none";
  document.getElementById("modal-gallery").style.display = "block";
});

// Affiche un aperçu de l'image sélectionnée avant l'envoi du formulaire
// Cache la zone d'upload et affiche la balise img avec l'URL temporaire
document.getElementById("file-input").addEventListener("change", (event) => {
  document.getElementById("picture-upload-content").style.display = "none";
  const previewFile = event.target.files[0];
  const image = document.getElementById("preview");
  // createObjectURL crée une URL temporaire locale pour afficher le fichier
  image.setAttribute("src", URL.createObjectURL(previewFile));
  image.style.display = "block";
});

// Peuple le select du formulaire avec les catégories récupérées depuis l'API
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

// Gère la suppression d'un travail via délégation d'événement sur le conteneur
// Utilise closest() pour cibler le bouton même si on clique sur le SVG enfant
document.getElementById("modal-works").addEventListener("click", (e) => {
  const btn = e.target.closest(".btn-delete");
  if (btn) {
    const id = btn.dataset.id;
    Api.deleteWork(id).then(() => {
      // supprime la figure dans la modale
      btn.parentElement.remove();
      // supprime la figure correspondante dans la galerie principale
      document.querySelector(`figure[data-id="${id}"]`).remove();
      // Invalide le cache pour forcer un rechargement depuis l'API
      localStorage.removeItem("works");
      // Met à jour allWorks en mémoire pour éviter des incohérences
      allWorks = allWorks.filter((work) => work.id !== parseInt(id));
    });
  }
});

// Gère l'envoi du formulaire d'ajout de travail
document.querySelector("#modal-form form").addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const category = document.getElementById("category").value;
  const image = document.getElementById("file-input").files[0];
  Api.addWork(image, title, category)
    .then((newWork) => {
      // Ajoute le nouveau travail dans la galerie principale sans recharger
      showNewWork(newWork);
      // Ajoute le nouveau travail dans la galerie de la modale
      showNewWorkInModal(newWork);
      // Réinitialise le formulaire pour un nouvel ajout
      document.querySelector("#modal-form form").reset();
      const existingError = document.querySelector(".error-message");
      if (existingError) existingError.remove();
      // Réaffiche la zone d'upload et cache la preview
      document.getElementById("picture-upload-content").style.display = "block";
      document.getElementById("preview").style.display = "none";
      // Remet le bouton submit dans son état désactivé initial
      const btn = document.querySelector("#modal-form button[type='submit']");
      btn.classList.remove("btn-submit-active");
      btn.classList.add("disabled");
    })
    .catch((err) => {
      // Supprime le message d'erreur précédent pour éviter les doublons
      const existingError = document.querySelector(".error-message");
      if (existingError) existingError.remove();
      // Affiche un message d'erreur sous le formulaire
      const error = document.createElement("p");
      error.textContent = "ajout de fichier impossible";
      error.classList.add("error-message");
      document.querySelector("#modal-form form").appendChild(error);
    });
});

// Ajoute un nouveau travail dans la galerie de la modale sans la vider
// Utilisée après un ajout réussi pour mettre à jour le DOM dynamiquement
function showNewWorkInModal(work) {
  const modalGalery = document.getElementById("modal-works");
  modalGalery.innerHTML += `
      <figure data-id="${work.id}">
        <button class="btn-delete" data-id="${work.id}">
        <svg width="9" height="11" viewBox="0 0 9 11" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.71607 0.35558C2.82455 0.136607 3.04754 0 3.29063 0H5.70938C5.95246 0 6.17545 0.136607 6.28393 0.35558L6.42857 0.642857H8.35714C8.71272 0.642857 9 0.930134 9 1.28571C9 1.64129 8.71272 1.92857 8.35714 1.92857H0.642857C0.287277 1.92857 0 1.64129 0 1.28571C0 0.930134 0.287277 0.642857 0.642857 0.642857H2.57143L2.71607 0.35558ZM0.642857 2.57143H8.35714V9C8.35714 9.70915 7.78058 10.2857 7.07143 10.2857H1.92857C1.21942 10.2857 0.642857 9.70915 0.642857 9V2.57143ZM2.57143 3.85714C2.39464 3.85714 2.25 4.00179 2.25 4.17857V8.67857C2.25 8.85536 2.39464 9 2.57143 9C2.74821 9 2.89286 8.85536 2.89286 8.67857V4.17857C2.89286 4.00179 2.74821 3.85714 2.57143 3.85714ZM4.5 3.85714C4.32321 3.85714 4.17857 4.00179 4.17857 4.17857V8.67857C4.17857 8.85536 4.32321 9 4.5 9C4.67679 9 4.82143 8.85536 4.82143 8.67857V4.17857C4.82143 4.00179 4.67679 3.85714 4.5 3.85714ZM6.42857 3.85714C6.25179 3.85714 6.10714 4.00179 6.10714 4.17857V8.67857C6.10714 8.85536 6.25179 9 6.42857 9C6.60536 9 6.75 8.85536 6.75 8.67857V4.17857C6.75 4.00179 6.60536 3.85714 6.42857 3.85714Z" fill="white"/>
</svg>

        </button>
        <img src="${work.imageUrl}" alt="${work.title}">
        </figure>
        `;
}

// Vérifie si tous les champs du formulaire sont remplis
// Active ou désactive le bouton submit en conséquence via les classes CSS
function checkForm() {
  const title = document.getElementById("title").value;
  const category = document.getElementById("category").value;
  const image = document.getElementById("file-input").files[0];
  const btn = document.querySelector("#modal-form button[type='submit']");
  if (title !== "" && category !== "" && image !== undefined) {
    // Tous les champs remplis : bouton vert et cliquable
    btn.classList.add("btn-submit-active");
    btn.classList.remove("disabled");
  } else {
    // Champs incomplets : bouton gris et non cliquable
    btn.classList.remove("btn-submit-active");
    btn.classList.add("disabled");
  }
}
// Déclenche la vérification du formulaire à chaque modification des champs
document.getElementById("title").addEventListener("input", checkForm);
document.getElementById("category").addEventListener("change", checkForm);
document.getElementById("file-input").addEventListener("change", checkForm);
