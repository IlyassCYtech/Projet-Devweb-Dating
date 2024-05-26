// Fonction pour créer une requête XMLHttpRequest
var contactemail="0";




function creerXMLHttpRequete() {
    var xhr;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return xhr;
}

// Obtenez une référence à l'élément contenant les messages
var messagesContainer = document.getElementById('messages-container');




// Fonction pour déconnecter
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

document.addEventListener("DOMContentLoaded", function() {
    loadContacts();
});

// Fonction pour charger les contacts
function loadContacts() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "get_contacts.php", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log("Réponse du serveur :", xhr.responseText); // Message de débogage
            var contacts = JSON.parse(xhr.responseText);
            var contactsList = document.getElementById("contacts-list");
            contacts.forEach(function(contact) {
                var li = document.createElement("li");
                li.className = "contact";
                li.setAttribute("data-contact", contact.email);
               
                 // Créer un bouton pour chaque contact
                 var btn = document.createElement('button');
                 btn.className = "boutonbloquer"
                 btn.textContent = 'Bloquer';
                 btn.onclick = function() {
                     updateContact(contact.email); // Fonction pour mettre à jour le contact
                 };

                
                // Ajout de l'event listener onclick
                         
                li.onclick = function() {
                    contactemail = this.getAttribute("data-contact");
                    console.log("Contact email cliqué :", contactemail); // Ajout de message de débogage
                    handleContactClick();
};

                var img = document.createElement("img");
                img.className = "imgprofil";
                img.src = contact.profileImage;
                img.alt = "Profile Image";

                var p = document.createElement("p");
                p.textContent = contact.pseudo.toUpperCase();

                li.appendChild(img);
                li.appendChild(p);
                li.appendChild(btn);
                contactsList.appendChild(li);
            });
        }
    };
    xhr.send();
}
var userEmail = document.body.getAttribute('data-email');


// Fonction pour gérer le clic sur un contact
function handleContactClick() {
    console.log("Email du contact :", contactemail);
    // Mettre à jour le contenu du span avec l'adresse e-mail du contact
    document.getElementById("current-contact").textContent ="Conversation avec : " +contactemail;
}


// Fonction pour créer un bouton avec une classe, du texte et un gestionnaire d'événements
function createButton(text, className, clickHandler) {
    var button = document.createElement('button');
    button.textContent = text;
    button.classList.add(className);
    button.addEventListener('click', clickHandler);
    return button;
}

function updateContact(email) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'bloquer_utilisateur.php', true); // Assurez-vous que le chemin est correct
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log('Delimiter mis à jour pour le contact');
            window.location.reload();
        } else {
            console.error('Erreur lors de la mise à jour du delimiter pour le contact');
        }
    };
    xhr.send('userEmail=' + encodeURIComponent(userEmail) + '&contactEmail=' + encodeURIComponent(email));
    
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
    xhttp.open("GET", "supprimer_message.php?id=" + encodeURIComponent(messageId), true);
    xhttp.send();
}



function signaleMessage(messageId) {
    console.log("supprimer :", messageId);
    // Effectuer une requête AJAX pour supprimer le message avec l'ID donné
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            if (response.success) {
               
            } else {
                // Erreur lors de la suppression du message
                console.error(response.message);
            }
        }
    };
    xhttp.open("GET", "supprimer_message.php?id=" + encodeURIComponent(messageId), true);
    xhttp.send();
}


function banUser(messageId, utilisateur1, utilisateur2, contenuMessage, banReason) {
    // Effectue une requête AJAX pour envoyer les données au script PHP
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            // Vérifie si la requête a réussi
            if (xhr.status === 200) {

                // Cache le formulaire après avoir banni l'utilisateur
                document.getElementById('ban-modal').style.display = 'none';
                alert('Signalement reçu votre demande sera traitée ulterieurement');
            } else {
                // Affiche un message d'erreur en cas d'échec de la requête
                alert("Erreur : " + xhr.responseText);
            }
        }
    };
    // Définit la méthode, l'URL et envoie la requête
    xhr.open("POST", "signalement.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    // Envoyer les autres éléments nécessaires dans la requête
    xhr.send("messageId=" + encodeURIComponent(messageId) + "&utilisateur1=" + encodeURIComponent(utilisateur1) + "&utilisateur2=" + encodeURIComponent(utilisateur2) + "&contenuMessage=" + encodeURIComponent(contenuMessage) + "&reason=" + encodeURIComponent(banReason));
}




