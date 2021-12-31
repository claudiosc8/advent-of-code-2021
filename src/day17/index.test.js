const { solution1, solution2 } = require("./index");

const input = `target area: x=20..30, y=-10..-5`;

test("solution1", () => {
    expect(solution1(input)).toBe(45);
});

test("solution2", () => {
    expect(solution2(input)).toBe(112);
});
