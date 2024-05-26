<?php
session_start();
if (!isset($_SESSION["connecte"]) || $_SESSION["connecte"] !== true) {
    header("Location:../index.html");
    exit();
}
// Chemin du répertoire où seront stockés les fichiers de message
$directory = '../database/messagerie.txt';

// Vérifie si le contact a été spécifié dans la requête GET
if (isset($_GET['contact'])) {
    $contactemail = $_GET['contact'];
    $userEmail = $_SESSION["adressemail"];
    error_log("currentcontact : " . $_GET['contact']);
}   

  



$file = $directory;


// Vérifie si le formulaire a été soumis via la méthode POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Log pour vérifier si le formulaire POST est détecté
    error_log("[Messagerie PHP] Formulaire POST détecté.");

    // Vérifie si le champ de message existe et n'est pas vide
    if (isset($_POST["message"]) && !empty($_POST["message"]) && !empty($_POST["contact"])) {
        // Log pour vérifier si le champ de message est récupéré avec succès
        error_log("[Messagerie PHP] Message reçu via POST : " . $_POST["message"]);

        // Récupère le message envoyé depuis le formulaire
        $message = $_POST["message"];
        $contactemail = $_POST["contact"];


        // Chemin complet du fichier où le message sera enregistré
        $file = $directory;

        // Ouvre le fichier en mode d'ajout
        $handle = fopen($file, 'a');
        $heure = date("d/m H:i:s");

          // Concaténer l'heure avec le reste de la ligne
        $ligne = $heure . ";" . $_SESSION["adressemail"] . ";" . $contactemail . ";" . $message;


        // Écriture du message dans le fichier
        fwrite($handle, $ligne . PHP_EOL);
        
        // Ferme le fichier
        fclose($handle);

        // Réponse JSON indiquant que le message a été envoyé avec succès
        echo json_encode(array('success' => true));


        // Log pour vérifier que le message a été enregistré avec succès
        error_log("[Messagerie PHP] Message enregistré avec succès : " . $message);
    } else {
        // Si le champ de message est vide, renvoie une réponse d'erreur JSON
        echo json_encode(array('success' => false));

        // Log pour signaler que le champ de message est vide
        error_log("[Messagerie PHP] Aucun message reçu via POST.");
    }
}




else{
$file = $directory;

    // Vérifie si le fichier de messages existe
    if ($file !== false) {
        // Lit le contenu du fichier
        $messages = file($file, FILE_IGNORE_NEW_LINES); // Lit le fichier et stocke chaque ligne dans un tableau

        // Renvoie les messages en format JSON
        echo json_encode(array('success' => true, 'messages' => $messages));

        // Log pour vérifier que les messages sont récupérés avec succès
        error_log("[Messagerie PHP] Messages récupérés avec succès");
    } else {
        // Si le fichier n'existe pas, renvoie une réponse d'erreur JSON
        echo json_encode(array('success' => false, 'message' => 'Aucun message trouvé.'));

        // Log pour signaler qu'aucun fichier de message n'a été trouvé
        error_log("[Messagerie PHP] Aucun fichier de message trouvé pour le contact : " . $contactemail);
    }
}
?>
