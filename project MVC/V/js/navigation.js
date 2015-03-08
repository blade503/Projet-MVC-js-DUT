$(
	function() {
		$("#profil").click(profil);
		$("#regles").click(regles);
		$("#classement").click(classement);
		$("#jex").click(jex);
		$("#jexDeco").click(accueil);



		if ($('#jex').length) {
		  JexAction();
		} else {
			accueil();
		}


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
	$("#page").html("");
	JexAction();
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
			if(!data.statut){
				alert(data.message); 
			}
		}
	});	
}

function diminuerScore(){
	$.ajax({
		type: "POST",
		url: "index.php?control=user&action=diminuerScore",
		success: function(retour){
			var data = eval('(' + retour + ')');
			if(!data.statut){
				alert(data.message); 
			}
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

function accueil(){
	$(".item").removeClass("active").removeClass("activeHead");
	$("#jexDeco").addClass("activeHead");
	$("#page").html(accueilAction);
}

function accueilAction(){

	return "<div class='container'><h3>Bienvenue dans JEX.</h3></br><h4>Ce jeux simple d'apparence va mettre à l'épreuve vos connaissances de la france et de ses nombreuses communes</h4><h4>Jouez avec vos amis et soyez le meilleur !</h4><h4>Inscrivez vous dès maintenant</h4></div></br></br></br><div class='row'><div class='col-sm-6 col-md-4'><div class='thumbnail'><img src='V/images/Carte.png'><div class='caption'><h3>Un affichage de vos erreurs</h3><p>Un trajet entre votre réponse et le résultat si celle-ci est mauvaise</p></div></div></div><div class='col-sm-6 col-md-4'><div class='thumbnail'><img src='V/images/Carte2.png'><div class='caption'><h3>Une carte de grande qualité</h3><p>La carte vous permettra de voir au mieux ce magnifique pays qu'est la france</p></div></div></div><div class='col-sm-6 col-md-4'><div class='thumbnail'><img src='V/images/Boot.png'><div class='caption'><h3>Aucun temps de chargement</h3><p>Un jeu complètement réalisé en javascript</p></div></div></div></div>";
}