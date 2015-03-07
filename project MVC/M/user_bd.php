<?php



function inscrire($name, $mail, $mdp) {
	include('M/configSQL.php');
	$iUsr = "insert into USER (nom, mail, mdp, score) values ('" . $name . "', '" . $mail . "', '" . $mdp . "', 20)";
	return mysqli_query($link, $iUsr);
}

function mailUtilise($mail) {
	include('M/configSQL.php');
	$select = "select * from USER where mail = '%s'";
	$req = sprintf($select, $mail);
	
	$res = mysqli_query($link, $req);
		
	return mysqli_num_rows($res) > 0;
}

function NameUtilise($name) {
	include('M/configSQL.php');
	$select = "select * from USER where nom = '%s'";
	$req = sprintf($select, $name);
	
	$res = mysqli_query($link, $req);
		
	return mysqli_num_rows($res) > 0;
}

function verifConnexion($name, $mdp) {
	include('M/configSQL.php');
	$select = "select * from USER where nom = '%s' and mdp = '%s'";
	$req = sprintf($select, $name, $mdp);
	$res = mysqli_query ($link,$req);
	
	return mysqli_num_rows($res) == 1;
}

function selectId($name) {
	include('M/configSQL.php');
	$select = "select id from USER where nom = '%s'";
	$req = sprintf($select, $name);
	
	$res = mysqli_query($link, $req);
	
	$id = mysqli_fetch_assoc($res);
	return $id["id"];
}

function getNom($id) {
	include('M/configSQL.php');
	$select = "select nom from USER where id = '%s'";
	$req = sprintf($select, $id);
	
	$res = mysqli_query($link, $req);
	
	$id = mysqli_fetch_assoc($res);
	return $id["nom"];
}

function getClassement(){
	include('M/configSQL.php');
	$select = "SELECT * FROM user ORDER BY score DESC";
	$res =  mysqli_query($link, $select);
	return $res;
}

function addPoint($id){
	include('M/configSQL.php');
	$query = "UPDATE user SET score = score +1 WHERE id = '%s'";
	$req = sprintf($query, $id);
	return mysqli_query($link, $req);
}
function removePoint($id){
	include('M/configSQL.php');
	$query = "UPDATE user SET score = score -1 WHERE id = '%s'";
	$req = sprintf($query, $id);
	return mysqli_query($link, $req);
}


?>