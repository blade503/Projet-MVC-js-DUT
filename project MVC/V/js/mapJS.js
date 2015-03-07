var timer;  //variable référenéant un objet temporisateur
var  temps_imparti =  10000;  //temps imparti pour donner la réponse (10s)
var q; //référence au bloc div d'affichage (<div "id=QUEST"></div>)

var repOK = 'Bonne r\351ponse ! \nVous gagnez 1 point';
var repKO = 'D\351sol\351\n Mauvaise Réponse\nVous perdez 1 point';
var repNO = 'Votre temps de réponse est trop long\nVous avez perdu';

var invite = "Identifiez le plus vite possible la ville indiquée parmis la liste de choix !</br>";
	invite += "Attention au compteur !</br>Vous n'avez que 10 secondes pour répondre</br>";
	invite += "<a href='' class='btn btn-default'  onclick='question(temps_imparti); return false'>d\351marrer</a>";


//tableau au format JSON représentant un ensemble de questions
//avec pour chaque question, 3 attributs : question (intitué de la question), différents choix indicés, indice de la bonne réponse
var tabObject;

//****************************************************************//

window.onload = function () {
	q =  document.getElementById('page');
	tabObject = [
		{question:"Quel est la ville pointé sur la carte ci-dessus ?",	choix: ["paris","lille","caen","Le Havre"], reponse : 0}, 
		{question:"Quel est la ville pointé sur la carte ci-dessus ?",	choix: ["nice","marseille","toulouse","montpellier"], reponse : 3}, 
		{question:"Quel est la ville pointé sur la carte ci-dessus ?",	choix: ["montpellier","Clermont-Ferrand","Aix-en-Provence","monaco"], reponse : 1}
	];
	var map = L.map('map').setView([46.603354,1.8883335],6);
    L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {attribution: 'PING',maxZoom:6,minZoom:6}).addTo(map);
	lancer();
}

function lancer() {
	q.innerHTML = invite;
}

function abandon () {
	alert(repNO);
	lancer();
}

function question (temps_imparti)  {
	var numQ=Math.floor(Math.random()*tabObject.length);
	IdVille	=tabObject[numQ].choix[tabObject[numQ].reponse];

$.ajax({
    type: 'GET',
    url: "http://nominatim.openstreetmap.org/search",
    dataType: 'jsonp',
    jsonpCallback: 'data',
    data: { format: "json", limit: 1,city: IdVille,json_callback: 'data' },
    error: function(xhr, status, error) {
	alert("ERROR "+error);
    },
    success: function(data){
	//récupérer les coordonnées (lati, longi) du pays dans les données json provenant du serveur
	var lati = '';
	var longi = '';
	$.each(data, function() {
		lati = this['lat'] ;
		longi = this['lon'] ;
	});
	
	console.log(lati);
	console.log(longi);
	L.marker([43.6112422,3.8767337]).addTo(map);
	L.marker([43.6112422,3.8767337]).addTo(map).bindPopup("Lat, Lon : " + lati + ", " + longi+" Pays : "+IdVille).openPopup();
				
    }
});

	q.innerHTML = htmlQuestion(numQ);
	$('div.draggable').draggable();
	$('div#droppable').droppable({
		drop: function( event, ui ) {
			reponse( ui.draggable.attr('id') , tabObject[numQ].reponse);
		}
	});
	timer = setTimeout("abandon()", temps_imparti);
}

function reponse(iChoix, repGood) {
	clearTimeout(timer);
	if (iChoix != repGood) {
		alert (repKO);
	}
	else {
		alert (repOK); 
	}
	lancer();
}

function htmlQuestion(numQ) {
	var quest = "<h3 align='center'> QUESTION : ";
	quest += tabObject[numQ].question;
	quest += "</h3><hr>"
	quest += htmlDivDrag(numQ);
	quest += "<div id='droppable' style='margin-top=0px' class='ui-widget-header'><p>reponse ?</p></div>";
	return quest;
}

function htmlDivDrag(numQ) {
	var prop="";
	for(i=0;i<tabObject[numQ]["choix"].length;i++) {
			prop += "<div class='draggable ui-widget-content' style='float: left' id='";
			prop += i;
			prop += "'><p>";	
			prop += tabObject[numQ]["choix"][i];
			prop += "</p></div>";
	}
	return prop;
}



