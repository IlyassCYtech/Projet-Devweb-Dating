<?php
// Vérifie si l'adresse e-mail à unban est passée en paramètre GET
if (isset($_GET['email'])) {
    // Récupère l'adresse e-mail à unban
    $emailToUnban = $_GET['email'];
    
    // Chemin d'accès au fichier de bannissement
    $banFile = "../database/ban.txt";

    // Vérifie si le fichier de bannissement existe
    if (file_exists($banFile)) {
        // Lit le contenu du fichier de bannissement
        $banData = file($banFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

        // Ouvre le fichier en mode écriture
        $file = fopen($banFile, "w");

        // Parcourt chaque ligne du fichier
        foreach ($banData as $line) {
            // Vérifie si la ligne contient l'adresse e-mail à supprimer
            if (strpos($line, $emailToUnban) === false) {
                // Écrit la ligne dans le fichier si elle ne contient pas l'adresse e-mail à supprimer
                fwrite($file, $line . PHP_EOL);
            }
        }

        // Ferme le fichier
        fclose($file);

        // Retourne une réponse JSON
        echo json_encode(['success' => true]);
        exit;
    } else {
        // Retourne une réponse JSON en cas d'erreur
        echo json_encode(['error' => 'Fichier de bannissement introuvable']);
        exit;
    }
} else {
    // Retourne une réponse JSON en cas d'erreur
    echo json_encode(['error' => 'Adresse e-mail non fournie']);
    exit;
}
?>
