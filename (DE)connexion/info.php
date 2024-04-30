<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Consensus</title>
  <link rel="icon" type="image/png" href="../img/logo.png">
  <link rel="stylesheet" href="../css/info.css">
</head>
<body>
  <script src="../script/profil.js"></script>
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
<?php
  session_start();
  if (!isset($_SESSION["connecte"]) || $_SESSION["connecte"] !== true) 
  {
    header("Location:../index.html");
    exit();
  }


?>




<div class="profil-container">
  <img src="../img/femme1.jpeg" alt="Photo de profil" class="profil-image">
  

  <div class="profil-info">
  <div class="bouton">
    <img src="../img/modifier.png" alt="Image" class="edit-button">
  </div>  
  <h3><?php echo $_SESSION["prenom"];?></h3>
  
  
  
  <div class="profile-item">
      <label class="type">Pseudo:</label>
      <span><?php echo $_SESSION["prenom"];?></span>
  </div>
  
  <div class="profile-item">
      <label class="type" >Email:</label>
      <span><?php echo $_SESSION["adressemail"];?></span>
  </div>
  
  <div class="profile-item">
      <label class="type">Date de naissance:</label>
      <span><?php echo $_SESSION["datedenaissance"];?></span>
  </div>
  
  <div class="profile-item">
      <label class="type">Genre</label>
      <span><?php echo $_SESSION["genre"];?></span>
  </div>
  
  <div class="profile-item">
    <label class="type">Attirance:</label>
    <span>Homme</span>
</div>

<div class="profile-item">
  <label class="type">Profession:</label>
  <span>Ingénieur</span>
</div>

  <div class="profile-item">
      <label class="type">Lieu de résidence:</label>
      <span>France, Île-de-France, Paris</span>
  </div>
  
  <div class="profile-item">
      <label class="type">Situation amoureuse et familiale:</label>
      <span>Célibataire</span>
  </div>
  
  <div cl<?php
  session_start();
  if (!isset($_SESSION["connecte"]) || $_SESSION["connecte"] !== true) 
  {
    header("Location:../index.html");
    exit();
  }


?>ass="profile-item">
      <label class="type">Description physique:</label>
      <span>Taille: 165cm, Poids: 60kg, Yeux: Bleus, Cheveux: Blonds</span>
  </div>
  
  <div class="profile-item">
      <label class="type">Informations Bancaires:</label>
      <span>
          CB: XXXX XXXX XXXX 2598
      </span>
  </div>
  
  <div class="profile-item">
    <label class="type">Citation:</label>
    <span>"La vie est belle"</span>
</div>

  <div class="profile-item">
    <label class="type">Traits de caractère:</label>
    <span>"Sympathique, Curieuse, Travailleuse"</span>
  </div>

  <div class="profile-item">
    <label class="type">Centres d'intérêt:</label>
    <span>"Voyage, Lecture, Sport"</span>
  </div>

  <div class="profile-item">
    <label class="type">Nom:</label>
    <span>Sarah</span>
  </div>

  <div class="profile-item">
    <label class="type">Prenom:</label>
    <span>Roberto</span>
  </div>
    
  <div class="profile-item">
    <label class="type">Adresse:</label>
    <span>6 rue des Felipe</span>
  </div>



</div>
</div>



</body>

</html>
