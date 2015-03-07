var f1;    /*équivalent : f1=document.getElementById('f1'); équivalent fait au chargt de la page $(function)*/

//équivalent : window.onload=functio(){}
$(
	function() {
		/*code de déclaration de la gestion événementielle*/$

		var dialog1 = $( "#dialog1" ).dialog({
			autoOpen: false,
			height: 350,
			width: 450,
			modal: true,
			buttons: {
				"Create an account": addUser,
				Cancel: function() {
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
				"Connexion": submit,
				Cancel: function() {
					dialog2.dialog("close");
				}
			},
			close: function() {
				 $('#f2')[0].reset();
			}
			});

		$("#deco").button().click(function() {
				$.ajax({
				type: "POST",
				url: "index.php?control=user&action=deconnexion",
				datatype: 'json',
				success: function(retour){
					var data = eval('(' + retour + ')');
					if(data.statut){
						$("#boutonsCo").css("display", "none");
						$("#boutonsDeco").css("display", "inline-block");
						$("#afficheName").text("");
					} else alert(data.message); 
					return false;
				}
			});
		});
		$("#ouvrir").button().click(function() { dialog1.dialog("open"); });
		$("#ouvrirConn").button().click(function() { dialog2.dialog("open"); });
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
				$( "#dialog1" ).dialog( "close" );
				$("#boutonsDeco").css("display", "none");	
				$("#boutonsCo").css("display", "inline-block");
				$("#afficheName").text("Bienvenu " + name);
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
				$( "#dialog2" ).dialog( "close" );	
				$("#boutonsDeco").css("display", "none");
				$("#boutonsCo").css("display", "inline-block");
				$("#afficheName").text("Bienvenu " + nameCon);
			} else alert(data.message);
		}
	});
}
	return false;
}
