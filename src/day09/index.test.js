const { solution1, solution2 } = require("./index");

const input = `2199943210
3987894921
9856789892
8767896789
9899965678`;

test("solution1", () => {
    expect(solution1(input)).toBe(15);
});

test("solution2", () => {
    expect(solution2(input)).toBe(1134);
});
