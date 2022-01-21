import { convertNumberToLetter } from "./convertNumberToLetter.js";
import { randomNumberGenerator } from "./randomNumberGenerator.js";

// Sélecteurs
const numberGenerator = document.querySelector("#numberGenerator");
let numericNumber = document.getElementById("numericNumber");
let letterNumber = document.getElementById("letterNumber");

// Envoi automatique du formulaire si on appuie sur la touche "Entrée" ou "Espace"
document.addEventListener("keyup", function (event) {
	if (event.key === "Enter" || event.key === " ") {
		document.getElementById("submit").click();
	}
});

// Récupération des données du fichier json
fetch("../data/data.json")
	.then(function (response) {
		return response.json();
	})
	.then(function (data) {
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

			// Ajout du pointeur du curseur sur le nombre en lettres
			letterNumber.style.cursor = "pointer";

			// Vérification de la langue sélectionnée pour afficher le nombre dans la bonne langue
			if (language === "Français") {
				// Affichage du nombre aléatoire, de la flèche et du point d'interrogation
				numericNumber.innerHTML = data[randomNumber].digital_numbers + " = ";
				letterNumber.innerHTML = "?";

				// Affichage du nombre en lettres au click sur le point d'interrogation
				letterNumber.addEventListener("click", function () {
					letterNumber.innerHTML = data[randomNumber].french_numbers;
					letterNumber.style.removeProperty("cursor");
				});
			} else if (language === "English") {
				/// Affichage du nombre aléatoire, de la flèche et du point d'interrogation
				numericNumber.innerHTML = data[randomNumber].digital_numbers + " = ";
				letterNumber.innerHTML = "?";

				// Affichage du nombre en lettres au click sur le point d'interrogation
				letterNumber.addEventListener("click", function () {
					letterNumber.innerHTML = data[randomNumber].english_numbers;
					letterNumber.style.removeProperty("cursor");
				});
			} else if (language === "Korean") {
				// Affichage du nombre aléatoire, de la flèche et du point d'interrogation
				numericNumber.innerHTML = data[randomNumber].digital_numbers + " = ";
				letterNumber.innerHTML = "?";

				// Sélecteur des checkbox
				let checkboxes = document.querySelectorAll("input[type=checkbox]");
				let result = [];
				// Boucle sur toutes les checkbox
				checkboxes.forEach((item) => {
					// Si la checkbox est cochée, on l'ajoute au tableau
					if (item.checked) {
						result.push(item.value);
					}
				});

				// S'il y a deux éléments dans le tableau cela veut dire que les deux checkbox ont été cochées, on affiche alors les nombres coréens et sino-coréens ensemble
				if (result.length === 2) {
					// Affichage du nombre en lettres au click sur le point d'interrogation
					letterNumber.addEventListener("click", function () {
						letterNumber.innerHTML =
							data[randomNumber].korean_numbers +
							" | " +
							data[randomNumber].sino_korean_numbers;
						letterNumber.style.removeProperty("cursor");
					});
				}
				// Si l'élément dans le tableau correspond à la checkbox "Korean numbers" alors on affiche ces nombres
				else if (result[0] === "Korean numbers") {
					// Affichage du nombre en lettres au click sur le point d'interrogation
					letterNumber.addEventListener("click", function () {
						letterNumber.innerHTML = data[randomNumber].korean_numbers;
						letterNumber.style.removeProperty("cursor");
					});
				}
				// Si l'élément dans le tableau correspond à la checkbox "Sino-Korean numbers" alors on affiche ces nombres
				else if (result[0] === "Sino-Korean numbers") {
					// Affichage du nombre en lettres au click sur le point d'interrogation
					letterNumber.addEventListener("click", function () {
						letterNumber.innerHTML = data[randomNumber].sino_korean_numbers;
						letterNumber.style.removeProperty("cursor");
					});
				}
				// Si aucune case n'a été cochée, onv vide les valeurs et on affiche une erreur
				else {
					numericNumber.innerHTML = "";
					letterNumber.innerHTML = "";
					alert("Please select at least one type of Korean numbers");
				}
			}
			// Si aucune condition n'est rencontrée, on affiche de base la version anglaise
			else {
				/// Affichage du nombre aléatoire, de la flèche et du point d'interrogation
				numericNumber.innerHTML = data[randomNumber].digital_numbers + " = ";
				letterNumber.innerHTML = "?";

				// Affichage du nombre en lettres au click sur le point d'interrogation
				letterNumber.addEventListener("click", function () {
					letterNumber.innerHTML = data[randomNumber].english_numbers;
					letterNumber.style.removeProperty("cursor");
				});
			}
		});
	})
	.catch(function (error) {
		console.log(error);
	});
