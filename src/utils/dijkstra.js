class Graph {
	constructor(map) {
		this.map = map;
	}

	sorter(a, b) {
		return parseFloat(a) - parseFloat(b);
	}

	findPaths(start, end) {
		const costs = {};
		let open = { 0: [start] };
		const predecessors = {};
		let keys;

		const addToOpen = function (cost, vertex) {
			const key = "" + cost;
			if (!open[key]) open[key] = [];
			open[key].push(vertex);
		};

		costs[start] = 0;

		while (open) {
			keys = Object.keys(open);
			if (keys.length === 0) {
				break;
			}

			keys.sort(this.sorter);

			const key = keys[0];
			const bucket = open[key];
			const node = bucket.shift();
			const currentCost = parseFloat(key);
			const adjacentNodes = this.map[node] || {};

			if (bucket.length === 0) {
				delete open[key];
			}

			Object.keys(adjacentNodes).forEach((vertex) => {
				const cost = adjacentNodes[vertex];
				const totalCost = cost + currentCost;
				const vertexCost = costs[vertex];

				if (vertexCost === undefined || vertexCost > totalCost) {
					costs[vertex] = totalCost;
					addToOpen(totalCost, vertex);
					predecessors[vertex] = node;
				}
			});
		}

		return costs[end] === undefined ? null : predecessors;
	}

	extractShortest(predecessors, end) {
		const nodes = [];
		let u = end;

		while (u !== undefined) {
			nodes.push(u);
			u = predecessors[u];
		}

		nodes.reverse();
		return nodes;
	}

	calculateDistance(path) {
		let distance = 0;

		for (let i = 0; i < path.length - 1; i += 1) {
			const current = path[i];
			const next = path[i + 1];
			const d = this.map[current][next];
			distance += d;
		}

		return distance;
	}

	findShortestPath(nodes) {
		let start = nodes.shift();
		let end;
		let predecessors;
		const path = [];
		let shortest;

		while (nodes.length) {
			end = nodes.shift();
			predecessors = this.findPaths(start, end);

			if (predecessors) {
				shortest = this.extractShortest(predecessors, end);
				if (nodes.length) {
					path.push(...shortest.slice(0, -1));
				} else {
					path.push(...shortest);
				}
			} else {
				return null;
			}

			start = end;
		}

		return { path, distance: this.calculateDistance(path) };
	}
}

module.exports = Graph;
