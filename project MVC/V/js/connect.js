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
				//form[ 0 ].reset();
				//allFields.removeClass( "ui-state-error" );
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
				//form[ 0 ].reset();
				//allFields.removeClass( "ui-state-error" );
			}
			});

		$("#deco").button().click(function() {
				$.ajax({
				type: "POST",
				url: "index.php?control=user&action=deconnexion",
				success: function(retour){
					alert(retour);
					$("#boutonsCo").css("display", "none");
					$("#boutonsDeco").css("display", "block");
					$("#afficheName").css("display", "none");
					return false;
				}
			});
		});
		$("#ouvrir").button().click(function() { dialog1.dialog("open"); });
		$("#ouvrirConn").button().click(function() { dialog2.dialog("open"); });
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
		success: function(retour){
			alert(retour);
			$( "#dialog1" ).dialog( "close" );
			$("#boutonsDeco").css("display", "none");	
			$("#boutonsCo").css("display", "block");
			$("#afficheName").css("display", "block");
			
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
		success: function(retour){
			alert(retour);
			$( "#dialog2" ).dialog( "close" );	
			$("#boutonsDeco").css("display", "none");
			$("#boutonsCo").css("display", "block");
			$("#afficheName").css("display", "block");
		}
	});
}
	return false;
}
