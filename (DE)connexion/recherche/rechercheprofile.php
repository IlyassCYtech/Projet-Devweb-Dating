<?php

//function parcour tout le fichier userList en cherchant toute occurence du pseudo recherché
function verif_recherche($pseudo)
{
    $userListPath = "../../database/userList.txt";
    $retrouves = [];
    $compteur = 0;

    // Verification du chemin du fichier
    $realPath = realpath($userListPath);
    if (!$realPath || !is_file($realPath))
    {
        die("Path non trouve");
    }

    //Protection de l'input
    $pseudo = htmlspecialchars($pseudo);

    $fuserList = fopen($realPath, "r");
    if ($fuserList) 
    {
        while ($line = fgets($fuserList)) 
        {
            if (str_contains($line, $pseudo)) //il n y a pas d'approximation pour les pseudos, soit user a saisi le bon soit le mauvais
            {
                $utilListe = explode(",", $line);
                $retrouves[$compteur] = $utilListe[0] . "," . $utilListe[2] . "," . $utilListe[3] . "," . $utilListe[4].",".$utilListe[5];
                $compteur++;
            }
        }
        fclose($fuserList);
    } else //verification d'erreur
    {
        die("Impossible d'ouvrir le fichier");
    }

    if (sizeof($retrouves) > 0) //cas où on a des profile(s)
    {
        return $retrouves;
    } else //profile non trouvee
    {
        return 0;
    }
}

function extraireChamps($del, $str,$indice) //transforme une string en array et renvoie lelement a un certain indice
{
    $arr = explode($del,$str);
    return $arr[$indice];
}

function filtre_age($pseudos, $age)
{
    $profilesTrouve = [];
    $age = (int)$age;
    $i = 0 ; 

    foreach($pseudos as $utilisateur)
    {
        
        $niver = extraireChamps(",", $utilisateur, 4); //date daniversaire
        $anneeN = extraireChamps("-",$niver,0); //annee de naissance 
        $ageuser = (int)date('Y') - (int)$anneeN; //age utilisateur
        if($ageuser >= $age-2 && $ageuser <= $age+2) //verifie si $ageuser ∈ [$age-2,$age+2]
        {
            $profilesTrouve[$i] = $utilisateur; 
            $i++;
            
        }
        
    }
   
    if (sizeof($profilesTrouve) > 0) //cas où on a des profile(s)
    {
        return $profilesTrouve;
    } else //profile non trouvee
    {
        return 0;
    }

}




// Get JSON data from request body
$json = file_get_contents('php://input');
$data = json_decode($json, true);
// Access pseudo field

if (isset($data["pseudo"])) 
{
   
    $pseudo = $data["pseudo"];
    $pseudosTrv = verif_recherche($pseudo);

    if($pseudosTrv == 0)
        echo json_encode("Pseudo non trouve");
    else if(isset($data["age"]))
    {
        $trancheAge = $data["age"];
        $response = filtre_age($pseudosTrv,$trancheAge);
        if($response == 0)
        {
            echo json_encode("Pseudo dans la tranche d'age non trouve");
        }
        else
            echo json_encode($response);

    }else
        echo json_encode($pseudosTrv);
} else 
{
    // Handle missing or invalid input
    echo json_encode(["error" => "Pseudo manquant"]);
}
?>
