"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const chai_1 = require("chai");
const calls_1 = require("./calls");
describe('getUniqueActiveChainCalls', () => {
    it('returns a list of unique chain calls', () => {
        const addresses = [ethers_1.Wallet.createRandom().address, ethers_1.Wallet.createRandom().address];
        const calls = [
            {
                chainId: 1,
                address: addresses[0],
                data: '0x123',
            },
            {
                chainId: 1,
                address: addresses[0].toLowerCase(),
                data: '0x123',
            },
            {
                chainId: 2,
                address: addresses[0].toLowerCase(),
                data: '0x123',
            },
            {
                chainId: 1,
                address: addresses[0],
                data: '0xc0ffee',
            },
            {
                chainId: 2,
                address: addresses[1],
                data: '0x123',
            },
        ];
        (0, chai_1.expect)((0, calls_1.getUniqueActiveCalls)(calls)).to.deep.equal([
            {
                chainId: 1,
                address: addresses[0],
                data: '0x123',
            },
            {
                chainId: 2,
                address: addresses[0].toLowerCase(),
                data: '0x123',
            },
            {
                chainId: 1,
                address: addresses[0],
                data: '0xc0ffee',
            },
            {
                chainId: 2,
                address: addresses[1],
                data: '0x123',
            },
        ]);
    });
});
//# sourceMappingURL=getUniqueAvtive.test.js.map