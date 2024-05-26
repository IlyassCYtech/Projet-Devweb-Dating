<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Consensus</title>
  <link rel="icon" type="image/png" href="../img/logo.png">
  <link rel="stylesheet" href="../css/Admin.css">
</head>
<body>
  <script src="../script/Admin.js"></script>
  <?php
session_start();
if (!isset($_SESSION["connecte"]) || $_SESSION["typedutilisateur"] !== "admin") {
    header("Location:../index.html");
    session_destroy();
    exit();
}
?>

<header>
  <div class="container">
  <nav>  <a href="../(DE)connexion/welcome.php">
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

<h1>Tableau des Utilisateurs</h1>
    <table id="user-table">
        <tr>
            <th>Image</th>
            <th>Pseudo</th>
            <th>Mot de Passe</th>
            <th>Prénom</th>
            <th>Adresse Email</th>
            <th>Nom de Famille</th>
            <th>Date de Naissance</th>
            <th>Genre</th>
            <th>Préférence</th>
            <th>Localisation</th>
            <th>Metier</th>
            <th>Centre d'interet</th>
            <th>Inscription</th>
            <th>Type</th>
            <th>Actions</th>
            <th>Messagerie</th>
        </tr>
        <?php
// Fonction pour vérifier si un utilisateur est banni
function isUserBanned($email) {
    // Chemin d'accès au fichier de bannissement
    $banFile = "../database/ban.txt";

    // Vérifie si le fichier de bannissement existe
    if (file_exists($banFile)) {
        // Lit le contenu du fichier de bannissement
        $banData = file_get_contents($banFile);

        // Explode les lignes pour obtenir les adresses e-mail bannies
        $bannedUsers = explode("\n", $banData);

        // Parcours toutes les entrées de bannissement pour vérifier si l'e-mail est banni
        foreach ($bannedUsers as $bannedUser) {
            // Explode chaque entrée pour séparer l'e-mail et le motif
            $bannedUserData = explode(";", $bannedUser);
            // Vérifie si l'adresse e-mail fournie correspond à celle dans le fichier de bannissement
            if (trim($bannedUserData[0]) === $email) {
                // L'utilisateur est banni
                return true;
            }
        }
    }

    // L'utilisateur n'est pas banni
    return false;
}

// Lecture du fichier userList.txt et récupération des données des utilisateurs
$userDataFile = fopen("../database/userList.txt", "r");

if ($userDataFile) {
    while (($line = fgets($userDataFile)) !== false) {
        // Explode la ligne pour obtenir les données individuelles
        $userData = explode(',', $line);
        // Construit le chemin d'accès complet à l'image
        $imagePath = "../database/profil/{$userData[3]}"; // Utilise l'adresse e-mail comme nom de fichier
        // Affiche les données dans une ligne du tableau
        echo "<tr data-email=\"{$userData[3]}\">";
        // Affiche l'image dans la première colonne
        echo "<td><img src='{$imagePath}' class='imgprofil' alt='Image Utilisateur'></td>";
        // Les autres cellules sont pour les autres données
        for ($i = 0; $i < count($userData); $i++) {
            echo "<td>{$userData[$i]}</td>";
        }
        // Vérifie si l'utilisateur est banni
        if (!isUserBanned($userData[3])) {
            // L'utilisateur n'est pas banni, affiche les boutons "Supprimer" et "Bannir"
            if ($_SESSION["adressemail"] !== $userData[3]) {
                echo "<td><button class='btn btn-delete' onclick='deleteUser(\"{$userData[3]}\")'>Supprimer</button> <button class='btn btn-ban' onclick='showBanModal(\"{$userData[3]}\")'>Bannir</button> <button class='btn btn-modifier' onclick='editUser(\"{$userData[3]}\")'>Modifier</button></td><td><button onclick='openModal(\"{$userData[3]}\")'>Messagerie</button></td>";
                echo "</tr>";
            } else {
                echo "<td>C'EST VOUS !!! <button class='btn btn-modifier' onclick='editUser(\"{$userData[3]}\")'>Modifier</button></td><td><button onclick='openModal(\"{$userData[3]}\")'>Messagerie</button></td>";
                echo "</tr>";
            }
        } else {
            // L'utilisateur est banni, affiche le bouton "Unban"
            echo "<td><button class='btn btn-delete' onclick='deleteUser(\"{$userData[3]}\")'>Supprimer</button> <button class='btn btn-unban' onclick='unbanUser(\"{$userData[3]}\")'>Unban</button><button class='btn btn-modifier' onclick='editUser(\"{$userData[3]}\")'>Modifier</button></td><td><button onclick='openModal(\"{$userData[3]}\")'>Messagerie</button></td>";
            echo "</tr>";
        }
    }
    fclose($userDataFile);
} else {
    echo "Erreur : Impossible d'ouvrir le fichier userList.txt";
}
?>

    </table>


        <!-- Fenêtre modale -->
        <div id="ban-modal" class="modal">
        <div class="modal-content">
            <span class="close" onclick="closeModal()">&times;</span>
            <p id="ban-email"></p> <!-- Pour afficher l'adresse e-mail -->
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
    <!-- Inclure les scripts JavaScript ou d'autres dépendances ici -->

    <!-- Modal Div -->
    <div id="messageModal" class="modal">
    <div class="modal-content">
        <span class="close">&times;</span>
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




  </div>
</div>
    </div>
</div>
</body>
</html>




</body>
</html>

