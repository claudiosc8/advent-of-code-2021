const input = require("./input.js");

const getInstructions = (i) => {
	return i.split(",").map(Number);
};

const sumOneToN = (n) => (n * (n + 1)) / 2;

const calculateCheapestOutcome = (crabPositions, constantRate) => {
	const min = Math.min(...crabPositions);
	const max = Math.max(...crabPositions);

	const mapping = {};

	for (let m = min; m <= max; m += 1) {
		for (let i = 0; i < crabPositions.length; i += 1) {
			const difference = Math.abs(crabPositions[i] - m);
			const fuelCost = constantRate ? difference : sumOneToN(difference);
			mapping[m] = (mapping[m] || 0) + fuelCost;
		}
	}

	return Math.min(...Object.values(mapping));
};

const solution1 = (input) => {
	const instructions = getInstructions(input);
	return calculateCheapestOutcome(instructions, true);
};

const solution2 = (input) => {
	const instructions = getInstructions(input);
	return calculateCheapestOutcome(instructions, false);
};

console.log("SOLUTION 1:", solution1(input));
console.log("SOLUTION 2:", solution2(input));

module.exports = { solution1, solution2 };
