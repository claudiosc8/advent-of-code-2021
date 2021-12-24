const input = require("./input.js");
const Graph = require("../utils/dijkstra.js");

const getInstructions = (i) => {
	return i.split(/\n/).map((row) => row.split("").map(Number));
};

const getGraph = (m) => {
	const graph = {};
	for (let y = 0; y < m.length; y += 1) {
		for (let x = 0; x < m[0].length; x += 1) {
			const hash = `${x}-${y}`;
			graph[hash] = {};
			const neighbors = [
				{ x, y: y - 1 },
				{ x, y: y + 1 },
				{ x: x - 1, y },
				{ x: x + 1, y },
			].filter((c) => {
				const a = m[c.y] && m[c.y][c.x];
				return typeof a === "number";
			});
			for (let n = 0; n < neighbors.length; n += 1) {
				const neighboor = `${neighbors[n].x}-${neighbors[n].y}`;
				graph[hash][neighboor] = m[neighbors[n].y][neighbors[n].x];
			}
		}
	}

	return graph;
};

const findDistance = (m) => {
	const graph = getGraph(m);

	const start = `0-0`;
	const finish = `${m.length - 1}-${m[0].length - 1}`;

	const dijkstra = new Graph(graph);

	const path = dijkstra.findShortestPath([start, finish]);

	return path.distance;
};

const solution1 = (input) => {
	const map = getInstructions(input);
	return findDistance(map);
};

const expandMap = (m, [xtot, yTot], [min, max]) => {
	const array = [];
	for (let y = 0; y < yTot; y += 1) {
		for (let x = 0; x < xtot; x += 1) {
			for (let r = 0; r < m.length; r += 1) {
				for (let n = 0; n < m[0].length; n += 1) {
					const cy = m.length * y + r;
					const cx = m[0].length * x + n;

					const i = m[r][n] + y + x;
					const v = i % (max + 1) !== i ? (i % (max + 1)) + min : i;
					if (!array[cy]) {
						array[cy] = [];
					}
					array[cy][cx] = v;
				}
			}
		}
	}
	return array;
};

const solution2 = (input) => {
	const map = getInstructions(input);
	const expanded = expandMap(map, [5, 5], [1, 9]);
	return findDistance(expanded);
};

console.time("time");
console.log("SOLUTION 1:", solution1(input));
console.log("SOLUTION 2:", solution2(input));
console.timeEnd("time");

module.exports = { solution1, solution2 };
