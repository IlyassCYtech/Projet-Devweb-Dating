<?php
session_start();
if (!isset($_SESSION["connecte"]) || $_SESSION["connecte"] !== true) {
    header("Location: ../index.html");
    exit();
}

// Chemin vers le fichier userlist.txt et contact.txt
$userListFile = "../database/userlist.txt";
$contactFile = "../database/contact.txt";

$users = [];
$contactEmails = [];
$userEmail = isset($_SESSION["adressemail"]) ? $_SESSION["adressemail"] : '';

// Lire le fichier userlist.txt
if (file_exists($userListFile)) {
    $lines = file($userListFile, FILE_IGNORE_NEW_LINES);
    foreach ($lines as $line) {
        $users[] = str_getcsv($line);
    }
}

// Lire le fichier contact.txt
if (file_exists($contactFile)) {
  $contactLines = file($contactFile, FILE_IGNORE_NEW_LINES);
  foreach ($contactLines as $contactLine) {
      // Vérifier si la ligne contient le séparateur ;
      if (strpos($contactLine, ';') !== false) {
          $parts = explode(";", $contactLine);
          // Vérifier si l'explosion donne bien deux parties
          if (count($parts) === 2) {
              list($uEmail, $profileEmail) = $parts;
              
              if (trim($uEmail) === $userEmail) {
                  $contactEmails[] = trim($profileEmail);
              }
          }
      }
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
  var contactEmails = <?php echo json_encode($contactEmails); ?>;
   var preference = "<?php echo $preference; ?>";
   var userEmail = "<?php echo $_SESSION['adressemail']; ?>"; // Assurez-vous que cette ligne est correcte.
    console.log("Email de l'utilisateur connecté :", userEmail); // Ceci affichera l'email dans la console du navigateur pour vérification.

    var contactEmails = <?php echo json_encode($contactEmails); ?>;
</script>
<script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
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
  <?php
    // Vérifier le type d'utilisateur
    if($_SESSION["typedutilisateur"] != "user") {
        // Afficher le lien pour l'administration du site
        echo '<a href="recherche/recherchePage.php"><img id="search" src="../img/loupeIcone.png" alt="icone recherche" id="iconerecherche"></a>  ';
    }
    ?>
    <button id="logoutButton" onclick="deconnection()">Se Deconnecter</button>
  </div>  
  </div>
 
 
</header>

<!--#####################################################################################################################-->
<div id="pagebas">
<?php
// Vérification de la session utilisateur
if (isset($_SESSION['typedutilisateur']) && $_SESSION['typedutilisateur'] === 'user') {
    echo '<img src="../img/Pubpasinteressant.png" alt="User Image" style="width: 20%;">';
} else {
  echo '<img src="../img/5.png" alt="User Image" style="width: 20%;">';
}
?>

  <div id="listprofil">


  <!-- autres éléments comme le panier, le boutton, etc. -->

</div>
<?php
if (isset($_SESSION['typedutilisateur']) && $_SESSION['typedutilisateur'] === 'user') {
    echo '<img src="../img/Premium_love.png" alt="User Image" style="width: 20%;">';
} else {
  echo '<img src="../img/7.png" alt="User Image" style="width: 20%;">';
}
?>
<button id="panierboutton" onclick="affichepanier()"><img src="../img/shopping.png" style="height: 50px;"></button>
<div id="panier"></div>
<?php
  if($_SESSION["typedutilisateur"] == "user+" || $_SESSION["typedutilisateur"] == "admin")
  {
    echo '<button id="profileregardebutton" onclick="afficheListeVu()"><img src="../img/iconeRegarde.png" style="height: 50px;"></button>';
    echo '<div id="listeVu">';
    
    $notifications = [];
    $compteur = 0;
    $fnotif = file("../database/historiqueRecherche.txt", FILE_IGNORE_NEW_LINES);
    
    foreach ($fnotif as $ligne) 
    {
        $allnotifs = explode(";", $ligne);
        
        if (strcmp($_SESSION["adressemail"], $allnotifs[0]) == 0) 
        {
            echo '<div class="notifDiv">';
            echo "<p>Vous avez été recherché par {$allnotifs[1]} le {$allnotifs[2]}</p>";
            echo "<img class='notifimg' src=\"../database/profil/{$allnotifs[1]}\">";
            echo "<button class='notifsupp' onclick='enlevernotif(\"{$_SESSION["adressemail"]}\")'>X</button>";
            echo '</div>';
            $compteur++;  
        }
    }
    if($compteur == 0)
    {
      echo"<h2>Votre profil a 0 visites<h2>";
    }
    
    echo '</div>';
}
?>
</div>
</body>
</html>
