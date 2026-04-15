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
