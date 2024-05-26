<?php
$email = $_POST["email"];
echo $email;
$filePath = "../../database/historiqueRecherche.txt";

// lis fichier dans une array
$historiqueRecherches = file($filePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

$filtreLignes = [];

foreach ($historiqueRecherches as $ligne) {
    $ligneArr = explode(";", $ligne);
    // Check if the email matches the first element of the line
    if (strcmp($email, $ligneArr[0]) !== 0) {
        // If it doesn't match, add the line to the filteredLines array
        $filtreLignes[] = $ligne;
    }
}

// Write the filtered lines back to the file
file_put_contents($filePath, implode(PHP_EOL, $filtreLignes) . PHP_EOL);

?>
