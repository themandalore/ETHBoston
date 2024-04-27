"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const testing_1 = require("../testing");
const abi_1 = require("../constants/abi");
const useContractCall_1 = require("./useContractCall");
describe('useContractCall', () => {
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
        var _a, _b;
        const callData = {
            abi: abi_1.ERC20Interface,
            address: token.address,
            method: 'balanceOf',
            args: [network1.deployer.address],
        };
        const { result, waitForCurrent } = await (0, testing_1.renderDAppHook)(() => (0, useContractCall_1.useContractCall)(callData, { chainId: network1.chainId }), {
            config,
        });
        await waitForCurrent((val) => val !== undefined);
        (0, chai_1.expect)(result.error).to.be.undefined;
        (0, chai_1.expect)((_a = result.current) === null || _a === void 0 ? void 0 : _a[0]).not.to.be.undefined;
        (0, chai_1.expect)((_b = result.current) === null || _b === void 0 ? void 0 : _b[0]).to.eq(testing_1.MOCK_TOKEN_INITIAL_BALANCE);
    });
    it('multichain calls return correct initial balances', async () => {
        await testMultiChainUseContractCall(token.address, [network1.deployer.address], network1.chainId, testing_1.MOCK_TOKEN_INITIAL_BALANCE);
        await testMultiChainUseContractCall(secondToken.address, [network2.deployer.address], network2.chainId, testing_1.SECOND_MOCK_TOKEN_INITIAL_BALANCE);
    });
    const testMultiChainUseContractCall = async (address, args, chainId, endValue) => {
        var _a, _b;
        const { result, waitForCurrent } = await (0, testing_1.renderDAppHook)(() => (0, useContractCall_1.useContractCall)({
            abi: abi_1.ERC20Interface,
            address,
            method: 'balanceOf',
            args,
        }, { chainId }), {
            config,
        });
        await waitForCurrent((val) => val !== undefined);
        (0, chai_1.expect)(result.error).to.be.undefined;
        (0, chai_1.expect)((_a = result.current) === null || _a === void 0 ? void 0 : _a[0]).not.to.be.undefined;
        (0, chai_1.expect)((_b = result.current) === null || _b === void 0 ? void 0 : _b[0]).to.eq(endValue);
    };
    it('is prepared for a case of undefined address', async () => {
        const callData = {
            abi: abi_1.ERC20Interface,
            address: undefined,
            method: 'balanceOf',
            args: [network1.deployer.address],
        };
        const { result, waitForNextUpdate } = await (0, testing_1.renderDAppHook)(() => (0, useContractCall_1.useContractCall)(callData, { chainId: network1.chainId }), {
            config,
        });
        await waitForNextUpdate();
        (0, chai_1.expect)(result.error).to.be.undefined;
        (0, chai_1.expect)(result.current).to.be.undefined;
    });
});
//# sourceMappingURL=useContractCall.test.js.map