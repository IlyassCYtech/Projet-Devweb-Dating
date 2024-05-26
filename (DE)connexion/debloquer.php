<?php
session_start();


if (!isset($_SESSION["connecte"]) || $_SESSION["connecte"] !== true) {
    header("HTTP/1.1 403 Forbidden");
    exit();
}
if (!isset($_SESSION['adressemail'])) {
    echo json_encode(["success" => false, "message" => "Utilisateur non connecté"]);
    exit();
}

$email = $_SESSION['adressemail'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $blockedEmail = $_POST['blockedEmail'];
    $blockedFile = '../database/contact.txt';

    if (!file_exists($blockedFile)) {
        echo json_encode(["success" => false, "message" => "Fichier des contacts bloqués introuvable"]);
        exit();
    }

    // Lecture de toutes les lignes du fichier
    $lines = file($blockedFile, FILE_IGNORE_NEW_LINES);
    $found = false;

    // Parcours de chaque ligne
    foreach ($lines as &$line) {
        // Vérification si la ligne contient l'email à débannir
        if (strpos($line, $email . '!' . $blockedEmail) !== false) {
            $line = $email . ';' . $blockedEmail;
            $found = true;
            break;
        }
    }

    // Si l'email à débannir a été trouvé et mis à jour
    if ($found) {
        // Écriture de toutes les lignes mises à jour dans le fichier
        file_put_contents($blockedFile, implode("\n", $lines));
        echo json_encode(["success" => true, "message" => "Utilisateur débanni avec succès"]);
        // Ajout d'un log pour indiquer que l'utilisateur a été débanni avec succès
        error_log('Utilisateur débanni avec succès : ' . $email . ' -> ' . $blockedEmail);
    } else {
        echo json_encode(["success" => false, "message" => "Contact bloqué non trouvé"]);
        // Ajout d'un log pour indiquer que le contact bloqué n'a pas été trouvé
        error_log('Contact bloqué non trouvé : ' . $email . ' -> ' . $blockedEmail);
    }
} else {
    echo json_encode(["success" => false, "message" => "Requête invalide"]);
    // Ajout d'un log pour indiquer une requête invalide
    error_log('Requête invalide');
}
?>
