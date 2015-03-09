var timer;  //variable référenéant un objet temporisateur
var  temps_imparti =  10000;  //temps imparti pour donner la réponse (10s)
var q; 

var repOK = 'Bonne r\351ponse ! \nVous gagnez 1 point';
var repKO = 'D\351sol\351\nMauvaise Réponse\nVous perdez 1 point';
var repNO = 'Votre temps de réponse est trop long\nVous avez perdu';

var tabVilles = new Array("Paris","Marseille","Lyon","Toulouse","Nice","Nantes","Strasbourg","Montpellier","Bordeaux","Lille","Rennes","Reims","Le Havre","Saint-Étienne","Toulon","Grenoble","Dijon","Angers","Nîmes","Villeurbanne","Saint-Denis ","Le Mans","Clermont-Ferrand","Aix-en-Provence","Brest","Limoges","Tours","Amiens","Perpignan","Metz","Boulogne-Billancourt","Besançon","Orléans","Rouen","Mulhouse","Caen","Nancy","Argenteuil ","Montreuil ","Roubaix","Tourcoing","Dunkerque","Nanterre","Créteil","Avignon","Vitry-sur-Seine","Poitiers","Courbevoie","Versailles","Colombes","Asnières-sur-Seine","Aulnay-sous-Bois","Rueil-Malmaison","Pau","Aubervilliers","Champigny-sur-Marne","Antibes","Saint-Maur-des-Fossés","La Rochelle","Cannes","Béziers","Calais","Saint-Nazaire","Colmar","Drancy","Bourges","Mérignac ","Issy-les-Moulineaux","Levallois-Perret","La Seyne-sur-Mer","Quimper","Noisy-le-Grand","Valence ","Villeneuve-d'Ascq","Neuilly-sur-Seine","Antony","Vénissieux","Cergy","Troyes","Clichy","Pessac","Ivry-sur-Seine","Chambéry","Lorient","Niort","Sarcelles","Montauban","Villejuif","Saint-Quentin","Hyères","Épinay-sur-Seine","Saint-André ","Beauvais","Maisons-Alfort","Cholet","Meaux","Chelles","Pantin","Fontenay-sous-Bois","La Roche-sur-Yon","Bondy","Vannes","Fréjus","Arles","Clamart","Évry","Le Blanc-Mesnil","Narbonne","Sartrouville","Grasse","Annecy","Laval ","Belfort","Vincennes","Charleville-Mézières","Évreux","Sevran","Albi","Montrouge","Bobigny","Martigues","Saint-Ouen ","Brive-la-Gaillarde","Suresnes","Carcassonne","Cagnes-sur-Mer","Corbeil-Essonnes","Saint-Brieuc","Blois","Bayonne","Aubagne","Châlons-en-Champagne","Meudon","Châteauroux","Saint-Malo","Chalon-sur-Saône","Sète","Puteaux","Alfortville","Salon-de-Provence","Massy ","Mantes-la-Jolie","Vaulx-en-Velin","Saint-Herblain","Le Cannet","Valenciennes","Istres","Gennevilliers","Boulogne-sur-Mer","Livry-Gargan","Saint-Priest ","Rosny-sous-Bois","Caluire-et-Cuire","Angoulême","Douai","Tarbes","Wattrelos","Castres","Choisy-le-Roi","Talence","Thionville","Arras","Alès","Garges-lès-Gonesse","Gap","Melun","Bourg-en-Bresse","Noisy-le-Sec","Compiègne","La Courneuve","Marcq-en-Barœul","Saint-Germain-en-Laye","Rezé","Bron","Anglet","Gagny","Chartres","Bagneux ","Saint-Martin-d'Hères","Montluçon","Pontault-Combault","Poissy","Draguignan","Joué-lès-Tours","Savigny-sur-Orge","Cherbourg-Octeville","Colomiers","Villefranche-sur-Saône","Stains","Échirolles","Villepinte ","Roanne","Montélimar","Saint-Chamond","Nevers","Conflans-Sainte-Honorine","Auxerre","Sainte-Geneviève-des-Bois ","Châtillon ","Bagnolet","Vitrolles ","Thonon-les-Bains","Neuilly-sur-Marne","Haguenau","Marignane","Saint-Raphaël ","Tremblay-en-France","La Ciotat","Six-Fours-les-Plages","Creil","Agen","Romans-sur-Isère","Montigny-le-Bretonneux","Le Perreux-sur-Marne","Franconville ","Annemasse","Villeneuve-Saint-Georges","Mâcon","Cambrai","Lens ","Houilles","Épinal","Châtenay-Malabry","Schiltigheim","Liévin","Châtellerault","Meyzieu","Goussainville ","Viry-Châtillon","Dreux","L'Haÿ-les-Roses","Plaisir ","Mont-de-Marsan","Maubeuge","Nogent-sur-Marne","Les Mureaux","Clichy-sous-Bois","Dieppe ","Chatou","Vandœuvre-lès-Nancy","Malakoff ","Palaiseau","Pontoise","Charenton-le-Pont","Rillieux-la-Pape");


