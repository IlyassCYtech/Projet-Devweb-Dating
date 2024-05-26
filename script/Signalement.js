
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


  function banUser(messageId, email, reason) {
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
    deleteMessage(messageId);
    unbanMessage(messageId);
}


// Fonction pour supprimer un message
function deleteMessage(messageId) {
  console.log("supprimer :", messageId);
  // Effectuer une requête AJAX pour supprimer le message avec l'ID donné
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          var response = JSON.parse(this.responseText);
          if (response.success) {
              // Message supprimé avec succès, faire quelque chose si nécessaire
          } else {
              // Erreur lors de la suppression du message
              console.error(response.message);
          }
      }
  };
  xhttp.open("GET", "../(DE)connexion/supprimer_message.php?id=" + encodeURIComponent(messageId), true);
  xhttp.send();
  
}

function unbanMessage(messageId) {
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
  xhr.open("GET", "Unban-message.php?id=" + encodeURIComponent(messageId), true);
  xhr.send();
}