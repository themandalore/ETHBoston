"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const ethers_1 = require("ethers");
const utils_1 = require("ethers/lib/utils");
const calls_1 = require("./calls");
describe('decodeCallResult', () => {
    const erc20Abi = ['function name() view returns (string)'];
    const call = {
        contract: new ethers_1.Contract(`0x${'0'.repeat(39)}1`, new utils_1.Interface(erc20Abi)),
        method: 'name',
        args: [],
    };
    it('one of arguments undefined', () => {
        const result = { value: '', success: true };
        (0, chai_1.expect)((0, calls_1.decodeCallResult)(undefined, result)).to.be.undefined;
        (0, chai_1.expect)((0, calls_1.decodeCallResult)(call, undefined)).to.be.undefined;
    });
    it('call error', () => {
        const errorMessage = 'Testing error message';
        const errorResult = {
            success: false,
            value: new ethers_1.utils.Interface(['function Error(string)']).encodeFunctionData('Error', [errorMessage]),
        };
        const { value, error } = (0, calls_1.decodeCallResult)(call, errorResult) || {};
        (0, chai_1.expect)(value).to.be.undefined;
        (0, chai_1.expect)(error === null || error === void 0 ? void 0 : error.message).to.equal(errorMessage);
    });
    it('decoding error', () => {
        const result = {
            success: true,
            value: '0x0',
        };
        const { value, error } = (0, calls_1.decodeCallResult)(call, result) || {};
        (0, chai_1.expect)(value).to.be.undefined;
        (0, chai_1.expect)(error === null || error === void 0 ? void 0 : error.message.startsWith('hex data is odd-length')).to.be.true;
    });
    it('success', () => {
        const name = 'Testing ERC20';
        const successResult = {
            success: true,
            value: call.contract.interface.encodeFunctionResult('name', [name]),
        };
        (0, chai_1.expect)((0, calls_1.decodeCallResult)(call, successResult)).to.deep.equal({ value: [name], error: undefined });
    });
});
//# sourceMappingURL=calls.test.js.map