var invite = "</br></br><div class='jumbotron'><h4>Identifiez le plus vite possible la ville indiquée parmis la liste de choix !</h4>";
	invite += "<h4>Attention au compteur !</h4><h4>Vous n'avez que 10 secondes pour répondre</h4>";
	invite += "<a href='' class='btn btn-primary btn-lg'  onclick='question(temps_imparti); return false'>d\351marrer</a></div>";
var map;
var marker;
var markerWrong;
var polyline;
var WrongMessage="";
var popup1;
var popup2;


var intituleQuestion;

//****************************************************************//

function JexAction(){
	document.getElementById("page").innerHTML ="<div class='drop' id='map'></div><div id='contenu'></div>"; 
	q =  document.getElementById('contenu');

	map = new L.map('map').setView([46.603354,1.8883335],6);
    L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {attribution: 'Programmation Web Client IUT Paris Descartes, Robin Jolliet, Wetzler Alexandre',maxZoom:6,minZoom:6}).addTo(map);
	lancer();
}
function setQuestion(){
	var taille = tabVilles.length;
	intituleQuestion = {	
		choix: [
			tabVilles[Math.floor((Math.random() * taille))], 
			tabVilles[Math.floor((Math.random() * taille))],
			tabVilles[Math.floor((Math.random() * taille))],
			tabVilles[Math.floor((Math.random() * taille))]
		], 
		reponse : Math.floor((Math.random() * 4))
	}; 
}

function lancer() {
	setQuestion();
	q.innerHTML = invite;
}

function abandon () {
	$('div.drop').droppable('disable' );
	alert(repNO);
	diminuerScore();
	popup1 = new L.Popup();
	popup1.setLatLng(marker.getLatLng());
	popup1.setContent(intituleQuestion.choix[intituleQuestion.reponse]);
	map.addLayer(popup1);

	setTimeout("map.removeLayer(marker)", 5000);
	setTimeout("$('div.drop').droppable( 'enable')", 5000);
	setTimeout("map.removeLayer(popup1)", 5000);

	setTimeout("lancer()", 5000);
}

function cleanMap(){
	map.removeLayer(marker);
	map.removeLayer(polyline);
	map.removeLayer(markerWrong);
	map.removeLayer(popup1);
	map.removeLayer(popup2);
	$('div.drop').droppable( 'enable');
}

function question (temps_imparti)  {
	IdVille	=intituleQuestion.choix[intituleQuestion.reponse];
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

	q.innerHTML = htmlQuestion();
	$('div.draggable').draggable();
	$('div.drop').droppable({
		drop: function( event, ui ) {
			reponse( ui.draggable.attr('id') , intituleQuestion.reponse);
		}
	});
	timer = setTimeout("abandon()", temps_imparti);
}
function traitementWrong(choix, rep){
	var ville=intituleQuestion.choix[choix];
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
			popup1.setContent(intituleQuestion.choix[intituleQuestion.reponse]);

			popup2 = new L.Popup();
			popup2.setLatLng(markerWrong.getLatLng());
			popup2.setContent(ville);

			map.addLayer(popup1).addLayer(popup2);

		
			var pointList = [latlng, marker.getLatLng()];
			polyline = new L.polyline(pointList, {color: 'red'}).addTo(map);	
			alert(rep +"\nVous etiez à " + Math.floor(Distance(marker.getLatLng()['lat'],marker.getLatLng()['lng'], markerWrong.getLatLng()['lat'],markerWrong.getLatLng()['lng'] )/1000 )+ "km");
			setTimeout("lancer()", 5000);
			setTimeout("cleanMap()", 5000);
	    }
	});
}

function reponse(iChoix, repGood) {
	$('div.drop').droppable('disable' );
	clearTimeout(timer);
	if (iChoix != repGood) {
		diminuerScore();
		traitementWrong(iChoix, repKO);		
	}
	else {
		augmenterScore();
		alert (repOK); 
		lancer();
		$('div.drop').droppable( 'enable');
		map.removeLayer(marker);

	}
	$("#"+iChoix).animate({
        top: "0px",
        left: "0px"
    });

}

function htmlQuestion() {
	var quest = "<h3 align='center'> QUESTION : ";
	quest += "Quel est la ville pointée sur la carte ci-dessus ?";
	quest += "</h3><hr>"
	quest += htmlDivDrag();
	return quest;
}

function htmlDivDrag() {
	var prop="";
	for(i=0;i<intituleQuestion["choix"].length;i++) {
			prop += "<div class='draggable ui-widget-content question' style='float: left' id='";
			prop += i;
			prop += "'><p>";	
			prop += intituleQuestion["choix"][i];
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

