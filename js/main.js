// Import des fonctions pour convertir les nombres en lettres et pour générer aléatoiremet un nombre
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

// Écouteur d'événement qui écoute l'événement submit
numberGenerator.addEventListener("submit", function (e) {
	e.preventDefault();

	// Les valeurs dans le formulaire
	let language = document.querySelector('input[name="language"]:checked').value;
	let koreanNumbers = document.getElementById("koreanNumbers").checked;
	let sinoKoreanNumbers = document.getElementById("sinoKoreanNumbers").checked;
	let minimumNumber = document.getElementById("minimumNumber").valueAsNumber;
	let maximumNumber = document.getElementById("maximumNumber").valueAsNumber;

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

	// Ajout du pointeur du curseur sur le point d'interrogation
	letterNumber.style.cursor = "pointer";

	// Vérification de la langue sélectionnée pour afficher le nombre dans la bonne langue
	if (language === "Français") {
		// Affichage du nombre aléatoire, de la flèche et du point d'interrogation
		numericNumber.innerHTML = randomNumber + " = ";
		letterNumber.innerHTML = "?";

		// Affichage du nombre en lettres au click sur le point d'interrogation
		letterNumber.addEventListener("click", function () {
			letterNumber.innerHTML = convertNumberToLetter(randomNumber, language);
			letterNumber.style.removeProperty("cursor");
		});
	} else if (language === "English") {
		/// Affichage du nombre aléatoire, de la flèche et du point d'interrogation
		numericNumber.innerHTML = randomNumber + " = ";
		letterNumber.innerHTML = "?";

		// Affichage du nombre en lettres au click sur le point d'interrogation
		letterNumber.addEventListener("click", function () {
			letterNumber.innerHTML = convertNumberToLetter(randomNumber, language);
			letterNumber.style.removeProperty("cursor");
		});
	} else if (language === "Korean") {
		// Affichage du nombre aléatoire, de la flèche et du point d'interrogation
		numericNumber.innerHTML = randomNumber + " = ";
		letterNumber.innerHTML = "?";

		// Si les deux checkbox du Coréen ont été cochées, on affiche alors les nombres coréens et sino-coréens ensemble
		if (koreanNumbers == true && sinoKoreanNumbers == true) {
			// Si l'intervalle n'est pas entre 1 et 99, affiche une erreur car les nombres coréens ne vont pas au dessus de 99
			if (maximumNumber > 99 || minimumNumber == 0) {
				numericNumber.innerHTML = "";
				letterNumber.innerHTML = "";
				alert(
					"Error, korean numbers are only from 1 to 99, please select another minimum and maximum value."
				);
			}
			// Sinon on affiche les deux types de nombres côte à côte
			else {
				// Affichage du nombre en lettres au click sur le point d'interrogation
				letterNumber.addEventListener("click", function () {
					letterNumber.innerHTML =
						convertNumberToLetter(randomNumber, "Korean numbers") +
						" | " +
						convertNumberToLetter(randomNumber, "Sino-Korean numbers");
					letterNumber.style.removeProperty("cursor");
				});
			}
		}
		// Si la checkbox cochée est "Korean numbers" alors on affiche ces nombres
		else if (koreanNumbers == true) {
			// Si l'intervalle n'est pas entre 1 et 99, affiche une erreur car les nombres coréens ne vont pas au dessus de 99
			if (maximumNumber > 99 || minimumNumber == 0) {
				numericNumber.innerHTML = "";
				letterNumber.innerHTML = "";
				alert(
					"Error, korean numbers are only from 1 to 99, please select another minimum and maximum value."
				);
			}
			// Sinon on affiche les deux types de nombres côte à côte
			else {
				// Affichage du nombre en lettres au click sur le point d'interrogation
				letterNumber.addEventListener("click", function () {
					letterNumber.innerHTML = convertNumberToLetter(
						randomNumber,
						"Korean numbers"
					);
					letterNumber.style.removeProperty("cursor");
				});
			}
		}
		// Si la checkbox cochée est "Sino-Korean numbers" alors on affiche ces nombres
		else if (sinoKoreanNumbers == true) {
			// Affichage du nombre en lettres au click sur le point d'interrogation
			letterNumber.addEventListener("click", function () {
				letterNumber.innerHTML = convertNumberToLetter(
					randomNumber,
					"Sino-Korean numbers"
				);
				letterNumber.style.removeProperty("cursor");
			});
		}
		// Si aucune case n'a été cochée, on vide les valeurs et on affiche une erreur
		else {
			numericNumber.innerHTML = "";
			letterNumber.innerHTML = "";
			alert("Error, please select at least one type of Korean numbers.");
		}
	}
	// Si aucune condition n'est rencontrée, on affiche de base la version anglaise
	else {
		/// Affichage du nombre aléatoire, de la flèche et du point d'interrogation
		numericNumber.innerHTML = randomNumber + " = ";
		letterNumber.innerHTML = "?";

		// Affichage du nombre en lettres au click sur le point d'interrogation
		letterNumber.addEventListener("click", function () {
			letterNumber.innerHTML = convertNumberToLetter(randomNumber, language);
			letterNumber.style.removeProperty("cursor");
		});
	}
});
