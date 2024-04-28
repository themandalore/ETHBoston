import { expect } from 'chai';
import { utils } from 'ethers';
import { deployMockToken, MOCK_TOKEN_INITIAL_BALANCE, SECOND_MOCK_TOKEN_INITIAL_BALANCE, setupTestingConfig, renderDAppHook, } from '../testing';
import { useRawCall, useRawCalls } from './useRawCalls';
describe('useRawCall', () => {
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
    it('can query ERC20 balance', async () => {
        const call = {
            address: token.address,
            data: token.interface.encodeFunctionData('balanceOf', [network1.deployer.address]),
            chainId: network1.chainId,
        };
        const { result, waitForCurrent } = await renderDAppHook(() => useRawCall(call), {
            config,
        });
        await waitForCurrent((val) => val !== undefined);
        expect(result.error).to.be.undefined;
        expect(result.current.success).to.eq(true);
        expect(result.current.value).to.eq(MOCK_TOKEN_INITIAL_BALANCE);
    });
    it('Works for a different combinations of address casing', async () => {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const calls = [
            {
                address: token.address.toLowerCase(),
                data: token.interface.encodeFunctionData('balanceOf', [network1.deployer.address.toLowerCase()]),
                chainId: network1.chainId,
            },
            {
                address: token.address.toLowerCase(),
                data: token.interface.encodeFunctionData('balanceOf', [utils.getAddress(network1.deployer.address)]),
                chainId: network1.chainId,
            },
            {
                address: utils.getAddress(token.address),
                data: token.interface.encodeFunctionData('balanceOf', [network1.deployer.address.toLowerCase()]),
                chainId: network1.chainId,
            },
            {
                address: utils.getAddress(token.address),
                data: token.interface.encodeFunctionData('balanceOf', [utils.getAddress(network1.deployer.address)]),
                chainId: network1.chainId,
            },
        ];
        const { result, waitForCurrent } = await renderDAppHook(() => useRawCalls(calls), {
            config,
        });
        await waitForCurrent((val) => val !== undefined && val.every((x) => x === null || x === void 0 ? void 0 : x.success));
        expect(result.error).to.be.undefined;
        expect(result.current.length).to.eq(4);
        expect((_a = result.current[0]) === null || _a === void 0 ? void 0 : _a.success).to.be.true;
        expect((_b = result.current[0]) === null || _b === void 0 ? void 0 : _b.value).to.eq(MOCK_TOKEN_INITIAL_BALANCE);
        expect((_c = result.current[1]) === null || _c === void 0 ? void 0 : _c.success).to.be.true;
        expect((_d = result.current[1]) === null || _d === void 0 ? void 0 : _d.value).to.eq(MOCK_TOKEN_INITIAL_BALANCE);
        expect((_e = result.current[2]) === null || _e === void 0 ? void 0 : _e.success).to.be.true;
        expect((_f = result.current[2]) === null || _f === void 0 ? void 0 : _f.value).to.eq(MOCK_TOKEN_INITIAL_BALANCE);
        expect((_g = result.current[3]) === null || _g === void 0 ? void 0 : _g.success).to.be.true;
        expect((_h = result.current[3]) === null || _h === void 0 ? void 0 : _h.value).to.eq(MOCK_TOKEN_INITIAL_BALANCE);
    });
    it('returns correct initial balance for mainnet', async () => {
        const { result, waitForCurrent } = await renderDAppHook(() => useRawCall({
            address: token.address,
            data: token.interface.encodeFunctionData('balanceOf', [network1.deployer.address]),
            chainId: network1.chainId,
        }), {
            config,
        });
        await waitForCurrent((val) => val !== undefined);
        expect(result.error).to.be.undefined;
        expect(result.current.success).to.eq(true);
        expect(result.current.value).to.eq(MOCK_TOKEN_INITIAL_BALANCE);
    });
    it('returns correct initial balance for other chain', async () => {
        const { result, waitForCurrent } = await renderDAppHook(() => useRawCall({
            address: secondToken.address,
            data: secondToken.interface.encodeFunctionData('balanceOf', [network2.deployer.address]),
            chainId: network2.chainId,
        }), {
            config,
        });
        await waitForCurrent((val) => val !== undefined);
        expect(result.error).to.be.undefined;
        expect(result.current.success).to.eq(true);
        expect(result.current.value).to.eq(SECOND_MOCK_TOKEN_INITIAL_BALANCE);
    });
    it('should not throw error when call is Falsy', async () => {
        const { result } = await renderDAppHook(() => useRawCall(null));
        expect(result.error).to.be.undefined;
        expect(result.current).to.be.undefined;
    });
});
//# sourceMappingURL=useRawCall.test.js.map