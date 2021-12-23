const { solution1, solution2 } = require("./index");

const input = `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`;

test("solution1", () => {
    expect(solution1(input)).toBe(1588);
});

test("solution2", () => {
    expect(solution2(input)).toBe(2188189693529);
});
