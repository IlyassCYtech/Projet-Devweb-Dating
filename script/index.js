

document.addEventListener("DOMContentLoaded", function() {
    const loginButton = document.getElementById("loginButton");
    const loginForm = document.createElement("div");
    loginForm.innerHTML = `
      <div id="loginModal" class="modal">
        <div class="modal-content">
          <span class="close">&times;</span>
          <h2>Connexion</h2>
          <form id="loginForm" action="../(DE)connexion/confirmLogin.php" method="POST">
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

  });


  function openSettings() {
    window.location.href = "parametres.html";
}

function logout() {
    // Code pour déconnexion
}


document.addEventListener("DOMContentLoaded", function() {
  const loginButton = document.getElementById("registerButton");
  const loginForm = document.createElement("div");
  loginForm.innerHTML = `
    <div id="sing-in-modal" class="modal">
      <div class="modal-content">
        <span class="close">&times;</span>
        <h2>Inscription</h2>
		<form action="./creation/savedb.php" method="post" enctype="multipart/form-data">
			<fieldset>
				
					<legend><strong>Public info</strong></legend>
					<br>
				
					<!-- Simple formulary which will send the signin data to the server if it meets
						 the requirements for the enrollment -->
					
					<!-- Public information area-->
					<label for="Nickname">Nickname</label> 
					<input type="text" id="Nickname" name="nickname" placeholder="Nickname" required>
					<br>
			
					<label for="email">Email</label>  
					<input type="email" id="email" name="email" placeholder="Email" required>
					<abbr title="the email is unique in the data base">?</abbr>
					<br>
			
					<label for="email">Confirmation email</label> 
					<input type="email" id="email" name="email" placeholder="Confirm your email" required>
					<br>
			
					<label for="birthday">Birth date</label> 
					<input type="date" id="birthday" name="birthday">
					<br>
			
					<label for="gender">Gender:</label> 
					<input type="radio" name="gender" value ="man" >Man</input>
					<input type="radio" name="gender" value ="woman">Woman</input>
					<br>

					<label for="gender">Looking for:</label> <br> <!-- lkf : looking for -->
					<input type="checkbox" name="lkfgender[]" value="Man">Man</input>
					<input type="checkbox" name="lkfgender[]" value = "woman">Woman</input>
					<br>

					<label>Pictures</label>
          <br>

				
					<!-- following the example of some dating websites, pictures are required for singin -->
					<input type="file" name="pic[]" id="" accept="image/*" multiple required>
					
			</fieldset>

      <br>

			<fieldset id="privFieldSet">
				<!-- Private information area -->
				<legend><strong>Private info</strong></legend>
        <br>


				<label for="prenom">Name</label> 
					<input type="text" id="name" name="name" placeholder="Name" required>
					<br>
			
					<label for="lname">Last name</label> 
					<input type="text" id="lname" name="lname" placeholder="Last name" required>
					<br>

					<label for="password">Password</label>
					<input type="password" name="password" placeholder="Input your password" required>
					<br>
					<label for="confpassword">Password confirmation</label>
					<input type="password" name="confpassword" placeholder="Input your password again" required>
					<br>
			</fieldset>
	
			<input type="submit" value="Sign up" id="subbutton" >
		</form>
      </div>
    </div>
  `;
  document.body.appendChild(loginForm);

  const modal = document.getElementById("sing-in-modal");
  const closeButton = document.getElementsByClassName("close")[0];

registerButton.addEventListener("click", function() {
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

});






