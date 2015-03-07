
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
			echo json_encode(array('message' => "Utilisateur non reconnu", 'statut' =>false));
		else {
			$_SESSION['user'] = selectId($name);
			echo json_encode(array('message' => "connexion ok", 'statut' =>true));
		}
	}
}

function inscription () {
	session_start();
	if (count($_POST) == 0) {
		echo json_encode(array('message' => "Aucunes valeurs", 'statut' =>false));
	} else {
		$err = "";
		$i = true;

		require ('M/user_bd.php');
		$name = $_POST['name'];
		$mail = $_POST['mail'];
		$mdp = $_POST['mdp'];
		$confMdp = $_POST['confMdp'];
		
		if($i && nameUtilise($name)) {
			echo json_encode(array('message' => "Le nom spécifié est déjà utilisé !", 'statut' =>false));
			$i = false;
		}

		if($i && mailUtilise($mail)) {
			echo json_encode(array('message' => "Le mail spécifié est déjà utilisé !", 'statut' =>false));
			$i = false;
		}

		if($i && $mdp != $confMdp) {
			echo json_encode(array('message' => 'Les mots de passe ne correspondent pas !', 'statut' =>false ));
			$i = false;
		}	

		if($i) {
			if(inscrire($name, $mail, $mdp)) {
				$_SESSION['user'] = selectId($name);
				echo json_encode(array('message' => 'Votre inscription a été prise en compte', 'statut' =>true));
			}
			else {
				echo json_encode(array('message' => 'Probleme dans l\'inscription', 'statut' =>false));
			}
		} 
	}
}

function deconnexion () {
	session_start();
	$_SESSION['user'] = null;
	echo json_encode(array('message' => 'Vous avez été déconnecté', 'statut' =>true));
}

function classement () {
	session_start();
	require ('M/user_bd.php');
	$result =  getClassement();
	$i = 0;
    $tab = array();

	while ($row = mysqli_fetch_assoc($result)) {
		$tab[$i]['nom'] = $row['nom'];
   		$tab[$i]['score']= $row['score'];
   		$i++;
	}

	echo json_encode(array('data' => $tab, 'statut' =>true));
}
?>