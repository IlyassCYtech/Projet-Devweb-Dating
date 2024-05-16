<?php
session_start();
if (!isset($_SESSION["connecte"]) || $_SESSION["connecte"] !== true) {
    header("Location:../index.html");
    exit();
}

// Chemin vers le fichier userlist.txt
$file = "../database/userlist.txt";

// Lire le fichier userlist.txt
$users = [];
if (file_exists($file)) {
    $lines = file($file, FILE_IGNORE_NEW_LINES);
    foreach ($lines as $line) {
        $users[] = str_getcsv($line);
    }
}



// Préférence de genre de l'utilisateur connecté
$preference = strtolower($_SESSION["preference"]);

?>
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

<script>
    var preference = "<?php echo $preference; ?>";
</script>
  <script src="../script/welcome.js">
  </script>
  
<header>
  <div class="container">
    <nav>
      <a href="welcome.php">
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
        <?php
        if (isset($_SESSION["typedutilisateur"]) && $_SESSION["typedutilisateur"] === "admin") {
            echo '<li><a href="../Admin/Admin.php">Gestion site</a></li>';
        }
        ?>
      </ul>
    </nav>
    <div class="logout">
      <button id="logoutButton" onclick="deconnection()">Se Déconnecter</button>
    </div>
  </div>
  <p>Préférence de genre : <span id="preferenceDebug"></span></p>
</header>

<!--#####################################################################################################################-->

<div id="pagebas">
  <div id="listprofil">


  <!-- Other elements like panier button, etc. -->

</div>

<img src="../img/pubcalvi.png" style="width: 20%;">
<button id="panierboutton" onclick="affichepanier()"><img src="../img/shopping.png" style="height: 50px;"></button>
<div id="panier"></div>
</body>
</html>
