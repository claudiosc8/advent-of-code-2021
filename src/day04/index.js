const input = require("./input.js");

const getInstructions = (i) => {
	const rows = i.split(/\n\n/);
	const [order, ...boards] = rows;
	return {
		order: order.split(","),
		boards: boards.map((board) => {
			return {
				marked: false,
				rows: board.split(/\n/).map((line) => {
					return line
						.trim() // remove initial space
						.replace(/ {2,}/g, " ") // remove double space
						.split(" ")
						.map((value) => ({
							value,
							marked: false,
						}));
				}),
			};
		}),
	};
};

const checkNumbers = (board, current) => {
	for (let r = 0; r < board.length; r += 1) {
		const row = board[r];

		for (let n = 0; n < row.length; n += 1) {
			const number = row[n];

			if (number.value === current) {
				number.marked = true;

				const column = new Array(board.length)
					.fill()
					.map((_, i) => board[i][n]);

				// check winning row
				if (
					row.every((n) => n.marked) ||
					column.every((n) => n.marked)
				) {
					return board;
				}
			}
		}
	}

	return false;
};

const sumUnmarkedNumbers = (board) => {
	return board.reduce((b, row) => {
		return (
			b +
			row.reduce((r, num) => {
				return num.marked ? r : r + Number(num.value);
			}, 0)
		);
	}, 0);
};

const solution1 = (input) => {
	const { order, boards } = getInstructions(input);

	for (let i = 0; i < order.length; i += 1) {
		const current = order[i];

		for (let b = 0; b < boards.length; b += 1) {
			const board = boards[b];
			const winningBoard = checkNumbers(board.rows, current);

			if (winningBoard) {
				return Number(current) * sumUnmarkedNumbers(winningBoard);
			}
		}
	}
};

const solution2 = (input) => {
	const { order, boards } = getInstructions(input);

	for (let i = 0; i < order.length; i += 1) {
		const current = order[i];

		for (let b = 0; b < boards.length; b += 1) {
			const board = boards[b];
			const winningBoard = checkNumbers(board.rows, current);

			if (winningBoard) {
				board.marked = true;
			}

			if (boards.every((board) => board.marked)) {
				return Number(current) * sumUnmarkedNumbers(winningBoard);
			}
		}
	}
};

console.log("SOLUTION 1:", solution1(input));
console.log("SOLUTION 2:", solution2(input));

module.exports = { solution1, solution2 };
