<?php
$email = $_POST["email"];
echo $email;
$filePath = "../../database/historiqueRecherche.txt";

// lis fichier dans une array
$historiqueRecherches = file($filePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

$filtreLignes = [];

foreach ($historiqueRecherches as $ligne) {
    $ligneArr = explode(";", $ligne);
   // Vérifier si le mail correspond au premier élément de la ligne
    if (strcmp($email, $ligneArr[0]) !== 0) {
       // Si la ligne ne correspond pas, elle est ajoutée au tableau filteredLines
        $filtreLignes[] = $ligne;
    }
}

// Écrire les lignes filtrées dans le fichier
file_put_contents($filePath, implode(PHP_EOL, $filtreLignes) . PHP_EOL);

?>
