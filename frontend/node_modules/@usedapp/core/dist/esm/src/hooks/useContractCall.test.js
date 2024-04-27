import { expect } from 'chai';
import { renderDAppHook, setupTestingConfig, MOCK_TOKEN_INITIAL_BALANCE, SECOND_MOCK_TOKEN_INITIAL_BALANCE, deployMockToken, } from '../testing';
import { ERC20Interface } from '../constants/abi';
import { useContractCall } from './useContractCall';
describe('useContractCall', () => {
    let token;
    let secondToken;
    let config;
    let network1;
    let network2;
    beforeEach(async () => {
        ;
        ({ config, network1, network2 } = await setupTestingConfig());
        token = await deployMockToken(network1.deployer);
        secondToken = await deployMockToken(network2.deployer, SECOND_MOCK_TOKEN_INITIAL_BALANCE);
    });
    it('initial test balance to be correct', async () => {
        var _a, _b;
        const callData = {
            abi: ERC20Interface,
            address: token.address,
            method: 'balanceOf',
            args: [network1.deployer.address],
        };
        const { result, waitForCurrent } = await renderDAppHook(() => useContractCall(callData, { chainId: network1.chainId }), {
            config,
        });
        await waitForCurrent((val) => val !== undefined);
        expect(result.error).to.be.undefined;
        expect((_a = result.current) === null || _a === void 0 ? void 0 : _a[0]).not.to.be.undefined;
        expect((_b = result.current) === null || _b === void 0 ? void 0 : _b[0]).to.eq(MOCK_TOKEN_INITIAL_BALANCE);
    });
    it('multichain calls return correct initial balances', async () => {
        await testMultiChainUseContractCall(token.address, [network1.deployer.address], network1.chainId, MOCK_TOKEN_INITIAL_BALANCE);
        await testMultiChainUseContractCall(secondToken.address, [network2.deployer.address], network2.chainId, SECOND_MOCK_TOKEN_INITIAL_BALANCE);
    });
    const testMultiChainUseContractCall = async (address, args, chainId, endValue) => {
        var _a, _b;
        const { result, waitForCurrent } = await renderDAppHook(() => useContractCall({
            abi: ERC20Interface,
            address,
            method: 'balanceOf',
            args,
        }, { chainId }), {
            config,
        });
        await waitForCurrent((val) => val !== undefined);
        expect(result.error).to.be.undefined;
        expect((_a = result.current) === null || _a === void 0 ? void 0 : _a[0]).not.to.be.undefined;
        expect((_b = result.current) === null || _b === void 0 ? void 0 : _b[0]).to.eq(endValue);
    };
    it('is prepared for a case of undefined address', async () => {
        const callData = {
            abi: ERC20Interface,
            address: undefined,
            method: 'balanceOf',
            args: [network1.deployer.address],
        };
        const { result, waitForNextUpdate } = await renderDAppHook(() => useContractCall(callData, { chainId: network1.chainId }), {
            config,
        });
        await waitForNextUpdate();
        expect(result.error).to.be.undefined;
        expect(result.current).to.be.undefined;
    });
});
//# sourceMappingURL=useContractCall.test.js.map