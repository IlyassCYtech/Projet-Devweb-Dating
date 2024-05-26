
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


  function unblockContact(blockedEmail) {
    // Créer une requête fetch pour envoyer l'adresse e-mail bloquée au serveur pour le déblocage
    fetch('../(DE)connexion/debloquer.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `blockedEmail=${encodeURIComponent(blockedEmail)}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log("Utilisateur débanni avec succès :", data.message);
            window.location.reload();
            // Vous pouvez ajouter ici d'autres actions à effectuer si le déblocage réussit
        } else {
            console.error("Échec du déblocage :", data.message);
            // Vous pouvez ajouter ici d'autres actions à effectuer en cas d'échec du déblocage
        }
    })
    .catch(error => console.error('Erreur lors du déblocage de l\'utilisateur :', error));
}



  function fetchBlockedContacts() {
    fetch('../(DE)connexion/chargerbloquer.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('La réponse du serveur n\'est pas OK');
            }
            return response.json();
        })
        .then(data => {
            const blockedContactsList = document.getElementById('blocked-contacts-list');
            blockedContactsList.innerHTML = '';

            if (data.length === 0) {
                const li = document.createElement('li');
                li.textContent = "Aucun contact bloqué trouvé.";
                blockedContactsList.appendChild(li);
            } else {
                data.forEach(contact => {
                    const li = document.createElement('li');
                    li.dataset.blockedEmail = contact.email; // Stocke l'adresse e-mail dans un attribut de données

                    const profileImage = document.createElement('img');
                    profileImage.src = contact.profileImage;
                    profileImage.classList.add('profile-image'); // Ajoute une classe à l'image
                    li.appendChild(profileImage);

                    const pseudoSpan = document.createElement('span');
                    pseudoSpan.textContent = contact.pseudo;
                    li.appendChild(pseudoSpan);

                    const button = document.createElement('button');
                    button.textContent = 'Débannir';
                    button.classList.add('unban');
                    button.addEventListener('click', function() {
                        const blockedEmail = this.parentElement.dataset.blockedEmail;
                        unblockContact(blockedEmail); // Utilise l'adresse e-mail stockée dans l'attribut de données du parent du bouton
                    });
                    li.appendChild(button);

                    blockedContactsList.appendChild(li);
                });
            }
        })
        .catch(error => console.error('Erreur lors de la récupération des contacts bloqués:', error));
}



fetchBlockedContacts();


document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.user, .user\\+').forEach(button => {
        button.addEventListener('click', function() {
            const userType = this.className;
            updateUserType(userType);
        });
    });
});

function updateUserType(userType) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'updateuser.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
        if (xhr.status === 200) {
            alert('Type d\'utilisateur mis à jour avec succès.');
            location.reload();
        } else {
            alert('Erreur lors de la mise à jour du type d\'utilisateur.');
        }
    };
    xhr.send('userType=' + encodeURIComponent(userType));
}



document.addEventListener('DOMContentLoaded', () => {
    // Le gestionnaire d'événements pour le bouton de suppression
    document.querySelector('.supbouton').addEventListener('click', function() {
        const email = this.getAttribute('data-email'); // Récupère l'e-mail à partir de l'attribut data-email
        if (confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.')) {
            deleteUserAccount(email);
        }
    });
});

function deleteUserAccount(email) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '../Admin/Supprimer-profil.php?email=' + encodeURIComponent(email), true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            if (response.success) {
                alert('Compte supprimé avec succès.');
                deconnection();
            } else {
                alert('Erreur : ' + response.error);
            }
        } else {
            alert('Erreur lors de la suppression du compte.');
        }
    };
    xhr.send();
}