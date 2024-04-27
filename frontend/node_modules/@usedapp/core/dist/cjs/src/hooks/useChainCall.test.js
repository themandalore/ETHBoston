"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const testing_1 = require("../testing");
const useChainCalls_1 = require("./useChainCalls");
describe('useChainCall', () => {
    let token;
    let secondToken;
    let config;
    let network1;
    let network2;
    beforeEach(async () => {
        ;
        ({ config, network1, network2 } = await (0, testing_1.setupTestingConfig)());
        token = await (0, testing_1.deployMockToken)(network1.deployer);
        secondToken = await (0, testing_1.deployMockToken)(network2.deployer, testing_1.SECOND_MOCK_TOKEN_INITIAL_BALANCE);
    });
    it('initial test balance to be correct', async () => {
        const call = {
            address: token.address,
            data: token.interface.encodeFunctionData('balanceOf', [network1.deployer.address]),
            chainId: network1.chainId,
        };
        const { result, waitForCurrent } = await (0, testing_1.renderDAppHook)(() => (0, useChainCalls_1.useChainCall)(call), {
            config,
        });
        await waitForCurrent((val) => val !== undefined);
        (0, chai_1.expect)(result.error).to.be.undefined;
        (0, chai_1.expect)(result.current).to.eq(testing_1.MOCK_TOKEN_INITIAL_BALANCE);
    });
    it('multichain calls return correct initial balances', async () => {
        await testMultiChainUseChainCall(token, [network1.deployer.address], network1.chainId, testing_1.MOCK_TOKEN_INITIAL_BALANCE);
        await testMultiChainUseChainCall(secondToken, [network2.deployer.address], network2.chainId, testing_1.SECOND_MOCK_TOKEN_INITIAL_BALANCE);
    });
    const testMultiChainUseChainCall = async (contract, args, chainId, endValue) => {
        const { result, waitForCurrent } = await (0, testing_1.renderDAppHook)(() => (0, useChainCalls_1.useChainCall)({
            address: contract.address,
            data: contract.interface.encodeFunctionData('balanceOf', args),
            chainId,
        }), {
            config,
        });
        await waitForCurrent((val) => val !== undefined);
        (0, chai_1.expect)(result.error).to.be.undefined;
        (0, chai_1.expect)(result.current).to.eq(endValue);
    };
});
//# sourceMappingURL=useChainCall.test.js.map