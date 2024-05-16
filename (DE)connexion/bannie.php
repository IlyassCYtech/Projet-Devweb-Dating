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
    <p>Bravo vous avez ete bani : Vous savez déjà pourquoi donc ne jouer pas l'innocent </p>
    <form action="/submit_deban_request" method="post">
        <label for="username">Nom d'utilisateur :</label><br>
        <input type="text" id="username" name="username" required><br><br>
        <label for="reason">Raison du bannissement :</label><br>
        <textarea id="reason" name="reason" rows="4" required></textarea><br><br>
        <button type="submit">Envoyer la demande de débannissement</button>
    </form>
</body>
</html>
