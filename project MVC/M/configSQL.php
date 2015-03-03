<?php

//à l'iut
$hote="localhost";   		
$login="root";  		
$pass="794613axel"; 			
$bd="SCRUM"; 

$link = mysqli_connect($hote, $login, $pass) 
		or die ("erreur de connexion :" . mysql_error()); 
mysqli_select_db($link, $bd) 
		or die (htmlentities("erreur d'accès à la base :") . $bd);

?>