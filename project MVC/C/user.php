
<?php
function page () {
	$login = "tapez votre login";
	$pass = "tapez votre pass";
	$echoLogin="";  /*pour initialiser à "" la zone d'affichage du login connecté*/
	
	require ('V/page.tpl'); /*affichage de la page du site*/
}

function connect () {
	session_start();
	if (count($_POST) == 0) {
		echo "Aucunes valeurs";
	} else {
		require ('M/user_bd.php');

		$name =($_POST['nameCon']);
		$mdp =($_POST['passwordCo']);

		if(!verifConnexion($name,$mdp))
			echo "Utilisateur non reconnu";
		else {
			$_SESSION['user'] = selectId($name);
			echo "connexion ok";
		}
	}
}

function inscription () {
	session_start();
	if (count($_POST) == 0) {
		echo "Aucunes valeurs";
	} else {
		$err = "";
		$i = true;

		require ('M/user_bd.php');
		$name = $_POST['name'];
		$mail = $_POST['mail'];
		$mdp = $_POST['mdp'];
		$confMdp = $_POST['confMdp'];
		
		if($i && nameUtilise($name)) {
			echo "Le nom spécifié est déjà utilisé !";
			$i = false;
		}

		if($i && mailUtilise($mail)) {
			echo "Le mail spécifié est déjà utilisé !";
			$i = false;
		}

		if($i && $mdp != $confMdp) {
			echo "Les mots de passe ne correspondent pas !";
			$i = false;
		}	

		if($i) {
			if(inscrire($name, $mail, $mdp)) {
				$_SESSION['user'] = selectId($name);
				echo "Votre inscription a été prise en compte";
			}
			else {
				echo "Probleme dans l'inscription";
			}
		} else {
			echo $err;
		}
	}
}

function deconnexion () {
	session_start();
	$_SESSION['user'] = null;
	echo 'Vous avez été déconnecté';
}

?>