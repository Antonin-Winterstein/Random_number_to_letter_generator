// Sélecteurs
let modal = document.getElementById("instructionsModal");
let button = document.getElementById("buttonInstructions");
let closeButton = document.getElementsByClassName("closeButton")[0];

// Quand l'utilisateur clique sur le bouton d'ouverture de la modal, cela ouvre la modal
button.onclick = function () {
	modal.style.display = "block";
	modal.classList.add("fadeIn");
};

// Quand l'utilisateur clique sur la croix, cela ferme la modal
closeButton.onclick = function () {
	modal.classList.add("fadeOut");
	setTimeout(() => {
		modal.style.display = "none";
		modal.classList.remove("fadeOut");
	}, 200);

	if (modal.classList.contains("fadeIn")) {
		modal.classList.remove("fadeIn");
	}
};

// Quand l'utilisateur clique n'importe où en dehors de la modal, cela ferme la modal
window.onclick = function (event) {
	if (event.target == modal) {
		modal.classList.add("fadeOut");
		setTimeout(() => {
			modal.style.display = "none";
			modal.classList.remove("fadeOut");
		}, 200);

		if (modal.classList.contains("fadeIn")) {
			modal.classList.remove("fadeIn");
		}
	}
};
