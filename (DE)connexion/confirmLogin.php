<?php




$email = $_POST["username"];
$mdp = $_POST["password"];

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

function verifieLecture($file)
{
    if(!$file)
    {
        die("Erreur Impossible d'ouvrir PATH, chemin non trouvé");
    }
}

function confirmationLogin($email, $mdp)
{
    $PATH = "../database/userList.txt";
    $utilisateurs = file($PATH, FILE_IGNORE_NEW_LINES); // Lire le fichier et stocker chaque ligne dans un tableau


    verifieLecture($utilisateurs);

    // Vérifier chaque ligne pour trouver une correspondance
    foreach ($utilisateurs as $utilisateur) {
        $info = explode(",", $utilisateur);
        if ($info[3] === $email && $info[1] === $mdp) {
            // Afficher chaque élément de la ligne correspondante

            if (!isUserBanned($email)) { 
            
            session_start();
            $_SESSION["connecte"] = true;
            $_SESSION["pseudo"] = $info[0];
            $_SESSION["motdepasse"] = $info[1];
            $_SESSION["prenom"] = $info[2];
            $_SESSION["adressemail"] = $info[3];
            $_SESSION["nomdefamille"] = $info[4];
            $_SESSION["datedenaissance"] = $info[5];
            $_SESSION["genre"] = $info[6];
            $_SESSION["preference"] = $info[7];
            $_SESSION["departement"] = $info[8];
            $_SESSION["metier"] = $info[9];
            $_SESSION["centreInteret"] = $info[10];
            $_SESSION["dateInscription"] = $info[11];
            $_SESSION["typedutilisateur"] = $info[12];
            $email = $_SESSION['adressemail'];         
            $chemin_fichier = "../database/profil/".$email;
            $_SESSION["cheminImage"] = $chemin_fichier;

            // Retourner une réponse JSON pour indiquer la connexion réussie
            echo json_encode(['success' => true, 'redirect' => ($_SESSION["typedutilisateur"] === "admin") ? 'Admin/Admin.php' : '(DE)connexion/welcome.php']);
            exit();
        }
        
        // Retourner une réponse JSON pour indiquer que l'utilisateur est banni
        echo json_encode(['error' => 'Adresse e-mail bannie.']);
        exit();
        }
    }

    // Retourner une réponse JSON pour indiquer l'échec de l'authentification
    echo json_encode(['error' => 'Adresse e-mail ou mot de passe incorrect.']);
    exit();
}

// Vérifier si le formulaire est soumis avec des champs vides
if($mdp == "" || $email == "") {
    // Retourner une réponse JSON pour indiquer des champs vides
    echo json_encode(['error' => 'Veuillez remplir tous les champs.']);
    exit();
}

// Appeler la fonction pour vérifier l'authentification
confirmationLogin($email, $mdp);

session_start();
$_SESSION["duree"] = time();
?>
