const { solution1, solution2 } = require("./index");

const input = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`;

test("solution1", () => {
	expect(solution1(input)).toBe(198);
});

test("solution2", () => {
	expect(solution2(input)).toBe(230);
});
