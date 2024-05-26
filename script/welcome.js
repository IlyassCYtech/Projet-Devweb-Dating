function creerXMLHttpRequete()
 {
  var xhr;
  if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
  } else {
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }
  return xhr;
}


function deconnection()
{
  var xhr = creerXMLHttpRequete();
  xhr.onreadystatechange = function()
  {
    if (this.readyState == 4 && this.status == 200) 
    {
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
  // Charger userList.txt
  var xhrUserList = creerXMLHttpRequete();
  xhrUserList.onreadystatechange = function() {
      if (xhrUserList.readyState === XMLHttpRequest.DONE) {
          if (xhrUserList.status === 200) {
              var userList = xhrUserList.responseText.trim().split("\n").reverse().join("\n");
              
              // Charger contact.txt après le chargement de userList.txt
              var xhrContact = creerXMLHttpRequete();
              xhrContact.onreadystatechange = function() {
                  if (xhrContact.readyState === XMLHttpRequest.DONE && xhrContact.status === 200) {
                      var contactList = xhrContact.responseText.trim();
                      // Appeler traiterProfils avec les deux contenus
                      traiterProfils(userList, contactList);
                  } else if (xhrContact.readyState === XMLHttpRequest.DONE) {
                      console.error("Erreur de chargement du fichier contact.txt.");
                  }
              };
              xhrContact.open("GET", "../database/contact.txt", true);
              xhrContact.send();
          } else {
              console.error("Erreur de chargement du fichier userList.txt.");
          }
      }
  };
  xhrUserList.open("GET", "../database/userList.txt", true);
  xhrUserList.send();
}






///////////////////////





function traiterProfils(contenu,contactContent) {

  var profilsContainer = document.getElementById("listprofil");
  var lignes = contenu.split("\n");
  var lignesContacts = contactContent.split("\n");
  var profilsAffiches = {};  // Pour éviter les doublons

  lignes.forEach(function(ligne) {

    var infosProfil = ligne.split(",");
    var nom = infosProfil[0];
    var age = infosProfil[5] ? new Date().getFullYear() - new Date(infosProfil[5]).getFullYear() : "Âge inconnu";
    var email = infosProfil[3].trim();
    var gender = infosProfil[6];
    var pref = infosProfil[7];
    var inter = infosProfil[10];
    var localis = infosProfil[8];
    var metier = infosProfil[9];
    var emailUtilisateur = userEmail;


    var estBloque = lignesContacts.some(contactLigne => {
      return (contactLigne.includes(emailUtilisateur + '!' + email) || contactLigne.includes(email + '!' + emailUtilisateur));
  });

  if(email == userEmail){
    return;
  }

  if (estBloque) {
      return; // Ne pas traiter ni afficher les profils bloqués
  }

    if (gender !== preference || contactEmails.includes(email)) {
      return; // Ne pas afficher les profils non désirés ou déjà dans le panier de l'utilisateur
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
    img.style.width = "150px";
    img.style.height = "150px";
    profilDiv.appendChild(img);

    // Créer les éléments de texte pour le nom et l'âge du profil
    var texteDiv = document.createElement("div");
    texteDiv.className = "texteprof";
    var nomPara = document.createElement("p");
    nomPara.className = "texteprofilsimple nomprof";
    nomPara.textContent = nom + " " + age;
    texteDiv.appendChild(nomPara);
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
  ageCompPara.textContent ="Mon âge : " + age;
  var genreCompPara = document.createElement("p");
  genreCompPara.className = "texteprofcomp genreCompPara";
  genreCompPara.textContent ="Mon genre : " + gender;
  var prefCompPara = document.createElement("p");
  prefCompPara.className = "texteprofcomp prefCompPara";
  prefCompPara.textContent ="Ma préférence : " + pref;
  var interCompPara = document.createElement("p");
  interCompPara.className = "texteprofcomp interCompPara";
  interCompPara.textContent ="Mon centre d'intérêt : " + inter;
  var localisCompPara = document.createElement("p");
  localisCompPara.className = "texteprofcomp localisCompPara";
  localisCompPara.textContent ="Où je vis : " + localis;
  var metierCompPara = document.createElement("p");
  metierCompPara.className = "texteprofcomp metierCompPara";
  metierCompPara.textContent ="Mon métier : " + metier;
  texteCompDiv.appendChild(nomCompPara);
  texteCompDiv.appendChild(ageCompPara);
  texteCompDiv.appendChild(genreCompPara);
  texteCompDiv.appendChild(prefCompPara);
  texteCompDiv.appendChild(interCompPara);
  texteCompDiv.appendChild(localisCompPara);
  texteCompDiv.appendChild(metierCompPara);
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

var nom = profilData[0];
var age = profilData[5] ? new Date().getFullYear() - new Date(profilData[5]).getFullYear() : "Âge inconnu";
  var profilDiv = document.createElement("div");
  profilDiv.className = "profilacc";  // Classe pour le conteneur du profil

  var img = document.createElement("img");
  img.className = "photoprofil";  // Classe pour l'image du profil
  img.src = "../database/profil/" + profilData[3].trim();  // Chemin vers l'image du profil
  img.style.width = "150px";
  img.style.height = "150px";
  profilDiv.appendChild(img);

  // Div conteneur pour le nom et l'âge pour une meilleure structure
  var texteDiv = document.createElement("div");
  texteDiv.className = "texteprof";  // Classe conteneur pour le texte

  var nomPara = document.createElement("p");
  nomPara.className = "texteprofilsimple nomprof";  // Classe pour le nom
  nomPara.textContent = nom + " " + age;
  texteDiv.appendChild(nomPara);
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


//fonctions relatives à la visualisation du historique de recherche
function afficheListeVu() //afficher la div de personnes qui ont cherché l'utilisateur 
{
  var divRegard = document.getElementById("listeVu");
  var display = divRegard.style.display;
  if(display == "block")
    divRegard.style.display="none";
  else
    divRegard.style.display = "block";
    
}
function enlevernotif(utilemail)
{
  
  var listeVuDiv = document.getElementById("listeVu");
  listeVuDiv.innerHTML="<p>Votre profil a 0 visites<p>";


  xhr = new XMLHttpRequest;
  xhr.open("POST","recherche/nettoyeHistoriqueRecherche.php",true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 

  xhr.send("email="+utilemail);
    
}