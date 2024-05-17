<?php
session_start();

if (!isset($_SESSION["connecte"]) || $_SESSION["connecte"] !== true) {
    header("HTTP/1.1 403 Forbidden");
    exit();
}

if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["profilEmail"])) {
    $userEmail = isset($_SESSION["adressemail"]) ? $_SESSION["adressemail"] : 'null';
    $profilEmail = isset($_POST["profilEmail"]) ? $_POST["profilEmail"] : 'null';

    $contactFile = "../database/contact.txt";
    $tempFile = tempnam(sys_get_temp_dir(), 'temp_contact');

    $handle = fopen($contactFile, 'r');
    $tempHandle = fopen($tempFile, 'w');

    if ($handle) {
        while (($line = fgets($handle)) !== false) {
            if (trim($line) !== $userEmail . ";" . $profilEmail) {
                fwrite($tempHandle, $line);
            }
        }

        fclose($handle);
        fclose($tempHandle);

        // Replace the original file with the updated temp file
        rename($tempFile, $contactFile);
        echo "Success";
    } else {
        header("HTTP/1.1 500 Internal Server Error");
        exit();
    }
} else {
    header("HTTP/1.1 400 Bad Request");
    exit();
}
?>
