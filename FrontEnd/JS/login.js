// Importe toutes les fonctions de callAPI.js pour les appels API
import * as APi from "./callAPI.js";
// Cible le formulaire de connexion
const form = document.querySelector("form");
// Écoute la soumission du formulaire de connexion
form.addEventListener("submit", (e) => {
  e.preventDefault(); // empèche le rechargement de la page

  // Récupère les valeurs saisies par l'utilisateur
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  // Envoie les identifiants à l'API via la fonction login de callAPI.js
  APi.login(email, password)
    .then((data) => {
      // En cas de succès, stocke le token JWT pour les futures requêtes
      // authentifiées (suppression, ajout de travaux)
      localStorage.setItem("token", data.token);
      // Redirige vers la page d'accueil en mode admin
      window.location.href = "index.html";
    })
    .catch(() => {
      // Supprime le message d'erreur précédent s'il existe
      // pour éviter d'empiler plusieurs messages
      const existingError = document.querySelector(".error-message");
      if (existingError) existingError.remove();

      // Crée et affiche un message d'erreur sous le formulaire
      const error = document.createElement("p");
      error.textContent = "Erreur dans l'identifiant ou le mot de passe";
      error.classList.add("error-message");
      form.appendChild(error);
    });
});
