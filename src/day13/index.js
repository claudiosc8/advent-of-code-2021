const input = require("./input.js");

const getInstructions = (i) => {
	const [points, folds] = i.split(/\n\n/);

	return {
		points: points.split(/\n/).map((e) => {
			const [x, y] = e.split(",");

			return { x: Number(x), y: Number(y) };
		}),
		folds: folds.split(/\n/).map((e) => {
			const [instruction, index] = e.split("=");
			const key = instruction.replace("fold along ", "");
			return { key, index: Number(index) };
		}),
	};
};

const generateMap = (points) => {
	const maxX = Math.max(...points.map((p) => p.x));
	const maxY = Math.max(...points.map((p) => p.y));

	const map = new Array(maxY + 1)
		.fill([])
		.map(() => new Array(maxX + 1).fill("."));

	points.forEach((p) => {
		map[p.y][p.x] = "#";
	});

	return map;
};

const handleFold = (map, fold) => {
	const { key, index } = fold;

	if (key === "x") {
		// fold the right half to the left

		if (map.some((row) => row[index] === "#")) {
			throw new Error(`dots on fold line! - ${key}-${index}`);
		}

		const firstHalf = map.map((row) => row.slice(0, index));
		const secondHalf = map.map((row) => row.slice(index + 1));

		return firstHalf.map((row, y) => {
			return row
				.reverse()
				.map((n, x) => {
					return secondHalf[y][x] === "#" ? "#" : n;
				})
				.reverse();
		});
	} else if (key === "y") {
		// fold the bottom half up

		if (map[index].some((n) => n == "#")) {
			throw new Error(`dots on fold line! - ${key}-${index}`);
		}

		const firstHalf = map.slice(0, index);
		const secondHalf = map.slice(index + 1);

		return firstHalf
			.reverse()
			.map((row, y) => {
				return row.map((n, x) => {
					return secondHalf[y] && secondHalf[y][x] === "#" ? "#" : n;
				});
			})
			.reverse();
	}

	throw new Error("fold key not recognized!");
};

const solution1 = (input) => {
	const { points, folds } = getInstructions(input);

	const map = generateMap(points);
	const firstFold = folds[0];

	const folded = handleFold(map, firstFold);

	return folded.reduce((acc, row) => {
		return acc + row.filter((n) => n === "#").length;
	}, 0);
};

const solution2 = (input) => {
	const { points, folds } = getInstructions(input);
	const map = generateMap(points);

	let temp = map;

	folds.forEach((fold) => {
		temp = handleFold(temp, fold);
	});

	return temp.map((r) => r.join(" "));
};

console.time("time");
console.log("SOLUTION 1:", solution1(input));
console.log("SOLUTION 2:", solution2(input)); // ZUJUAFHP
console.timeEnd("time");

module.exports = { solution1, solution2 };
