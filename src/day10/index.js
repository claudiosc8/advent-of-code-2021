const input = require("./input.js");

const getInstructions = (i) => i.split(/\n/);

const openBrackets = ["(", "[", "{", "<"];
const closedBrackets = [")", "]", "}", ">"];

const analyzeLine = (line) => {
	const array = line.split("");

	let i = 0;
	while (i < line.length) {
		const index = array.findIndex((l) => closedBrackets.includes(l));
		if (index > -1) {
			const symbol = array[index];
			const openPairIndex = closedBrackets.indexOf(symbol);
			const openPair = openBrackets[openPairIndex];

			if (array[index - 1] === openPair) {
				array.splice(index - 1, 2); // remove the pair of brackets from array
			} else {
				return symbol; // return corrupted brackets
			}
		}
		i += 1;
	}

	// the line is incomplete or is not corrupted
	return array;
};

const solution1 = (input) => {
	const instructions = getInstructions(input);

	const report = [];
	instructions.forEach((line) => {
		const result = analyzeLine(line);

		// accepts only corrupted lines
		if (typeof result === "string") {
			report.push(result);
		}
	});

	const score = {
		")": 3,
		"]": 57,
		"}": 1197,
		">": 25137,
	};

	return report.reduce((acc, b) => acc + score[b], 0);
};

const solution2 = (input) => {
	const instructions = getInstructions(input);

	const report = [];
	instructions.forEach((line) => {
		const result = analyzeLine(line);

		// accepts only non-corrupted lines
		if (Array.isArray(result)) {
			// reverse array and map matching closing brackets
			const missingBrackets = result.reverse().map((symbol) => {
				const closedPairIndex = openBrackets.indexOf(symbol);
				const closedPair = closedBrackets[closedPairIndex];
				return closedPair;
			});

			report.push(missingBrackets);
		}
	});

	const score = {
		")": 1,
		"]": 2,
		"}": 3,
		">": 4,
	};

	const scores = report.map((line) => {
		return line.reduce((acc, b) => {
			return acc * 5 + score[b];
		}, 0);
	});

	// sort scores and get the middle score
	return scores.sort((a, b) => a - b)[Math.floor(scores.length / 2)];
};

console.log("SOLUTION 1:", solution1(input));
console.log("SOLUTION 2:", solution2(input));

module.exports = { solution1, solution2 };
