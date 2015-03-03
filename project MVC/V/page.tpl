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
		<!-- <style>  #f1 {display:none;border:1px green solid;width:4em; height:7em;}   </style>
		-->
</head>
<body>
	<header>
		<div id="connect">
			<button id="ouvrir">Inscription</button>
			<button id="ouvrirConn">Connexion</button>			
		</div> <!-- fin connect-->
	</header> <!-- fin header -->
	
	<div id="dialog1" class="dialog" title="Create new user">
		<p class="validateTips">All form fields are required.</p>
		<form class="dialogueContent" id="f1">
			<fieldset>
				<label for="name">Name</label>
				<input type="text" name="name" id="name" value="Jane Smith" class="text ui-widget-content ui-corner-all"></br></br>
				<label for="password">Password</label>
				<input type="password" name="pass" id="password" value="xxxxxxx" class="text ui-widget-content ui-corner-all"></br>
				<label for="passwordConfirm">Password</label>
				<input type="password" name="passConfirm" id="passwordConfirm" value="xxxxxxx" class="text ui-widget-content ui-corner-all"></br></br>
				<!-- Allow form submission with keyboard without duplicating the dialog button -->
				<input type="submit" tabindex="-1" style="position:absolute; top:-1000px">
			</fieldset>
		</form>
	</div>
	<div id="dialog2" class="dialog" title="Connexion">
		<p class="validateTips">APlease enter your id.</p>
		<form class="dialogueContent" id="f2">
			<fieldset>
				<label for="login">login </label>
				<input name="login" value="<?php echo $login ?>" /> <br/>
				<label for="pass">pass</label>
				<input type="password" name="pass" id="password" value="xxxxxxx" class="text ui-widget-content ui-corner-all"></br></br>
				<input type="submit" tabindex="-1" style="position:absolute; top:-1000px" value="connecter" />
			</fieldset> 
		</form>
	</div>
	
</body>
</html>
