// Fonction pour retourner un chiffre aléatoire entre 0 et 9
function randomNumberGenerator() {
	document.getElementById("leftNumber").innerHTML = Math.floor(
		Math.random() * 10
	);
}

randomNumberGenerator();

fetch("../data/data.json")
	.then(function (response) {
		return response.json();
	})
	.then(function (data) {
		console.log(data);
		console.log(data[Math.floor(Math.random() * 10)]);
	})
	.catch(function (error) {
		console.log(error);
	});
