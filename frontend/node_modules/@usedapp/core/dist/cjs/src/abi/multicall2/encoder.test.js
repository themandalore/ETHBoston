"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const ethers_1 = require("ethers");
const benchmark_1 = require("../benchmark");
const constants_1 = require("./constants");
const encoder_1 = require("./encoder");
describe('Multicall v2 encoder', () => {
    const address = ethers_1.Wallet.createRandom().address;
    const calls = [
        ...[...Array(10)].map(() => constants_1.ethersAbi.encodeFunctionData('getCurrentBlockGasLimit')),
        ...[...Array(10)].map((_, i) => constants_1.ethersAbi.encodeFunctionData('getBlockHash', [i])),
    ];
    it('Properly encodes', () => {
        const calldata = constants_1.ethersAbi.encodeFunctionData('tryAggregate', [true, calls.map((calldata) => [address, calldata])]);
        const manual = (0, encoder_1.encodeTryAggregate)(true, calls.map((calldata) => [address, calldata]));
        (0, chai_1.expect)(manual).to.eq(calldata);
    });
    it('bench ethers', () => {
        const callsLong = [...Array(20)].flatMap(() => calls);
        (0, benchmark_1.formatBench)((0, benchmark_1.bench)(() => {
            constants_1.ethersAbi.encodeFunctionData('tryAggregate', [true, callsLong.map((calldata) => [address, calldata])]);
        }));
    });
    it('bench manual', () => {
        const callsLong = [...Array(20)].flatMap(() => calls);
        (0, benchmark_1.formatBench)((0, benchmark_1.bench)(() => {
            (0, encoder_1.encodeTryAggregate)(true, callsLong.map((calldata) => [address, calldata]));
        }));
    });
});
//# sourceMappingURL=encoder.test.js.map