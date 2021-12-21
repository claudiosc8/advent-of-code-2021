const { solution1, solution2 } = require("./index");

const input = `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`;

test("solution1", () => {
    expect(solution1(input)).toBe(1656);
});

test("solution2", () => {
    expect(solution2(input)).toBe(195);
});
