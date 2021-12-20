const input = require("./input.js");

const getInstructions = (i) => {
	return i.split(/\n/).map((row) => {
		const [pattern, output] = row.split(" | ");
		return { pattern: pattern.split(" "), output: output.split(" ") };
	});
};

const display = [
	"abcefg",
	"cf",
	"acdeg",
	"acdfg",
	"bcdf",
	"abdfg",
	"abdefg",
	"acf",
	"abcdefg",
	"abcdfg",
];

const display2 = [
	{ a: true, b: true, c: true, d: false, e: true, f: true, g: true },
	{ a: false, b: false, c: true, d: false, e: false, f: true, g: false },
	{ a: true, b: false, c: true, d: true, e: true, f: false, g: true },
	{ a: true, b: false, c: true, d: true, e: false, f: true, g: true },
	{ a: false, b: true, c: true, d: true, e: false, f: true, g: false },
	{ a: true, b: true, c: false, d: true, e: false, f: true, g: true },
	{ a: true, b: true, c: false, d: true, e: true, f: true, g: true },
	{ a: true, b: false, c: true, d: false, e: false, f: true, g: false },
	{ a: true, b: true, c: true, d: true, e: true, f: true, g: true },
	{ a: true, b: true, c: true, d: true, e: false, f: true, g: true },
];

const solution1 = (input) => {
	const instructions = getInstructions(input);

	let count = 0;

	// how many times do digits 1, 4, 7, or 8 appear?
	[1, 4, 7, 8].forEach((digit) => {
		instructions.forEach((combination) => {
			combination.output.forEach((output) => {
				if (output.length === display[digit].length) {
					count += 1;
				}
			});
		});
	});

	return count;
};

const overlap_segment = (arr, segments) => {
	return arr.find((word) => {
		const r = word.replace(new RegExp(`[${segments}]`, "g"), "");
		return r.length === word.length - segments.length;
	});
};

const not_overlap_segment = (arr, segments) => {
	return arr.find((word) => {
		const r = word.replace(new RegExp(`[${segments}]`, "g"), "");
		return r.length > 0 && r.length !== word.length - segments.length;
	});
};

const subtract_arrays = (arr1, arr2) => {
	return arr1.filter((w) => {
		return !arr2.includes(w);
	});
};

const solution2 = (input) => {
	const instructions = getInstructions(input);

	const outputs = [];

	instructions.forEach((instruction) => {
		const numberMapping = new Array(display.length).fill(undefined);

		const sortedPattern = instruction.pattern.map((w) =>
			w.split("").sort().join("")
		);

		// 2,3,5 have all 5 segments
		const two_three_five = sortedPattern.filter(
			(w) => w.length === display[2].length
		);

		// 0,6,9 have all 6 segments
		const zero_six_nine = sortedPattern.filter(
			(w) => w.length === display[0].length
		);

		[1, 4, 7, 8].forEach((i) => {
			// get numbers 1, 4, 7, 8 because they have known length
			numberMapping[i] = sortedPattern.find(
				(w) => w.length === display[i].length
			);
		});

		// 3 is the only number between 2,3,5 to overlap perfectly to number 7 (segments 'a','c','f' are covered)
		numberMapping[3] = overlap_segment(two_three_five, numberMapping[7]);

		// 6 is the only number between 0,6,9 to not overlap completely to number 1 (segment 'c' doesn't get covered)
		numberMapping[6] = not_overlap_segment(zero_six_nine, numberMapping[1]);

		// 9 is the only number between 0,6,9 to overlap perfectly to number 4 (segments 'b','c','d','f' are covered)
		numberMapping[9] = overlap_segment(zero_six_nine, numberMapping[4]);

		// 2 is the only number between 2,3,5 to not overlap completely to number 9 (segment 'e' doesn't get covered)
		numberMapping[2] = not_overlap_segment(
			two_three_five,
			numberMapping[9]
		);

		// get 0 by subtracting 9 and 6
		numberMapping[0] = subtract_arrays(zero_six_nine, [
			numberMapping[9],
			numberMapping[6],
		])[0];

		// get 5 by subtracting 2 and 3
		numberMapping[5] = subtract_arrays(two_three_five, [
			numberMapping[2],
			numberMapping[3],
		])[0];

		// we have all the numbers, so we can decode the output;

		const output = [];

		const sortedOutput = instruction.output.map((w) =>
			w.split("").sort().join("")
		);

		sortedOutput.forEach((word) => {
			const index = numberMapping.indexOf(word);
			// console.log(word, index, numberMapping);
			output.push(index);
		});

		outputs.push(output.join(""));
	});

	return outputs.reduce((acc, v) => acc + Number(v), 0);
};

console.log("SOLUTION 1:", solution1(input));
console.log("SOLUTION 2:", solution2(input));

module.exports = { solution1, solution2 };
