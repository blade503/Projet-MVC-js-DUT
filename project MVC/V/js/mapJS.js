var gData = [
 {"FIELD1":"31000","FIELD2":"31555","FIELD3":"","FIELD4":"Toulouse","FIELD5":"","FIELD6":"TOULOUSE","FIELD7":"TOULOUSE","FIELD8":"73","FIELD9":"MIDI-PYRENEES","FIELD10":"31","FIELD11":"Haute-Garonne","FIELD12":"43.6043902","FIELD13":"1.448302","FIELD14":"T420","FIELD15":"TLS"},
 {"FIELD1":"67000","FIELD2":"67482","FIELD3":"","FIELD4":"Strasbourg","FIELD5":"","FIELD6":"STRASBOURG","FIELD7":"STRASBOURG","FIELD8":"42","FIELD9":"ALSACE","FIELD10":"67","FIELD11":"Bas-Rhin","FIELD12":"48.6019858","FIELD13":"7.7835217","FIELD14":"S362","FIELD15":"STRSPRK"},
 {"FIELD1":"33000","FIELD2":"33063","FIELD3":"","FIELD4":"Bordeaux","FIELD5":"","FIELD6":"BORDEAUX","FIELD7":"BORDEAUX","FIELD8":"72","FIELD9":"AQUITAINE","FIELD10":"33","FIELD11":"Gironde","FIELD12":"44.8350088","FIELD13":"-0.587269","FIELD14":"B632","FIELD15":"PRTKS"},
 {"FIELD1":"59000","FIELD2":"59350","FIELD3":"","FIELD4":"Lille","FIELD5":"","FIELD6":"LILLE","FIELD7":"LILLE","FIELD8":"31","FIELD9":"NORD-PAS-DE-CALAIS","FIELD10":"59","FIELD11":"Nord","FIELD12":"50.629059","FIELD13":"3.06038","FIELD14":"L400","FIELD15":"LL"},
 {"FIELD1":"13001","FIELD2":"13055","FIELD3":"","FIELD4":"Marseille","FIELD5":"","FIELD6":"MARSEILLE","FIELD7":"MARSEILLE","FIELD8":"93","FIELD9":"PROVENCE-ALPES-COTE D'AZUR","FIELD10":"13","FIELD11":"Bouches-du-Rhône","FIELD12":"43.294418","FIELD13":"5.35999","FIELD14":"M624","FIELD15":"MRSL"},
 {"FIELD1":"69001","FIELD2":"69123","FIELD3":"","FIELD4":"Lyon","FIELD5":"","FIELD6":"LYON","FIELD7":"LYON","FIELD8":"82","FIELD9":"RHONE-ALPES","FIELD10":"69","FIELD11":"Rhône","FIELD12":"45.7712918","FIELD13":"4.8280831","FIELD14":"L500","FIELD15":"LN"},
 {"FIELD1":"75003","FIELD2":"75103","FIELD3":"","FIELD4":"PARIS","FIELD5":"","FIELD6":"PARIS","FIELD7":"PARIS","FIELD8":"11","FIELD9":"ILE-DE-FRANCE","FIELD10":"75","FIELD11":"Paris","FIELD12":"2.35","FIELD13":"48.853","FIELD14":"P620","FIELD15":"PRS"},
 {"FIELD1":"63000","FIELD2":"63113","FIELD3":"","FIELD4":"Clermont-Ferrand","FIELD5":"","FIELD6":"CLERMONT-FERRAND","FIELD7":"CLERMONT FERRAND","FIELD8":"83","FIELD9":"AUVERGNE","FIELD10":"63","FIELD11":"Puy-de-Dôme","FIELD12":"45.780788","FIELD13":"3.11949","FIELD14":"C465","FIELD15":"KLRMNTFRNT"}
]

window.onload = function () {
	
	//Chargement initial de la MAP
	var map = L.map('map').setView([46.603354,1.8883335],6);
    L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {attribution: 'PING',maxZoom:6,minZoom:6}).addTo(map);
	
	//Rendre draggable les div des pays
	$( "#reponse1" ).draggable({ revert: "valid" });
	$( "#reponse2" ).draggable({ revert: "valid" });
	$( "#reponse3" ).draggable({ revert: "valid" });
	$( "#reponse4" ).draggable({ revert: "valid" });
	
	//Rendre la map droppable
	 $( "#map" ).droppable({
		 
		 //Evenement lors du drop
		drop: function( event, ui ) {
			
			//Recupère l'id du block div "dropped" dans la map
			var IdPays = ui.draggable.attr("id");
			
			var chaine="";
			chaine+="Pays : "+IdPays+"</br>";
			
			//Requete AJAX pour récupérer les coordonnées (lati, longi) du pays
			$.ajax({
			    type: 'GET',
			    url: "http://nominatim.openstreetmap.org/search",
			    dataType: 'jsonp',
			    jsonpCallback: 'data',
			    data: { format: "json", limit: 1,country: IdPays,json_callback: 'data' },
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
				
				//affichage des infos
				chaine+="Latitude : "+lati+"</br>";
				chaine+="Longitute : "+longi+"</br>";
				$( "#info" ).html(chaine);
				
				//MAJ de la map à la position (lati, longi) du pays
				map.panTo(new L.LatLng(lati, longi));		
				
			    }
			});
			
			
		}
	});
	
	//Sur le click de la map, ajout d'un marqueur sur la carte avec le nom du pays
	map.on('click', onClick);
	
	function onClick(e) {
		//recherche le pays sur lequel on a clické
		//Requete AJAX pour récupérer les infos du pays sur le point où on a cliqué (lati, longi) 
		$.ajax({
		    type: 'GET',
		    url: "http://nominatim.openstreetmap.org/reverse",
		    dataType: 'jsonp',
		    jsonpCallback: 'data',
		    data: { format: "json", limit: 1,lat: e.latlng.lat,lon: e.latlng.lng,json_callback: 'data' },
		    error: function(xhr, status, error) {
			alert("ERROR "+error);
		    },
		    success: function(data){
			//récupérer les coordonnées (lati, longi) du pays dans les données json provenant du serveur
			var paysVisite="";
			$.each(data, function() {
				paysVisite = this['country'] ;
			});
			
			//affichage des infos
			L.marker(e.latlng).addTo(map).bindPopup("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng+" Pays : "+paysVisite).openPopup();
			L.circle(e.latlng, 1).addTo(map);			
		    }
		});
	}
}

function getData(){
		$.ajax({
		datatype: 'json',
		url: "M/BDville.json",
		success: function(data)
		{
			var data = eval(data);
			console.log("ça marche pour le fichier JSON",data);
			return data;
		},
		error: function(err)
		{
			console.log("ça plante pour le fichier JSON",err);
		},
	});	
}