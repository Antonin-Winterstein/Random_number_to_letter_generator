// Fonction pour convertir un chiffre donné dans son écriture en lettre en fonction de la langue voulue (Français, Anglais, Coréen/Sino-Coréen)
export function convertNumberToLetter(number, language) {
	// Variables
	let quotient;
	let reste;
	let numberLength = number.toString().length;
	let numberToLetter = "";

	switch (language) {
		// Conversion en français
		case "Français":
			// Les chiffres en lettres
			let frenchLetters = {
				0: "zéro",
				1: "un",
				2: "deux",
				3: "trois",
				4: "quatre",
				5: "cinq",
				6: "six",
				7: "sept",
				8: "huit",
				9: "neuf",
				10: "dix",
				11: "onze",
				12: "douze",
				13: "treize",
				14: "quatorze",
				15: "quinze",
				16: "seize",
				17: "dix-sept",
				18: "dix-huit",
				19: "dix-neuf",
				20: "vingt",
				30: "trente",
				40: "quarante",
				50: "cinquante",
				60: "soixante",
				70: "soixante-dix",
				80: "quatre-vingt",
				90: "quatre-vingt-dix",
			};

			switch (numberLength) {
				// Si un seul chiffre on l'affiche tout simplement en le cherchant dans la liste
				case 1:
					numberToLetter = frenchLetters[number];
					break;
				// Si on a deux chiffres dans le nombre
				case 2:
					// On vérifie si le nombre est supérieur à 19 (donc de 20 à 99)
					if (number > 19) {
						// Récupération du quotient et reste du nombre
						quotient = Math.floor(number / 10);
						reste = number % 10;
						// Si le nombre est situé entre 20 et 70 ou entre 80 et 90 on entre
						if (number < 71 || (number > 79 && number < 91)) {
							// S'il n'y a pas de reste (chiffres ronds) on multiplie le quotient par 10 pour le récupérer dans la liste (exemple : 50 = 5*10)
							if (reste == 0) {
								numberToLetter = frenchLetters[quotient * 10];
							}
							// Si le reste est égal à 1 (41, 51, 61 etc.) on entre
							if (reste == 1) {
								// Exception pour 81 (quatre-vingt-un), il n'y a pas de "et" dans le nombre
								if (quotient == 8) {
									numberToLetter =
										frenchLetters[quotient * 10] + "-" + frenchLetters[reste];
								}
								// Sinon on ajoute un "et" (exemple : cinquante et un)
								else {
									numberToLetter =
										frenchLetters[quotient * 10] +
										" et " +
										frenchLetters[reste];
								}
							}

							// Si le reste est supérieur à 1 (exemple : de 52 à 59) on ajoute simplement un tiret au nombre
							if (reste > 1) {
								numberToLetter =
									frenchLetters[quotient * 10] + "-" + frenchLetters[reste];
							}
						}
						// Si le nombre est situé entre 71 et 79 ou entre 91 et 99 on entre
						else {
							// Exception pour 71 (soixante et onze), il y a un "et" dans le nombre
							if (quotient == 7 && reste == 1) {
								numberToLetter =
									frenchLetters[(quotient - 1) * 10] +
									" et " +
									frenchLetters[10 + reste];
							}
							// Sinon on ajoute un simple tiret
							else {
								numberToLetter =
									frenchLetters[(quotient - 1) * 10] +
									"-" +
									frenchLetters[10 + reste];
							}
						}
					}
					// Si le nombre n'est pas supérieur à 19 (donc de 10 à 19), on l'affiche tout simplement en le cherchant dans la liste
					else {
						numberToLetter = frenchLetters[number];
					}
					break;
				case 3:
					// Récupération du quotient et reste du nombre
					quotient = Math.floor(number / 100);
					reste = number % 100;
					// Si le nombre est 100, on affiche simplement "cent"
					if (quotient == 1 && reste == 0) {
						numberToLetter = "cent";
					}
					// Si le nombre est entre 101 et 109, on affiche "cent + le reste"
					if (quotient == 1 && reste != 0) {
						numberToLetter =
							"cent" + " " + convertNumberToLetter(reste, "Français");
					}
					// Si le nombre est rond et ne fait pas partie des 100 (exemple : 200, 300 etc.) On met "cents" au plurieL
					if (quotient > 1 && reste == 0) {
						numberToLetter = frenchLetters[quotient] + " cents";
					}
					// Si le nombre ne fait pas partie des 100 et n'est pas rond, on affiche le nombre avec "cent" au singulier
					if (quotient > 1 && reste != 0) {
						numberToLetter =
							frenchLetters[quotient] +
							" cent " +
							convertNumberToLetter(reste, "Français");
					}
					break;
				case 4:
				case 5:
				case 6:
					// Même principe que précédemment
					quotient = Math.floor(number / 1000);
					reste = number - quotient * 1000;
					if (quotient == 1 && reste == 0) {
						numberToLetter = "mille";
					}
					if (quotient == 1 && reste != 0) {
						numberToLetter =
							"mille" + " " + convertNumberToLetter(reste, "Français");
					}
					if (quotient > 1 && reste == 0) {
						numberToLetter =
							convertNumberToLetter(quotient, "Français") + " mille";
					}
					if (quotient > 1 && reste != 0) {
						numberToLetter =
							convertNumberToLetter(quotient, "Français") +
							" mille " +
							convertNumberToLetter(reste, "Français");
					}
					break;
			}
			// On accorde bien le nombre 80 si besoin
			if (
				numberToLetter.substr(
					numberToLetter.length - "quatre-vingt".length,
					"quatre-vingt".length
				) == "quatre-vingt"
			) {
				numberToLetter = numberToLetter + "s";
			}

			return numberToLetter;
			break;
		case "English":
			// Les chiffres en lettres
			let englishLetters = {
				0: "zero",
				1: "one",
				2: "two",
				3: "three",
				4: "four",
				5: "five",
				6: "six",
				7: "seven",
				8: "eight",
				9: "nine",
				10: "ten",
				11: "eleven",
				12: "twelve",
				13: "thirteen",
				14: "fourteen",
				15: "fifteen",
				16: "sixteen",
				17: "seventeen",
				18: "eighteen",
				19: "nineteen",
				20: "twenty",
				30: "thirty",
				40: "forty",
				50: "fifty",
				60: "sixty",
				70: "seventy",
				80: "eighty",
				90: "ninety",
			};

			switch (numberLength) {
				// Si un seul chiffre on l'affiche tout simplement en le cherchant dans la liste
				case 1:
					numberToLetter = englishLetters[number];
					break;
				// Si on a deux chiffres dans le nombre
				case 2:
					// On vérifie si le nombre est supérieur à 19 (donc de 20 à 99)
					if (number > 19) {
						// Récupération du quotient et reste du nombre
						quotient = Math.floor(number / 10);
						reste = number % 10;

						// S'il n'y a pas de reste (chiffres ronds) on multiplie le quotient par 10 pour le récupérer dans la liste (exemple : 50 = 5*10)
						if (reste == 0) {
							numberToLetter = englishLetters[quotient * 10];
						}
						// Sinon on ajoute un tiret au nombre
						else {
							numberToLetter =
								englishLetters[quotient * 10] + "-" + englishLetters[reste];
						}
					}
					// Si le nombre n'est pas supérieur à 19 (donc de 10 à 19), on l'affiche tout simplement en le cherchant dans la liste
					else {
						numberToLetter = englishLetters[number];
					}
					break;
				case 3:
					// Récupération du quotient et reste du nombre
					quotient = Math.floor(number / 100);
					reste = number % 100;

					// Si le nombre est rond (exemple : 200, 300 etc.) On ajoute le chiffre des centaines + hundred
					if (reste == 0) {
						numberToLetter = englishLetters[quotient] + " hundred";
					}
					// Sinon on ajoute simplement le chiffre des centaines + hundred + le reste
					else {
						numberToLetter =
							englishLetters[quotient] +
							" hundred " +
							convertNumberToLetter(reste, "English");
					}
					break;
				case 4:
				case 5:
				case 6:
					// Même principe que précédemment
					quotient = Math.floor(number / 1000);
					reste = number - quotient * 1000;

					console.log(quotient);

					// Si le nombre est rond (exemple : 2000, 3000 etc.) On ajoute le chiffre des centaines + thousand
					if (reste == 0) {
						numberToLetter =
							convertNumberToLetter(quotient, "English") + " thousand";
					}
					// Sinon on ajoute simplement le chiffre des centaines + thousand + le reste
					else {
						numberToLetter =
							convertNumberToLetter(quotient, "English") +
							" thousand " +
							convertNumberToLetter(reste, "English");
					}
					break;
			}
			return numberToLetter;
			break;
		// Conversion en Coréen (nombres purement coréens)
		case "Korean numbers":
			// Les chiffres en lettres
			let koreanLetters = {
				0: "doesn't exist",
				1: "하나",
				2: "둘",
				3: "셋",
				4: "넷",
				5: "다섯",
				6: "여섯",
				7: "일곱",
				8: "여덟",
				9: "아홉",
				10: "열",
				20: "스물",
				30: "서른",
				40: "마흔",
				50: "쉰",
				60: "예순",
				70: "일흔",
				80: "여든",
				90: "아흔",
			};

			switch (numberLength) {
				// Si un seul chiffre on l'affiche tout simplement en le cherchant dans la liste
				case 1:
					numberToLetter = koreanLetters[number];
					break;
				// Si on a deux chiffres dans le nombre
				case 2:
					// Récupération du quotient et reste du nombre
					quotient = Math.floor(number / 10);
					reste = number % 10;

					// S'il n'y a pas de reste (chiffres ronds) on multiplie le quotient par 10 pour le récupérer dans la liste (exemple : 50 = 5*10)
					if (reste == 0) {
						numberToLetter = koreanLetters[quotient * 10];
					}
					// Sinon on récupère simplement la dizaine et on ajoute le reste
					else {
						numberToLetter =
							koreanLetters[quotient * 10] + koreanLetters[reste];
					}
					break;
			}

			return numberToLetter;
			break;
		// Conversion en Coréen (nombres sino-coréens)
		case "Sino-Korean numbers":
			// Les chiffres en lettres
			let sinoKoreanLetters = {
				0: "영 or 공",
				1: "일",
				2: "이",
				3: "삼",
				4: "사",
				5: "오",
				6: "육",
				7: "칠",
				8: "팔",
				9: "구",
				10: "십",
				100: "백",
				1000: "천",
				10000: "만",
			};

			switch (numberLength) {
				// Si un seul chiffre on l'affiche tout simplement en le cherchant dans la liste
				case 1:
					numberToLetter = sinoKoreanLetters[number];
					break;
				case 2:
					// Récupération du quotient et reste du nombre
					quotient = Math.floor(number / 10);
					reste = number % 10;

					// Si le nombre est 10, on le récupère simplement dans la liste
					if (quotient == 1 && reste == 0) {
						numberToLetter = sinoKoreanLetters[quotient * 10];
					}
					// Si le nombre est entre 11 et 19, on affiche 십 + le reste
					else if (quotient == 1 && reste != 0) {
						numberToLetter =
							sinoKoreanLetters[quotient * 10] + sinoKoreanLetters[reste];
					}
					// Si le nombre est rond et ne fait pas partie des 100, on récupère le quotient et on y ajoute le nombre 10 (exemple : 20 = 2x10)
					else if (quotient > 1 && reste == 0) {
						numberToLetter =
							sinoKoreanLetters[quotient] + sinoKoreanLetters[10];
					}
					// Sinon, on fait pareil que la condition précédente mais en ajoutant aussi le reste
					else {
						numberToLetter =
							sinoKoreanLetters[quotient] +
							sinoKoreanLetters[10] +
							sinoKoreanLetters[reste];
					}
					break;
				case 3:
					// Récupération du quotient et reste du nombre
					quotient = Math.floor(number / 100);
					reste = number % 100;

					// Si le nombre est 100, on le récupère simplement dans la liste
					if (quotient == 1 && reste == 0) {
						numberToLetter = sinoKoreanLetters[quotient * 100];
					}
					// Si le nombre est entre 101 et 199, on affiche 백 + le reste
					else if (quotient == 1 && reste != 0) {
						numberToLetter =
							sinoKoreanLetters[quotient * 100] +
							convertNumberToLetter(reste, "Sino-Korean numbers");
					}
					// Si le nombre est rond et ne fait pas partie des 100, on récupère le quotient et on y ajoute le nombre 100 (exemple : 200 = 2x100)
					else if (quotient > 1 && reste == 0) {
						numberToLetter =
							sinoKoreanLetters[quotient] + sinoKoreanLetters[100];
					}
					// Sinon, on fait pareil que la condition précédente mais en ajoutant aussi le reste
					else {
						numberToLetter =
							sinoKoreanLetters[quotient] +
							sinoKoreanLetters[100] +
							convertNumberToLetter(reste, "Sino-Korean numbers");
					}

					break;
				case 4:
					// Récupération du quotient et reste du nombre
					quotient = Math.floor(number / 1000);
					reste = number % 1000;

					// Si le nombre est 1000, on le récupère simplement dans la liste
					if (quotient == 1 && reste == 0) {
						numberToLetter = sinoKoreanLetters[quotient * 1000];
					}
					// Si le nombre est entre 1001 et 1099, on affiche 천 + le reste
					else if (quotient == 1 && reste != 0) {
						numberToLetter =
							sinoKoreanLetters[quotient * 1000] +
							convertNumberToLetter(reste, "Sino-Korean numbers");
					}
					// Si le nombre est rond et ne fait pas partie des 1000, on récupère le quotient et on y ajoute le nombre 1000 (exemple : 2000 = 2x1000)
					else if (quotient > 1 && reste == 0) {
						numberToLetter =
							sinoKoreanLetters[quotient] + sinoKoreanLetters[1000];
					}
					// Sinon, on fait pareil que la condition précédente mais en ajoutant aussi le reste
					else {
						numberToLetter =
							sinoKoreanLetters[quotient] +
							sinoKoreanLetters[1000] +
							convertNumberToLetter(reste, "Sino-Korean numbers");
					}
					break;
				case 5:
					// Récupération du quotient et reste du nombre
					quotient = Math.floor(number / 10000);
					reste = number % 10000;

					// Si le nombre est 10000, on le récupère simplement dans la liste
					if (quotient == 1 && reste == 0) {
						numberToLetter = sinoKoreanLetters[quotient * 10000];
					}
					// Si le nombre est entre 10001 et 10999, on affiche 만 + le reste
					else if (quotient == 1 && reste != 0) {
						numberToLetter =
							sinoKoreanLetters[quotient * 10000] +
							convertNumberToLetter(reste, "Sino-Korean numbers");
					}
					// Si le nombre est rond et ne fait pas partie des 10000, on récupère le quotient et on y ajoute le nombre 10000 (exemple : 20000 = 2x10000)
					else if (quotient > 1 && reste == 0) {
						numberToLetter =
							sinoKoreanLetters[quotient] + sinoKoreanLetters[10000];
					}
					// Sinon, on fait pareil que la condition précédente mais en ajoutant aussi le reste
					else {
						numberToLetter =
							sinoKoreanLetters[quotient] +
							sinoKoreanLetters[10000] +
							convertNumberToLetter(reste, "Sino-Korean numbers");
					}
					break;
				case 6:
					// Récupération du quotient et reste du nombre
					quotient = Math.floor(number / 10000);
					reste = number % 10000;

					// Si le nombre est rond, on affiche pas le reste
					if (reste == 0) {
						numberToLetter =
							convertNumberToLetter(quotient, "Sino-Korean numbers") +
							sinoKoreanLetters[10000];
					}
					// Sinon on l'ajoute
					else {
						numberToLetter =
							convertNumberToLetter(quotient, "Sino-Korean numbers") +
							sinoKoreanLetters[10000] +
							convertNumberToLetter(reste, "Sino-Korean numbers");
					}
					break;
			}

			return numberToLetter;
			break;
	}
}
