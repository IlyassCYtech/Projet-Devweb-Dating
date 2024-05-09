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
            <ul id="contacts-list">
                <!-- Contacts will be added here dynamically -->
            </ul>
        </div>
    

    
  <div class="conversation">
      <h2> <span id="current-contact"> Commencez à parlez ici</span></h2>

      <div class="messages" id="messages-container">
    <!-- Les messages seront ajoutés ici dynamiquement -->
</div>


      <form id="message-form" class="message-input" method="post">
        <label for="message-input" >Message:</label><br>
        <textarea id="message-input" name="message" rows="4" cols="50"></textarea><br>
        <input type="submit" id="send-button" value="Envoyer">
    </form>

  </div>
</div>




</body>
</html>
