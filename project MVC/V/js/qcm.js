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


var repOK = "Bonne r\351ponse !";
var repKO = "'D\351sol\351\n Mauvaise Réponse'";
var repNO = "d\351sol\351";

var invite = "Vous avez une minute pour r\351pondre";
	invite += " apr\350s avoir d\351marr\351 le test <br/>";
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
	q =  document.getElementById('QUEST');
	tabObject = [
		{question:"quel est l\'intrus ?",				choix: ["nez","yeux","oreilles"], 				reponse : 0}, 
		{question:"Quel est le fruit ?",					choix: ["patate","figue","carotte"], 				reponse : 1},
		{question:"Quel musicien ne jouait pas de trompette ?",	choix: ["Miles Davis","Dave Brubeck","Boris Vian"], 	reponse : 1}
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

function question (temps_imparti)  {
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



