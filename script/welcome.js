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
function connection()
{
document.addEventListener("DOMContentLoaded", function() {
    const loginButton = document.getElementById("loginButton");
    const loginForm = document.createElement("div");
    loginForm.innerHTML = `
      <div id="loginModal" class="modal">
        <div class="modal-content">
          <span class="close">&times;</span>
          <h2>Connexion</h2>
          <form id="loginForm">
            <label for="username">Identifiant:</label>
            <input type="text" id="username" name="username" required>
            <label for="password">Mot de passe:</label>
            <input type="password" id="password" name="password" required>
            <button type="submit">Se connecter</button>
          </form>
        </div>
      </div>
    `;
    document.body.appendChild(loginForm);
  
    const modal = document.getElementById("loginModal");
    const closeButton = document.getElementsByClassName("close")[0];
  
    loginButton.addEventListener("click", function() {
      modal.style.display = "block";
    });
  
    closeButton.addEventListener("click", function() {
      modal.style.display = "none";
    });
  
    window.addEventListener("click", function(event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  
    const loginFormElement = document.getElementById("loginForm");
    loginFormElement.addEventListener("submit", function(event) {
      event.preventDefault();
      // Insérer le code pour la soumission du formulaire ici
      alert("Formulaire soumis !");
      modal.style.display = "none";
    });
  });
}

  function openSettings() {
    window.location.href = "parametres.html";
}

function logout() {
    // Code pour déconnexion
}





document.addEventListener('DOMContentLoaded', function() {
  // Récupérer tous les contacts
  var contacts = document.querySelectorAll('.contact');

  // Ajouter un écouteur d'événements à chaque contact pour changer la conversation
  contacts.forEach(function(contact) {
      contact.addEventListener('click', function() {
          var currentContact = document.getElementById('current-contact');
          currentContact.textContent = contact.textContent;

          // Cacher tous les messages
          var messages = document.querySelectorAll('.message');
          messages.forEach(function(message) {
              message.style.display = 'none';
          });

          // Afficher les messages correspondant au contact sélectionné
          var contactName = contact.getAttribute('data-contact');
          var selectedMessages = document.querySelectorAll('.message.' + contactName);
          selectedMessages.forEach(function(message) {
              message.style.display = 'block';
          });
      });
  });

  // Récupérer le bouton "Envoyer"
  var sendButton = document.getElementById('send-button');

  // Ajouter un écouteur d'événements pour le clic sur le bouton "Envoyer"
  sendButton.addEventListener('click', function() {
      // Récupérer le texte du message
      var messageInput = document.getElementById('message-input');
      var messageText = messageInput.value.trim();
      
      // Vérifier si le message est vide
      if (messageText === '') {
          return;
      }

      // Créer un nouvel élément de message
      var messageElement = document.createElement('div');
      messageElement.classList.add('message', 'sent');
      messageElement.classList.add('ami1'); // Ajouter la classe correspondant au contact
      messageElement.textContent = messageText;

      // Ajouter le message à la liste des messages
      var messagesContainer = document.querySelector('.messages');
      messagesContainer.appendChild(messageElement);

      // Effacer le champ de texte après l'envoi du message
      messageInput.value = '';

      // Faire défiler jusqu'au bas de la liste des messages
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
  });
});



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
