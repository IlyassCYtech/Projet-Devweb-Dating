<?php
// Récupérer les données du panier depuis la requête POST
$panier = isset($_POST['panier']) ? $_POST['panier'] : '';

// Chemin vers le fichier contact.txt
$fichierContact = 'contact.txt';

// Écrire les données du panier dans le fichier contact.txt
file_put_contents($fichierContact, $panier);

// Répondre à la requête avec un message de succès ou d'échec
if ($panier !== false) {
    echo 'Le panier a été enregistré avec succès dans ' . $fichierContact;
} else {
    echo 'Erreur lors de l\'enregistrement du panier.';
}
?>
