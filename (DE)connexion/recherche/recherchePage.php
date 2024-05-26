<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recherche</title>
    <link rel="icon" href="#" type="image/x-icon">
    <link rel="stylesheet" href="../../css/recherche.css">

    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    <script src="../../script/recherche.js"></script>
    
     
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

</head>
<body onload="uncheck()">
  <?php
    session_start();
    if (!isset($_SESSION["connecte"]) || $_SESSION["connecte"] !== true) 
    {
        header("Location:../../index.html");
        exit();
    }
  ?>

    <header>
        <div class="container">
        <nav>  <a href="../welcome.php">
            <img src="../../img/logo.png" alt="Logo de Mon Site">
            <h1>Consensus</h1>
          </a>
          
        </nav>
          <nav>
            <ul>
              <li><a href="../welcome.php">Accueil</a></li>
              <li><a href="../messagerie.php">Messagerie</a></li>
              <li><a href="../info.php">Profil</a></li>
              <li><a href="../parametres.html">Paramètres</a></li>
            </ul>
          </nav>
          
         <div class="logout">
          <button id="logoutButton" onclick="deconnection()">Se Deconnecter</button>
            
        </div>  
        </div>
       
       
      </header>
    <div id="rechercherDiv">
        <input type="text" id="rechercheBarre" placeholder="Saisir quelque chose">
        <input type="checkbox" id="ageChoiceCb" onclick="creeAgeInput()" >
        <button onclick="lancer_recherche('<?php echo $_SESSION['adressemail'].';'.$_SESSION['pseudo'].';'.$_SESSION['genre'].';'.$_SESSION['preference'].';'.$_SESSION['datedenaissance'].';'.$_SESSION['departement'].';'.$_SESSION['metier'].';'.$_SESSION['centreInteret']; ?>')">Rechercher</button>    </div>
    <div id="resultats"></div>

      <!-- age, region,pseudo, profession, cdi, genre-->



</body>
</html>
