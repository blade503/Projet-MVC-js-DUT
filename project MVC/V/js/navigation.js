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
	alert('profil');
}

function regles(){
	$(".item").removeClass("active").removeClass("activeHead");
	$("#regles").addClass("active");
	$("#container").html("coucou !");
	alert('regles');
}

function classement(){
	$(".item").removeClass("active").removeClass("activeHead");
	$("#classement").addClass("active");
	alert('classement');
}

function jex(){
	$(".item").removeClass("active").removeClass("activeHead");
	$("#jex").addClass("activeHead");
	alert('jex');
}