function signaleMessage(messageId, utilisateur1, utilisateur2, contenuMessage) {
    // Fonction pour afficher la fenêtre modale et afficher l'adresse e-mail
    document.getElementById('ban-modal').style.display = 'block';
    console.log("expediteur :", utilisateur1);
    document.getElementById('reporter-message').innerText = "Message signale : " + contenuMessage + "Envoyé par:" + utilisateur1;
    // Lors de la soumission du formulaire, appeler la fonction pour bannir l'utilisateur
    document.getElementById('ban-user-form').onsubmit = function(event) {
        event.preventDefault(); // Empêche l'envoi du formulaire par défaut
        var banReason = document.getElementById('ban-reason').value;
        banUser(messageId, utilisateur1, utilisateur2, contenuMessage, banReason);
    };
}
function closeModal() {
    // Fonction pour fermer la fenêtre modale
    document.getElementById('ban-modal').style.display = 'none';
}







function createMessageStructure(contenuMessage, heure, utilisateur1, utilisateur2, type) {
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

    // Créer les boutons en fonction du type
    if (type === 'signal') {
        // Créer le bouton de signalement
        var reportButton = createButton('Signaler', 'report-button', function(event) {
            event.stopPropagation();
            console.log("Signaler le message :", contenuMessage);
            var messageId = messageDiv.getAttribute('data-message-id');
            var utilisateur1 = messageDiv.getAttribute('expediteur');
            var utilisateur2 = messageDiv.getAttribute('recepteur');
            signaleMessage(messageId, utilisateur1, utilisateur2, contenuMessage);
        });
        // Ajouter le bouton de signalement au sous-div des boutons
        buttonsDiv.appendChild(reportButton);
    } else if (type === 'supprime') {
        // Créer le bouton de suppression
        var deleteButton = createButton('Supprimer', 'delete-button', function(event) {
            event.stopPropagation();
            console.log("Supprimer le message :", contenuMessage);
            var messageId = messageDiv.getAttribute('data-message-id');
            deleteMessage(messageId);
        });
        // Ajouter le bouton de suppression au sous-div des boutons
        buttonsDiv.appendChild(deleteButton);
    }

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
function chargerMessages(contactemail) {
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
                    if (utilisateur2 === userEmail && utilisateur1 === contactemail) {
                        var type= "signal";
                        var messageDiv = createMessageStructure(contenuMessage, heure, utilisateur1, utilisateur2, type);
                        messageDiv.classList.add('recu');
                    // Ajouter le message à la conversation
                    messagesContainer.appendChild(messageDiv);    
                    } else if (utilisateur1 === userEmail && utilisateur2 === contactemail) {
                        var type= "supprime";
                        var messageDiv = createMessageStructure(contenuMessage, heure, utilisateur1, utilisateur2, type);
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
    xhttp.open("GET", "gestion-message.php?contact=" + encodeURIComponent(contactemail), true);
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

            // Faire défiler les messages vers le bas
            var messagesContainer = document.getElementById("messages-container");
            if (messagesContainer) {
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }
        });
    });

    // Mettre à jour les messages toutes les 2 secondes
    setInterval(function() {
        chargerMessages(contactemail);

        var messagesContainer = document.getElementById("messages-container");
        if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }, 3000);

    // Écouteur d'événement pour la soumission du formulaire
    var messageForm = document.getElementById('message-form');
    var messageInput = document.getElementById('message-input');

    messageForm.addEventListener('submit', function(event) {
        // Empêcher le comportement par défaut du formulaire (rechargement de la page)
        event.preventDefault();

        // Récupérer le texte du message
        var messageText = messageInput.value.trim();
        messageInput.value = '';

        // Vérifier si le champ de message est vide
        if (messageText === '') {
            alert('Veuillez entrer un message.');
            return;
        }

        // Effectuer une requête AJAX pour envoyer le message
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var response = JSON.parse(this.responseText);
                if (response.success) {
                    // Message envoyé avec succès, recharger les messages
                    chargerMessages(contactemail);
                    // Vider la zone de texte
                    messageInput.value = '';
                } else {
                    // Erreur lors de l'envoi du message
                    console.error(response.message);
                }
            }
        };
        xhttp.open("POST", "gestion-message.php", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("message=" + encodeURIComponent(messageText) + "&contact=" + encodeURIComponent(contactemail));
    });

    // Écouteur d'événement pour détecter la touche "Entrée" dans le champ de texte
    messageInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault(); // Empêche l'ajout d'un saut de ligne
            messageForm.dispatchEvent(new Event('submit')); // Déclenche la soumission du formulaire
        }
    });
});
// Fonction pour créer un élément div avec une classe spécifiée et un contenu textuel
function createDivWithClassAndText(className, text) {
    var div = document.createElement('div');
    div.className = className;
    div.textContent = text;
    return div;
}
