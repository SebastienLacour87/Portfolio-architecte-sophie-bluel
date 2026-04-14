import * as APi from "./callAPI.js";

const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault(); // empèche le rechargement de la page

  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  APi.login(email, password)
    .then((data) => {
      localStorage.setItem("token", data.token);
      window.location.href = "index.html";
    })
    .catch(() => {
      const existingError = document.querySelector(".error-message");
      if (existingError) existingError.remove();

      const error = document.createElement("p");
      error.textContent = "Erreur dans l'identifiant ou le mot de passe";
      error.classList.add("error-message");
      form.appendChild(error);
    });
});
