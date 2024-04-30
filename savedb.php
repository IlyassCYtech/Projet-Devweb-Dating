

<?php
function saveUserData($usrData)
{
    // Ouvre ou crée le fichier userList.txt en mode écriture
    $usrDataFile = fopen("./database/userList.txt", "a");

    // Vérifie si l'ouverture du fichier a réussi
    if ($usrDataFile) {
        // Formatte les données pour l'enregistrement dans le fichier
        $userDataString = implode(',', $usrData) . ',user' . PHP_EOL;

        // Écrit les données dans le fichier
        fwrite($usrDataFile, $userDataString);

        // Ferme le fichier
        fclose($usrDataFile);

        echo "Données enregistrées avec succès.";
        session_start();
        $_SESSION["connecte"] = true;
        $_SESSION["pseudo"] = $usrData[0];
        $_SESSION["prenom"] = $usrData[2];
        $_SESSION["adressemail"] = $usrData[3];
        $_SESSION["nomdefamille"] = $usrData[4];
        $_SESSION["datedenaissance"] = $usrData[5];
        $_SESSION["genre"] = $usrData[6];
        $_SESSION["preference"] = $usrData[7];
        $_SESSION["typedutilisateur"] = "user";
        $email = $_SESSION['adressemail'];
        // Chemin du dossier contenant l'image
        $dossierImages = "./database/users/".$email; // Modifier le chemin selon votre configuration
        // Utilisation de glob pour obtenir le nom du fichier
        $fichiers = glob($dossierImages . "*");
        $nomFichier = basename($fichiers[0]);
        $_SESSION["cheminImage"] = $dossierImages . $nomFichier;
        header("Location: ./(DE)connexion/welcome.php");
    } else {
        echo "Erreur : Impossible d'ouvrir le fichier pour enregistrement des données.";
        header("Location:../index.html");
    }
}
function saveUserPhotos($usrName)
{
    $count = 1;
    if(isset($_FILES['pic'])) 
    {

        // Access the uploaded file details and check if path exists and creating it otherwise
        $picName = $_FILES['pic']['name'];
        $picError = $_FILES['pic']['error'];
        $uploadPATH = "./database/users/".$usrName."/";
        
        if(!file_exists($uploadPATH))
            mkdir($uploadPATH);

        // Check if file was uploaded successfully
        foreach ($_FILES["pic"]["error"] as $key => $error) 
        {
            if ($error == UPLOAD_ERR_OK) 
            {
                $tmpName = $_FILES["pic"]["tmp_name"][$key];
                $picName = basename($_FILES["pic"]["name"][$key]);
                move_uploaded_file($tmpName, $uploadPATH.$picName);
                rename($uploadPATH.$picName,$uploadPATH.$usrName.$count);
                $count++;
            }
            else
            {
               die("Error:".$picError);
            }
        }
        // Continue with saving other user data to the database
    }
    else
    {
        echo "no file uploaded";
        header("Location:../index.html");
    }

}
function saveInDb ()
{
    //storage of name attribute into varabiables

    // For private info
    $name = $_POST['name']."_".$_POST['lname'];

    $password = isset($_POST['password']) ? $_POST['password']: "";

    // For public info
    $nickname = isset($_POST['nickname']) ? $_POST['nickname'] : "";

    $email = isset($_POST['email']) ? $_POST['email'] : "";

    $birthday = isset($_POST['birthday']) ? $_POST['birthday'] : "";

    $gender = isset($_POST['gender']) ? $_POST['gender'] : "";

    $lkfgender = isset($_POST['lkfgender'])? $_POST['lkfgender'] : "";

 
    
    if(isset($lkfgender[1])) //keeping one single element inside the list of attributes
    {
        $genderpref = $lkfgender[0]." ".$lkfgender[1];
    }else
    {
        $genderpref = $lkfgender[0];
    }

    //here I still need to enhace the security of the strings, but Imma present my propositions tomorrow during the meeting


    // Crée un tableau avec les données de l'utilisateur
    $userData = array(
        $nickname,
        $password,
        $_POST['name'],
        $email,
        $_POST['lname'],
        $birthday,
        $gender,
        $genderpref,
    );


    saveUserData($userData);

    saveUserPhotos($email);
    
   
    }


    saveInDb();
?>
