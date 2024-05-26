

document.addEventListener("DOMContentLoaded", function() {
  const loginButton = document.getElementById("loginButton");
  const loginForm = document.createElement("div");
  loginForm.innerHTML = `
    <div id="loginModal" class="modal">
      <div class="modal-content">
        <span class="close">&times;</span>
        <h2>Connexion</h2>
        <p id="errorMessage1" style="color: red;"></p>
        <form id="loginForm" action="(DE)connexion/confirmLogin.php" method="POST">
          <label for="username">Identifiant:</label>
          <input type="text" id="username" name="username" required>
          <br>
          <label for="password">Mot de passe:</label>
          <input type="password" id="password2" name="password" required>
          <br>
          <button id="subbutton" type="submit">Se connecter</button>
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

  loginFormElement.addEventListener("submit", function(event) {
    event.preventDefault(); // Empêcher la soumission du formulaire par défaut
    
    const formData = new FormData(loginFormElement);

    fetch('(DE)connexion/confirmLogin.php', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        window.location.href = data.redirect; // Rediriger vers la page spécifiée
      } else {
        // Afficher les erreurs dans le formulaire
        const errorMessage = document.getElementById('errorMessage1');
        errorMessage.textContent = data.error;
        // Remonter en haut du modal
        modal.scrollTo(0, 0);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });

});




function logout() {
    // Code pour déconnexion
}

document.addEventListener("DOMContentLoaded", function() {
  const loginButton = document.getElementById("registerButton");
  const loginForm = document.createElement("div");
  loginForm.innerHTML = `
    <div id="sing-in-modal" class="modal">
      <div class="modal-content">
        <span class="close-register">&times;</span>
        <h1>I n s c r i p  t i o n </h1>
       
        <form id="registrationForm" action="savedb.php" method="post" enctype="multipart/form-data">
          <fieldset>
            <legend><strong>Public info</strong></legend>
            <br>
            <label for="Nickname">Nickname</label>
            <input type="text" id="Nickname" name="nickname" placeholder="Nickname" required>
            <br>
            <label for="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Email" required>
            <abbr title="the email is unique in the data base">?</abbr>
            <br>
            <label for="email">Confirmation email</label>
            <input type="email" id="emailConfirm" name="emailConfirm" placeholder="Confirm your email" required>
            <br>
            <label for="birthday">Birth date</label>
            <input type="date" id="birthday" name="birthday" min="1874-01-01" max="2006-05-26">
            <br>
            <label for="gender">Gender:</label>
            <input type="radio" name="gender" value ="man" >Man</input>
            <input type="radio" name="gender" value ="woman">Woman</input>
            <br><br>
            <label for="gender">Looking for:</label>
            <input type="checkbox" name="lkfgender[]" value="Man">Man</input>
            <input type="checkbox" name="lkfgender[]" value = "woman">Woman</input>
            <br><br>
            <label for="departement">Localisation:</label>
            <select id="departement" name="departement">
              <option value="Ain">01 Ain</option>
              <option value="Aisne">02 Aisne</option>
              <option value="Allier">03 Allier</option>
              <option value="Alpes-de-Haute-Provence">04 Alpes-de-Haute-Provence</option>
              <option value="Hautes-Alpes">05 Hautes-Alpes</option>
              <option value="Alpes-Maritimes">06 Alpes-Maritimes</option>
              <option value="Ardèche">07 Ardèche</option>
              <option value="Ardennes">08 Ardennes</option>
              <option value="Ariège">09 Ariège</option>
              <option value="Aube">10 Aube</option>
              <option value="Aude">11 Aude</option>
              <option value="Aveyron">12 Aveyron</option>
              <option value="Bouches-du-Rhone">13 Bouches-du-Rhone</option>
              <option value="Calvados">14 Calvados</option>
              <option value="Cantal">15 Cantal</option>
              <option value="Charente">16 Charente</option>
              <option value="Charente-Maritime">17 Charente-Maritime</option>
              <option value="Cher">18 Cher</option>
              <option value="Correze">19 Correze</option>
              <option value="Corse-du-Sud">2A Corse-du-Sud</option>
              <option value="Haute-Corse">2B Haute-Corse</option>
              <option value="Côte-d'Or">21 Côte-d'Or</option>
              <option value="Côtes-d'Armor">22 Côtes-d'Armor</option>
              <option value="Creuse">23 Creuse</option>
              <option value="Dordogne">24 Dordogne</option>
              <option value="Doubs">25 Doubs</option>
              <option value="Drôme">26 Drôme</option>
              <option value="Eure">27 Eure</option>
              <option value="Eure-et-Loir">28 Eure-et-Loir</option>
              <option value="Finistère">29 Finistère</option>
              <option value="Gard">30 Gard</option>
              <option value="Haute-Garonne">31 Haute-Garonne</option>
              <option value="Gers">32 Gers</option>
              <option value="Gironde">33 Gironde</option>
              <option value="Hérault">34 Hérault</option>
              <option value="Ille-et-Vilaine">35 Ille-et-Vilaine</option>
              <option value="Indre">36 Indre</option>
              <option value="Indre-et-Loire">37 Indre-et-Loire</option>
              <option value="Isère">38 Isère</option>
              <option value="Jura">39 Jura</option>
              <option value="Landes">40 Landes</option>
              <option value="Loir-et-Cher">41 Loir-et-Cher</option>
              <option value="Loire">42 Loire</option>
              <option value="Haute-Loire">43 Haute-Loire</option>
              <option value="Loire-Atlantique">44 Loire-Atlantique</option>
              <option value="Loiret">45 Loiret</option>
              <option value="Lot">46 Lot</option>
              <option value="Lot-et-Garonne">47 Lot-et-Garonne</option>
              <option value="Lozère">48 Lozère</option>
              <option value="Maine-et-Loire">49 Maine-et-Loire</option>
              <option value="Manche">50 Manche</option>
              <option value="Marne">51 Marne</option>
              <option value="Haute-Marne">52 Haute-Marne</option>
              <option value="Mayenne">53 Mayenne</option>
              <option value="Meurthe-et-Moselle">54 Meurthe-et-Moselle</option>
              <option value="Meuse">55 Meuse</option>
              <option value="Morbihan">56 Morbihan</option>
              <option value="Moselle">57 Moselle</option>
              <option value="Nièvre">58 Nièvre</option>
              <option value="Nord">59 Nord</option>
              <option value="Oise">60 Oise</option>
              <option value="Orne">61 Orne</option>
              <option value="Pas-de-Calais">62 Pas-de-Calais</option>
              <option value="Puy-de-Dôme">63 Puy-de-Dôme</option>
              <option value="Pyrénées-Atlantiques">64 Pyrénées-Atlantiques</option>
              <option value="Hautes-Pyrénées">65 Hautes-Pyrénées</option>
              <option value="Pyrénées-Orientales">66 Pyrénées-Orientales</option>
              <option value="Bas-Rhin">67 Bas-Rhin</option>
              <option value="Haut-Rhin">68 Haut-Rhin</option>
              <option value="Rhône">69 Rhône</option>
              <option value="Haute-Saône">70 Haute-Saône</option>
              <option value="Saône-et-Loire">71 Saône-et-Loire</option>
              <option value="Sarthe">72 Sarthe</option>
              <option value="Savoie">73 Savoie</option>
              <option value="Haute-Savoie">74 Haute-Savoie</option>
              <option value="Paris">75 Paris</option>
              <option value="Seine-Maritime">76 Seine-Maritime</option>
              <option value="Seine-et-Marne">77 Seine-et-Marne</option>
              <option value="Yvelines">78 Yvelines</option>
              <option value="Deux-Sèvres">79 Deux-Sèvres</option>
              <option value="Somme">80 Somme</option>
              <option value="Tarn">81 Tarn</option>
              <option value="Tarn-et-Garonne">82 Tarn-et-Garonne</option>
              <option value="Var">83 Var</option>
              <option value="Vaucluse">84 Vaucluse</option>
              <option value="Vendée">85 Vendée</option>
              <option value="Vienne">86 Vienne</option>
              <option value="Haute-Vienne">87 Haute-Vienne</option>
              <option value="Vosges">88 Vosges</option>
              <option value="Yonne">89 Yonne</option>
              <option value="Territoire de Belfort">90 Territoire de Belfort</option>
              <option value="Essonne">91 Essonne</option>
              <option value="Hauts-de-Seine">92 Hauts-de-Seine</option>
              <option value="Seine-Saint-Denis">93 Seine-Saint-Denis</option>
              <option value="Val-de-Marne">94 Val-de-Marne</option>
              <option value="Val-d'Oise">95 Val-d'Oise</option>
            </select>
          </fieldset>
          <br><br>
          <fieldset>
            <legend><strong>Confidential info</strong></legend>
            <br>
            <label for="Name">Name</label>
            <input type="text" id="name" name="name" placeholder="Name" required>
            <br>
            <label for="lastname">Lastname</label>
            <input type="text" id="lname" name="lname" placeholder="Lastname" required>
            <br>
            <label for="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Password" required>
            <br>
            <label for="password">Confirm password</label>
            <input type="password" id="passwordConfirm" name="passwordConfirm" placeholder="Confirm your password" required>
            <br>
            <label for="metier">Job:</label>
            <select id="metier" name="metier">
              <option value="Agriculteur exploitant">Agriculteur exploitant</option>
              <option value="Artisan">Artisan</option>
              <option value="Chef d'entreprise">Chef d'entreprise</option>
              <option value="Cadre de la fonction publique">Cadre de la fonction publique</option>
              <option value="Profession libérale">Profession libérale</option>
              <option value="Profession de l'enseignement, de la santé, de la culture et assimilé">Profession de l'enseignement, de la santé, de la culture et assimilé</option>
              <option value="Cadre administratif, commercial d'entreprise">Cadre administratif, commercial d'entreprise</option>
              <option value="Ingénieur et cadre technique d'entreprise">Ingénieur et cadre technique d'entreprise</option>
              <option value="Employé">Employé</option>
              <option value="Ouvrier">Ouvrier</option>
              <option value="Retraité">Retraité</option>
              <option value="Autres sans activité professionnelle">Autres sans activité professionnelle</option>
            </select>
            <br><br>
            <label for="centerInterest">Hobbies:</label>
            <select id="centre_interet" name="centre_interet">
              <option value="music">Music</option>
              <option value="gardening">Gardening</option>
              <option value="fashion">Fashion</option>
              <option value="coding">Coding</option>
              <option value="sports">Sports</option>
            </select>
            <br><br>
            <label for="pic">Pictures:</label>
            <input type="file" id="pic" name="pic[]" multiple required>
            <br><br>
            <input id="registerSubmit" type="submit" value="Register"> 
            <p id="errorMessage" style="color: red; display: none;"></p>
          </fieldset>
         
        </form>
      </div>
    </div>
  `;
  document.body.appendChild(loginForm);

  const modal = document.getElementById("sing-in-modal");
  const closeBtn = document.querySelector(".close-register");

  loginButton.onclick = function() {
    modal.style.display = "block";
  }

  closeBtn.onclick = function() {
    modal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  const registrationForm = document.getElementById("registrationForm");
  registrationForm.onsubmit = async function(event) {
    event.preventDefault();

    const email = registrationForm.email.value.trim();
    const emailConfirm = registrationForm.emailConfirm.value.trim();
    const password = registrationForm.password.value.trim();
    const passwordConfirm = registrationForm.passwordConfirm.value.trim();
    const nickname = registrationForm.nickname.value.trim();
    const name = registrationForm.name.value.trim();
    const lname = registrationForm.lname.value.trim();
    const birthday = registrationForm.birthday.value.trim();
    const gender = registrationForm.querySelector('input[name="gender"]:checked');
    const lkfgender = registrationForm.querySelectorAll('input[name="lkfgender[]"]:checked');
    const departement = registrationForm.departement.value.trim();
    const metier = registrationForm.metier.value.trim();
    const centre_interet = registrationForm.centre_interet.value.trim();
    const pic = registrationForm.querySelector('input[type="file"]').files;

    // Vérification des champs de prénom, nom de famille et pseudo
    const nameRegex = /^[a-zA-ZÀ-ÿ]+$/; // Autorise uniquement les lettres de l'alphabet, y compris les accents
    if (!nameRegex.test(name)) {
      alert("Le prénom ne doit contenir que des lettres alphabétiques !");
      return;
    }

    if (!nameRegex.test(lname)) {
      alert("Le nom de famille ne doit contenir que des lettres alphabétiques !");
      return;
    }

    if (!nameRegex.test(nickname)) {
      alert("Le pseudo ne doit contenir que des lettres alphabétiques !");
      return;
    }

    // Vérification de l'adresse email et de la confirmation d'email
    if (email !== emailConfirm) {
      alert("Les emails ne correspondent pas !");
      return;
    }

    // Vérification du mot de passe et de la confirmation de mot de passe
    if (password !== passwordConfirm) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }

    if (password.includes(',')) {
      alert("Le mot de passe ne doit pas contenir de virgule pour des raison de securite");
      return;
    }

    // Vérification de l'existence de tous les champs
    if (!nickname || !birthday || !gender || lkfgender.length === 0 || !departement || !name || !lname || !metier || !centre_interet || pic.length === 0) {
      alert("Veuillez remplir tous les champs !");
      return;
    }

    // Création de l'objet FormData et envoi de la requête
    const formData = new FormData(registrationForm);
    const response = await fetch('savedb.php', {
      method: 'POST',
      body: formData
    });

    const result = await response.json();

    if (result.error) {
      const errorMessage = document.querySelector('#sing-in-modal #errorMessage');

      errorMessage.style.display = 'block';
      errorMessage.textContent = result.error;
     
     } else {
      alert('Inscription réussie!');
      modal.style.display = "none";
      registrationForm.reset();

      window.location.href = '(DE)connexion/welcome.php';
    }
  }
});

