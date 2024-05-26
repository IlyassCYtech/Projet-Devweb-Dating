<?php

function checkEmailExists($email)
{
    // Lit le fichier userList.txt
    $file = file("./database/userList.txt");

    // Parcourt chaque ligne du fichier
    foreach ($file as $line) {
        $info = explode(",", $line);

        // Vérifie si l'adresse e-mail existe déjà
        if ($info[3] == $email) {
           
            return true;
        }
    }
    
    return false;
}

function isUserBanned($email) {
    // Chemin d'accès au fichier de bannissement
    $banFile = "database/ban.txt";
    
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

function saveUserData($usrData)
{
    // Ouvre ou crée le fichier userList.txt en mode écriture
    $usrDataFile = fopen("./database/userList.txt", "a");

    // Vérifie si l'ouverture du fichier a réussi
    if ($usrDataFile) {
        // Formatte les données pour l'enregistrement dans le fichier
        $userDataString = implode(',', $usrData) . PHP_EOL;

        // Écrit les données dans le fichier
        fwrite($usrDataFile, $userDataString);

        // Ferme le fichier
        fclose($usrDataFile);

        session_start();
        $_SESSION["connecte"] = true;
        $_SESSION["pseudo"] = $usrData[0];
        $_SESSION["motdepasse"] = $usrData[1];
        $_SESSION["prenom"] = $usrData[2];
        $_SESSION["adressemail"] = $usrData[3];
        $_SESSION["nomdefamille"] = $usrData[4];
        $_SESSION["datedenaissance"] = $usrData[5];
        $_SESSION["genre"] = $usrData[6];
        $_SESSION["preference"] = $usrData[7];
        $_SESSION["departement"] = $usrData[8];
        $_SESSION["metier"] = $usrData[9];
        $_SESSION["centreInteret"] = $usrData[10];
        $_SESSION["dateInscription"] = $usrData[11];
        $_SESSION["typedutilisateur"] = $usrData[12];
        $email = $_SESSION['adressemail'];
        $chemin_fichier = "../database/profil/".$email;
        $_SESSION["cheminImage"] = $chemin_fichier;
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['error' => 'Impossible d\'ouvrir le fichier pour enregistrement des données.']);
    }
}

function saveUserPhotos($usrName)
{
    $count = 1;
    if(isset($_FILES['pic'])) 
    {
        $picName = $_FILES['pic']['name'];
        $picError = $_FILES['pic']['error'];
        $uploadPATH = "./database/profil/";
        
        if(!file_exists($uploadPATH))
            mkdir($uploadPATH);

        foreach ($_FILES["pic"]["error"] as $key => $error) 
        {
            if ($error == UPLOAD_ERR_OK) 
            {
                $tmpName = $_FILES["pic"]["tmp_name"][$key];
                $picName = basename($_FILES["pic"]["name"][$key]);
                move_uploaded_file($tmpName, $uploadPATH.$picName);
                rename($uploadPATH.$picName,$uploadPATH.$usrName);
                $count++;
            }
            else
            {
               die("Error:".$picError);
            }
        }
    }
    else
    {
        echo "no file uploaded";
        header("Location:../index.html");
    }
}

function saveInDb ()
{
    $name = $_POST['name']."_".$_POST['lname'];
    $password = isset($_POST['password']) ? $_POST['password']: "";
    $nickname = isset($_POST['nickname']) ? $_POST['nickname'] : "";
    $email = isset($_POST['email']) ? $_POST['email'] : "";
    $birthday = isset($_POST['birthday']) ? $_POST['birthday'] : "";
    $gender = isset($_POST['gender']) ? $_POST['gender'] : "";
    $lkfgender = isset($_POST['lkfgender'])? $_POST['lkfgender'] : "";
    $metier = isset($_POST['metier'])? $_POST['metier'] : "";
    $centre_interet = isset($_POST['centre_interet'])? $_POST['centre_interet'] : "";
    $date = date("Y-m-d");
    $departement = isset($_POST['departement'])? $_POST['departement'] : "";

    if(isset($lkfgender[1])) {
        $genderpref = $lkfgender[0]." ".$lkfgender[1];
    } else {
        $genderpref = $lkfgender[0];
    }


    if(isUserBanned($email) == true){
        error_log('lol');
        echo json_encode(['error' => 'Adresse e-mail bannie.']);
        
        exit; 
    }

    if (checkEmailExists($email)) {
        echo json_encode(['error' => 'Adresse e-mail déjà utilisée.']);
        exit;
    }

    // Définir le type d'utilisateur en fonction du genre
    $typedutilisateur = ($gender == 'woman') ? 'user+' : 'user';

    $userData = array(
        $nickname,
        $password,
        $_POST['name'],
        $email,
        $_POST['lname'],
        $birthday,
        $gender,
        $genderpref,
        $departement,
        $metier,
        $centre_interet,
        $date,
        $typedutilisateur,
    );

    saveUserData($userData);
    saveUserPhotos($email);
}

saveInDb();
?>
