<?php     
    header("Content-Type: application/json"); 
    
    $emails = json_decode(stripslashes(file_get_contents("php://input")),true);
    $recepteur = $_POST["recepteur"];
    $emeteur = $_POST["emeteur"];

    $PATH = "../../database/historiqueRecherche.txt";
    if(!file_exists($PATH)){echo("PATH pour le historique de recherche non trouvé");}
    else 
    {
        $fhistoriqueRecherche = fopen("$PATH","a");
        fwrite($fhistoriqueRecherche, "$recepteur;$emeteur;".date("d-m-Y").PHP_EOL);
        fclose($fhistoriqueRecherche);
    }
?>