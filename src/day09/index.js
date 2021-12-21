const input = require("./input.js");

const getInstructions = (i) => {
	return i.split(/\n/).map((row) => {
		return row.split("").map(Number);
	});
};

const validate = (n) => (typeof n === "number" ? n : Infinity);

const getAdiacentPoints = (y, x) => {
	const top = { y: y - 1, x };
	const bottom = { y: y + 1, x };
	const left = { y, x: x - 1 };
	const right = { y, x: x + 1 };

	return [top, bottom, left, right];
};

const getLowestPoints = (map) => {
	const lowestPoints = [];
	for (let y = 0; y < map.length; y += 1) {
		for (let x = 0; x < map[y].length; x += 1) {
			const current = map[y][x];
			const adiancentPoints = getAdiacentPoints(y, x);

			const values = adiancentPoints.map((point) =>
				validate(map[point.y] && map[point.y][point.x])
			);

			if (values.every((point) => current < point)) {
				lowestPoints.push({ x, y });
			}
		}
	}

	return lowestPoints;
};

const solution1 = (input) => {
	const map = getInstructions(input);
	const lowestPoints = getLowestPoints(map);
	return lowestPoints
		.map((coord) => map[coord.y][coord.x] + 1)
		.reduce((acc, v) => acc + v, 0);
};

const findPoints = (map, entry, basin = {}) => {
	const { x, y } = entry;

	const hash = `${y}-${x}`;
	basin[hash] = entry;

	const adiancentPoints = getAdiacentPoints(y, x);

	for (let i = 0; i < adiancentPoints.length; i += 1) {
		const point = adiancentPoints[i];
		const value = validate(map[point.y] && map[point.y][point.x]);

		const hash = `${point.y}-${point.x}`;

		if (value < 9 && !basin[hash]) {
			const b = findPoints(map, point, basin);
			basin = { ...basin, ...b };
		}
	}

	return basin;
};

const solution2 = (input) => {
	const map = getInstructions(input);
	const lowestPoints = getLowestPoints(map);

	const basins = [];

	lowestPoints.forEach((point) => {
		const basin = findPoints(map, point);
		basins.push(Object.values(basin).length);
	});

	return basins
		.sort((a, b) => b - a) // sort by size
		.slice(0, 3) // get only the top three
		.reduce((acc, v) => acc * v, 1); // multiply each value
};

console.log("SOLUTION 1:", solution1(input));
console.log("SOLUTION 2:", solution2(input));

module.exports = { solution1, solution2 };
