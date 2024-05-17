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

  if (!document.getElementById("titrePanier")) {
    var titre = document.createElement("h2");
    titre.id = "titrePanier";
    titre.textContent = "Ici vous ne verrez que les profils en attente de réponse";
    titre.style.color = "navy";
    titre.style.textAlign = "center";
    divPanier.insertBefore(titre, divPanier.firstChild);
}

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

function chargerEtTraiterProfils() {
  var xhr = creerXMLHttpRequete();
  xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
          // Inverser l'ordre des lignes ici
          var lignes = xhr.responseText.trim().split("\n").reverse();
          traiterProfils(lignes.join("\n")); // On rejoint les lignes pour passer une seule chaîne à la fonction traiterProfils
      } else if (xhr.readyState === XMLHttpRequest.DONE) {
          console.error("Erreur de chargement du fichier userList.txt.");
      }
  };
  xhr.open("GET", "../database/userList.txt", true);
  xhr.send();
}








///////////////////////





function traiterProfils(contenu) {
  var profilsContainer = document.getElementById("listprofil");
  var lignes = contenu.split("\n");
  var profilsAffiches = {};  // Pour éviter les doublons

  // Dans traiterProfils
lignes.forEach(function(ligne) {
  var infosProfil = ligne.split(",");
  var nom = infosProfil[0];
  var age = infosProfil[5] ? new Date().getFullYear() - new Date(infosProfil[5]).getFullYear() : "Âge inconnu";
  var email = infosProfil[3];
  var gender = infosProfil[6];

    if (gender !== preference || contactEmails.includes(email.trim())) {    return; // Ne pas afficher les profils non désirés ou déjà dans le panier de l'utilisateur
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

chargerEtTraiterProfils();





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
  btnRetirerDuPanier.className = "retirer";
  btnRetirerDuPanier.style = "border-radius: 13px;"
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
  var profilEmail = profilDiv.getAttribute("data-email");

  // Supprimer la div clonée du panier
  profilDiv.parentNode.removeChild(profilDiv);

  // Afficher la div de profil dans la section pagebas
  profilOriginalDiv.style.display = "flex";

  // Masquer la div comp
  var profilCompDiv = document.getElementById(id + "comp");
  profilCompDiv.style.display = "none";

  // Envoyer une requête AJAX pour supprimer l'adresse e-mail du fichier contact.txt
  var xhr = creerXMLHttpRequete();
  xhr.open("POST", "retirerDuPanier.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send("profilEmail=" + encodeURIComponent(profilEmail));
}

/////////////////////////////////////////////////
window.onload = chargerPanierDepuisFichier;

function creerXMLHttpRequete() {
    var xhr;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return xhr;
}

function chargerPanierDepuisFichier() {
    var xhr = creerXMLHttpRequete();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            var contactPairs = xhr.responseText.split("\n").map(line => line.trim()).filter(Boolean);
            var filteredEmails = filterEmails(contactPairs, userEmail);
            if (filteredEmails.length > 0) {
                chargerDetailsDesProfils(filteredEmails);
            } else {
            }
        }
    };
    xhr.open("GET", "../database/contact.txt", true);
    xhr.send();
}

function filterEmails(contactPairs, userEmail) {
    var pairs = contactPairs.map(line => line.split(';').map(part => part.trim()));
    var userToOthers = pairs.filter(pair => pair[0] === userEmail).map(pair => pair[1]);
    var othersToUser = pairs.filter(pair => pair[1] === userEmail).map(pair => pair[0]);
    return userToOthers.filter(email => !othersToUser.includes(email));
}

function chargerDetailsDesProfils(emails) {
    var xhr = creerXMLHttpRequete();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            var lignesUserList = xhr.responseText.split("\n");
            var profils = lignesUserList.map(ligne => ligne.split(','));
            afficherProfilsDansPanier(emails, profils);
        }
    };
    xhr.open("GET", "../database/userList.txt", true);
    xhr.send();
}

function afficherProfilsDansPanier(emails, profils) {
    var divPanier = document.getElementById("panier");
    emails.forEach(function(email) {
        var profilData = profils.find(profil => profil[3].trim() === email);
        if (profilData) {
            var profilDiv = creerElementProfil(profilData);
            divPanier.appendChild(profilDiv);
        }
    });
}

function creerElementProfil(profilData) {
  var profilDiv = document.createElement("div");
  profilDiv.className = "profilaccpan";  // Classe pour le conteneur du profil

  var img = document.createElement("img");
  img.className = "photoprofil";  // Classe pour l'image du profil
  img.src = "../database/profil/" + profilData[3].trim();  // Chemin vers l'image du profil
  img.style.width = "250px";
  img.style.height = "250px";
  profilDiv.appendChild(img);

  // Div conteneur pour le nom et l'âge pour une meilleure structure
  var texteDiv = document.createElement("div");
  texteDiv.className = "texteprof";  // Classe conteneur pour le texte

  var nomPara = document.createElement("p");
  nomPara.className = "texteprofilsimple nomprof";  // Classe pour le nom
  nomPara.textContent = profilData[0];
  texteDiv.appendChild(nomPara);

  var agePara = document.createElement("p");
  agePara.className = "texteprofilsimple ageprof";  // Classe pour l'âge
  agePara.textContent = calculerAge(profilData[5]) + " ans";
  texteDiv.appendChild(agePara);

  profilDiv.appendChild(texteDiv);

  var btnRetirerDuPanier = document.createElement("button");
  btnRetirerDuPanier.className = "retirer";
  btnRetirerDuPanier.style = "border-radius: 13px;";
  btnRetirerDuPanier.textContent = "Retirer du panier";
  btnRetirerDuPanier.onclick = function() {
      retirerDuPanier2(profilData[3], profilDiv);  // Appel à la fonction pour retirer le profil du panier
  };

  profilDiv.appendChild(btnRetirerDuPanier);

  return profilDiv;
}


function calculerAge(dateNaissance) {
    var today = new Date();
    var birthDate = new Date(dateNaissance);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}


function retirerDuPanier2(profilEmail, profilDiv) {
  var xhr = creerXMLHttpRequete();
  xhr.open("POST", "retirerDuPanier.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
          profilDiv.parentNode.removeChild(profilDiv); // Supprimer la div du DOM
      }
  };
  xhr.send("profilEmail=" + encodeURIComponent(profilEmail));
}