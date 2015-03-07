<?php
 session_start();
?>

<!doctype html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
	<title>Jex</title>
	<link rel="icon" type="image/png" href="V/images/icon.png" />

	<link rel="stylesheet" type="text/css" href="V/css/jquery-ui.css" /> 


	<script type="text/javascript" src="V/js/jquery.js"></script>
	<script type="text/javascript" src="http://code.jquery.com/jquery-1.10.2.js"></script>
	<script type="text/javascript" src="http://code.jquery.com/ui/1.11.3/jquery-ui.js"></script>
	<link href="V/css/bootstrap.min.css" rel="stylesheet">
	
	<script src="http://cdn.leafletjs.com/leaflet-0.7.1/leaflet.js"></script>
	<link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.7.1/leaflet.css" />

	<link rel="stylesheet" type="text/css" href="V/css/navigation.css" />
	<link rel="stylesheet" type="text/css" href="V/css/connect.css" />
	
	<script type="text/javascript" src="V/js/navigation.js"></script>
	<script type="text/javascript" src="V/js/connect.js"></script>
	<script type="text/javascript" src="V/js/mapJS.js"></script>
	
	<style>
		#map { height: 600px}
		#droppable { width: 100; height: 150px; padding: 0.5em; float: left; margin: 10px; 
		.ui-widget-content { width: 130px; height: 100px; padding: 0.5em; float: left; margin: 10px 10px 10px 0; background-color: #ccffcc;}
	</style>
</head>
<body>

<nav class="navbar navbar-inverse">
	<div class="container">
		<div id="jex" class="navbar-header activeHead item">
			<a class="navbar-brand" href="#">Jex</a>
		</div>
		<div id="navbar" class="">
			<ul class="nav navbar-nav">
				<?php if( isset($_SESSION['user'])) { ?>
				<li id="profil" class="item ">
					<a  href="#">Profil</a>
				</li>
				<?php } ?>
				<li id="classement" class="item ">
					<a href="#">Classement</a>
				</li>
				<li id="regles" class="item ">
					<a id="regles" href="#">Règles</a>
				</li>
			</ul>
			<ul id="boutons" class="nav navbar-nav navbar-right">
				<?php if( ! isset($_SESSION['user'])) { ?>
					<li><button id="ouvrir" type="button" class="btn btn-cdefault navbar-btn">Inscription</button></li>
					<li><button id="ouvrirConn" type="button" class="btn btn-default navbar-btn">Connexion</button></li>
				<?php } else { ?>
					<li>
			        	<p id="afficheName" class="navbar-text">
			        	<?php
								include ('M/user_bd.php');
								echo 'Bienvenu ' . getNom($_SESSION['user']) .' !';
						?>
						</p>
					</li>
					<li><button class="btn btn-default navbar-btn" id="deco">Deconnexion</button></li>
				<?php } ?>
			
			</ul>
		</div>
	</div>
</nav>


	<div class="container" id="page">
			<div id="map"></div>
		
			<div id="reponse1" class="ui-widget-content">
				<p>France</p>
			</div>
			<div id="reponse2" class="ui-widget-content">
				<p>Canada</p>
			</div>
			<div id="reponse3" class="ui-widget-content">
				<p>Italie</p>
			</div>
			<div id="reponse4" class="ui-widget-content">
				<p>Belgique</p>
			</div>
			<div id="info" class="ui-widget-content">
				<p>Location (Gps)</p>
			</div>
	</div>


	
	<div id="dialog1" class="dialog" title="Inscription">
		<form class="dialogueContent" id="f1" method="POST">
			<fieldset>
				<label for="name">Nom</label>
				<input type="text" name="name" id="name" value="" class="text ui-corner-all"></br>
				<label for="password">Mail</label>
				<input type="text" name="mail" id="mail" value="" class="text ui-corner-all"></br>
				<label for="password">Password</label>
				<input type="password" name="password" id="password" value="" class="text ui-corner-all"></br>
				<label for="passwordConfirm">Password</label>
				<input type="password" name="confMdp" id="confMdp" value="" class="text ui-corner-all"></br></br>
				<!-- Allow form submission with keyboard without duplicating the dialog button -->
				<input type="submit" tabindex="-1" style="position:absolute; top:-1000px">
			</fieldset>
		</form>
	</div>
	<div id="dialog2" class="dialog" title="Connexion">
		<form class="dialogueContent" id="f2" method="POST">
			<fieldset>
				<label for="login">Nom </label>
				<input name="nameCon" id="nameCon" value="" /> <br/>
				<label for="pass">Password</label>
				<input type="password" name="passwordCo" id="passwordCo" value="" class="text ui-corner-all"></br></br>
				<input type="submit" tabindex="-1" style="position:absolute; top:-1000px" value="connecter" />
			</fieldset> 
		</form>
	</div>

	

	  <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>-->
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>
</body>
</html>
