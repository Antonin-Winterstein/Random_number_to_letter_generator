// import { isCheckboxSelected } from "./utils/tools.js";

// Fonction pour retourner un chiffre aléatoire entre la valeur minimale et maximale récupérées en paramètres
function randomNumberGenerator(minimumNumber, maximumNumber) {
	return (
		Math.floor(Math.random() * (maximumNumber - minimumNumber + 1)) +
		minimumNumber
	);
}

const numberGenerator = document.querySelector("#numberGenerator");
let numericNumber = document.getElementById("numericNumber");
let letterNumber = document.getElementById("letterNumber");
let arrow = document.getElementById("arrow");

fetch("../data/data.json")
	.then(function (response) {
		return response.json();
	})
	.then(function (data) {
		console.log(data);

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

			// Condition pour savoir si la valeur minimale est supérieure à la valeur maximale
			if (minimumNumber > maximumNumber) {
				// Si la condition est valide, on intervertit les valeurs dans les champs du formulaire
				document.getElementById("minimumNumber").valueAsNumber = maximumNumber;
				document.getElementById("maximumNumber").valueAsNumber = minimumNumber;
				// Et on actualise les valeurs minimales et maximales
				minimumNumber = document.getElementById("minimumNumber").valueAsNumber;
				maximumNumber = document.getElementById("maximumNumber").valueAsNumber;
			}

			// Récupération du nombre aléatoire entre la valeur minimale et maximale voulue
			let randomNumber = randomNumberGenerator(minimumNumber, maximumNumber);

			// Vérification de la langue sélectionnée pour afficher le nombre dans la bonne langue
			if (language === "Français") {
				// Affichage du nombre aléatoire
				numericNumber.innerHTML = data[randomNumber].digital_numbers;
				letterNumber.innerHTML = data[randomNumber].french_numbers;
				arrow.innerHTML = "→";
			} else if (language === "English") {
				// Affichage du nombre aléatoire
				numericNumber.innerHTML = data[randomNumber].digital_numbers;
				letterNumber.innerHTML = data[randomNumber].english_numbers;
				arrow.innerHTML = "→";
			} else if (language === "Korean") {
				numericNumber.innerHTML = data[randomNumber].digital_numbers;
				arrow.innerHTML = "→";

				let checkboxes = document.querySelectorAll("input[type=checkbox]");
				let result = [];
				result = [];
				// Boucle sur toutes les checkbox
				checkboxes.forEach((item) => {
					// Si la checkbox est cochée, on l'ajoute au tableau
					if (item.checked) {
						result.push(item.value);
					}
				});

				// S'il y a deux éléments dans le tableau cela veut dire que les deux checkbox ont été cochées, on affiche alors les nombres coréens et sino-coréens ensemble
				if (result.length === 2) {
					letterNumber.innerHTML =
						data[randomNumber].korean_numbers +
						" | " +
						data[randomNumber].sino_korean_numbers;
				}
				// Si l'élément dans le tableau correspond à la checkbox "Korean numbers" alors on affiche ces nombres
				else if (result[0] === "Korean numbers") {
					letterNumber.innerHTML = data[randomNumber].korean_numbers;
				}
				// Si l'élément dans le tableau correspond à la checkbox "Sino-Korean numbers" alors on affiche ces nombres
				else if (result[0] === "Sino-Korean numbers") {
					letterNumber.innerHTML = data[randomNumber].sino_korean_numbers;
				} else {
					numericNumber.innerHTML = "";
					letterNumber.innerHTML = "";
					arrow.innerHTML = "";
					alert("Please select at least one type of Korean numbers");
				}
			} else {
				// Affichage du nombre aléatoire
				numericNumber.innerHTML = data[randomNumber].digital_numbers;
				letterNumber.innerHTML = data[randomNumber].english_numbers;
				arrow.innerHTML = "→";
			}
		});
	})
	.catch(function (error) {
		console.log(error);
	});
