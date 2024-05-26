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




function editProfile() {
    var spans = document.querySelectorAll('.profile-content ul li span:nth-child(2)');
    var inputs = document.querySelectorAll('.profile-content ul li input');
    var selects = document.querySelectorAll('.profile-content ul li select');

    spans.forEach(function(span) {
        span.style.display = 'none';
    });

    inputs.forEach(function(input) {
        input.style.display = 'inline';
    });

    selects.forEach(function(select) {
        select.style.display = 'inline';
    });

    // Afficher le bouton "Enregistrer" et masquer le bouton "Modifier"
    document.querySelector('.edit-button button:first-child').style.display = 'none';
    document.querySelector('.edit-button button:last-child').style.display = 'inline';
}


function saveProfile(email, type, dateInscription) {
    var spans = document.querySelectorAll('.profile-content ul li span:nth-child(2)');
    var inputs = document.querySelectorAll('.profile-content ul li input');
    var selects = document.querySelectorAll('.profile-content ul li select');

    var data = {};
    inputs.forEach(function(input) {
        data[input.name] = input.value;
    });

    selects.forEach(function(select) {
        data[select.name] = select.value;
    });

    // Inclure les variables de session
    data['dateincription'] = dateInscription;
    data['type'] = type;
    data['email'] = email;

    fetch('../Admin/Modifier-profil.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {

            
            window.location.href = "info.php"
            
        } else {
            alert('Erreur: ' + data.error);
        }
    })
    .catch(error => {
        console.error('Erreur:', error);
        alert('Une erreur est survenue');
    });
}
