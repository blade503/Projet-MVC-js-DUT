<?php

include("modele/utilisateur/utilisateurBD.php");

if (count($_POST) == 0)
	include("vue/utilisateur/connexion.tpl");
else {
	$mail =($_POST['mail']);
	$mdp =($_POST['mdp']);
	if(!verifConnexion($mail,$mdp))
		include("vue/utilisateur/connexion.tpl");
	else {
		$_SESSION['user'] = selectId($mail);
		header("location:index.php");
	}
}

?>