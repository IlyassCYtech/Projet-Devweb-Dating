<?php
// Vérifie si le messageId, utilisateur1, utilisateur2 et reason sont passés en paramètres POST
if(isset($_POST['messageId']) && isset($_POST['utilisateur1']) && isset($_POST['utilisateur2']) && isset($_POST['reason']) && isset($_POST['contenuMessage'])) {
    // Récupère les données
    $messageId = $_POST['messageId'];
    $utilisateur1 = $_POST['utilisateur1'];
    $utilisateur2 = $_POST['utilisateur2'];
    $reason = $_POST['reason'];
    $contenuMessage = $_POST['contenuMessage'];

    // Formatte les données à rechercher dans le fichier
    $banDataToSearch = "$messageId;$utilisateur1;$utilisateur2;$reason;$contenuMessage";

    // Chemin d'accès au fichier de signalement
    $banFile = "../database/signalement-message.txt";

    // Vérifie si la ligne existe déjà dans le fichier
    if(file_exists($banFile) && strpos(file_get_contents($banFile), $banDataToSearch) !== false) {
        echo "Cette entrée existe déjà dans le fichier.";
    } else {
        // Formatte les données à enregistrer dans le fichier
        $banData = "$messageId;$utilisateur1;$utilisateur2;$reason;$contenuMessage\n";

        // Ouvre le fichier en mode écriture et ajoute les données
        $banFileHandle = fopen($banFile, "a");
        if ($banFileHandle) {
            fwrite($banFileHandle, $banData);
            fclose($banFileHandle);
            echo "Utilisateur banni avec succès.";
        } else {
            echo "Erreur : Impossible d'ouvrir le fichier de signalement.";
        }
    }
} else {
    echo "Erreur : Certains paramètres ne sont pas fournis.";
}
?>
