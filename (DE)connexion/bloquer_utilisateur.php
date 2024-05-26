<?php

session_start();

if (!isset($_SESSION["connecte"]) || $_SESSION["connecte"] !== true) {
    header("HTTP/1.1 403 Forbidden");
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $userEmail = $_POST['userEmail'];
    $contactEmail = $_POST['contactEmail'];
    $path = '../database/contact.txt'; 

    $contents = file_get_contents($path);
    $lines = explode("\n", $contents);
    $updatedLines = [];

    foreach ($lines as $line) {
        if (trim($line) == "{$userEmail};{$contactEmail}") {
            $updatedLines[] = "{$userEmail}!{$contactEmail}";
        } else {
            $updatedLines[] = $line;
        }
    }

    file_put_contents($path, implode("\n", $updatedLines));
    echo "Delimiter mis à jour pour {$userEmail};{$contactEmail}";
}
?>
