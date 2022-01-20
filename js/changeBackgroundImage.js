// Compteur
var counter = 1;
// Le nombre maximum d'images disponibles
var maxImage = 3;
// Fonction pour changer l'image de fond automatiquement toutes les 30s
setInterval(function () {
	// Chargement de l'image suivante
	document.querySelector(".backgroundContainer").style.backgroundImage =
		"url('images/backgrounds/" + "background_" + (counter + 1) + ".jpg')";
	// Retour à la première image si on atteint la dernière
	if (counter + 1 == maxImage) {
		counter = 0;
	}
	// Itération à la prochaine image
	else {
		++counter;
	}
}, 30000);
