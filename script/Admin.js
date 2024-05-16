
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

    xhr.open("POST", "../(DE)connexion/confirmLogout.php", true);
    xhr.send();
  }

  function deleteUser(email) {
    // Fonction pour supprimer l'utilisateur
    if (confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
        // Effectue une requête AJAX
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                // Vérifie si la requête a réussi
                if (xhr.status === 200) {
                    // Rafraîchit la page pour refléter les changements
                    location.reload();
                } else {
                    // Affiche un message d'erreur en cas d'échec de la requête
                    alert("Erreur : " + xhr.responseText);
                }
            }
        };
        // Définit la méthode, l'URL et envoie la requête
        xhr.open("GET", "Supprimer-profil.php?email=" + email, true);
        xhr.send();
    }
}

function banUser(email, reason) {
    // Fonction pour bannir l'utilisateur
    // Effectue une requête AJAX pour envoyer les données au script PHP
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            // Vérifie si la requête a réussi
            if (xhr.status === 200) {
                // Met à jour la table des utilisateurs avec les données les plus récentes
                document.getElementById('user-table').innerHTML = xhr.responseText;
                // Cache le formulaire après avoir banni l'utilisateur
                document.getElementById('ban-modal').style.display = 'none';
            } else {
                // Affiche un message d'erreur en cas d'échec de la requête
                alert("Erreur : " + xhr.responseText);
            }
        }
    };
    // Définit la méthode, l'URL et envoie la requête
    xhr.open("POST", "Ban.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("email=" + encodeURIComponent(email) + "&reason=" + encodeURIComponent(reason));
}



function showBanModal(email) {
    // Fonction pour afficher la fenêtre modale et afficher l'adresse e-mail
    document.getElementById('ban-modal').style.display = 'block';
    document.getElementById('ban-email').innerText = "Adresse e-mail : " + email;
    // Lors de la soumission du formulaire, appeler la fonction pour bannir l'utilisateur
    document.getElementById('ban-user-form').onsubmit = function(event) {
        event.preventDefault(); // Empêche l'envoi du formulaire par défaut
        var banReason = document.getElementById('ban-reason').value;
        banUser(email, banReason);
    };
}
function closeModal() {
    // Fonction pour fermer la fenêtre modale
    document.getElementById('ban-modal').style.display = 'none';
}

function unbanUser(email) {
    // Effectue une requête AJAX pour envoyer l'adresse e-mail à unban.php
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            // Vérifie si la requête a réussi
            if (xhr.status === 200) {
                // Met à jour la page ou affiche un message de succès
                location.reload(); // Recharge la page pour mettre à jour la liste des utilisateurs
            } else {
                // Affiche un message d'erreur en cas d'échec de la requête
                alert("Erreur : " + xhr.responseText);
            }
        }
    };
    // Définit la méthode, l'URL et envoie la requête
    xhr.open("GET", "Unban.php?email=" + encodeURIComponent(email), true);
    xhr.send();
}


function editUser(email) {
    // Récupère le bouton "Modifier" correspondant à l'utilisateur à modifier
    var editButton = document.querySelector('tr[data-email="' + email + '"] .btn-modifier');
    // Récupère la ligne correspondant à l'utilisateur à modifier
    var userRow = editButton.closest("tr");
    // Parcours chaque cellule de la ligne pour la transformer en champ d'édition (sauf l'adresse email)
    var cells = userRow.querySelectorAll("td");
    for (var i = 1; i < cells.length - 1; i++) { // Commence à l'index 1 pour éviter de modifier l'adresse email et se termine à l'avant-dernière cellule
        var cellValue = cells[i].innerText.trim();
        cells[i].innerHTML = "<input type='text' name='" + getFieldName(i) + "' value='" + cellValue + "'>";
    }
    // Remplace le bouton "Modifier" par le bouton "Enregistrer"
    editButton.innerHTML = "Enregistrer";
    editButton.setAttribute("onclick", "saveUser('" + email + "')");
}

// Cette fonction renvoie le nom du champ en fonction de l'indice de la cellule
function getFieldName(index) {
    switch (index) {
        case 1:
            return "nickname";
        case 2:
            return "password";
        case 3:
            return "firstname";
        case 4:
            return "email";
        case 5:
            return "lastname";
        case 6:
            return "birthdate";
        case 7:
            return "gender";
        case 8:
            return "preference";
        case 9:
            return "type";
        default:
            return ""; // Vous pouvez gérer cela en fonction de vos besoins
    }
}

function saveUser(email) {
    // Récupère la ligne correspondant à l'utilisateur à modifier
    var userRow = document.querySelector('tr[data-email="' + email + '"]');
    
    // Récupère les valeurs des champs d'édition
    var inputs = userRow.querySelectorAll('input[type="text"]');
    var values = {};
    inputs.forEach(function(input) {
        var name = input.getAttribute("name");
        var value = input.value;
        values[name] = value;
    });

    // Ajoute l'adresse e-mail passée en paramètre
    values['email'] = email;

    // Envoie les valeurs au serveur via une requête AJAX
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                // Mettre à jour l'affichage si nécessaire
                alert("Utilisateur mis à jour avec succès !");
            } else {
                // Gérer les erreurs éventuelles
                alert("Erreur lors de la mise à jour de l'utilisateur : " + xhr.responseText);
            }
        }
    };
    
    // Définit la méthode, l'URL et envoie la requête
    xhr.open("POST", "Modifier-profil.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(values));
}