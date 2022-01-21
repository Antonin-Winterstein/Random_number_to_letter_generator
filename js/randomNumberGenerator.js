// Fonction pour retourner un chiffre aléatoire entre la valeur minimale et maximale récupérées en paramètres
export function randomNumberGenerator(minimumNumber, maximumNumber) {
	return (
		Math.floor(Math.random() * (maximumNumber - minimumNumber + 1)) +
		minimumNumber
	);
}
