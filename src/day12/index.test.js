const { solution1, solution2 } = require("./index");

const input1 = `start-A
start-b
A-c
A-b
b-d
A-end
b-end`;

const input2 = `dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc`;

const input3 = `fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW`;

test("solution1 - input 1", () => {
    expect(solution1(input1)).toBe(10);
});

test("solution1 - input 2", () => {
    expect(solution1(input2)).toBe(19);
});

test("solution1 - input 3", () => {
    expect(solution1(input3)).toBe(226);
});

test("solution2 - input 1", () => {
    expect(solution2(input1)).toBe(36);
});

test("solution2 - input 2", () => {
    expect(solution2(input2)).toBe(103);
});

test("solution2 - input 3", () => {
    expect(solution2(input3)).toBe(3509);
});
