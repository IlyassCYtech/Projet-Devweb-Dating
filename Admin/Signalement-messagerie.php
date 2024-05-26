<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Admin</title>
  <link rel="stylesheet" href="../css/Signalement.css">
</head>
<body>
<script src="../script/Signalement.js"></script>
<header>
  <div class="container">
  <nav>  <a href="welcome.php">
      <img src="../img/logo.png" alt="Logo de Mon Site">
      <h1>Consensus</h1>
    </a>
    
  </nav>
    <nav>
    <ul>
        <li><a href="../(DE)connexion/welcome.php">Accueil</a></li>
        <li><a href="Admin.php">QG</a></li>
        <li><a href="Signalement-messagerie.php">Signalement-Messagerie</a></li>
        <li><a href="../(DE)connexion/parametres.php">Paramètres</a></li>
      </ul>
    </nav>
  <div class="logout">    
    <button id="logoutButton" onclick="deconnection()">Se Deconnecter</button>
  </div>  
  </div>

</header>
<?php
session_start();
if (!isset($_SESSION["connecte"]) || $_SESSION["typedutilisateur"] !== "admin") {
    header("Location:../index.html");
    exit();
}

// Chemin d'accès au fichier de signalement
$signalementFile = "../database/signalement-message.txt";

// Initialiser le tableau pour stocker les données
$signalementData = array();

// Vérifier si le fichier existe
if (file_exists($signalementFile)) {
    // Lire le contenu du fichier
    $signalementContent = file_get_contents($signalementFile);

    // Diviser le contenu en lignes
    $signalementLines = explode("\n", $signalementContent);

    // Parcourir chaque ligne
    foreach ($signalementLines as $line) {
        // Diviser chaque ligne en colonnes
        $columns = explode(";", $line);
        // Ajouter les colonnes au tableau de données
        $signalementData[] = $columns;
    }
}

// Afficher les données dans un tableau HTML
// Afficher les données dans un tableau HTML
echo "<h1>Signalement des Messages</h1>";
if (!empty($signalementData)) {
    echo "<table>";
    echo "<tr><th>Message ID</th><th>Accusé</th><th>Témoin</th><th>Raison</th><th>Contenu du Message</th><th>Action</th></tr>";
    foreach ($signalementData as $row) {
        // Vérifier si la ligne est vide
        if (!empty($row[0])) {
            echo "<tr>";
            // Accéder à chaque élément de la ligne par son index
            echo "<td>{$row[0]}</td><td>{$row[1]}</td><td>{$row[2]}</td><td>{$row[3]}</td><td>{$row[4]}</td><td class='cellule-tableau'><button class='btn btn-ban' onclick='banUser(\"{$row[0]}\", \"{$row[1]}\", \"{$row[3]}\")'>Bannir</button><button class='btn btn-delete' onclick='unbanMessage(\"{$row[0]}\")'>Supprimer le signalement</button></td>";
            echo "</tr>";
        }
    }
    echo "</table>";
} else {
    echo "<p>Aucun signalement de message trouvé.</p>";
}

?>
<!-- Div de modération -->
<div id="myModal" class="modal">
    <div class="modal-content">
        <span class="close">&times;</span>
        <p id="modalContent"></p>
    </div>
</div>

</body>
</html>
