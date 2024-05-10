<?php
// Vérifie si l'adresse e-mail et le motif de bannissement sont passés en paramètres POST
if(isset($_POST['email']) && isset($_POST['reason'])) {
    // Récupère l'adresse e-mail et le motif de bannissement
    $email = $_POST['email'];
    $reason = $_POST['reason'];

    // Formatte les données à enregistrer dans le fichier
    $banData = "$email;$reason\n";

    // Chemin d'accès au fichier de bannissement
    $banFile = "../database/ban.txt";

    // Ouvre le fichier en mode écriture et ajoute les données
    $banFileHandle = fopen($banFile, "a");
    if ($banFileHandle) {
        fwrite($banFileHandle, $banData);
        fclose($banFileHandle);
        echo "Utilisateur banni avec succès.";
    } else {
        echo "Erreur : Impossible d'ouvrir le fichier de bannissement.";
    }
} else {
    echo "Erreur : Adresse e-mail ou motif de bannissement non fourni.";
}
?>
