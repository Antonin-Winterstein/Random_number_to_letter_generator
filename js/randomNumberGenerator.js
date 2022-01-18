// Fonction pour retourner un chiffre aléatoire entre la valeur minimale et maximale récupérées en paramètres
function randomNumberGenerator(minimumNumber, maximumNumber) {
	return (
		Math.floor(Math.random() * (maximumNumber - minimumNumber + 1)) +
		minimumNumber
	);
}

let numericNumber = document.getElementById("numericNumber");
let letterNumber = document.getElementById("letterNumber");

fetch("../data/data.json")
	.then(function (response) {
		return response.json();
	})
	.then(function (data) {
		console.log(data);

		let numberGenerator = document.getElementById("numberGenerator");
		// Écouteur d'événement qui écoute l'événement submit
		numberGenerator.addEventListener("submit", function (e) {
			e.preventDefault();

			// Les valeurs dans le formulaire
			let language = document.querySelector(
				'input[name="language"]:checked'
			).value;
			let minimumNumber =
				document.getElementById("minimumNumber").valueAsNumber;
			let maximumNumber =
				document.getElementById("maximumNumber").valueAsNumber;

			// Condition pour valider le formulaire
			if (minimumNumber === "") {
				alert("Veuillez saisir une valeur minimale.");
			} else if (maximumNumber === "") {
				alert("Veuillez saisir une valeur maximale.");
			} else {
				// Condition pour savoir si la valeur minimale est supérieure à la valeur maximale
				if (minimumNumber > maximumNumber) {
					// Si la condition est valide, on intervertit les valeurs dans les champs du formulaire
					document.getElementById("minimumNumber").valueAsNumber =
						maximumNumber;
					document.getElementById("maximumNumber").valueAsNumber =
						minimumNumber;
					// Et on actualise les valeurs minimales et maximales
					minimumNumber =
						document.getElementById("minimumNumber").valueAsNumber;
					maximumNumber =
						document.getElementById("maximumNumber").valueAsNumber;
				}

				// Récupération du nombre aléatoire entre la valeur minimale et maximale voulue
				let randomNumber = randomNumberGenerator(minimumNumber, maximumNumber);

				// Affichage du nombre aléatoire
				numericNumber.innerHTML = data[randomNumber].digital_numbers;

				// Vérification de la langue sélectionnée pour afficher le nombre dans la bonne langue
				if (language === "Français") {
					letterNumber.innerHTML = data[randomNumber].french_numbers;
				} else if (language === "English") {
					letterNumber.innerHTML = data[randomNumber].english_numbers;
				} else if (language === "Korean") {
					letterNumber.innerHTML = data[randomNumber].korean_numbers;
				} else {
					letterNumber.innerHTML = data[randomNumber].french_numbers;
				}
			}
		});
	})
	.catch(function (error) {
		console.log(error);
	});
