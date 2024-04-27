"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../../src");
const chai_1 = require("chai");
const testing_1 = require("../../src/testing");
describe('useGasPrice', () => {
    let network1;
    let network2;
    let config;
    before(async () => {
        ;
        ({ config, network1, network2 } = await (0, testing_1.setupTestingConfig)());
    });
    it('retrieves gas price', async () => {
        var _a;
        const { result, waitForCurrent } = await (0, testing_1.renderDAppHook)(src_1.useGasPrice, { config });
        await waitForCurrent((val) => val !== undefined);
        (0, chai_1.expect)(result.error).to.be.undefined;
        (0, chai_1.expect)((_a = result.current) === null || _a === void 0 ? void 0 : _a.toNumber()).to.be.a('number');
    });
    it('retrieves gas price for multi chain', async () => {
        await testMultiChainUseGasPrice(network1.chainId);
        await testMultiChainUseGasPrice(network2.chainId);
    });
    const testMultiChainUseGasPrice = async (chainId) => {
        var _a;
        const { result, waitForCurrent } = await (0, testing_1.renderDAppHook)(() => (0, src_1.useGasPrice)({ chainId }), {
            config,
        });
        await waitForCurrent((val) => val !== undefined);
        (0, chai_1.expect)(result.error).to.be.undefined;
        (0, chai_1.expect)((_a = result.current) === null || _a === void 0 ? void 0 : _a.toNumber()).to.be.a('number');
    };
});
//# sourceMappingURL=useGasPrice.test.js.map