const { solution1, solution2 } = require("./index");

const input = `1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581`;

test("solution1", () => {
    expect(solution1(input)).toBe(40);
});

test("solution2", () => {
    expect(solution2(input)).toBe(315);
});
