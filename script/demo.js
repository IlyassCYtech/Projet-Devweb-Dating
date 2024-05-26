////////////////////////////////////////////////////////////////////////////////////////////////////

function afficherProfil(id) {
  // Cacher toutes les div de profil complet
  var profilComplets = document.querySelectorAll('.profilaccomp');
  for (var i = 0; i < profilComplets.length; i++) {
      profilComplets[i].style.display = 'none';
  }
  
  // Afficher la div de profil complet correspondante
  var profilFull = document.getElementById(id + "comp"); 
  profilFull.style.display = "block";
}

function cacherProfilComplet(id) {
  var profilFull = document.getElementById(id); 
  profilFull.style.display = "none"; 
}

function affichepanier() {
  var divPanier = document.getElementById("panier");
  // Vérifier si la div du panier est actuellement cachée
  if (divPanier.style.display === "none") {
      // Si elle est cachée, l'afficher en changeant le style display
      divPanier.style.display = "block";
  } else {
      // Sinon, la cacher
      divPanier.style.display = "none";
      // Masquer toutes les versions "comp" des profils qui ne sont pas déjà cachées
      var profilCompDivs = document.querySelectorAll('.profilaccomp');
      profilCompDivs.forEach(function(compDiv) {
          if (compDiv.style.display !== "none") {
              compDiv.style.display = "none";
          }
      });
  }
}



function ajouterAuPanier(id) {
  var profilDiv = document.getElementById(id);
  var panierDiv = document.getElementById("panier");

  // Cloner la div de profil
  var cloneProfilDiv = profilDiv.cloneNode(true);

  // Créer un bouton "Retirer du panier"
  var btnRetirerDuPanier = document.createElement("button");
  btnRetirerDuPanier.textContent = "Retirer du panier";
  btnRetirerDuPanier.onclick = function() {
      retirerDuPanier(cloneProfilDiv, id);
  };

  // Ajouter la div clonée et le bouton "Retirer du panier" au panier
  panierDiv.appendChild(cloneProfilDiv);
  cloneProfilDiv.appendChild(btnRetirerDuPanier);

  // Masquer la div de profil dans la section pagebas
  profilDiv.style.display = "none";

  // Masquer la div comp correspondante
  var profilCompDiv = document.getElementById(id + "comp");
  profilCompDiv.style.display = "none";
}



function retirerDuPanier(profilDiv, id) {
  var pagebasDiv = document.getElementById("pagebas");
  var profilOriginalDiv = document.getElementById(id);

  // Supprimer la div clonée du panier
  profilDiv.parentNode.removeChild(profilDiv);

  // Afficher la div de profil dans la section pagebas
  profilOriginalDiv.style.display = "flex";

  // Masquer la div comp
  var profilCompDiv = document.getElementById(id + "comp");
  profilCompDiv.style.display = "none";
}
