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
	"</div>";
	text += "<div class='row'><br>"+
	"<div class='col-sm-12'><blockquote><p class='text-left'>Identifiez le plus vite possible la ville indiquée parmis la liste de choix !</p></blockquote></div></div>";
		text += "<div class='row'>"+
	"<div class='col-sm-offset-2 col-sm-3'><blockquote><p class='text-center'>Attention au compteur !</p></blockquote></div></div>";
		text += "<div class='row'>"+
	"<div class='col-sm-offset-4 col-sm-8'><blockquote><p class='text-center'>Le nombre de ville correctement identifiée à la fin du challenge est enregistré</p></blockquote></div></div>";
		text += "<div class='row'>"+
	"<div class='col-sm-offset-6 col-sm-5'><blockquote><p class='text-right'>Comparez vos résultats sur la page classement !</p></blockquote></div></div>";

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
				var i = 0;
				
				 text = "<table class='table table-hover'>" 
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