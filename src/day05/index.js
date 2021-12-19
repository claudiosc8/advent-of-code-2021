const input = require("./input.js");
const util = require("util");

const getInstructions = (i) => {
	const rows = i.split(/\n/);

	const mapcoords = (coords) => {
		const [x, y] = coords.split(",");
		return { x: Number(x), y: Number(y) };
	};

	return rows.map((row) => {
		const [start, end] = row.split(" -> ");
		return {
			start: mapcoords(start),
			end: mapcoords(end),
		};
	});
};

const getOverlaps = (lines, degrees) => {
	const filtered = lines.filter((line) => {
		const angleInRadians = Math.atan2(
			line.end.y - line.start.y,
			line.end.x - line.start.x
		);
		const angleInDegrees = (angleInRadians * 180) / Math.PI;

		return angleInDegrees % degrees === 0;
	});

	const getIncrement = (t) => {
		if (t === 0) {
			return 0;
		}
		return t > 0 ? 1 : -1;
	};

	const mapping = {};

	filtered.forEach((line) => {
		const diffX = line.end.x - line.start.x;
		const diffY = line.end.y - line.start.y;

		const incrementX = getIncrement(diffX);
		const incrementY = getIncrement(diffY);

		for (let i = 0; i <= Math.abs(diffY || diffX); i += 1) {
			const point = {
				x: line.start.x + incrementX * i,
				y: line.start.y + incrementY * i,
			};

			const hash = `${point.x}-${point.y}`;
			mapping[hash] =
				typeof mapping[hash] === "number" ? mapping[hash] + 1 : 1;
		}
	});

	return Object.values(mapping).filter((v) => v > 1).length;
};

const solution1 = (input) => {
	const instructions = getInstructions(input);
	return getOverlaps(instructions, 90);
};

const solution2 = (input) => {
	const instructions = getInstructions(input);
	return getOverlaps(instructions, 45);
};

console.log("SOLUTION 1:", solution1(input));
console.log("SOLUTION 2:", solution2(input));

module.exports = { solution1, solution2 };
