/*contrairement à la version du jeu simple, avec une seule question
un tableau de questions est défini au format JSON.
- la fonction question() est modifiée pour tirer au sort une des questions du tableau
- la fonction reponse() est modifiée avec désormais un paramètre supplémentaire, la réponse attendue
- 2 fonctions supplémentaires permettent de produire le code HTML à partir d'informations issu du tableau
- la fonction() init est éliminé cat on peut mettre son contenu dans onload()
*/

var timer;  //variable référenéant un objet temporisateur
var  temps_imparti =  10000;  //temps imparti pour donner la réponse (10s)
var q; //référence au bloc div d'affichage (<div "id=QUEST"></div>)
var reponses[];

var repOK = "Bonne r\351ponse !";
var repKO = "'D\351sol\351\n Mauvaise Réponse'";
var repNO = "d\351sol\351";

var invite = "Vous avez 15 secondes pour r\351pondre";
	invite += " apr\350s avoir d\351marr\351 jex <br/>";
	invite += "<a href='' onclick='question(temps_imparti); return false'>d\351marrer</a>";

//tableau au format JSON représentant un ensemble de questions
//avec pour chaque question, 3 attributs : question (intitué de la question), différents choix indicés, indice de la bonne réponse
var tabObject;


/* alternative : initialiser le tableau des questions à partir d'une chaîne de caractères

var myJSONtext = "[";
myJSONtext += "{question:'quel est l\'intrus ?', choix:['nez','yeux','oreilles], reponse:0 },";
myJSONtext += "{question:'Quel est le fruit ?', choix:['patate','figue','carotte'], reponse:1 }, ";
myJSONtext += "{question:'Quel musicien ne jouait pas de trompette ?', choix:['Miles Davis','Dave Brubeck','Boris Vian'], reponse:1 } ";
myJSONtext += "]";

tabObject = eval('('+myJSONtext+')');
window.onload=alert(myObject[1].choix[myObject[1].reponse]); //test
*/




//****************************************************************//

window.onload = function () {
	q =  document.getElementById('page');
	tabObject = [
 {"FIELD1":"31000","FIELD2":"31555","FIELD3":"","FIELD4":"Toulouse","FIELD5":"","FIELD6":"TOULOUSE","FIELD7":"TOULOUSE","FIELD8":"73","FIELD9":"MIDI-PYRENEES","FIELD10":"31","FIELD11":"Haute-Garonne","FIELD12":"43.6043902","FIELD13":"1.448302","FIELD14":"T420","FIELD15":"TLS"},
 {"FIELD1":"67000","FIELD2":"67482","FIELD3":"","FIELD4":"Strasbourg","FIELD5":"","FIELD6":"STRASBOURG","FIELD7":"STRASBOURG","FIELD8":"42","FIELD9":"ALSACE","FIELD10":"67","FIELD11":"Bas-Rhin","FIELD12":"48.6019858","FIELD13":"7.7835217","FIELD14":"S362","FIELD15":"STRSPRK"},
 {"FIELD1":"33000","FIELD2":"33063","FIELD3":"","FIELD4":"Bordeaux","FIELD5":"","FIELD6":"BORDEAUX","FIELD7":"BORDEAUX","FIELD8":"72","FIELD9":"AQUITAINE","FIELD10":"33","FIELD11":"Gironde","FIELD12":"44.8350088","FIELD13":"-0.587269","FIELD14":"B632","FIELD15":"PRTKS"},
 {"FIELD1":"59000","FIELD2":"59350","FIELD3":"","FIELD4":"Lille","FIELD5":"","FIELD6":"LILLE","FIELD7":"LILLE","FIELD8":"31","FIELD9":"NORD-PAS-DE-CALAIS","FIELD10":"59","FIELD11":"Nord","FIELD12":"50.629059","FIELD13":"3.06038","FIELD14":"L400","FIELD15":"LL"},
 {"FIELD1":"13001","FIELD2":"13055","FIELD3":"","FIELD4":"Marseille","FIELD5":"","FIELD6":"MARSEILLE","FIELD7":"MARSEILLE","FIELD8":"93","FIELD9":"PROVENCE-ALPES-COTE D'AZUR","FIELD10":"13","FIELD11":"Bouches-du-Rhône","FIELD12":"43.294418","FIELD13":"5.35999","FIELD14":"M624","FIELD15":"MRSL"},
 {"FIELD1":"69001","FIELD2":"69123","FIELD3":"","FIELD4":"Lyon","FIELD5":"","FIELD6":"LYON","FIELD7":"LYON","FIELD8":"82","FIELD9":"RHONE-ALPES","FIELD10":"69","FIELD11":"Rhône","FIELD12":"45.7712918","FIELD13":"4.8280831","FIELD14":"L500","FIELD15":"LN"},
 {"FIELD1":"75003","FIELD2":"75103","FIELD3":"","FIELD4":"PARIS","FIELD5":"","FIELD6":"PARIS","FIELD7":"PARIS","FIELD8":"11","FIELD9":"ILE-DE-FRANCE","FIELD10":"75","FIELD11":"Paris","FIELD12":"2.35","FIELD13":"48.853","FIELD14":"P620","FIELD15":"PRS"},
 {"FIELD1":"63000","FIELD2":"63113","FIELD3":"","FIELD4":"Clermont-Ferrand","FIELD5":"","FIELD6":"CLERMONT-FERRAND","FIELD7":"CLERMONT FERRAND","FIELD8":"83","FIELD9":"AUVERGNE","FIELD10":"63","FIELD11":"Puy-de-Dôme","FIELD12":"45.780788","FIELD13":"3.11949","FIELD14":"C465","FIELD15":"KLRMNTFRNT"}
];
	lancer();
}


