const input = require("./input.js");

const getInstructions = (i) =>
	i.split(/\n/).map((e) => e.split("").map(Number));

const executeCycle = (octopuses, stopWhenAllFlash = false) => {
	let flashCount = 0;
	// step 1 - the energy of each ocptopus increases by 1;
	for (let y = 0; y < octopuses.length; y += 1) {
		for (let x = 0; x < octopuses[y].length; x += 1) {
			octopuses[y][x] += 1;
		}
	}

	// step 2 - octopuses with energy higher than 9 flashes
	// use recursions
	const executeFlash = () => {
		for (let y = 0; y < octopuses.length; y += 1) {
			for (let x = 0; x < octopuses[y].length; x += 1) {
				if (octopuses[y][x] === 10) {
					// set current octopus energy to 11.
					// this means that it has already flashed
					octopuses[y][x] += 1;

					// find adiacent octopuses
					const topLeft = { y: y - 1, x: x - 1 };
					const top = { y: y - 1, x };
					const topRight = { y: y - 1, x: x + 1 };
					const left = { y, x: x - 1 };
					const right = { y, x: x + 1 };
					const bottomLeft = { y: y + 1, x: x - 1 };
					const bottom = { y: y + 1, x };
					const bottomRight = { y: y + 1, x: x + 1 };

					// get only valid adiacent octopuses
					// they should be in the grid and should not have flashed yet.
					const adiacent = [
						topLeft,
						top,
						topRight,
						left,
						right,
						bottomLeft,
						bottom,
						bottomRight,
					].filter((coords) => {
						const p =
							octopuses[coords.y] &&
							octopuses[coords.y][coords.x];
						return typeof p === "number" && p < 10;
					});

					// if there are any valid adiacent octupuses
					// increase their energy by 1
					if (adiacent.length > 0) {
						for (let p = 0; p < adiacent.length; p += 1) {
							octopuses[adiacent[p].y][adiacent[p].x] += 1;
						}

						// run check again
						executeFlash();
					}
				}
			}
		}
	};

	executeFlash();

	if (
		stopWhenAllFlash &&
		octopuses.every((rows) => rows.every((o) => o === 11))
	) {
		// stop if the octopuses will all flash simultaneously (part 2)
		return true;
	} else {
		// step 3 - any octopus that flashed during this step has its energy level set to 0;
		for (let y = 0; y < octopuses.length; y += 1) {
			for (let x = 0; x < octopuses[y].length; x += 1) {
				if (octopuses[y][x] > 9) {
					flashCount += 1;
					octopuses[y][x] = 0;
				}
			}
		}
	}

	return stopWhenAllFlash ? false : flashCount;
};

const solution1 = (input) => {
	const octopuses = getInstructions(input);

	let flashCount = 0;

	let i = 0;
	while (i < 100) {
		// next iteration
		i += 1;

		// execute cycle
		flashCount += executeCycle(octopuses);
	}

	return flashCount;
};

const solution2 = (input) => {
	const octopuses = getInstructions(input);

	let i = 0;

	let response = false;
	while (!response) {
		// next iteration
		i += 1;

		// execute cycle
		response = executeCycle(octopuses, true);
	}

	return i;
};

console.log("SOLUTION 1:", solution1(input));
console.log("SOLUTION 2:", solution2(input));

module.exports = { solution1, solution2 };
