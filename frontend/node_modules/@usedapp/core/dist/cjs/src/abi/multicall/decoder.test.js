"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const crypto_1 = require("crypto");
const benchmark_1 = require("../benchmark");
const constants_1 = require("./constants");
const decoder_1 = require("./decoder");
describe('Multicall decoder', () => {
    const testData = [
        1,
        Array.from(Array(20).keys()).map((i) => '0x' + (0, crypto_1.randomBytes)((i + 1) * 8).toString('hex')),
    ];
    const encoded = constants_1.ethersAbi.encodeFunctionResult('aggregate', testData);
    it('Properly decodes', () => {
        const manual = (0, decoder_1.decodeAggregate)(encoded);
        (0, chai_1.expect)(manual).to.deep.eq(testData);
    });
    it('bench ethers', () => {
        (0, benchmark_1.formatBench)((0, benchmark_1.bench)(() => {
            constants_1.ethersAbi.decodeFunctionResult('aggregate', encoded);
        }));
    });
    it('bench manual', () => {
        (0, benchmark_1.formatBench)((0, benchmark_1.bench)(() => {
            (0, decoder_1.decodeAggregate)(encoded);
        }));
    });
});
//# sourceMappingURL=decoder.test.js.map