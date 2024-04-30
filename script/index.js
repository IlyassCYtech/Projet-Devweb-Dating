

document.addEventListener("DOMContentLoaded", function() {
    const loginButton = document.getElementById("loginButton");
    const loginForm = document.createElement("div");
    loginForm.innerHTML = `
      <div id="loginModal" class="modal">
        <div class="modal-content">
          <span class="close">&times;</span>
          <h2>Connexion</h2>
          <form id="loginForm" action="./(DE)connexion/confirmLogin.php" method="POST">
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
    const indentifiant = document.getElementById("username");
    const motDePasse = document.getElementById("username");
    envoyerRequetephp(indentifiant,motDePasse)
    {
      alert("");
    }
    
    loginFormElement.addEventListener("submit", function(event) {
      event.preventDefault();
      // Insérer le code pour la soumission du formulaire ici
      envoyerRequetephp(indentifiant,motDePasse);
      //alert("Formulaire soumis !");
      modal.style.display = "none";
    });



  });


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


