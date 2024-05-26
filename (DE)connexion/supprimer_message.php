<?php
// Chemin vers le fichier de messagerie
session_start();

if (!isset($_SESSION["connecte"]) || $_SESSION["connecte"] !== true) {
    header("HTTP/1.1 403 Forbidden");
    exit();
}

$fichierMessagerie = "../database/messagerie.txt";

// Fonction pour supprimer un message en fonction de son ID
function supprimerMessage($idMessage) {
    global $fichierMessagerie;
    global $element;

    // Lire le contenu du fichier dans un tableau
    $lines = file($fichierMessagerie);

    // Parcourir chaque ligne pour trouver et supprimer le message
    foreach ($lines as $key => $line) {
        // Rechercher l'ID du message dans la ligne
        if (strpos($line, "$idMessage;$element") !== false) {
            // Supprimer la ligne du tableau
            unset($lines[$key]);
            // Réécrire le contenu du fichier sans la ligne supprimée
            file_put_contents($fichierMessagerie, implode("", $lines));
            // Message supprimé avec succès
            return json_encode(array("success" => true));
        }
    }

    // Si le message n'est pas trouvé
    return json_encode(array("success" => false, "message" => "Message non trouvé."));
}

// Vérifier si l'ID du message est présent dans la requête GET
if(isset($_GET['id'])) {
    $idMessage = $_GET['id'];
    echo supprimerMessage($idMessage);
} else {
    // Si l'ID du message n'est pas fourni dans la requête
    echo json_encode(array("success" => false, "message" => "ID du message non spécifié."));
}
?>
