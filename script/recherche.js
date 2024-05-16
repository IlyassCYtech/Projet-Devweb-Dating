function uncheck()
{
    checkBx = document.getElementById("ageChoiceCb");
    checkBx.checked = false;
}
function verif_contenu(pseudo)
{
    if(pseudo == "")
        return 0;

    return 1;
}

function creeAgeInput() 
{
    var checkBox = document.getElementById("ageChoiceCb");
    if(checkBox.checked)
    {
        var inpt = document.createElement("input");
        inpt.setAttribute("type", "number");
        inpt.min = "18";
        inpt.max = "105";
        inpt.value = "18";
        inpt.style.width = "50px";
        inpt.id="age";
        checkBox.parentNode.insertBefore(inpt,checkBox.nextSibling);
    }
    else
    {
        var ageInput = document.getElementById("age");
        if (ageInput) 
        {
            ageInput.parentNode.removeChild(ageInput);
        }
    }


}

function displayResults(results) 
{
    var successResult = (results == "Pseudo non trouve") || (results == "Pseudo dans la tranche d'age non trouve");
    var resultats = document.getElementById("resultats");
    var body = document.getElementsByTagName("body")[0];
    var userArr = [];
    var i = 0;
    resultats.innerHTML = "";
    resultats.style.display = "flex-box";

    if (successResult) 
    {
        alert(results);
    }else 
    {
        alert("Profile found");
        for(var user of results) 
        {
            userArr = user.split(",");
            var newDiv = document.createElement('div');
            newDiv.id = 'resultat' + (i + 1);

            
            newDiv.style.width = "500px";
            newDiv.style.height = "500px";
            newDiv.style.margin = "auto auto 20px ";
            newDiv.style.border = "solid 2px black";
           // newDiv.style.alignContent="center"

            var pdp = document.createElement("IMG");
            var p1 = document.createElement('p');
            pdp.src = "../../database/profil/"+userArr[2];
            pdp.setAttribute("alt","photo de "+userArr[0]);

            pdp.style.width = "250px";
            pdp.style.height = "250px";

            p1.innerHTML = "pseudo: "+userArr[0];
            newDiv.appendChild(p1);
            newDiv.appendChild(pdp);
            //ajouter des autres informations depuis le profil complementaire de l'utilisateur
            resultats.appendChild(newDiv);
            i++;

            
        }
    }
}

//function cree une requete avec jquerry et json
function lancer_recherche(idElement) 
{
    var pseudo = document.getElementById(idElement).value;
    var checkBox = document.getElementById("ageChoiceCb");
    if(checkBox.checked)
    {
        var agepar = document.getElementById("age").value;
    }else
    {
        var agepar = null;
    }
    pseudo = pseudo.toLowerCase();

    if (verif_contenu(pseudo)) 
    {
        var requestData = { pseudo: pseudo, age : agepar }; // Create data object
        $.ajax({
            type: "POST",
            dataType: 'json',
            url: "rechercheprofile.php",
            contentType: "application/json",
            data: JSON.stringify(requestData), // Convert data object to JSON string
            success: function (response) 
            {
                displayResults(response); // Access response data
            }
        });
    } else 
    {
        alert("Remplir les champs correctement");
    }
}
