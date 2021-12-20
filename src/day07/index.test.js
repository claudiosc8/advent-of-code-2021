const { solution1, solution2 } = require("./index");

const input = `16,1,2,0,4,2,7,1,2,14`;

test("solution1", () => {
    expect(solution1(input)).toBe(37);
});

test("solution2", () => {
    expect(solution2(input)).toBe(168);
});
