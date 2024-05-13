<?php
session_start();
error_log("Début du script get_contacts.php"); // Message de débogage
$adresseMail = $_SESSION["adressemail"];
error_log("Adresse email récupérée : " . $adresseMail); // Message de débogage
$filePath = "../database/contact.txt";
error_log("Chemin du fichier : " . $filePath); // Message de débogage

if (isset($_GET['mail'])) {
    $adresseMail = $_GET['mail'];

} 


if (file_exists($filePath)) {
    error_log("Le fichier existe"); // Message de débogage
    $contacts = array();
    $lines = file($filePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    $processedPairs = array(); // Tableau pour stocker les paires d'adresses email déjà traitées
    foreach ($lines as $line) {
        $data = explode(";", $line);
        $email1 = trim($data[0]);
        $email2 = trim($data[1]);
        // Vérifier si l'adresse email de session est associée à une autre adresse email dans une ligne
        if (($email1 === $adresseMail || $email2 === $adresseMail) && !in_array("$email1;$email2", $processedPairs) && !in_array("$email2;$email1", $processedPairs)) {
            // Vérifier si cette paire existe dans une autre ligne dans n'importe quel ordre
            $pairExists = false;
            foreach ($lines as $line2) {
                $data2 = explode(";", $line2);
                $email3 = trim($data2[0]);
                $email4 = trim($data2[1]);
                if ((($email3 === $email1 && $email4 === $email2) || ($email3 === $email2 && $email4 === $email1)) && ($email1 !== $email3 || $email2 !== $email4)) {
                    $pairExists = true;
                    break;
                }
            }
            if ($pairExists) {
                $contactEmail = ($email1 === $adresseMail) ? $email2 : $email1;
                $profileImagePath = "../database/profil/" . $contactEmail; // Assuming profile images are JPEG files
                if (file_exists($profileImagePath)) {
                    error_log("Image de profil trouvée pour : " . $contactEmail); // Message de débogage
                    $contacts[] = array(
                        "email" => $contactEmail,
                        "profileImage" => $profileImagePath
                    );
                } else {
                    error_log("Image de profil non trouvée pour : " . $contactEmail); // Message de débogage
                }
                // Ajouter la paire traitée au tableau
                $processedPairs[] = "$email1;$email2";
            }
        }
    }
    error_log("Contacts récupérés : " . json_encode($contacts)); // Message de débogage
    error_log("Renvoi des contacts au format JSON"); // Message de débogage
    echo json_encode($contacts);
} else {
    error_log("Le fichier n'existe pas"); // Message de débogage
    echo json_encode(array());
}
?>
