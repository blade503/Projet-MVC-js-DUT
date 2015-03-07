<?php
 session_start();
?>

<!doctype html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
	<title>connexion en jquery</title>
	
	<link rel="stylesheet" type="text/css" href="V/css/connect.css" />
	<link rel="stylesheet" type="text/css" href="V/css/jquery-ui.css" /> 
	
	<script type="text/javascript" src="V/js/jquery.js"></script>
	<script type="text/javascript" src="http://code.jquery.com/jquery-1.10.2.js"></script>
	<script type="text/javascript" src="http://code.jquery.com/ui/1.11.3/jquery-ui.js"></script>
	
	<script type="text/javascript" src="V/js/connect.js"></script>
	<script type="text/javascript" src="V/js/qcm.js"></script>
</head>
<body>
	<header>
		<div id="connect">
			<span id="afficheName">
			<?php
				if(isset($_SESSION['user']))  {
					require ('M/user_bd.php');
					echo 'Bienvenu ' . getNom($_SESSION['user']);
				}
			?>
			</span>
			<span id="boutonsDeco" <?php if( isset($_SESSION['user'])) echo ' style="display:none" ' ?> > 
				<button id="ouvrir">Inscription</button>	
				<button id="ouvrirConn">Connexion</button>	
			</span>
			<span id="boutonsCo" <?php if(! isset($_SESSION['user'])) echo ' style="display:none" ' ?> > 
				<button id="deco">Deconnexion</button>
			</span>

		</div>
	</header> 
	
	<div id="dialog1" class="dialog" title="Inscription">
		<form class="dialogueContent" id="f1">
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
		<form class="dialogueContent" id="f2">
			<fieldset>
				<label for="login">Nom </label>
				<input name="nameCon" id="nameCon" value="" /> <br/>
				<label for="pass">Password</label>
				<input type="password" name="passwordCo" id="passwordCo" value="" class="text ui-widget-content ui-corner-all"></br></br>
				<input type="submit" tabindex="-1" style="position:absolute; top:-1000px" value="connecter" />
			</fieldset> 
		</form>
	</div>
	
</body>
</html>
