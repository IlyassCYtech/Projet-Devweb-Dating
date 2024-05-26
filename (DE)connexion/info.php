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
 
  <?php
 session_start(); 
if (!isset($_SESSION["connecte"]) || $_SESSION["connecte"] !== true) 
{
  header("Location:../index.html");
  exit();
}

?>
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
   <a href="recherche/recherchePage.php"><img id="search" src="../img/loupeIcone.png" alt="icone recherche" id="iconerecherche"></a>            
    <button id="logoutButton" onclick="deconnection()">Se Deconnecter</button>
      
  </div>  
  </div>
 
 
</header>
<div id="pagebas">

<?php
if (isset($_SESSION['typedutilisateur']) && $_SESSION['typedutilisateur'] === 'user') {
    echo '<img src="../img/pubcalvi.png" alt="User Image" style="width: 20%;">';
} else {
  echo '<img src="../img/6.png" alt="User Image" style="width: 20%;">';
}
?>
<!-- afficher les contenu du profil et les différentes options de modification de profil-->
<div class="profile-container">
    <div class="profile-header">
        <h1>P r o f i l</h1>
    </div>
    <div class="profile-details">
        <div class="profile-image">
            <img class="imageprofil" src="<?php echo $_SESSION["cheminImage"];?>" alt="Photo de Joe Doe">
        </div>
        <div class="profile-content">
            <ul>
                <li>
                    <span>Prénom:</span>
                    <span><?php echo $_SESSION["prenom"];?></span>
                    <input type="text" name="firstname" style="display: none;" value="<?php echo $_SESSION["prenom"];?>">
                </li>
                <li>
                    <span>Nom de Famille:</span>
                    <span><?php echo $_SESSION["nomdefamille"];?></span>
                    <input type="text" name="lastname" style="display: none;" value="<?php echo $_SESSION["nomdefamille"];?>">
                </li>
                <li>
                    <span>Email:</span>
                    <span><?php echo $_SESSION["adressemail"];?></span>
                   
                </li>
                <li>
                    <span>Mot de Passe:</span>
                    <span><?php echo $_SESSION["motdepasse"];?></span>
                    <input type="text" name="password" style="display: none;" value="<?php echo $_SESSION["motdepasse"];?>">
                </li>
                <li>
                    <span>Pseudo:</span>
                    <span><?php echo $_SESSION["pseudo"];?></span>
                    <input type="text" name="nickname" style="display: none;" value="<?php echo $_SESSION["pseudo"];?>">
                </li>
                <li>
                    <span>Date-de-Naissance:</span>
                    <span><?php echo $_SESSION["datedenaissance"];?></span>
                    <input type="text" name="birthdate" style="display: none;" value="<?php echo $_SESSION["datedenaissance"];?>">
                </li>
                <li>
                    <span>Sexe:</span>
                    <span><?php echo $_SESSION["genre"];?></span>
                    <select name="gender" style="display: none;">
                        <option value="man" <?php echo ($_SESSION["genre"] == "man") ? 'selected' : ''; ?>>Homme</option>
                        <option value="woman" <?php echo ($_SESSION["genre"] == "woman") ? 'selected' : ''; ?>>Femme</option>
                    </select>
                </li>
                <li>
                    <span>Préference:</span>
                    <span><?php echo $_SESSION["preference"];?></span>
                    <select name="preference" style="display: none;">
                        <option value="man" <?php echo ($_SESSION["preference"] == "man") ? 'selected' : ''; ?>>Homme</option>
                        <option value="woman" <?php echo ($_SESSION["preference"] == "woman") ? 'selected' : ''; ?>>Femme</option>
                    </select>
                </li>
                <li>
                    <span>Localisation:</span>
                    <span><?php echo $_SESSION["departement"];?></span>
                    <select id="departement" name="localisation" style="display: none;">
                        <?php
                        $departements = [
                            "01" => "Ain", "02" => "Aisne", "03" => "Allier", "04" => "Alpes-de-Haute-Provence",
                            "05" => "Hautes-Alpes", "06" => "Alpes-Maritimes", "07" => "Ardèche", "08" => "Ardennes",
                            "09" => "Ariège", "10" => "Aube", "11" => "Aude", "12" => "Aveyron", "13" => "Bouches-du-Rhône",
                            "14" => "Calvados", "15" => "Cantal", "16" => "Charente", "17" => "Charente-Maritime",
                            "18" => "Cher", "19" => "Corrèze", "21" => "Côte-d'Or", "22" => "Côtes-d'Armor", "23" => "Creuse",
                            "24" => "Dordogne", "25" => "Doubs", "26" => "Drôme", "27" => "Eure", "28" => "Eure-et-Loir",
                            "29" => "Finistère", "30" => "Gard", "31" => "Haute-Garonne", "32" => "Gers", "33" => "Gironde",
                            "34" => "Hérault", "35" => "Ille-et-Vilaine", "36" => "Indre", "37" => "Indre-et-Loire",
                            "38" => "Isère", "39" => "Jura", "40" => "Landes", "41" => "Loir-et-Cher", "42" => "Loire",
                            "43" => "Haute-Loire", "44" => "Loire-Atlantique", "45" => "Loiret", "46" => "Lot", "47" => "Lot-et-Garonne",
                            "48" => "Lozère", "49" => "Maine-et-Loire", "50" => "Manche", "51" => "Marne", "52" => "Haute-Marne",
                            "53" => "Mayenne", "54" => "Meurthe-et-Moselle", "55" => "Meuse", "56" => "Morbihan", "57" => "Moselle",
                            "58" => "Nièvre", "59" => "Nord", "60" => "Oise", "61" => "Orne", "62" => "Pas-de-Calais", "63" => "Puy-de-Dôme",
                            "64" => "Pyrénées-Atlantiques", "65" => "Hautes-Pyrénées", "66" => "Pyrénées-Orientales", "67" => "Bas-Rhin",
                            "68" => "Haut-Rhin", "69" => "Rhône", "70" => "Haute-Saône", "71" => "Saône-et-Loire", "72" => "Sarthe",
                            "73" => "Savoie", "74" => "Haute-Savoie", "75" => "Paris", "76" => "Seine-Maritime", "77" => "Seine-et-Marne",
                            "78" => "Yvelines", "79" => "Deux-Sèvres", "80" => "Somme", "81" => "Tarn", "82" => "Tarn-et-Garonne",
                            "83" => "Var", "84" => "Vaucluse", "85" => "Vendée", "86" => "Vienne", "87" => "Haute-Vienne", "88" => "Vosges",
                            "89" => "Yonne", "90" => "Territoire de Belfort", "91" => "Essonne", "92" => "Hauts-de-Seine", "93" => "Seine-Saint-Denis",
                            "94" => "Val-de-Marne", "95" => "Val-d'Oise"
                        ];
                        foreach ($departements as $code => $nom) {
                            $selected = ($_SESSION["departement"] == $nom) ? 'selected' : '';
                            echo "<option value=\"$nom\" $selected>$nom</option>";
                        }
                        ?>
                    </select>
                </li>
                <li>
                    <span>Profession:</span>
                    <span><?php echo $_SESSION["metier"];?></span>  
                    <select id="metier" name="metier" style="display: none;">
                        <option value="acteur" <?php if ($_SESSION["metier"] == "acteur") echo 'selected'; ?>>Acteur</option>
                        <option value="agriculteur" <?php if ($_SESSION["metier"] == "agriculteur") echo 'selected'; ?>>Agriculteur</option>
                        <option value="architecte" <?php if ($_SESSION["metier"] == "architecte") echo 'selected'; ?>>Architecte</option>
                        <option value="astronome" <?php if ($_SESSION["metier"] == "astronome") echo 'selected'; ?>>Astronome</option>
                        <option value="avocat" <?php if ($_SESSION["metier"] == "avocat") echo 'selected'; ?>>Avocat</option>
                        <option value="biologiste" <?php if ($_SESSION["metier"] == "biologiste") echo 'selected'; ?>>Biologiste</option>
                        <option value="chimiste" <?php if ($_SESSION["metier"] == "chimiste") echo 'selected'; ?>>Chimiste</option>
                        <option value="chef" <?php if ($_SESSION["metier"] == "chef") echo 'selected'; ?>>Chef de projet</option>
                        <option value="chef_cuisinier" <?php if ($_SESSION["metier"] == "chef_cuisinier") echo 'selected'; ?>>Chef cuisinier</option>
                        <option value="coach" <?php if ($_SESSION["metier"] == "coach") echo 'selected'; ?>>Coach</option>
                        <option value="comptable" <?php if ($_SESSION["metier"] == "comptable") echo 'selected'; ?>>Comptable</option>
                        <option value="dentiste" <?php if ($_SESSION["metier"] == "dentiste") echo 'selected'; ?>>Dentiste</option>
                        <option value="detective" <?php if ($_SESSION["metier"] == "detective") echo 'selected'; ?>>Détective</option>
                        <option value="developpeur" <?php if ($_SESSION["metier"] == "developpeur") echo 'selected'; ?>>Développeur</option>
                        <option value="economiste" <?php if ($_SESSION["metier"] == "economiste") echo 'selected'; ?>>Économiste</option>
                        <option value="electricien" <?php if ($_SESSION["metier"] == "electricien") echo 'selected'; ?>>Électricien</option>
                        <option value="enseignant" <?php if ($_SESSION["metier"] == "enseignant") echo 'selected'; ?>>Enseignant</option>
                        <option value="entrepreneur" <?php if ($_SESSION["metier"] == "entrepreneur") echo 'selected'; ?>>Entrepreneur</option>
                        <option value="geologue" <?php if ($_SESSION["metier"] == "geologue") echo 'selected'; ?>>Géologue</option>
                        <option value="historien" <?php if ($_SESSION["metier"] == "historien") echo 'selected'; ?>>Historien</option>
                        <option value="ingenieur" <?php if ($_SESSION["metier"] == "ingenieur") echo 'selected'; ?>>Ingénieur</option>
                        <option value="infirmier" <?php if ($_SESSION["metier"] == "infirmier") echo 'selected'; ?>>Infirmier</option>
                        <option value="interprete" <?php if ($_SESSION["metier"] == "interprete") echo 'selected'; ?>>Interprète</option>
                        <option value="journaliste" <?php if ($_SESSION["metier"] == "journaliste") echo 'selected'; ?>>Journaliste</option>
                        <option value="libraire" <?php if ($_SESSION["metier"] == "libraire") echo 'selected'; ?>>Libraire</option>
                        <option value="mathematicien" <?php if ($_SESSION["metier"] == "mathematicien") echo 'selected'; ?>>Mathématicien</option>
                        <option value="medecin" <?php if ($_SESSION["metier"] == "medecin") echo 'selected'; ?>>Médecin</option>
                        <option value="musicien" <?php if ($_SESSION["metier"] == "musicien") echo 'selected'; ?>>Musicien</option>
                        <option value="neurologue" <?php if ($_SESSION["metier"] == "neurologue") echo 'selected'; ?>>Neurologue</option>
                        <option value="notaire" <?php if ($_SESSION["metier"] == "notaire") echo 'selected'; ?>>Notaire</option>
                        <option value="paleontologue" <?php if ($_SESSION["metier"] == "paleontologue") echo 'selected'; ?>>Paléontologue</option>
                        <option value="pediatre" <?php if ($_SESSION["metier"] == "pediatre") echo 'selected'; ?>>Pédiatre</option>
                        <option value="pharmacien" <?php if ($_SESSION["metier"] == "pharmacien") echo 'selected'; ?>>Pharmacien</option>
                        <option value="pilote" <?php if ($_SESSION["metier"] == "pilote") echo 'selected'; ?>>Pilote</option>
                        <option value="pompier" <?php if ($_SESSION["metier"] == "pompier") echo 'selected'; ?>>Pompier</option>
                        <option value="psychologue" <?php if ($_SESSION["metier"] == "psychologue") echo 'selected'; ?>>Psychologue</option>
                        <option value="radiologue" <?php if ($_SESSION["metier"] == "radiologue") echo 'selected'; ?>>Radiologue</option>
                        <option value="realisateur" <?php if ($_SESSION["metier"] == "realisateur") echo 'selected'; ?>>Réalisateur</option>
                        <option value="restaurateur" <?php if ($_SESSION["metier"] == "restaurateur") echo 'selected'; ?>>Restaurateur</option>
                        <option value="sapeur_pompier" <?php if ($_SESSION["metier"] == "sapeur_pompier") echo 'selected'; ?>>Sapeur-pompier</option>
                        <option value="sociologue" <?php if ($_SESSION["metier"] == "sociologue") echo 'selected'; ?>>Sociologue</option>
                        <option value="soudeur" <?php if ($_SESSION["metier"] == "soudeur") echo 'selected'; ?>>Soudeur</option>
                        <option value="statisticien" <?php if ($_SESSION["metier"] == "statisticien") echo 'selected'; ?>>Statisticien</option>
                        <option value="styliste" <?php if ($_SESSION["metier"] == "styliste") echo 'selected'; ?>>Styliste</option>
                        <option value="vendeur" <?php if ($_SESSION["metier"] == "vendeur") echo 'selected'; ?>>Vendeur</option>
                        <option value="veterinaire" <?php if ($_SESSION["metier"] == "veterinaire") echo 'selected'; ?>>Vétérinaire</option>
                    </select>
                </li>
                <li>
                    <span>Centre D'Intérêt Principal:</span>
                    <span><?php echo $_SESSION["centreInteret"];?></span>
                    <select id="centre_interet" name="centreintret" style="display: none;" value="<?php echo $_SESSION["centreInteret"];?>">
                        <option value="animaux">Animaux</option>
                        <option value="architecture">Architecture</option>
                        <option value="art">Art</option>
                        <option value="astronomie">Astronomie</option>
                        <option value="beaute">Beauté</option>
                        <option value="bricolage">Bricolage</option>
                        <option value="cinema">Cinéma</option>
                        <option value="cuisine">Cuisine</option>
                        <option value="danse">Danse</option>
                        <option value="dessin">Dessin</option>
                        <option value="ecriture">Écriture</option>
                        <option value="gaming">Gaming</option>
                        <option value="histoire">Histoire</option>
                        <option value="jeux_video">Jeux vidéo</option>
                        <option value="jardinage">Jardinage</option>
                        <option value="lecture">Lecture</option>
                        <option value="mode">Mode</option>
                        <option value="musique">Musique</option>
                        <option value="nature">Nature</option>
                        <option value="philosophie">Philosophie</option>
                        <option value="photographie">Photographie</option>
                        <option value="politique">Politique</option>
                        <option value="sante">Santé</option>
                        <option value="science">Science</option>
                        <option value="sport">Sport</option>
                        <option value="technologie">Technologie</option>
                        <option value="voiture">Automobile</option>
                        <option value="voyage">Voyage</option>
                        <!-- Ajoutez d'autres centres d'intérêt au besoin -->
                    </select> 
                </li>
                <li>
                    <span>Date d'inscription:</span>
                    <span><?php echo $_SESSION["dateInscription"];?></span>
                    
                </li>
            </ul>
        </div>
    </div>
    <div class="edit-button">
        <button onclick="editProfile()">Edit</button>
        <?php
// Bouton Enregistrer avec les variables de session
echo '<button onclick="saveProfile(\'' . $_SESSION["adressemail"] . '\', \'' . $_SESSION["typedutilisateur"] . '\', \'' . $_SESSION["dateInscription"] . '\')" style="display: none;">Enregistrer</button>';

?>

    </div>
</div>

<?php
if (isset($_SESSION['typedutilisateur']) && $_SESSION['typedutilisateur'] === 'user') {
    echo '<img src="../img/pubcalvi.png" alt="User Image" style="width: 20%;">';
} else {
  echo '<img src="../img/8.png" alt="User Image" style="width: 20%;">';
}
?>
</div>

</body>

</html>


