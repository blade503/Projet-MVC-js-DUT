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

		$("#ouvrir").button().click(function() { dialog1.dialog("open"); });
		$("#ouvrirConn").button().click(function() { dialog2.dialog("open"); });
	}
);
	

function addUser() {

var s = $(this).serialize();
	$.ajax({
		type: "POST",
		data: s,
		url: "index.php?control=user&action=inscription",
		success: function(retour){
			alert(retour);
			$( "#dialog1" ).dialog( "close" );	
		}
	});
	return false;


	/*var valid = true;		
	allFields.removeClass( "ui-state-error" );
	valid = valid && checkLength( name, "username", 3, 16 );
	valid = valid && checkLength( password, "password", 5, 16 );
	valid = valid && checkRegexp( name, /^[a-z]([0-9a-z_\s])+$/i, "Username may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );
	valid = valid && checkRegexp( password, /^([0-9a-zA-Z])+$/, "Password field only allow : a-z 0-9" );
	if ( valid ) {
		$( "#users tbody" ).append( "<tr>" +
		"<td>" + name.val() + "</td>" +
		"<td>" + password.val() + "</td>" +
		"</tr>" );
	}
	
	return valid;*/
}

function submit() {	
	//code de réaction suite à la soumission du formulaire,
	    //dans le cas d'une soumission à faire via une requête ajax
	var s = $(this).serialize();
	$.ajax({
		type: "GET",
		data: s,
		url: "index.php?control=user&action=connect",
		success: function(retour){
			alert(retour);
			$( "#dialog2" ).dialog( "close" );	
		}
	});
	return false;
}
