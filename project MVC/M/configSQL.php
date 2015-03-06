<?php

//à l'iut
$hote="localhost";   		
$login="jolliet";  		
$pass="CoursDescartes"; 			
$bd="pweb_gr04_jolliet"; 

$link = mysqli_connect($hote, $login, $pass) 
		or die ("erreur de connexion :" . mysql_error()); 
mysqli_select_db($link, $bd) 
		or die (htmlentities("erreur d'accès à la base :") . $bd);

?>