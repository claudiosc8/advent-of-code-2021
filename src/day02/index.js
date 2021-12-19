const input = require("./input.js");

const getInstructions = (i) =>
	i.split(/\n/).map((command) => {
		const [direction, value] = command.split(" ");
		return { direction, value: +value };
	});

const solution1 = (input) => {
	const instructions = getInstructions(input);

	let depth = 0;
	let horizontalPosition = 0;

	instructions.forEach((instruction) => {
		switch (instruction.direction) {
			case "forward":
				horizontalPosition += instruction.value;
				break;
			case "up":
				depth -= instruction.value;
				break;
			case "down":
				depth += instruction.value;
				break;
			default:
				break;
		}
	});

	return depth * horizontalPosition;
};

const solution2 = (input) => {
	const instructions = getInstructions(input);

	let aim = 0;
	let horizontalPosition = 0;
	let depth = 0;

	instructions.forEach((instruction) => {
		switch (instruction.direction) {
			case "forward":
				horizontalPosition += instruction.value;
				depth += aim * instruction.value;
				break;
			case "up":
				aim -= instruction.value;
				break;
			case "down":
				aim += instruction.value;
				break;
			default:
				break;
		}
	});

	return depth * horizontalPosition;
};

console.log("SOLUTION 1:", solution1(input));
console.log("SOLUTION 2:", solution2(input));

module.exports = { solution1, solution2 };
