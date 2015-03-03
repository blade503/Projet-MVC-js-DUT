
<?php
function page () {
	$login = "tapez votre login";
	$pass = "tapez votre pass";
	$echoLogin="";  /*pour initialiser à "" la zone d'affichage du login connecté*/
	
	require ('V/page.tpl'); /*affichage de la page du site*/
}

function connect () {
	/* affichage propre du tableau $_POST :
	echo ("<pre> POST= <br/>");
	print_r ($_POST);
	echo ("</pre><br/>"); die();
	*/
	
	$login = isset($_POST['login'])?$_POST['login']:"tapez votre login";
	$pass = isset($_POST['pass'])?$_POST['pass']:"tapez votre pass";

	require ('M/user_bd.php');
	if (connect_bd()) { 
		echo "connexion ok";
	}
	else {
		echo $echoLogin="erreur, recommencez svp";
	}
	//require ('V/page.tpl');
}

function inscription () {
	/* affichage propre du tableau $_POST :
	echo ("<pre> POST= <br/>");
	print_r ($_POST);
	echo ("</pre><br/>"); die();
	*/

	$login = isset($_POST['name'])?$_POST['name']:"name";
	$pass = isset($_POST['pass'])?$_POST['pass']:"password";
	$passConfirm = isset($_POST['passConfirm'])?$_POST['passConfirm']:"password";

	if(! preg_match("/^[a-z]([0-9a-z_\s])+$/i", $login)) 
		return $error = "Username may consist of a-z, 0-9, underscores, spaces and must begin with a letter.";
	if(! preg_match("/^([0-9a-zA-Z])+$/", $pass)) 
		return $error = "Password field only allow : a-z 0-9";

	require ('M/user_bd.php');
	if (inscr_bd()) { 
		$echoLogin=$login;
		echo "insc ok";
	}
	else {
		echo $error;
	}
	//require ('V/page.tpl');
}

?>