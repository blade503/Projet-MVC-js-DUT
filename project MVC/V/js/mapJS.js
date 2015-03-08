var timer;  //variable référenéant un objet temporisateur
var  temps_imparti =  10000;  //temps imparti pour donner la réponse (10s)
var q; //référence au bloc div d'affichage (<div "id=QUEST"></div>)

var repOK = 'Bonne r\351ponse ! \nVous gagnez 1 point';
var repKO = 'D\351sol\351\nMauvaise Réponse\nVous perdez 1 point';
var repNO = 'Votre temps de réponse est trop long\nVous avez perdu';

var invite = "</br></br><div class='jumbotron'><h4>Identifiez le plus vite possible la ville indiquée parmis la liste de choix !</h4>";
	invite += "<h4>Attention au compteur !</h4><h4>Vous n'avez que 10 secondes pour répondre</h4>";
	invite += "<a href='' class='btn btn-primary btn-lg'  onclick='question(temps_imparti); return false'>d\351marrer</a></div>";
var map;
var marker;
var markerWrong;
var numQ;
var polyline;
var WrongMessage="";
var popup1;
var popup2;
//tableau au format JSON représentant un ensemble de questions
//avec pour chaque question, 3 attributs : question (intitué de la question), différents choix indicés, indice de la bonne réponse
var tabObject;

//****************************************************************//

function JexAction(){
	document.getElementById("page").innerHTML ="<div class='drop' id='map'></div><div id='contenu'></div>"; 
	q =  document.getElementById('contenu');
	tabObject = [
		{	choix: ["paris","lille","caen","Le Havre"], reponse : 0}, 
		{	choix: ["nice","marseille","toulouse","montpellier"], reponse : 3}, 
		{	choix: ["montpellier","Clermont-Ferrand","Aix-en-Provence","monaco"], reponse : 1},
		{	choix: ["Aix-en-Provence","Lyon","Bordeaux","Strasbourg"], reponse : 2}, 
		{	choix: ["La Rochelle","Quimper","Brest","Deauville"], reponse : 0}
	];
	 map = new L.map('map').setView([46.603354,1.8883335],6);
    L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {attribution: 'PING',maxZoom:6,minZoom:6}).addTo(map);
	lancer();
}

function lancer() {
	q.innerHTML = invite;
}

function abandon () {
	alert(repNO);
	map.removeLayer(marker);
	lancer();
}

function cleanMap(){
	map.removeLayer(polyline);
	map.removeLayer(marker);
	map.removeLayer(markerWrong);
	map.removeLayer(popup1);
	map.removeLayer(popup2);
	$('#map').droppable( 'enable');
}

function question (temps_imparti)  {
	numQ=Math.floor(Math.random()*tabObject.length);
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
			var latlng = new L.LatLng(lati, longi);
			marker = new L.Marker(latlng); 
			map.addLayer(marker);			
	    }
	});

	q.innerHTML = htmlQuestion(numQ);
	$('div.draggable').draggable();
	$('div.drop').droppable({
		drop: function( event, ui ) {
			reponse( ui.draggable.attr('id') , tabObject[numQ].reponse);
		}
	});
	timer = setTimeout("abandon()", temps_imparti);
}
function traitementWrong(choix){
	var ville=tabObject[numQ].choix[choix];
	$.ajax({
	    type: 'GET',
	    url: "http://nominatim.openstreetmap.org/search",
	    dataType: 'jsonp',
	    jsonpCallback: 'data',
	    data: { format: "json", limit: 1,city: ville,json_callback: 'data' },

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
			var latlng = new L.LatLng(lati, longi);
			markerWrong = new L.Marker(latlng); 
			map.addLayer(markerWrong);

			popup1 = new L.Popup();
			popup1.setLatLng(marker.getLatLng());
			popup1.setContent(tabObject[numQ].choix[tabObject[numQ].reponse]);

			popup2 = new L.Popup();
			popup2.setLatLng(markerWrong.getLatLng());
			popup2.setContent(ville);

			map.addLayer(popup1).addLayer(popup2);

			

			console.log(ville);
			var pointList = [latlng, marker.getLatLng()];
			polyline = new L.polyline(pointList, {color: 'red'}).addTo(map);	
			alert(repKO +"\nVous etiez à " + Math.floor(Distance(marker.getLatLng()['lat'],marker.getLatLng()['lng'], markerWrong.getLatLng()['lat'],markerWrong.getLatLng()['lng'] )/1000 )+ "km");
			setTimeout("lancer()", 5000);
			setTimeout("cleanMap()", 5000);
	    }
	});
}

function reponse(iChoix, repGood) {
	$('#map').droppable('disable' );
	clearTimeout(timer);
	if (iChoix != repGood) {
		diminuerScore();
		traitementWrong(iChoix);
		
		
	}
	else {
		augmenterScore();
		alert (repOK); 
		lancer();
		map.removeLayer(marker);
		map.removeLayer(markerWrong);
	}
	$("#"+iChoix).animate({
        top: "0px",
        left: "0px"
    });

}

function htmlQuestion(numQ) {
	var quest = "<h3 align='center'> QUESTION : ";
	quest += "Quel est la ville pointé sur la carte ci-dessus ?";
	quest += "</h3><hr>"
	quest += htmlDivDrag(numQ);
	return quest;
}

function htmlDivDrag(numQ) {
	var prop="";
	for(i=0;i<tabObject[numQ]["choix"].length;i++) {
			prop += "<div class='draggable ui-widget-content question' style='float: left' id='";
			prop += i;
			prop += "'><p>";	
			prop += tabObject[numQ]["choix"][i];
			prop += "</p></div>";
	}
	return prop;
}

//Conversion des degrés en radian
function convertRad(input){
        return (Math.PI * input)/180;
}
 
function Distance(lat_a_degre, lon_a_degre, lat_b_degre, lon_b_degre){
     
        R = 6378000 //Rayon de la terre en mètre
 
    lat_a = convertRad(lat_a_degre);
    lon_a = convertRad(lon_a_degre);
    lat_b = convertRad(lat_b_degre);
    lon_b = convertRad(lon_b_degre);
     
    d = R * (Math.PI/2 - Math.asin( Math.sin(lat_b) * Math.sin(lat_a) + Math.cos(lon_b - lon_a) * Math.cos(lat_b) * Math.cos(lat_a)))
    return d;
}

