const input = require("./input.js");

const getInstructions = (i) => i.split(/\n/).map((e) => e.split("-"));

const isLowerCase = (str) => str === str.toLowerCase();

const hasDuplicates = (array) => new Set(array).size !== array.length;

const exploreCaves = (map, allowSingleSmallCaveTwice = false) => {
	const paths = [];

	const explore = (startingPoint, breadcrumbs = []) => {
		breadcrumbs.push(startingPoint);

		// find available caves from the given cave
		const caves = map
			.filter((s) => s.includes(startingPoint))
			.map((s) => s.filter((b) => b !== startingPoint)[0]);

		for (let i = 0; i < caves.length; i += 1) {
			const cave = caves[i];

			if (cave === "start") {
				// can't go back to the starting cave
				continue;
			}

			if (cave === "end") {
				// we reached the end.
				// save breadcrumbs and our navigation for this path ends here
				const path = [...breadcrumbs, cave].join("-");
				if (!paths.includes(path)) {
					paths.push(path);
				}
				continue;
			}

			// check if the breadcrumb has already a small cave duplicate (part 2)
			const shouldStopIteration = allowSingleSmallCaveTwice
				? hasDuplicates(breadcrumbs.filter((e) => isLowerCase(e)))
				: true;

			if (
				isLowerCase(cave) &&
				breadcrumbs.includes(cave) &&
				shouldStopIteration
			) {
				// we can't visit a lowercase cave twice! (part 1)
				// or if we have already visited a lowercase cave twice (part 2)
				continue;
			}

			// explore next cave and create a copy of the breadcrumbs
			explore(cave, [...breadcrumbs]);
		}
	};

	explore("start");

	return paths.length;
};

const solution1 = (input) => {
	const map = getInstructions(input);
	return exploreCaves(map);
};

const solution2 = (input) => {
	const map = getInstructions(input);
	return exploreCaves(map, true);
};

console.time("label");
console.log("SOLUTION 1:", solution1(input));
console.log("SOLUTION 2:", solution2(input)); // slow performance, needs improvement
console.timeEnd("label");

module.exports = { solution1, solution2 };
