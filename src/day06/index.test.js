const { solution1, solution2 } = require("./index");

const input = `3,4,3,1,2`;

test("solution1", () => {
    expect(solution1(input)).toBe(5934);
});

test("solution2", () => {
    expect(solution2(input)).toBe(26984457539);
});
