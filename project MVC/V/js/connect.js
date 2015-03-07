$(
	function() {

		var dialog1 = $( "#dialog1" ).dialog({
			autoOpen: false,
			height: 350,
			width: 450,
			modal: true,
			buttons: {
				"Creation du compte" : addUser,
				"Annuler" : function() {
					dialog1.dialog("close");
				}
			},
			close: function() {
				 $('#f1')[0].reset();
			}
			});

		var dialog2 = $( "#dialog2" ).dialog({
			autoOpen: false,
			height: 350,
			width: 450,
			modal: true,
			buttons: {
				"Connexion" : submit,
				"Annuler": function() {
					dialog2.dialog("close");
				}
			},
			close: function() {
				 $('#f2')[0].reset();
			}
			});

		$("#deco").click(deconnexion);
		$("#ouvrir").click(function() { dialog1.dialog("open"); });
		$("#ouvrirConn").click(function() { dialog2.dialog("open"); });
		$("#f1").submit(addUser);
		$("#f2").submit(submit);
	}
);

function addUser() {
var name = $('#name').val();
var mdp = $('#password').val();
var mail = $('#mail').val();
var confMdp = $('#confMdp').val();
if(name === '' || mail === ''|| mdp === ''|| confMdp === '') {
            alert('Les champs doivent etres remplis');
} else {
	$.ajax({
		type: "POST",
		data: 'mail=' + mail + '&mdp=' + mdp + '&name=' + name+ '&confMdp=' + confMdp, // On fait passer nos variables, exactement comme en GET, au script more_com.php,
		url: "index.php?control=user&action=inscription",
		datatype: 'json',
		success: function(retour){
			var data = eval('(' + retour + ')');
			
			if(data.statut){
				$("#boutons").html("<li><p id='afficheName' class='navbar-text'>Bienvenu " + name +" !</p></li><li><button id='deco' type='button' class='btn btn-cdefault navbar-btn'>Deconnexion</button></li>");
				$( "#classement" ).before( "<li id='profil' class='item'><a  href='#''>Profil</a></li>" );
				$("#profil").click(profil);
				$( "#dialog1" ).dialog("close");
				$("#deco").click(deconnexion);
			} else alert(data.message);
			
		}
	});
}
	return false;
}

function submit() {	
var nameCon = $('#nameCon').val();
var passwordCo = $('#passwordCo').val();
if(nameCon === '' || passwordCo ==='') {
    alert('Les champs doivent etres remplis');
} else {
	$.ajax({
		type: "POST",
		data: 'nameCon=' + nameCon + '&passwordCo=' + passwordCo,
		url: "index.php?control=user&action=connect",
		datatype: 'json',
		success: function(retour){
			var data = eval('(' + retour + ')'); 
			if(data.statut){
				$("#boutons").html("<li><p id='afficheName' class='navbar-text'>Bienvenu " + nameCon +" !</p></li><li><button id='deco' type='button' class='btn btn-cdefault navbar-btn'>Deconnexion</button></li>");
				$("#deco").click(deconnexion);
				$( "#classement" ).before( "<li id='profil' class='item'><a  href='#''>Profil</a></li>" );
				$("#profil").click(profil);
				$( "#dialog2" ).dialog("close");
			} else alert(data.message);
		}
	});
}
	return false;
}

function deconnexion(){
	$.ajax({
		type: "POST",
		url: "index.php?control=user&action=deconnexion",
		datatype: 'json',
		success: function(retour){
			var data = eval('(' + retour + ')');
			if(data.statut){
				$("#boutons").html("<li><button id='ouvrir' type='button' class='btn btn-cdefault navbar-btn'>Inscription</button></li>"+
			"<li><button id='ouvrirConn' type='button' class='btn btn-default navbar-btn'>Connexion</button></li>");
				$( "#profil" ).replaceWith('');
				$("#ouvrir").click(function() { $( "#dialog1" ).dialog("open"); });
				$("#ouvrirConn").click(function() { $( "#dialog2" ).dialog("open"); });
			} else alert(data.message); 
			return false;
		}
	});	

}