<?php

include("modele/utilisateur/utilisateurBD.php");
//include("vue/utilisateur/inscription.tpl");

// pour faire "marcher", décommenter la ligne précédente et commenter tout le reste

if (count($_POST) == 0) {
	$mail = "";
	$pseudo = "";
	$mdp = "";
	$confMdp = "";
	$err = "";
	include("vue/utilisateur/inscription.tpl");
}

else {
	$err = "";
	$i = true;
	
	if( empty($_POST["pseudo"]) || empty($_POST["mail"]) || empty($_POST["mdp"]) || empty($_POST["confMdp"]) ) {
		$i = false;
		$err = "Merci de remplir tous les champs";
	}
	else {
		$pseudo = $_POST['pseudo'];
		$mail = $_POST['mail'];
		$mdp = $_POST['mdp'];
		$confMdp = $_POST['confMdp'];
		
		if($mdp != $confMdp) {
			$err = "Les mots de passe ne correspondent pas !<br/>";
			$i = false;
		}
		if(mailUtilise($mail)) {
			$err += "Le mail spécifié est déjà utilisé !<br/>";
			$i = false;
		}
	}
	
	// redirection s'il y a au moins une erreur
	if($i == false) {
		// $err = "Yapapile";
		include("vue/utilisateur/inscription.tpl");
	}
	else {
		inscrire($pseudo, $mail, $mdp);
		header("location:index.php");
	}
}

?>