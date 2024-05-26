<?php
session_start();

if (!isset($_SESSION["connecte"]) || $_SESSION["connecte"] !== true) {
    header("HTTP/1.1 403 Forbidden");
    exit();
}




error_log("Début du script get_contacts.php"); // Message de débogage
$adresseMail = $_SESSION["adressemail"];
error_log("Adresse email récupérée : " . $adresseMail); // Message de débogage
$filePath = "../database/contact.txt";
error_log("Chemin du fichier : " . $filePath); // Message de débogage

if (isset($_GET['mail'])) {
    $adresseMail = $_GET['mail'];
} 
//récupère les pseudos des utilisateurs
function getPseudoForEmail($contactEmail) {
    $filePath = "../database/userList.txt";
    $pseudo = null;

    if (file_exists($filePath)) {
        $lines = file($filePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        foreach ($lines as $line) {
            $data = explode(",", $line);
            if (isset($data[3]) && $data[3] === $contactEmail && isset($data[0])) {
                $pseudo = $data[0];
                break;
            }
        }
    }

    return $pseudo;
}

if (file_exists($filePath)) {
    error_log("Le fichier existe"); // Message de débogage
    $contacts = array();
    $lines = file($filePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    $processedPairs = array(); // Tableau pour stocker les paires d'adresses email déjà traitées
    foreach ($lines as $line) {
        if (strpos($line, '!') === false) { // Vérifie si le séparateur '!' n'est pas présent dans la ligne
            $data = explode(";", $line);
            if(isset($data[1])){
            // Vérifie si la ligne est correctement formatée avec deux parties séparées par ";"
            if (count($data) === 2) {
                $email1 = isset($data[0]) ? trim($data[0]) : null;
                $email2 = isset($data[1]) ? trim($data[1]) : null;

            // Vérifier si l'adresse email de session est associée à une autre adresse email dans une ligne
            if (($email1 === $adresseMail || $email2 === $adresseMail) && !in_array("$email1;$email2", $processedPairs) && !in_array("$email2;$email1", $processedPairs)) {
                // Vérifier si cette paire existe dans une autre ligne dans n'importe quel ordre
                $pairExists = false;
                foreach ($lines as $line2) {
                    $data2 = explode(";", $line2);
                   
                    
                    $email3 = isset($data2[0]) ? trim($data2[0]) : null;
                    $email4 = isset($data2[1]) ? trim($data2[1]) : null;

                    if ((($email3 === $email1 && $email4 === $email2) || ($email3 === $email2 && $email4 === $email1)) && ($email1 !== $email3 || $email2 !== $email4)) {
                        $pairExists = true;
                        break;
                    }
                }
                if ($pairExists) {
                    $contactEmail = ($email1 === $adresseMail) ? $email2 : $email1;
                    $profileImagePath = "../database/profil/" . $contactEmail;
                    if (file_exists($profileImagePath)) {
                        error_log("Image de profil trouvée pour : " . $contactEmail); // Message de débogage
                        $pseudo = getPseudoForEmail($contactEmail);
                        $contacts[] = array(
                            "email" => $contactEmail,
                            "profileImage" => $profileImagePath,
                            "pseudo" => $pseudo
                        );

                    } else {
                        error_log("Image de profil non trouvée pour : " . $contactEmail); // Message de débogage
                    }
                    // Ajouter la paire traitée au tableau
                    $processedPairs[] = "$email1;$email2";
                }
            }
        }  
    }}}
    error_log("Contacts récupérés : " . json_encode($contacts)); // Message de débogage
    error_log("Renvoi des contacts au format JSON"); // Message de débogage
    echo json_encode($contacts);
} else {
    error_log("Le fichier n'existe pas"); // Message de débogage
    echo json_encode(array());
}
?>
