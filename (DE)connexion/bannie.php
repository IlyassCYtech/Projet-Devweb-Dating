<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Demande de débannissement</title>
    <link rel="stylesheet" type="text/css" href="../css/banni.css">
</head>
<body>
    <div class="header">
        <img src="../img/logo.png" alt="Logo du site">
        <h1>Vous avez été banni !</h1>
    </div>
    <p>Bravo vous avez été banni : Vous savez déjà pourquoi donc ne jouez pas l'innocent.</p>
    <p id="countdown">Redirection dans 10 secondes...</p>
    
    <script>
        // Compte à rebours en JavaScript
        var seconds = 10;
        var countdown = setInterval(function() {
            document.getElementById("countdown").innerHTML = "Redirection dans " + seconds + " secondes...";
            seconds--;
            if (seconds < 0) {
                clearInterval(countdown);
                // Redirection après le compte à rebours
                window.location.href = "../index.html";
            }
        }, 1000);
    </script>
</body>
</html>
