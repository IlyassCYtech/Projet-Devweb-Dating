<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Consensus</title>
  <link rel="icon" type="image/png" href="../img/logo.png">
  <link rel="stylesheet" href="../css/parametres.css">


</head>
<?php
  session_start();
  if (!isset($_SESSION["connecte"]) || $_SESSION["connecte"] !== true) {
      header("Location:../index.html");
      exit();
  }


?>
<body data-email="<?php echo isset($_SESSION['adressemail']) ? $_SESSION['adressemail'] : ''; ?>">
  
  <script src="../script/parametres.js"></script>

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
 
 <!-- affiches les différentes options des paramètres-->
</header>
<div class="pagebas">
<img src="../img/pubecosse.png" style="width: 20%;left:0">
<main>
  <h1>Paramètres<h1>
  <section class="settings-section">
      <h2>Abonnement</h2>
      <div class="subscription-options">
          <div class="subscription-option free-plan">
              <h3>Offre Gratuite</h3>
              <ul class="offre">
                  <li>Accès à l'accueil</li>
                  <li>Accès au profil</li>
              </ul>
              <div class="pricing">
                  <?php if ($_SESSION["typedutilisateur"] == 'user+'): ?>
                      <button class="user">Gratuit</button>
                  <?php else: ?>
                      <table class="offre-en-cours">
                          <tr>
                              <td><button disabled>Offre en cours</button></td>
                          </tr>
                      </table>
                  <?php endif; ?>
              </div>
          </div>
          <div class="subscription-option premium-plan">
              <h3>Abonné +</h3>
              <ul class="offre">
                  <li>Accès à l'accueil</li>
                  <li>Accès au profil</li>
                  <li>Accès à la barre de recherche</li>
                  <li>Accès à la messagerie</li>
                  <li>Option espion</li>
                  <li>Pub intéressante</li>
              </ul>
              <div class="pricing">
                  <?php if ($_SESSION["typedutilisateur"] == 'user'): ?>
                      <button class="user+">Mensuel - 10,99 $</button>
                      <button class="user+">Annuel - 120 $ <span>(Économisez 11,88 $)</span></button>
                      <ul class="offre">
                          <li>Renouvellement automatique</li>
                      </ul>
                  <?php else: ?>
                      <table class="offre-en-cours">
                          <tr>
                              <td><button disabled>Offre en cours</button></td>
                          </tr>
                      </table>
                  <?php endif; ?>
              </div>
          </div>
      </div>
  </section>

  
  <section class="settings-section">
      <h2>Comptes bloquées</h2>
      <div class="account-settings">
          <div class="account-option">
              
              <ul id="blocked-contacts-list" class="blocked-contacts">
                  <!-- Contacts bloqués seront affichés ici -->
                </ul>
            </div>
        </div>
    </section>
    <section class="settings-section">
        <h2>Supprimer son compte</h2>
        <div class="account-settings">
                
                <p class="messagesup">Cette action est irréversible. Tous vos données seront perdues.</p>
                <button class="supbouton" data-email="<?php echo $_SESSION['adressemail']; ?>">Supprimer mon compte</button>
            
        </div>
    </section>
    </main>
    <img src="../img/pubcalvi.png" style="width: 20%;">
  </div>
</body>
</html>
