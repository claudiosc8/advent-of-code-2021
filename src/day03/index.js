const input = require("./input.js");

const getInstructions = (i) => i.split(/\n/);

const findOccurrence = (str, char) =>
	str.match(new RegExp(char, "g") || []).length;

const transpose2dArray = (array) => {
	if (!Array.isArray(array)) {
		console.error("not an array");
		return [];
	}

	return new Array(array[0].length)
		.fill(0)
		.map((_, colIndex) => array.map((row) => row[colIndex]).join(""));
};

const solution1 = (input) => {
	const instructions = getInstructions(input);

	// transpose array
	const transposed = transpose2dArray(instructions);

	const gammaRate = [];

	transposed.forEach((line) => {
		// find occurrences of number '0'
		const occurrences = findOccurrence(line, "0");

		const mostCommon = occurrences > line.length / 2 ? "0" : "1";
		gammaRate.push(mostCommon);
	});

	// invert gamma rate
	const epsilonRate = gammaRate.map((n) => (n === "0" ? "1" : "0"));

	// convert to decimal
	const epsilonDecimal = parseInt(epsilonRate.join(""), 2);
	const gammaDecimal = parseInt(gammaRate.join(""), 2);

	return epsilonDecimal * gammaDecimal;
};

const findGeneratorRating = (instructions, greaterThan) => {
	let rating = instructions;
	let index = 0;

	while (rating.length > 1) {
		rating = rating.filter((e) => {
			const transposed = transpose2dArray(rating);
			const occurrences = findOccurrence(transposed[index], "1");

			const half = transposed[index].length / 2;
			const check = greaterThan
				? occurrences >= half
				: occurrences < half;

			const mostCommon = check ? "1" : "0";

			return e[index] === mostCommon;
		});
		index += 1;
	}

	return parseInt(rating[0], 2);
};

const solution2 = (input) => {
	const instructions = getInstructions(input);

	const Co2GeneratorRating = findGeneratorRating(instructions, false);
	const oxygenGeneratorRating = findGeneratorRating(instructions, true);

	return Co2GeneratorRating * oxygenGeneratorRating;
};

console.log("SOLUTION 1:", solution1(input));
console.log("SOLUTION 2:", solution2(input));

module.exports = { solution1, solution2 };
