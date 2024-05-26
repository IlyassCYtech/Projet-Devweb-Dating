<?php
session_start();
// Vérifie si les données sont envoyées via POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupère les données JSON envoyées
    $json_data = file_get_contents('php://input');

    // Décodage des données JSON en un tableau associatif
    $values = json_decode($json_data, true);

    // Vérifie si le décodage JSON a réussi
    if ($values === null) {
        // Gérer les erreurs de décodage JSON
        http_response_code(400); // mauvaise requête
        echo json_encode(['error' => 'Erreur lors du décodage des données JSON']);
        exit;
    }

    // Récupère l'email envoyé
    $email = $values['email'];
    if ($email === $_SESSION['adressemail']) {
        $_SESSION["connecte"] = true;
        $_SESSION["pseudo"] = $values['nickname'];
        $_SESSION["motdepasse"] = $values['password'];
        $_SESSION["prenom"] = $values['firstname']; 
        $_SESSION["nomdefamille"] = $values['lastname'];
        $_SESSION["datedenaissance"] = $values['birthdate'];
        $_SESSION["genre"] = $values['gender'];
        $_SESSION["preference"] = $values['preference'];
        $_SESSION["departement"] = $values['localisation'];
        $_SESSION["metier"] = $values['metier'];
        $_SESSION["centreInteret"] = $values['centreintret'];
    }


    // Chemin d'accès au fichier userList.txt
    $userListFile = "../database/userList.txt";

    // Lit le contenu du fichier userList.txt
    $userData = file_get_contents($userListFile);

    // Divise le contenu en lignes
    $lines = explode("\n", $userData);

    // Recherche la ligne avec l'adresse e-mail
    $found = false;
    foreach ($lines as &$line) {
        // Divise la ligne en colonnes
        $data = explode(",", $line);

        // Si l'e-mail correspond, met à jour la ligne
        if ($data[3] == $email) {
            $line = implode(",", [
                $values['nickname'],
                $values['password'],
                $values['firstname'],
                $email,
                $values['lastname'],
                $values['birthdate'],
                $values['gender'],
                $values['preference'],
                $values['localisation'],
                $values['metier'],
                $values['centreintret'],
                $values['dateincription'],
                $values['type']
            ]);
            $found = true;
            break;
        }
    }



    // Si l'e-mail n'a pas été trouvé, affiche un message d'erreur
    if (!$found) {
        http_response_code(404); // pas trouvé
        echo json_encode(['error' => 'Utilisateur non trouvé']);
        exit;
    }

    // Réécrit le contenu dans le fichier userList.txt
    file_put_contents($userListFile, implode("\n", $lines));

    // Log des données envoyées
    error_log("Données enregistrées PHP: " . json_encode($values));

    // Retourne une réponse JSON indiquant le succès de l'enregistrement
    echo json_encode(['success' => true]);
    exit;
} else {
    // Log des données envoyées dans le cas où la méthode n'est pas autorisée
    error_log("Erreur : Méthode non autorisée - Données reçues : " . json_encode($_POST));

    // Retourne une réponse JSON en cas d'erreur
    echo json_encode(['error' => 'Méthode non autorisée']);
    exit;
}
?>
