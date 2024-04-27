"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const testing_1 = require("../testing");
const usePromiseTransaction_1 = require("./usePromiseTransaction");
const BASE_TX_COST = 21000;
const LIMITED_TX_COST = 23100; // 21000 * 1.1
const CONTRACT_FUNCTION_COST = 52441; // mock transfer transaction cost
describe('estimateGasLimit', () => {
    const mockProvider = new testing_1.MockProvider();
    const [signer, receiver] = mockProvider.getWallets();
    let token;
    beforeEach(async () => {
        token = await (0, testing_1.deployMockToken)(signer);
    });
    it('sending ether transaction', async () => {
        const gasLimit = await (0, usePromiseTransaction_1.estimateTransactionGasLimit)({
            value: 1,
            to: receiver.address,
        }, signer, 0);
        (0, chai_1.expect)(gasLimit).to.equal(BASE_TX_COST);
    });
    it('sending ether transaction with limit', async () => {
        const gasLimit = await (0, usePromiseTransaction_1.estimateTransactionGasLimit)({
            value: 1,
            to: receiver.address,
        }, signer, 10);
        (0, chai_1.expect)(gasLimit).to.equal(LIMITED_TX_COST);
    });
    it('sending ether transaction with gasLimit', async () => {
        const gasLimit = await (0, usePromiseTransaction_1.estimateTransactionGasLimit)({
            value: 1,
            to: receiver.address,
            gasLimit: BASE_TX_COST,
        }, signer, 0);
        (0, chai_1.expect)(gasLimit).to.equal(BASE_TX_COST);
    });
    it('sending ether transaction with limit with gasLimit', async () => {
        const gasLimit = await (0, usePromiseTransaction_1.estimateTransactionGasLimit)({
            value: 1,
            to: receiver.address,
            gasLimit: BASE_TX_COST,
        }, signer, 10);
        (0, chai_1.expect)(gasLimit).to.equal(LIMITED_TX_COST);
    });
    it('transfer token', async () => {
        const gasLimit = await (0, usePromiseTransaction_1.estimateContractFunctionGasLimit)(token, 'transfer', [receiver.address, 1], 0);
        (0, chai_1.expect)(gasLimit).to.equal(CONTRACT_FUNCTION_COST);
    });
    it('transfer token with limit', async () => {
        const gasLimit = await (0, usePromiseTransaction_1.estimateContractFunctionGasLimit)(token, 'transfer', [receiver.address, 1], 100);
        (0, chai_1.expect)(gasLimit).to.equal(2 * CONTRACT_FUNCTION_COST);
    });
});
//# sourceMappingURL=estimateGasLimit.test.js.map