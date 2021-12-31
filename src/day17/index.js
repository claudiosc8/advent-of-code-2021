const input = require("./input.js");

const getInstructions = (i) => {
	const mapping = {};
	i.replace("target area: ", "")
		.split(", ")
		.forEach((axis) => {
			const [key, coords] = axis.split("=");
			const [min, max] = coords.split("..").map(Number);

			mapping[key] = { min, max };
		});
	return mapping;
};

const shoot = (area, velocity) => {
	const p = { x: 0, y: 0 };
	const v = { ...velocity };
	const steps = [];

	while (p.x <= area.x.max && p.y >= area.y.min) {
		steps.push({ ...p });

		// apply velocity
		p.x += v.x;
		p.y += v.y;

		// drag force
		if (v.x > 0) {
			v.x -= 1;
		}

		// gravity force
		v.y -= 1;
	}

	const l = steps[steps.length - 1];

	if (
		l.x >= area.x.min &&
		l.y <= area.x.max &&
		l.y <= area.y.max &&
		l.y >= area.y.min
	) {
		// if given this velocity, the probe hits the target
		// return the shot trajectory
		return steps;
	}

	// the probe didn't hit the target
	return false;
};

const handleShots = (area) => {
	const collection = [];

	for (let x = 0; x <= area.x.max; x += 1) {
		for (let y = Math.abs(area.y.min); y >= area.y.min; y -= 1) {
			const point = { x, y };
			const shot = shoot(area, point);

			if (shot) {
				// if it is a valid shot add it to the collection
				collection.push(shot);
			}
		}
	}

	return collection;
};

const solution1 = (input) => {
	const area = getInstructions(input);
	const shots = handleShots(area);

	return shots.reduce((acc, shot) => {
		const highest = Math.max(...shot.map((e) => e.y));
		return acc > highest ? acc : highest;
	}, area.y.min);
};

const solution2 = (input) => {
	const area = getInstructions(input);
	const shots = handleShots(area);

	return shots.length;
};

console.time("time");
console.log("SOLUTION 1:", solution1(input));
console.log("SOLUTION 2:", solution2(input));
console.timeEnd("time");

module.exports = { solution1, solution2 };
