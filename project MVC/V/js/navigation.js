$(
	function() {
		$("#profil").click(profil);
		$("#regles").click(regles);
		$("#classement").click(classement);
		$("#jex").click(jex);
});


function profil(){
	$(".item").removeClass("active").removeClass("activeHead");
	$("#profil").addClass("active");
	$("#page").html(profilAction);
}

function regles(){
	$(".item").removeClass("active").removeClass("activeHead");
	$("#regles").addClass("active");
	$("#page").html(regleAction);
}

function classement(){
	$(".item").removeClass("active").removeClass("activeHead");
	$("#classement").addClass("active");
	classementAction();
}

function jex(){
	$(".item").removeClass("active").removeClass("activeHead");
	$("#jex").addClass("activeHead");
}

function regleAction(){
	var text = "<div class='starter-template'>" +
	"<h1>Les règles de Jex</h1>" +
	"</div><br><br>";
	text += "<div class='row'><br>"+
	"<div class='col-sm-12'><blockquote><p class='text-left'>Identifiez le plus vite possible la ville indiquée parmis la liste de choix !</p></blockquote></div></div>";
		text += "<div class='row'>"+
	"<div class=' col-sm-3'><blockquote><p class='text-center'>Attention au compteur !</p></blockquote></div></div>";
		text += "<div class='row'>"+
	"<div class=' col-sm-6'><blockquote><p class='text-center'>Vous gagnez des points en trouvant la bonne réponse !</p></blockquote></div></div>";
		text += "<div class='row'>"+
	"<div class=' col-sm-4'><blockquote><p class='text-center'>Vous en perdez en vous trompant ...</p></blockquote></div></div>";
		text += "<div class='row'>"+
	"<div class=' col-sm-5'><blockquote><p class='text-right'>Comparez vos résultats sur la page classement !</p></blockquote></div></div>";
		text += "<div class='row'>"+
	"<div class='col-sm-offset-1 col-sm-3'><blockquote><p class='text-right'>Bonne chance !</p></blockquote></div></div>";

	return text;
}

function classementAction(){
var text ="";
	$.ajax({
		type: "POST",
		url: "index.php?control=user&action=classement",
		datatype: 'json',
		success: function(retour){
			var data = eval('(' + retour + ')');
			if(data.statut){
				var i = 1;
				text = "<div class='starter-template'>" +
					"<h1>Classement des scores</h1>" +
					"</div><br><br>";
				 text += "<table class='table table-hover'>" 
				 +"<tr><th>Classement</th><th>Nom</th><th>Score</th></tr>";
				 $.each(data.data, function (key, data1) {  
					    	text += '<tr><td>'  + i +'</td><td>'+ data1.nom + ' </td><td>' + data1.score + '</td></tr>';
					    	i=i+1;			  
					});
				text += "</table>";
				$("#page").html(text);
			} else alert(data.message); 
			return "false";
		}
	});	
}

function augmenterScore(){
	$.ajax({
		type: "POST",
		url: "index.php?control=user&action=augmenterScore",
		success: function(retour){
			var data = eval('(' + retour + ')');
			if(data.statut){
				alert(data.message); 
			} else alert(data.message); 
		}
	});	
}

function diminuerScore(){
	$.ajax({
		type: "POST",
		url: "index.php?control=user&action=diminuerScore",
		success: function(retour){
			var data = eval('(' + retour + ')');
			if(data.statut){
				alert(data.message); 
			} else alert(data.message); 
		}
	});	
}

function profilAction(){
	$.ajax({
		type: "POST",
		url: "index.php?control=user&action=profil",
		datatype: 'json',
		success: function(retour){
			var data = eval('(' + retour + ')');
			if(data.statut){
				text = "<div class='starter-template'>" +
					"<h1>Mon profil</h1>" +
					"</div><br><br>";
				 text += "<div class='row'><div class='col-sm-offset-1 col-sm-6'><table class='table table-hover'>" 
				 $.each(data.data, function (key, data1) {  
					    	text += '<tr><td> Nom :</td><td> '+data1.nom +'</td></tr><tr><td>Score :</td><td> '+  data1.score+ '</td></tr><tr><td>Mail :</td><td> ' + data1.mail + '</td></tr>';		  
					});
				text += "</table></div></div>";
				$("#page").html(text);
			} else alert(data.message); 
			return "false";
		}
	});	
}