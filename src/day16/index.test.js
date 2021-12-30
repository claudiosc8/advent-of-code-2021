const { solution1, solution2 } = require("./index");

const input4 = `8A004A801A8002F478`;

const input5 = `620080001611562C8802118E34`;

const input6 = `C0015000016115A2E0802F182340`;

const input7 = `A0016C880162017C3686B18A3D4780`;

const input8 = `C200B40A82`;

const input9 = `04005AC33890`;

const input10 = `880086C3E88112`;

const input11 = `CE00C43D881120`;

const input12 = `D8005AC2A8F0`;

const input13 = `F600BC2D8F`;

const input14 = `9C005AC2F8F0`;

const input15 = `9C0141080250320F1802104A08`;

test("solution4 - input4", () => {
    expect(solution1(input4)).toBe(16);
});
test("solution5 - input5", () => {
    expect(solution1(input5)).toBe(12);
});
test("solution6 - input6", () => {
    expect(solution1(input6)).toBe(23);
});
test("solution7 - input7", () => {
    expect(solution1(input7)).toBe(31);
});

test("solution2 - input8", () => {
    expect(solution2(input8)).toBe(3);
});

test("solution2 - input9", () => {
    expect(solution2(input9)).toBe(54);
});

test("solution2 - input10", () => {
    expect(solution2(input10)).toBe(7);
});

test("solution2 - input11", () => {
    expect(solution2(input11)).toBe(9);
});

test("solution2 - input12", () => {
    expect(solution2(input12)).toBe(1);
});

test("solution2 - input13", () => {
    expect(solution2(input13)).toBe(0);
});

test("solution2 - input14", () => {
    expect(solution2(input14)).toBe(0);
});

test("solution2 - input15", () => {
    expect(solution2(input15)).toBe(1);
});
