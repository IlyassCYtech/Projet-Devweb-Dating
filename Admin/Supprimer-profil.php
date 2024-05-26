<?php

// Vérifie si l'adresse e-mail de l'utilisateur à supprimer est passée en paramètre GET
if(isset($_GET['email'])) {
    // Récupère l'adresse e-mail de l'utilisateur à supprimer
    $emailToDelete = $_GET['email'];
    
    // Lit le contenu du fichier userList.txt
    $file = file("../database/userList.txt");
    
    // Ouvre le fichier en mode écriture
    $fileHandle = fopen("../database/userList.txt", "w");


    $profileFile = "../database/profil/$emailToDelete";

    // Supprime le fichier de profil s'il existe
    if(file_exists($profileFile)) {
        unlink($profileFile);
    }

    
    // Parcourt chaque ligne du fichier
    foreach ($file as $line) {
        // Vérifie si la ligne contient l'adresse e-mail à supprimer
        if(strpos($line, $emailToDelete) === false) {
            // Écrit la ligne dans le fichier si elle ne contient pas l'adresse e-mail à supprimer
            fwrite($fileHandle, $line);
        }
    }
    
    // Ferme le fichier
    fclose($fileHandle);
    
    // Retourne une réponse JSON
    echo json_encode(['success' => true]);
    exit;
} else {
    // Retourne une réponse JSON en cas d'erreur
    echo json_encode(['error' => 'Email not provided']);
    exit;
}
?>
