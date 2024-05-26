function deconnection() //fonction responsable par la deconnection
{
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function()
  {
    if (this.readyState == 4 && this.status == 200) 
    {
      window.location.reload();
    }
  };

    xhr.open("POST", "../confirmLogout.php", true);
    xhr.send();
  }


function uncheck() //eviter que le checkbox reste cochée, ceci evite des erreurs possibles
{
    checkBx = document.getElementById("ageChoiceCb");
    checkBx.checked = false;
}
function verif_contenu(pseudo)//eviter des profils vides 
{
    if(pseudo == "")
        return 0;

    return 1;
}

function creeAgeInput()//fonction cree dynamiquement des inputs et met en place leur css
{
    var checkBox = document.getElementById("ageChoiceCb");
    if(checkBox.checked)
    {
        var inpt = document.createElement("input");
        inpt.setAttribute("type", "number");
        inpt.min = "18";
        inpt.max = "105";
        inpt.value = "18";
        inpt.style.width = "50px";
        inpt.id="age";
        checkBox.parentNode.insertBefore(inpt,checkBox.nextSibling);
    }
    else
    {
        var ageInput = document.getElementById("age");
        if (ageInput) 
        {
            ageInput.parentNode.removeChild(ageInput);
        }
    }


}

function requeteRechercheEtablie(donneesemetteur,mailrecepteur) //requete qui va envoyer le profil emetteur et recherché au servé pour être enregistré
{
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {};

    xhr.open("POST", "controleRecherche.php", true); 
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
    var donees = "emeteur=" + encodeURIComponent(donneesemetteur) + "&recepteur=" + encodeURIComponent(mailrecepteur);
    xhr.send(donees);
}





