<?php
session_start();
// Chemin du répertoire où seront stockés les fichiers de message
$directory = '../database/contact.txt';

$adresseMail = $_SESSION["adressemail"];








function trouverContenuParEmail($adressemail) {
    $cheminFichierContact = '../database/contact.txt';
    $resultats = [];

    // Ouvrir le fichier de contact en lecture seule
    if ($handle = fopen($cheminFichierContact, 'r')) {
        while (($ligne = fgets($handle)) !== false) {
            if (strpos($ligne, $adressemail . ';') === 0) {
                $parties = explode(';', $ligne, 2);
                if (count($parties) > 1) {
                    // Appeler obtenirDetailsUtilisateur pour chaque contenu trouvé
                    $contenu = trim($parties[1]);
                    $detailsUtilisateur = obtenirDetailsUtilisateur($contenu);
                    if ($detailsUtilisateur) {
                        // Stocker la ligne formatée dans la variable de résultats
                        $resultats[] = $detailsUtilisateur . ';' . $contenu;
                    }
                }
            }
        }
        fclose($handle);
    } else {
        throw new Exception("Impossible d'ouvrir le fichier contact : " . $cheminFichierContact);
    }

    return $resultats;
}

function obtenirDetailsUtilisateur($email) {
    $cheminFichierUser = '../database/userList.txt';

    // Ouvrir le fichier utilisateur en lecture seule
    if ($handle = fopen($cheminFichierUser, 'r')) {
        while (($ligne = fgets($handle)) !== false) {
            $donnees = explode(',', $ligne);
            if (count($donnees) >= 9 && trim($donnees[3]) == $email) {
                // Formater et retourner les détails requis (pseudo, date de naissance)
                return trim($donnees[0]) . ';' . trim($donnees[5]);
            }
        }
        fclose($handle);
    } else {
        throw new Exception("Impossible d'ouvrir le fichier utilisateur : " . $cheminFichierUser);
    }

    return null; // Retourner null si aucun utilisateur n'est trouvé
}





























$file = $directory;


$message = trouverContenuParEmail($adresseEmail);




        // Réponse JSON indiquant que le message a été envoyé avec succès
        echo json_encode(array('success' => true, 'message' => 'Message envoyé avec succès !'));

        // Log pour vérifier que le message a été enregistré avec succès
        error_log("[Messagerie PHP] Message enregistré avec succès : " . $message);
     
    


?>
