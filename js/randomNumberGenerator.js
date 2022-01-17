// Fonction pour retourner un chiffre aléatoire entre 0 et 9
function randomNumberGenerator() {
	document.getElementById("leftNumber").innerHTML = Math.floor(
		Math.random() * 10
	);
}

randomNumberGenerator();
