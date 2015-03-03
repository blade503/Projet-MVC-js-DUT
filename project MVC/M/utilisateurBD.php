<?php

function verifConnexion($mail, $mdp) {
	include('modele/configSQL.php');
	$select = "select * from USER where mail = '%s' and mdp = '%s'";
	$req = sprintf($select, $mail, $mdp);
	$res = mysqli_query ($link,$req)
		or die ("erreur de requête : " . $req);
	
	if (mysqli_num_rows($res) == 0) {
		mysqli_close($link);
		return false;
	}
	
	return true;
}

function selectId($mail) {
	include('modele/configSQL.php');
	$select = "select idUser from USER where mail = '%s'";
	$req = sprintf($select, $mail);
	
	$res = mysqli_query($link, $req)	
		or die (htmlentities("erreur de requête : ") . $req); 
	
	$id = mysqli_fetch_assoc($res);
	return $id["idUser"];
}

function inscrire($pseudo, $mail, $mdp) {
	include('modele/configSQL.php');
	
	$iUsr = "insert into USER (mail, mdp) values ('" . $mail . "', '" . $mdp . "')";
	mysqli_query($link, $iUsr)	
		or die (htmlentities("erreur de requête : ") . $iUsr);
	
	$id = selectId($mail);
	
	$iPat = "insert into PATIENT (idPat, pseudo) values ('" . $id . "', '" . $pseudo . "')";
	mysqli_query($link, $iPat)	
		or die (htmlentities("erreur de requête : ") . $iPat);
	
	//$req = sprintf($select, $pseudo, $mail, $mdp);
}

function mailUtilise($mail) {
	include('modele/configSQL.php');
	$select = "select * from USER where mail = '%s'";
	$req = sprintf($select, $mail);
	
	$res = mysqli_query($link, $req)	
		or die (htmlentities("erreur de requête : ") . $req);
		
	return mysql_num_rows($res) > 0;
}

function profilUser($id) {
	include('modele/configSQL.php');
	$query = "SELECT * FROM USER WHERE idUser = '%s' ";
	$req = sprintf($query, $id);

	$res = mysqli_query($link, $req)	
		or die (htmlentities("erreur de requête : ") . $req);
	return $res;
}

function profilPatient($id) {
	include('modele/configSQL.php');
	$query = "SELECT * FROM PATIENT WHERE idPat = '%s' ";
	$req = sprintf($query, $id);

	$res = mysqli_query($link, $req)	
		or die (htmlentities("erreur de requête : ") . $req);
	return $res;
}

function	editprofil($id, $pseudo, $mail, $mdp, $age, $taille, $poids, $sexe, $autre){
	include('modele/configSQL.php');
	$query = "UPDATE PATIENT SET pseudo = '%s' AND age = '%s' AND taille = '%s' AND poids = '%s' AND sexe = '%s' AND autre = '%s' WHERE idPat = '%s' ";
	$req = sprintf($query, $pseudo, $age, $taille, $poids, $sexe, $autre, $id);
	mysqli_query($link, $req)	
		or die (htmlentities("erreur de requête : ") . $req);
	$query = "UPDATE USER SET mail = '%s' AND mdp = '%s' AND pseudo = '%s' WHERE idUser = '%s' ";
	$req = sprintf($query, $mail, $mdp, $id);
	mysqli_query($link, $req)	
		or die (htmlentities("erreur de requête : ") . $req);
	}
?>