function lancer() {
	q.innerHTML = invite;
}


function abandon () {
	alert(repNO);
	lancer();
}

function isIn(ville){
	for (int i=0;i<reponses.length;i++){
		if (ville.nom==reponses[i].nom){
			return true
		}
	}
	return false
}

function question (temps_imparti)  {
	var nbrRep=0;
	//on récupère 4 ville avec coord de chaque
	var num=Math.floor(Math.random()*tabObject.length);
	while(nbrRep<4){
		var ville = {nom:tabObject[i].["FIELD4"],longitude:tabObject[i].["FIELD12"],latitude:tabObject[i].["FIELD13"]}
		if(isIn(ville)){
			var num=Math.floor(Math.random()*tabObject.length);
		} else {
			reponses[nbrRep]=ville;
			nbrRep++;
			var num=Math.floor(Math.random()*tabObject.length);
		}
	}
	
	
		var num=Math.floor(Math.random()*tabObject.length);
		for (int k=0;k<reponses.length;k++){
			if(reponses[k].nom == tabObject[i].["FIELD4"]){
				
			}
		}
		var ville = {nom:tabObject[i].["FIELD4"],longitude:tabObject[i].["FIELD12"],latitude:tabObject[i].["FIELD13"]}
		
		var reponses[i]= ville;

	//on initialise les cases
	
	//mettre un pion qui est la réponse voulut
	
	var numQ=Math.floor(Math.random()*tabObject.length);
	q.innerHTML = htmlQuestion(numQ);
	$('div.draggable').draggable();
	$('div#droppable').droppable({
		drop: function( event, ui ) {
			//alert("ma reponse " + ui.draggable.attr('id'));
			//alert("reponse attendue " + tabObject[numQ].reponse);
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
	var quest = "<h3 align='center'> QUESTION : </h3><hr>";
	quest += tabObject[numQ].question;
	quest += htmlDivDrag(numQ);
	quest += "<div id='droppable' class='ui-widget-header'><p>reponse ?</p></div>";
	return quest;
}

function htmlDivDrag(numQ) {
	var prop="";
	for(i=0;i<tabObject[numQ]["choix"].length;i++) {
			prop += "<div class='draggable ui-widget-content' id='";
			prop += i;
			prop += "'><p>";	
			prop += tabObject[numQ]["choix"][i];
			prop += "</p></div>";
	}
	return prop;
}



