<?php
session_start();

if (!isset($_SESSION["connecte"]) || $_SESSION["connecte"] !== true) {
    header("HTTP/1.1 403 Forbidden");
    exit();
}
 
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["profilEmail"])) {
    $userEmail = $_SESSION["adressemail"] ?? 'null';
    $profilEmail = $_POST["profilEmail"] ?? 'null';
    $file = "../../database/contact.txt";
    $line = $userEmail . ";" . $profilEmail . PHP_EOL;

    try {
        file_put_contents($file, $line, FILE_APPEND);
    } catch (Exception $e) {
        error_log("Error writing to file: " . $e->getMessage());
        http_response_code(500);
        exit("Error writing to file.");
    }
} else {
    http_response_code(400);
    exit("Invalid request.");
}
?>
