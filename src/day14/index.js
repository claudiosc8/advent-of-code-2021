const input = require("./input.js");

const getInstructions = (i) => {
	const [pattern, instructions] = i.split(/\n\n/);

	const mapping = {};

	instructions.split(/\n/).forEach((e) => {
		const [key, char] = e.split(" -> ");
		mapping[key] = char;
	});

	return {
		pattern,
		rules: mapping,
	};
};

const runPolimer = (instructions, maxIterations) => {
	let i = 0;

	const pairs = { ...instructions.rules };
	const scores = {};

	let text = instructions.pattern.split("");

	while (i < maxIterations) {
		const insertions = [];
		for (let i = 0; i < text.length - 1; i += 1) {
			const pair = `${text[i]}${text[i + 1]}`;
			if (pairs[pair]) {
				insertions.push({ index: i + 1, char: pairs[pair] });
			}
		}

		insertions.forEach((ins, index) => {
			text.splice(ins.index + index, 0, ins.char);
		});
		i += 1;
	}

	for (let i = 0; i < text.length; i++) {
		const letter = text[i];
		scores[letter] = (scores[letter] || 0) + 1;
	}

	const sorted = Object.values(scores).sort((a, b) => b - a);
	const max = sorted[0];
	const min = sorted[sorted.length - 1];

	return max - min;
};

const runPolimerPart2 = (instructions, maxIterations) => {
	// abstracted logic of the first function. to enhance performance

	const { pattern } = instructions;
	const pairs = {};
	const rules = { ...instructions.rules };
	const count = {};

	// count pairs in the pattern
	for (let i = 0; i < pattern.length - 1; i++) {
		const key = `${pattern[i]}${pattern[i + 1]}`;
		pairs[key] = pairs[key] + 1 || 1;
	}

	// update pair counts
	for (let step = 0; step < maxIterations; step++) {
		for (const [pair, count] of Object.entries(pairs)) {
			if (count > 0) {
				const [a, b] = pair.split("");
				const c = rules[pair];

				const ab = [a, b].join("");
				const ac = [a, c].join("");
				const cb = [c, b].join("");

				pairs[ab] = (pairs[ab] || 0) - count;
				pairs[ac] = (pairs[ac] || 0) + count;
				pairs[cb] = (pairs[cb] || 0) + count;
			}
		}
	}

	// count letters
	Object.keys(pairs).forEach((pair) => {
		const firstLetter = pair[0];
		const value = pairs[pair];
		count[firstLetter] = count[firstLetter] + value || value;
	});

	// count the last letter
	count[pattern[pattern.length - 1]]++;

	const sorted = Object.values(count).sort((a, b) => b - a);

	return sorted[0] - sorted[sorted.length - 1];
};

const solution1 = (input) => {
	const instructions = getInstructions(input);
	return runPolimer(instructions, 10);
};

const solution2 = (input) => {
	const instructions = getInstructions(input);
	return runPolimerPart2(instructions, 40);
};

console.time("time");
console.log("SOLUTION 1:", solution1(input));
console.log("SOLUTION 2:", solution2(input));
console.timeEnd("time");

module.exports = { solution1, solution2 };