function displayResults(results, donneesemetteur) {
  var resultats = document.getElementById("resultats");
  resultats.innerHTML = ""; // Nettoyer les résultats précédents
  resultats.style.display = "flex-box";

  if (results == "Pseudo non trouvé" || results == "Pseudo dans la tranche d'âge non trouvé") {
      alert(results);
  } else {
      let index = 0; // Compteur pour créer des IDs uniques
      for (var user of results) {
          var infosProfil = user.split(",");
          var nom = infosProfil[0];
          var age = infosProfil[4] ? new Date().getFullYear() - new Date(infosProfil[4]).getFullYear() : "Âge inconnu";
          var email = infosProfil[2].trim();
          var gender = infosProfil[5];
          var pref = infosProfil[6];
          var inter = infosProfil[9];
          var localis = infosProfil[7];
          var metier = infosProfil[8];
          var profilId = "profil-" + index;
          var profilCompId = "profilComp-" + index;

          var profilDiv = document.createElement("div");
          profilDiv.id = profilId;
          profilDiv.className = "profilacc";
          profilDiv.setAttribute("data-email", email);

          var img = document.createElement("img");
          img.className = "photoprofil";
          img.src = "../../database/profil/" + email;
          img.style.width = "150px";
          img.style.height = "150px";
          profilDiv.appendChild(img);

          var texteDiv = document.createElement("div");
          texteDiv.className = "texteprof";
          var nomPara = document.createElement("p");
          nomPara.className = "texteprofilsimple nomprof";
          nomPara.textContent = nom + " " + age;
          texteDiv.appendChild(nomPara);
          profilDiv.appendChild(texteDiv);

          resultats.appendChild(profilDiv);

          var profilCompDiv = document.createElement("div");
          profilCompDiv.id = profilCompId;
          profilCompDiv.className = "profilaccomp";
          profilCompDiv.style.display = "none"; // Initialement caché

          var imgComp = document.createElement("img");
          imgComp.className = "photoprofilcomp";
          imgComp.src = "../../database/profil/" + email;
          imgComp.style.width = "500px"; 
          imgComp.style.height = "500px"; 
          profilCompDiv.appendChild(imgComp);

          var texteCompDiv = document.createElement("div");
          texteCompDiv.className = "texteprofcomp";
          texteCompDiv.appendChild(createTextElement("nomprofcomp", nom));
          texteCompDiv.appendChild(createTextElement("ageprofcomp", "Mon âge : " + age));
          texteCompDiv.appendChild(createTextElement("genreCompPara", "Mon genre : " + gender));
          texteCompDiv.appendChild(createTextElement("prefCompPara", "Ma préférence : " + pref));
          texteCompDiv.appendChild(createTextElement("interCompPara", "Mon centre d'intérêt : " + inter));
          texteCompDiv.appendChild(createTextElement("localisCompPara", "Où je vis : " + localis));
          texteCompDiv.appendChild(createTextElement("metierCompPara", "Mon métier : " + metier));
          profilCompDiv.appendChild(texteCompDiv);

          // Ajouter le bouton "Fermer"
          var boutonFermer = document.createElement("button");
          boutonFermer.innerHTML = "<strong>X</strong>";
          boutonFermer.className = "fermercomp";
          boutonFermer.onclick = (function(compDiv) {
              return function() {
                  compDiv.style.display = "none"; // Utiliser la variable capturée dans la fermeture
              };
          })(profilCompDiv);
          profilCompDiv.appendChild(boutonFermer);

          // Ajouter le bouton "Ajouter au panier"
          var boutonAjouterPanier = document.createElement("button");
          boutonAjouterPanier.className = "ajoutpanier";
          var imgAjouterPanier = document.createElement("img");
          imgAjouterPanier.src = "../../img/logo.png"; 
          imgAjouterPanier.alt = "Ajouter au panier";
          imgAjouterPanier.width = 50;
          imgAjouterPanier.height = 50;
          boutonAjouterPanier.appendChild(imgAjouterPanier);
          boutonAjouterPanier.onclick = (function(email, pId, compId) {
              return function() {
                  ajouterAuPanier(email, pId);
                  document.getElementById(compId).style.display = "none"; // Masquer le profil complet
              };
          })(email, profilId, profilCompId);
          profilCompDiv.appendChild(boutonAjouterPanier);

          resultats.appendChild(profilCompDiv);

          // Attacher l'événement onclick pour afficher le profil complet
          profilDiv.onclick = (function(compId) {
              return function() {
                  var allCompDivs = document.querySelectorAll('.profilaccomp');
                  allCompDivs.forEach(function(div) { div.style.display = 'none'; }); // Cache tous les autres profils complets
                  var compDiv = document.getElementById(compId);
                  compDiv.style.display = "block"; // Affiche ce profil complet
              };
          })(profilCompId);

          index++; // Incrémenter l'index pour le prochain profil
          requeteRechercheEtablie(donneesemetteur,email);
        }
  }
}

function createTextElement(className, textContent) {
  var para = document.createElement("p");
  para.className = "texteprofcomp " + className;
  para.textContent = textContent;
  return para;
}

function afficherProfil(compId) {
  var profilComp = document.getElementById(compId);
  profilComp.style.display = "block"; // Afficher le profil complet
}

function ajouterAuPanier(profilEmail, profilId) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "ajouterAuPanierrecherche.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send("profilEmail=" + encodeURIComponent(profilEmail));

  // Cacher les éléments du profil et du profil complet
  var profilDiv = document.getElementById(profilId);
  if (profilDiv) {
      profilDiv.style.display = "none";
  }
}




//function cree une requete avec jquerry et json
function lancer_recherche(donneesemetteur) 
{
    var pseudo = document.getElementById("rechercheBarre").value;
    var checkBox = document.getElementById("ageChoiceCb");
    if(checkBox.checked)
    {
        var agepar = document.getElementById("age").value;
    }else
    {
        var agepar = null;
    }
    pseudo = pseudo.toLowerCase();

    if (verif_contenu(pseudo)) 
    {
        var requestData = { pseudo: pseudo, age : agepar }; // Create data object
        $.ajax({
            type: "POST",
            dataType: 'json',
            url: "rechercheprofile.php",
            contentType: "application/json",
            data: JSON.stringify(requestData), // Convert data object to JSON string
            success: function (response) 
            {
                displayResults(response,donneesemetteur); // Access response data
            }
        });
    } else 
    {
        alert("Remplir les champs correctement");
    }
}


