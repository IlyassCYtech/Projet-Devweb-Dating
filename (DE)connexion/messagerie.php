<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Consensus</title>
  <link rel="icon" type="image/png" href="../img/logo.png">
  <link rel="stylesheet" href="../css/messagerie.css">
</head>
<body>
  <script src="../script/welcome.js"></script>

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
        <li><a href="messagerie.php">Messagerie</a></li>
        <li><a href="info.php">Profil</a></li>
        <li><a href="parametres.html">Paramètres</a></li>
      </ul>
    </nav>
   <div class="logout">
        
 <button id="logoutButton" onclick="deconnection()">Se Deconnecter</button>
      
  </div>  
  </div>
 
 
</header>

<div class="messaging-container">
  <div class="contacts">
      <h2>Contacts</h2>
      <ul>
          <li class="contact" data-contact="ami1">
            <img class="imgprofil" src="../img/cuisto.png" alt="img"> 
            <p>Cuisto</p> 
          </li>
          <li class="contact" data-contact="ami2">
            <img class="imgprofil" src="../img/dark.png" alt="img">
            <p>Dark</p>
          </li>
          <li class="contact" data-contact="ami3">
            <img class="imgprofil" src="../img/gentil.png" alt="img">
            <p>Rémy Gentil</p>
          </li>
          <li class="contact" data-contact="ami3">
            <img class="imgprofil" src="../img/profil.png" alt="img">
            <p>John Shenouda</p>
          </li>



          <!-- Ajouter d'autres contacts -->
      </ul>
  </div>
  <div class="conversation">
      <h2>Conversation avec <span id="current-contact">Ami 1</span></h2>
      <div class="messages">
          <!-- Ajouter d'autres messages ici -->
      </div>
      <div class="message-input">
          <textarea id="message-input" placeholder="Écrivez votre message..."></textarea>
          <button id="send-button">Envoyer</button>
      </div>
  </div>
</div>
<?php
  session_start();
  if (!isset($_SESSION["connecte"]) || $_SESSION["connecte"] !== true) {
      header("Location:../index.html");
      exit();
  }


?>

</body>
</html>
