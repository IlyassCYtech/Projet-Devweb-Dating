<?php
session_start();


if (!isset($_SESSION["connecte"]) || $_SESSION["connecte"] !== true) {
    header("HTTP/1.1 403 Forbidden");
    exit();
}


if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['userType'])) {
    $userType = $_POST['userType'];
    $userEmail = $_SESSION['adressemail']; // Email de l'utilisateur connecté

    $filePath = '../database/userList.txt';
    $updatedContent = '';

    if (file_exists($filePath)) {
        $lines = file($filePath, FILE_IGNORE_NEW_LINES);
        foreach ($lines as $line) {
            $data = explode(',', $line);
            if ($data[3] == $userEmail) {
                $data[12] = $userType; // Met à jour le type d'utilisateur à la 13ème position (index 12)
                $line = implode(',', $data);
                // Met à jour la session avec le nouveau type d'utilisateur
                $_SESSION['typedutilisateur'] = $userType;
            }
            $updatedContent .= $line . PHP_EOL;
        }
        file_put_contents($filePath, $updatedContent);
        echo 'Success';
    } else {
        echo 'File not found';
    }
} else {
    echo 'Invalid request';
}
?>

