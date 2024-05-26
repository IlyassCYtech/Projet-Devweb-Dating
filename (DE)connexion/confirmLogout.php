<?php
    session_start();
    

    if (!isset($_SESSION["connecte"]) || $_SESSION["connecte"] !== true) {
        header("HTTP/1.1 403 Forbidden");
        exit();
    }

    session_destroy();
?>
