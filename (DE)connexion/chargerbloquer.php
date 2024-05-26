<?php
session_start();

if (!isset($_SESSION["connecte"]) || $_SESSION["connecte"] !== true) {
    header("HTTP/1.1 403 Forbidden");
    exit();
}

//récupérer les pseudos des utilisateurs
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
//récupère les contacts bloqué pour permettre de les afficher
function getBlockedContacts($filename) {
    $contacts = [];

    if (file_exists($filename)) {
        $file = fopen($filename, "r");

        if ($file) {
            while (($line = fgets($file)) !== false) {
                $line = trim($line);
                if (strpos($line, $_SESSION['adressemail'] . "!") === 0) {
                    list($userEmail, $blockedEmail) = explode("!", $line);
                        $profileImagePath = "../database/profil/" . $blockedEmail;
                    if (file_exists($profileImagePath)) {
                        error_log("Image de profil trouvée pour : " . $blockedEmail); // Message de débogage
                        $pseudo = getPseudoForEmail($blockedEmail);
                        $contacts[] = array(
                            "email" => $blockedEmail,
                            "profileImage" => $profileImagePath,
                            "pseudo" => $pseudo
                        );
                }}
            }
            fclose($file);
        }
    }
    return $contacts;
}

$contacts = getBlockedContacts("../database/contact.txt");

if (empty($contacts)) {
    // S'assurer que la réponse contient au moins un tableau vide
    $contacts = [];
}

header('Content-Type: application/json');
echo json_encode($contacts);
?>
