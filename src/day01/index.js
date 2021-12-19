const input = require("./input.js");

const array = input.split(/\n/).map(Number);

const solution1 = (input) => {
	let counter = 0;

	for (let i = 0; i < input.length; i += 1) {
		if (typeof input[i + 1] === "number" && input[i] < input[i + 1]) {
			counter += 1;
		}
	}

	return counter;
};

const solution2 = (input) => {
	let counter = 0;

	const calculateWindow = (index) => {
		return input[index] + input[index + 1] + input[index + 2];
	};
	for (let i = 0; i < input.length; i += 1) {
		if (typeof input[i + 3] === "number") {
			const first = calculateWindow(i);
			const second = calculateWindow(i + 1);
			if (first < second) {
				counter += 1;
			}
		}
	}

	return counter;
};

console.log("SOLUTION 1:", solution1(array));
console.log("SOLUTION 2:", solution2(array));

module.exports = {solution1, solution2}