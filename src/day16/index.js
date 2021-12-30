const input = require("./input.js");

const hexToBinary = {
	0: "0000",
	1: "0001",
	2: "0010",
	3: "0011",
	4: "0100",
	5: "0101",
	6: "0110",
	7: "0111",
	8: "1000",
	9: "1001",
	A: "1010",
	B: "1011",
	C: "1100",
	D: "1101",
	E: "1110",
	F: "1111",
};

const PACKET_VERSION_LENGTH = 3;
const PACKET_TYPE_ID_LENGTH = 3;
const PACKET_HEADER_LENGTH = PACKET_VERSION_LENGTH + PACKET_TYPE_ID_LENGTH;

const LITERAL_GROUP_SIZE = 5;

const LENGTH_TYPE_ZERO_LENGTH = 15;
const LENGTH_TYPE_ONE_LENGTH = 11;

const parseInstructions = (str) => {
	return str
		.split("")
		.map((e) => hexToBinary[e])
		.join("");
};

const toBinary = (str) => +parseInt(str, 2);

const handleLiteral = (input, header, i = 0) => {
	let o = i;
	const groups = [];

	while (o < input.length) {
		const group = input.slice(o, o + LITERAL_GROUP_SIZE);
		groups.push(group.slice(1));
		o += LITERAL_GROUP_SIZE;
		if (group[0] === "0") {
			break;
		}
	}

	const value = toBinary(groups.join(""));

	return {
		header,
		value,
		i: o,
		subPackets: [],
	};
};

const handleOperator = (input, header, i = 0) => {
	const isTypeZero = input[i] === "0";

	const subPacketsIndex = isTypeZero
		? i + 1 + LENGTH_TYPE_ZERO_LENGTH
		: i + 1 + LENGTH_TYPE_ONE_LENGTH;

	const length = toBinary(input.slice(i + 1, subPacketsIndex));

	let o = subPacketsIndex;

	const subPackets = [];

	const check = () => {
		return isTypeZero
			? o < subPacketsIndex + length
			: subPackets.length < length;
	};

	while (check()) {
		const parsed = parse(input, o);
		if (!parsed) {
			// sanity check
			break;
		}
		subPackets.push(parsed);
		o = parsed.i;
	}

	return {
		header,
		i: o,
		subPackets,
	};
};

const parseHeader = (input, i) => {
	return {
		version: toBinary(input.slice(i, i + PACKET_VERSION_LENGTH)),
		type: toBinary(
			input.slice(i + PACKET_VERSION_LENGTH, i + PACKET_HEADER_LENGTH)
		),
	};
};

const parse = (input, i = 0) => {
	if (i >= input.length) {
		// sanity check
		console.error("index greater than input length");
		return;
	}

	const header = parseHeader(input, i);

	if (header.type === 4) {
		return handleLiteral(input, header, i + PACKET_HEADER_LENGTH);
	}

	return handleOperator(input, header, i + PACKET_HEADER_LENGTH);
};

const sumVersions = (packet) => {
	return (
		packet.header.version +
		packet.subPackets.reduce((acc, v) => {
			return acc + sumVersions(v);
		}, 0)
	);
};

const solution1 = (input) => {
	const inst = parseInstructions(input);
	const packets = parse(inst);
	return sumVersions(packets);
};

const analyze = (packet) => {
	const { subPackets, value, header } = packet;
	const [first, second] = subPackets;

	switch (header.type) {
		case 0:
			// sum
			return subPackets.reduce((acc, v) => acc + analyze(v), 0);
		case 1:
			// product
			return subPackets.reduce((acc, v) => acc * analyze(v), 1);
		case 2:
			// min
			return subPackets.reduce((acc, v) => {
				const current = analyze(v);
				return acc < current ? acc : current;
			}, Infinity);
		case 3:
			// max
			return subPackets.reduce((acc, v) => {
				const current = analyze(v);
				return acc > current ? acc : current;
			}, 0);
		case 4:
			// literal
			return value;
		case 5:
			// greater than
			return analyze(first) > analyze(second) ? 1 : 0;
		case 6:
			// less than
			return analyze(first) < analyze(second) ? 1 : 0;
		case 7:
			// equal to
			return analyze(first) === analyze(second) ? 1 : 0;
		default:
			throw new Error("Packet type not recognized");
	}
};

const solution2 = (input) => {
	const inst = parseInstructions(input);
	const packets = parse(inst);
	return analyze(packets);
};

console.time("time");
console.log("SOLUTION 1:", solution1(input));
console.log("SOLUTION 2:", solution2(input));
console.timeEnd("time");

module.exports = { solution1, solution2 };
