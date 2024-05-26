<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Consensus</title>
  <link rel="icon" type="image/png" href="../img/logo.png">
  <link rel="stylesheet" href="../css/messagerie.css">


</head>
<?php
  session_start();
  if (!isset($_SESSION["connecte"]) || $_SESSION["connecte"] !== true) {
      header("Location:../index.html");
      exit();
  }
  if (isset($_SESSION['typedutilisateur']) && $_SESSION['typedutilisateur'] === 'user') {
    header("Location:parametres.php");
}


?>
<body data-email="<?php echo isset($_SESSION['adressemail']) ? $_SESSION['adressemail'] : ''; ?>">
  
  <script src="../script/messagerie.js"></script>

  <header>

  <div class="container">
  <nav>  <a href="welcome.php">
      <img src="../img/logo.png" alt="Logo de Mon Site">
      <h1>Consensus</h1>
    </a>
    
  </nav>
    <nav>
    <ul>
    <li><a href="welcome.php">Accueil</a></li>
    <?php
if (isset($_SESSION['typedutilisateur']) && $_SESSION['typedutilisateur'] === 'user') {
    echo '<li><a href="parametres.php">Abonnement</a></li>';
} else {
  echo '<li><a href="messagerie.php">Messagerie</a></li>';
}
?>
    
    <li><a href="info.php">Profil</a></li>
    <li><a href="parametres.php">Paramètres</a></li>
    
    <?php
    // Vérifier le type d'utilisateur
    if(isset($_SESSION["typedutilisateur"]) && $_SESSION["typedutilisateur"] === "admin") {
        // Afficher le lien pour l'administration du site
        echo '<li><a href="../Admin/Admin.php">Gestion site</a></li>';
    }
    ?>
</ul>
    </nav>
    
   <div class="logout">
   <a href="recherche/recherchePage.php"><img id="search" src="../img/loupeIcone.png" alt="icone recherche" id="iconerecherche"></a>            
 <button id="logoutButton" onclick="deconnection()">Se Deconnecter</button>
      
  </div>  
  </div>
 
 
</header>



          <div class="messaging-container">
        <div class="contacts">
            <h2>Contacts</h2>
            <ul id="contacts-list">
                <!-- Contacts will be added here dynamically -->
            </ul>
        </div>
    

    
  <div class="conversation">
      <h2> <span id="current-contact"> Commencez à parlez ici</span></h2>

      <div class="messages" id="messages-container">
    <!-- Les messages seront ajoutés ici dynamiquement -->
</div>

<div class="messagetext">
<form id="message-form" class="message-input" method="post">
  <div class="form__group field">
    <textarea id="message-input" name="message" rows="4" cols="50" class="form__field" placeholder="Message" required></textarea>
   <input type="submit" id="send-button" value="" class="submit-button">
  </div>
  
</form>

</div>
  </div>
</div>

 <!-- Fenêtre modale -->
 <div id="ban-modal" class="modal">
        <div class="modal-content">
            <span class="close" onclick="closeModal()">&times;</span>
            <p id="reporter-message"></p> <!-- Pour afficher l'adresse e-mail -->
            <h2>Bannir Utilisateur</h2>
            <form id="ban-user-form">
                <label for="ban-reason">Motif de Bannissement :</label>
                <select id="ban-reason" name="ban-reason">
                    <option value="Spam">Spam</option>
                    <option value="Comportement inapproprié">Comportement inapproprié</option>
                    <option value="Autre">Autre</option>
                </select>
                <input type="submit" value="Bannir">
            </form>
        </div>
    </div>


</body>
</html>
