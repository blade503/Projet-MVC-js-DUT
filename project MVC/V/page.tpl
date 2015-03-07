<?php
 session_start();
?>

<!doctype html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
	<title>Jex</title>
	<link rel="icon" type="image/png" href="V/images/icon.png" />
	<link rel="stylesheet" type="text/css" href="V/css/connect.css" />
	<link rel="stylesheet" type="text/css" href="V/css/jquery-ui.css" /> 
	
	<script type="text/javascript" src="V/js/jquery.js"></script>
	<script type="text/javascript" src="http://code.jquery.com/jquery-1.10.2.js"></script>
	<script type="text/javascript" src="http://code.jquery.com/ui/1.11.3/jquery-ui.js"></script>
	<link href="V/css/bootstrap.min.css" rel="stylesheet">

	<script type="text/javascript" src="V/js/connect.js"></script>
</head>
<body>

<nav class="navbar navbar-inverse navbar-fixed-top">
	<div class="container">
		<div class="navbar-header">
			<a class="navbar-brand" href="#">Bootstrap theme</a>
		</div>
		<div id="navbar" class="">
			<ul class="nav navbar-nav">
				<li class="active">
					<a href="#">Home</a>
				</li>
				<li>
					<a href="#about">About</a>
				</li>
				<li>
					<a href="#contact">Contact</a>
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




	
	<div id="dialog1" class="dialog" title="Inscription">
		<form class="dialogueContent" id="f1" method="POST">
			<fieldset>
				<label for="name">Nom</label>
				<input type="text" name="name" id="name" value="" class="text ui-widget-content ui-corner-all"></br>
				<label for="password">Mail</label>
				<input type="text" name="mail" id="mail" value="" class="text ui-widget-content ui-corner-all"></br>
				<label for="password">Password</label>
				<input type="password" name="password" id="password" value="" class="text ui-widget-content ui-corner-all"></br>
				<label for="passwordConfirm">Password</label>
				<input type="password" name="confMdp" id="confMdp" value="" class="text ui-widget-content ui-corner-all"></br></br>
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
				<input type="password" name="passwordCo" id="passwordCo" value="" class="text ui-widget-content ui-corner-all"></br></br>
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
