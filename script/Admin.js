
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
                location.reload(); // Recharge la page pour mettre à jour la liste des utilisateurs
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
    for (var i = 1; i < cells.length - 2; i++) { // Commence à l'index 1 pour éviter de modifier l'adresse email et se termine à l'avant-dernière cellule
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
            return "localisation";
        case 10:
            return "metier";
        case 11:
            return "centreintret";
        case 12:
            return "dateincription";    
        case 13:
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
                location.reload();
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









// Fonction pour attacher le gestionnaire d'événements aux boutons de fermeture
function attachCloseEvent() {
    var closeButtons = document.getElementsByClassName("close");
    for (var i = 0; i < closeButtons.length; i++) {
        closeButtons[i].addEventListener("click", function() {
            closeMessageModal();
        });
    }
}

// Appeler la fonction pour attacher le gestionnaire d'événements une fois que le DOM est chargé
document.addEventListener("DOMContentLoaded", function() {
    attachCloseEvent();
});


// Fonction pour fermer le modal-div
function closeMessageModal() {
    var modal = document.getElementById("messageModal");
    modal.style.display = "none";
}



function openModal(mail) {
    var modal = document.getElementById("messageModal");
    var messagesContainer = document.getElementById('messages-container');
    messagesContainer.innerHTML = ''; // Efface les messages précédents
    
    document.getElementById("current-contact").textContent ="Choisissez un contact";
    
    modal.style.display = "block";
    // Appeler la fonction AJAX pour récupérer les messages
    loadContacts(mail);
}






   


// Fonction pour charger les contacts
function loadContacts(mail) {
    console.log("mail:", mail); // Message de débogage
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "../(DE)connexion/get_contacts.php?mail=" + encodeURIComponent(mail), true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log("Réponse du serveur :", xhr.responseText); // Message de débogage
            var contacts = JSON.parse(xhr.responseText);
            var contactsList = document.getElementById("contacts-list");
            contactsList.innerHTML='';
            contacts.forEach(function(contact) {
                var li = document.createElement("li");
                li.className = "contact";
                li.setAttribute("data-contact", contact.email);
                // Ajout de l'event listener onclick
                li.onclick = function() {
                    contactemail = this.getAttribute("data-contact");
                    console.log("Contact email cliqué :", contactemail); // Ajout de message de débogage
                    handleContactClick(mail);
};

                var img = document.createElement("img");
                img.className = "imgprofil";
                img.src = contact.profileImage;
                img.alt = "Profile Image";

                var p = document.createElement("p");
                p.textContent = contact.email;

                li.appendChild(img);
                li.appendChild(p);
                
                contactsList.appendChild(li);
            });
        }
    };
    xhr.send();
}



// Fonction pour gérer le clic sur un contact
function handleContactClick(mail) {
    console.log("Email du contact :", contactemail);
    // Mettre à jour le contenu du span avec l'adresse e-mail du contact
    document.getElementById("current-contact").textContent ="Conversation avec : " +contactemail;
    getMessages(contactemail, mail);
}


// Fonction pour créer un bouton avec une classe, du texte et un gestionnaire d'événements
function createButton(text, className, clickHandler) {
    var button = document.createElement('button');
    button.textContent = text;
    button.classList.add(className);
    button.addEventListener('click', clickHandler);
    return button;
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
                alert("Message supprimer, veuillez recharger quand vous aurez fini de consulter le profil pour appliquer les modifications");
            } else {
                // Erreur lors de la suppression du message
                console.error(response.message);
            }
        }
    };
    xhttp.open("GET", "../(DE)connexion/supprimer_message.php?id=" + encodeURIComponent(messageId), true);
    xhttp.send();

}








function createMessageStructure(contenuMessage, heure, utilisateur1, utilisateur2) {
    // Créer un élément div pour le message
    var messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.setAttribute('id', heure);
    messageDiv.setAttribute('data-message-id', heure);
    messageDiv.textContent = contenuMessage;
   
    messageDiv.setAttribute('expediteur', utilisateur1);
    messageDiv.setAttribute('recepteur', utilisateur2);

    // Créer un élément div pour l'heure du message
    var heureDiv = document.createElement('div');
    heureDiv.textContent = heure; // Ajouter l'heure du message
    heureDiv.classList.add('heure-message'); // Ajouter une classe au div de l'heure du message

    // Ajouter le div de l'heure au div du message
    messageDiv.appendChild(heureDiv);

    // Créer un sous-div pour les boutons de suppression et de signalement
    var buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('buttons-container');
    buttonsDiv.style.display = 'none'; // Cacher les boutons initialement
    
        // Créer le bouton de suppression
        var deleteButton = createButton('Supprimer', 'delete-button', function(event) {
            event.stopPropagation();
            console.log("Supprimer le message :", contenuMessage);
            var messageId = messageDiv.getAttribute('data-message-id');
            deleteMessage(messageId);
        });
        // Ajouter le bouton de suppression au sous-div des boutons
        buttonsDiv.appendChild(deleteButton);
    

    // Ajouter les sous-divs au div du message
    messageDiv.appendChild(buttonsDiv);

    // Ajouter un gestionnaire d'événements onclick au div du message
    messageDiv.addEventListener('click', function(event) {
        event.stopPropagation(); // Empêcher la propagation de l'événement de clic du message au document
        console.log("Message cliqué :", contenuMessage);
        // Afficher ou cacher les boutons de suppression et de signalement
        buttonsDiv.style.display = (buttonsDiv.style.display === 'none') ? 'block' : 'none';
    });

    return messageDiv;
}


// Fonction pour charger les messages en fonction de l'adresse e-mail du contact
function getMessages(contactemail, mail) {
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            if (response.success) {
                var messagesContainer = document.getElementById('messages-container');
                messagesContainer.innerHTML = ''; // Efface les messages précédents
                response.messages.forEach(function(message) {
                    // Séparer le nom d'utilisateur et le message
                    var parts = message.split(';');

                    // Extraire les utilisateurs et le contenu du message
                    var utilisateur1 = parts[1];
                    var utilisateur2 = parts[2];
                    var contenuMessage = parts.slice(3).join(';'); // Join les parties restantes en cas de présence de plus d'un point-virgule dans le message
                    var heure = parts[0];

                   
                    
                    
                    // Ajouter la classe appropriée en fonction de l'utilisateur
                    if (utilisateur2 === mail && utilisateur1 === contactemail) {
                        
                        var messageDiv = createMessageStructure(contenuMessage, heure, utilisateur1, utilisateur2);
                        messageDiv.classList.add('recu');
                    // Ajouter le message à la conversation
                    messagesContainer.appendChild(messageDiv);    
                    } else if (utilisateur1 === mail && utilisateur2 === contactemail) {
                        
                        var messageDiv = createMessageStructure(contenuMessage, heure, utilisateur1, utilisateur2);
                        messageDiv.classList.add('envoi');
                    // Ajouter le message à la conversation
                    messagesContainer.appendChild(messageDiv);
                    }

                });
            } else {
                console.error(response.message);
            }
        }
    };
    xhttp.open("GET", "../(DE)connexion/gestion-message.php", true);
    xhttp.send();
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


});
