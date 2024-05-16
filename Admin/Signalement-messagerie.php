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
        <li><a href="Admin.php">QG</a></li>
        <li><a href="messagerie.php">Reclamation</a></li>
        <li><a href="info.php">BAN</a></li>
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
  if (!isset($_SESSION["connecte"]) || $_SESSION["typedutilisateur"] !== "admin") {
      header("Location:../index.html");
      exit();
  }
  
    // Chemin d'accès au fichier de signalement
    $signalementFile = "../database/signalement-message.txt";

    // Vérifier si le fichier existe
    if (file_exists($signalementFile)) {
        // Lire le contenu du fichier
        $signalementContent = file_get_contents($signalementFile);

        // Diviser le contenu en lignes
        $signalementLines = explode("\n", $signalementContent);

        // Afficher les données dans un tableau
        echo "<h1>Signalement des Messages</h1>";
        echo "<table>";
        echo "<tr><th>Message ID</th><th>Utilisateur 1</th><th>Utilisateur 2</th><th>Raison</th><th>Contenu du Message</th></tr>";
        foreach ($signalementLines as $line) {
            // Diviser chaque ligne en colonnes
            $columns = explode(";", $line);
            // Afficher chaque colonne dans une cellule du tableau
            echo "<tr>";
            foreach ($columns as $column) {
                echo "<td>$column</td>";
            }
            echo "</tr>";
        }
        echo "</table>";
    } else {
        // Afficher un message d'erreur si le fichier n'existe pas
        echo "<p>Aucun signalement de message trouvé.</p>";
    }
  ?>

</body>
</html>
