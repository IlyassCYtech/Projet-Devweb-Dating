<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Consensus</title>
  <link rel="icon" type="image/png" href="../img/logo.png">
  <link rel="stylesheet" href="../css/welcome.css">
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
 <?php
session_start();
if (!isset($_SESSION["connecte"]) || $_SESSION["connecte"] !== true) {
    header("Location:../index.html");
    exit();
}
?>
<!--#####################################################################################################################-->

<div id="pagebas">


  <div class="profilaccomp" id="remynrvcomp">
    <img class="photoprofilcomp" src="../img/nrv.png">
    <div class="texteprofcomp">
      <button class="ajoutpanier" onclick="ajouterAuPanier('remynrv')"><img src="../img/logo.png" style="height: 50px;"></button>

      <p class="texteprofilcomp nomprofcomp">Rémy NRV</p>
      <p class="texteprofilcomp">25 ans</p>
    </div>
    <button class="fermercomp" onclick="cacherProfilComplet('remynrvcomp')">Fermer</button>

  </div>

  <div class="profilaccomp" id="remygentilcomp">
    <img class="photoprofilcomp" src="../img/gentil.png">
    <div class="texteprofcomp">
      <button class="ajoutpanier" onclick="ajouterAuPanier('remygentil')"><img src="../img/logo.png" style="height: 50px;"></button>

      <p class="texteprofilcomp nomprofcomp">Rémy Gentil</p>
      <p class="texteprofilcomp">30 ans</p>
    </div>
    <button class="fermercomp" onclick="cacherProfilComplet('remygentilcomp')">Fermer</button>


  </div>

  <div class="profilaccomp" id="remydarkcomp">
    <img class="photoprofilcomp" src="../img/dark.png">
    <div class="texteprofcomp">
      <button class="ajoutpanier" onclick="ajouterAuPanier('remydark')"><img src="../img/logo.png" style="height: 50px;"></button>

      <p class="texteprofilcomp nomprofcomp">Rémy Dark</p>
      <p class="texteprofilcomp">28 ans</p>
    </div>
    <button class="fermercomp" onclick="cacherProfilComplet('remydarkcomp')">Fermer</button>


  </div>
  
  <div class="profilaccomp" id="remycuistocomp">
    <img class="photoprofilcomp" src="../img/cuisto.png">
    <div class="texteprofcomp">
      <button class="ajoutpanier" onclick="ajouterAuPanier('remycuisto')"><img src="../img/logo.png" style="height: 50px;"></button>

      <p class="texteprofilcomp nomprofcomp">Rémy Cuisto</p>
      <p class="texteprofilcomp">35 ans</p>
    </div>
    <button class="fermercomp" onclick="cacherProfilComplet('remycuistocomp')">Fermer</button>


  </div>

   <!--<div class="pub" id="pub1"></div>-->  <img  src="../img/pubecosse.png" style=" width: 20%;">

    <div id="listprofil">

      <div class="profilacc" id="remynrv" onclick="afficherProfil('remynrv')">
        <img class="photoprofil" src="../img/nrv.png">
        <div class="texteprof">

          <p class="texteprofilsimple nomprof">Rémy NRV </p>
          <p class="texteprofilsimple ageprof">25 ans </p>
        </div>
      </div>



      <div class="profilacc" id="remygentil" onclick="afficherProfil('remygentil')">
        <img class="photoprofil" src="../img/gentil.png">
        <div class="texteprof">

          <p class="texteprofilsimple nomprof">Rémy Gentil </p>
          <p class="texteprofilsimple ageprof">30 ans </p>

        </div>
      </div>
      


      <div class="profilacc" id="remydark" onclick="afficherProfil('remydark')">
        <img class="photoprofil" src="../img/dark.png">
        <div class="texteprof">
          <p class="texteprofilsimple nomprof">Rémy Dark </p>
          <p class="texteprofilsimple ageprof">28 ans </p>
        </div>
      </div>




      <div class="profilacc" id="remycuisto" onclick="afficherProfil('remycuisto')">
        <img class="photoprofil" src="../img/cuisto.png">
        <div class="texteprof">
          <p class="texteprofilsimple nomprof" >Rémy Cuisto </p>
          <p class="texteprofilsimple ageprof" >35 ans </p>
        </div>
      </div>

    </div>

   <!-- <div class="pub" id="pub2"></div>-->
   <img  src="../img/pubcalvi.png" style=" width: 20%;">

<button id="panierboutton" onclick="affichepanier()"><img src="../img/shopping.png" style="height: 50px;"></button>

<div id="panier"></div>

</div>





</body>
</html>
