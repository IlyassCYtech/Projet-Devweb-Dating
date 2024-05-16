function creerXMLHttpRequete() {
  var xhr;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }
  return xhr;
}

function deconnection() {
  var xhr = creerXMLHttpRequete();
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      window.location.reload();
    }
  };
  xhr.open("POST", "confirmLogout.php", true);
  xhr.send();
}

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
  if (divPanier.style.display === "none") {
    divPanier.style.display = "block";
  } else {
    divPanier.style.display = "none";
    var profilCompDivs = document.querySelectorAll('.profilaccomp');
    profilCompDivs.forEach(function(compDiv) {
      if (compDiv.style.display !== "none") {
        compDiv.style.display = "none";
      }
    });
  }
}

/////////////////////////////////////////////////////////////////////





// Fonction pour lire le contenu d'un fichier texte
function lireFichierTexte(chemin) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        // Appeler la fonction de traitement des profils avec le contenu du fichier
        traiterProfils(xhr.responseText);
      } else {
        console.error("Erreur de chargement du fichier.");
      }
    }
  };
  xhr.open("GET", chemin, true);
  xhr.send();
}


////////////////////////





///////////////////////





function traiterProfils(contenu) {
  var profilsContainer = document.getElementById("listprofil");
  var lignes = contenu.split("\n");
  var profilsAffiches = {};

  // Dans traiterProfils
lignes.forEach(function(ligne) {
  var infosProfil = ligne.split(",");
  var nom = infosProfil[2];
  var age = infosProfil[5] ? new Date().getFullYear() - new Date(infosProfil[5]).getFullYear() : "Âge inconnu";
  var email = infosProfil[3];
  var gender = infosProfil[6];

  if (gender !== preference) {
      return;
  }

  var profilId = (nom.toLowerCase().replace(" ", "") + email).replace(/[^\w]/g, '');

  if (profilsAffiches[profilId]) {
      return;
  }
  profilsAffiches[profilId] = true;

  var profilDiv = document.createElement("div");
  profilDiv.className = "profilacc";
  profilDiv.id = profilId;
  profilDiv.setAttribute("data-email", email);

  // Créer l'image du profil
  var img = document.createElement("img");
  img.className = "photoprofil";
  img.src = "../database/profil/" + email;
  img.style.width = "250px"; // Définir la largeur de l'image à 250px
  img.style.height = "250px"; // Définir la hauteur de l'image à 250px
  profilDiv.appendChild(img);

  // Créer les éléments de texte pour le nom et l'âge du profil
  var texteDiv = document.createElement("div");
  texteDiv.className = "texteprof";
  var nomPara = document.createElement("p");
  nomPara.className = "texteprofilsimple nomprof";
  nomPara.textContent = nom;
  var agePara = document.createElement("p");
  agePara.className = "texteprofilsimple ageprof";
  agePara.textContent = age;
  texteDiv.appendChild(nomPara);
  texteDiv.appendChild(agePara);
  profilDiv.appendChild(texteDiv);

  // Ajouter le profil à la liste des profils
  profilsContainer.appendChild(profilDiv);

  // Créer une version complète du profil
  var profilCompDiv = document.createElement("div");
  profilCompDiv.className = "profilaccomp";
  profilCompDiv.id = profilId + "comp";

  // Créer l'image du profil complet
  var imgComp = document.createElement("img");
  imgComp.className = "photoprofilcomp";
  imgComp.src = "../database/profil/" + email;
  imgComp.style.width = "500px"; 
  imgComp.style.height = "500px"; 
  profilCompDiv.appendChild(imgComp);

  // Créer les éléments de texte pour le nom et l'âge du profil complet
  var texteCompDiv = document.createElement("div");
  texteCompDiv.className = "texteprofcomp";
  var nomCompPara = document.createElement("p");
  nomCompPara.className = "texteprofcomp nomprofcomp";
  nomCompPara.textContent = nom;
  var ageCompPara = document.createElement("p");
  ageCompPara.className = "texteprofcomp ageprofcomp";
  ageCompPara.textContent = age;
  texteCompDiv.appendChild(nomCompPara);
  texteCompDiv.appendChild(ageCompPara);
  profilCompDiv.appendChild(texteCompDiv);

  // Créer le bouton "Fermer" pour le profil complet
  var boutonFermer = document.createElement("button");
  boutonFermer.innerHTML = "<strong>X</strong>";
  boutonFermer.className = "fermercomp";
  boutonFermer.onclick = function() {
    cacherProfilComplet(profilId + "comp");
  };
  profilCompDiv.appendChild(boutonFermer);

  // Créer le bouton "Ajouter au panier" pour le profil complet
  var boutonAjouterPanier = document.createElement("button");
  boutonAjouterPanier.className = "ajoutpanier";
  var imgAjouterPanier = document.createElement("img");
  imgAjouterPanier.src = "../img/logo.png"; 
  imgAjouterPanier.alt = "Ajouter au panier";
  imgAjouterPanier.width = 50;
  imgAjouterPanier.height = 50;
  boutonAjouterPanier.appendChild(imgAjouterPanier);
  boutonAjouterPanier.onclick = function() {
    ajouterAuPanier(profilId, email); // Passer l'email ici
  };
  profilCompDiv.appendChild(boutonAjouterPanier);

  // Ajouter le profil complet à la liste des profils
  profilsContainer.appendChild(profilCompDiv);

  // Attacher l'événement onclick pour afficher le profil complet
  profilDiv.onclick = function() {
    afficherProfil(profilId);
  };
});
}


// Charger le fichier texte et traiter les profils
lireFichierTexte("../database/userList.txt", traiterProfils);



function creerXMLHttpRequete() {
  var xhr;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }
  return xhr;
}

function ajouterAuPanier(id, profilEmail) { // Inclure profilEmail comme paramètre
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

  // Envoyer une requête AJAX pour enregistrer les adresses e-mail dans contact.txt
  var xhr = creerXMLHttpRequete();
  xhr.open("POST", "ajouterAuPanier.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send("profilEmail=" + encodeURIComponent(profilEmail)); // Utiliser profilEmail ici
}



function creerXMLHttpRequete() {
  var xhr;
  if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
  } else {
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }
  return xhr;
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


