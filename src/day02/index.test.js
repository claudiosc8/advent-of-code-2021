const { solution1, solution2 } = require("./index");

const input = `forward 5
down 5
forward 8
up 3
down 8
forward 2`;

test("solution1", () => {
	expect(solution1(input)).toBe(150);
});

test("solution2", () => {
	expect(solution2(input)).toBe(900);
});
