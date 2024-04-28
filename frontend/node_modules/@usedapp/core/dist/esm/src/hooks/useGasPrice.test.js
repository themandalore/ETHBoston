import { useGasPrice } from '../../src';
import { expect } from 'chai';
import { setupTestingConfig, renderDAppHook } from '../../src/testing';
describe('useGasPrice', () => {
    let network1;
    let network2;
    let config;
    before(async () => {
        ;
        ({ config, network1, network2 } = await setupTestingConfig());
    });
    it('retrieves gas price', async () => {
        var _a;
        const { result, waitForCurrent } = await renderDAppHook(useGasPrice, { config });
        await waitForCurrent((val) => val !== undefined);
        expect(result.error).to.be.undefined;
        expect((_a = result.current) === null || _a === void 0 ? void 0 : _a.toNumber()).to.be.a('number');
    });
    it('retrieves gas price for multi chain', async () => {
        await testMultiChainUseGasPrice(network1.chainId);
        await testMultiChainUseGasPrice(network2.chainId);
    });
    const testMultiChainUseGasPrice = async (chainId) => {
        var _a;
        const { result, waitForCurrent } = await renderDAppHook(() => useGasPrice({ chainId }), {
            config,
        });
        await waitForCurrent((val) => val !== undefined);
        expect(result.error).to.be.undefined;
        expect((_a = result.current) === null || _a === void 0 ? void 0 : _a.toNumber()).to.be.a('number');
    };
});
//# sourceMappingURL=useGasPrice.test.js.map