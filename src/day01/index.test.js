const { solution1, solution2 } = require("./index");

const input = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];

test("solution1", () => {
	expect(solution1(input)).toBe(7);
});

test("solution2", () => {
	expect(solution2(input)).toBe(5);
});
