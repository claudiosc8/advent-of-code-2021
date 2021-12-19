const input = require("./input.js");
const util = require("util");

const getInstructions = (i) => {
	return i.split(",").map(Number);
};

const runCycles = (instructions, maxDays) => {
	let day = 0;
	let mapping = new Array(9).fill(0);

	// group laternfishes with the same due date
	instructions.forEach((timer) => {
		mapping[timer] += 1;
	});

	while (day < maxDays) {
		day += 1;

		// remove first element of laternfishes ready to give birth
		const newParents = mapping.shift();

		// create new lanternfishes. Append these at the end (position 8)
		mapping.push(newParents);

		// reset timer of the laternfishes that gave birth (position 6)
		mapping[6] += newParents;
	}

	return mapping.reduce((acc, v) => acc + v, 0);
};

const solution1 = (input) => {
	const instructions = getInstructions(input);
	return runCycles(instructions, 80);
};

const solution2 = (input) => {
	const instructions = getInstructions(input);
	return runCycles(instructions, 256);
};

console.log("SOLUTION 1:", solution1(input));
console.log("SOLUTION 2:", solution2(input));

module.exports = { solution1, solution2 };
